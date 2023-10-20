import os
import base64
from dotenv import load_dotenv
import bcrypt
from PIL import Image

from ibmcloudant.cloudant_v1 import CloudantV1, Document
from ibm_cloud_sdk_core.authenticators import BasicAuthenticator

from transformers import pipeline
from datetime import datetime

load_dotenv()

class Cloudant:
    def __init__(self):
        username = os.getenv("CLOUDANT_USERNAME")       
        password = os.getenv("CLOUDANT_PASSWORD") 
        url = os.getenv("CLOUDANT_URL") 
         
        authenticator = BasicAuthenticator(username, password)
        self.client = CloudantV1(authenticator=authenticator)
        self.client.set_service_url(f"https://{username}:{password}@{url}")

    def sign_up(self, user_data):
        salt, hashed_password = self.hash_password(user_data["password"])
        user_data["password"] = hashed_password
        user_data["salt"] = salt
        doc = Document(**user_data)
        response = self.client.post_document(db='user', document=doc).get_result()
        return response
    
    def hash_password(self,password):
        # Generate a random salt
        salt = bcrypt.gensalt()

        # Hash the password with the salt
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)

        base64_salt = base64.b64encode(salt).decode('utf-8')
        base64_hashed_password = base64.b64encode(hashed_password).decode('utf-8')

        return base64_salt, base64_hashed_password

    def login(self, mobileNumber, password):
        # try: 
        #     data = self.client.post_find(
        #     db = 'user',
        #     selector={'mobileNumber': {'$eq': mobileNumber}}).get_result()["docs"][0]
        # except:
        #     message= "Mobile Number is not registered. Authentication failed."
        #     status_code = 401
        #     return message, status_code

        # salt = base64.b64decode(data["salt"])
        # stored_hashed_password = base64.b64decode(data["password"])
        # hashed_provided_password = bcrypt.hashpw(password.encode('utf-8'), salt)

        # # Compare the stored hash with the newly generated hash
        # if hashed_provided_password == stored_hashed_password:
        #     message = "Login successful!"
        #     status_code = 200
        # else:
        #     message= "Passwords do not match. Authentication failed."
        #     status_code = 401

        data = self.client.post_find(
        db = 'user',
        selector={'mobileNumber': {'$eq': mobileNumber}}).get_result()["docs"][0]
        
        message = "Login successful!"
        status_code = 200
        return message, status_code
    
    def user(self, mobileNumber):
        data = {}
        try: 
            data = self.client.post_find(
            db = 'user',
            selector={'mobileNumber': {'$eq': mobileNumber}}).get_result()["docs"][0]
            data.pop("password")
            data.pop("_id")
            data.pop("_rev")
            message= "Successful"
            status_code = 200
        except:
            message= "Something went wrong"
            status_code = 500
            
        return data, message, status_code
    
    def transaction(self, data):
        mobileNumber = data["mobileNumber"]
        data.pop("mobileNumber")

        current_date = datetime.now().date().strftime("%d-%m-%Y")
        print(current_date)
        data["date"] = current_date

        existing_data = self.client.post_find(
            db='user',
            selector={'mobileNumber': {'$eq': mobileNumber}}
        ).get_result().copy()
        
        existing_transaction_data = existing_data["docs"][0]
        transaction_list = existing_transaction_data.get('transaction', [])
        transaction_list.append(data)
        existing_transaction_data["transaction"] = transaction_list

        local_document = Document(
            **existing_transaction_data
        )

        response = self.client.put_document(
            db='user',
            doc_id=existing_transaction_data["_id"],
            document=local_document,
            rev=existing_transaction_data["_rev"],
        ).get_result()
        
        return "successful", 200
    
    def get_transaction_data(self, mobileNumber):
        result_data = self.client.post_find(
            db='user',
            selector={'mobileNumber': {'$eq': mobileNumber}}
        ).get_result()["docs"][0]

        response = []
        if result_data.get("transaction"):
            documents = result_data["transaction"].copy()
            
            for document in documents:
                total_wt = 0
                for cat_wt in document["category_weight"]:
                    total_wt += float(cat_wt["weight"])
                rounded_total_wt = round(total_wt, 2)
                response.append({"date": document["date"], "weight": rounded_total_wt, "amount": document["totalAmount"], "reward_points": document["rewards"]})

        print("--------------response---------------", response)
        return response, "successful", 200

    
    def upload_image(self, files):
        # with open(image, 'rb') as image_file:
        #     image_data = image_file.read()

        checkpoint = "openai/clip-vit-large-patch14"
        detector = pipeline(model=checkpoint, task="zero-shot-image-classification")
        
        images = []
        for file in files:
            images.append(Image.open(file))

        predictions = detector(images, candidate_labels=["plastic", "e-waste", "paper", "metal", "glass", "textile", "cardboard"])
        selectedCategories = []
        print("-------------predictions-----------------", predictions)
        for prediction in predictions:
            for pred in prediction:
                if pred["score"] > 0.4:
                    if pred["label"] not in selectedCategories:
                        selectedCategories.append(pred["label"])

      
        # for prediction in predictions:
        #     for pred in prediction:
        #         if pred["score"] > max_score and pred["label"] != "other":
        #             max_score = pred["score"]
        #             selected_label = pred["label"]

        #     if selected_label not in selectedCategories:
        #         selectedCategories.append(selected_label)
            
        print("-------------selectedCategories-----------------", selectedCategories)
        # image_data = files.read()
        # Encode as base64
        # try: 
        #     encoded_image = base64.b64encode(image_data).decode('utf-8')

        #     doc = Document(image = encoded_image)
        #     response = self.client.post_document(db='user', document=doc).get_result()
        #     print("Image uploaded successfully to cloudant", response)
        # finally:
        return selectedCategories
    

    def get_image(self):
        base64_data = self.client.post_find(
            db = 'user',
            selector={'_id': {'$eq': "c3259eea8af4352c0abd91ed7cefb832"}}).get_result()["docs"][0]
        
        binary_data = base64.b64decode(base64_data["image"])
        with open("output_image.jpg", "wb") as image_file:
            image_file.write(binary_data)
