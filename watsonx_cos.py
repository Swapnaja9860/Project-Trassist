import os
from dotenv import load_dotenv
import ibm_boto3
import json
from ibm_botocore.client import Config, ClientError

from PIL import Image
from io import BytesIO
import base64

load_dotenv()

# Create resource
cos = ibm_boto3.resource("s3",
    ibm_api_key_id=os.getenv("COS_API_KEY_ID"),
    ibm_service_instance_id=os.getenv("COS_INSTANCE_CRN"),
    config=Config(signature_version="oauth"),
    endpoint_url=os.getenv("COS_ENDPOINT")
)
bucket_name = os.getenv("BUCKET_NAME")
object_names = []

def get_list_object_names():
   
    print("Retrieving bucket contents from: {0}".format(bucket_name))
    try:
        files = cos.Bucket(bucket_name).objects.all()
        for file in files:
            print("Item: {0} ({1} bytes).".format(file.key, file.size))
            object_names.append(file.key)
        return object_names
    except ClientError as be:
        print("CLIENT ERROR: {0}\n".format(be))
    except Exception as e:
        print("Unable to retrieve bucket contents: {0}".format(e))

def save_image(base64_data, i):
    decoded_data = base64.b64decode(base64_data)
    # Create a BytesIO object to work with PIL
    image_stream = BytesIO(decoded_data)

    # Open the image using PIL
    image = Image.open(image_stream)

    # If you want to save the image
    image.save(f'images/user_charts{i}.jpg')
    print("--------------------------------------", f'images/user_charts{i}.jpg')

def get_objects():
    object_names = get_list_object_names()
    i = 0
    try: 
        for object_name in object_names:
            i = i+1
            file = cos.Object(bucket_name, object_name).get()
            data_decoded = file["Body"].read().decode('utf-8')
            chart = json.loads(data_decoded)[0]["thumbnail"].split(",")[1]
            save_image(chart, i)

        print(file["Body"].read(), type(file["Body"].read()))
    except ClientError as be:
        print("CLIENT ERROR: {0}\n".format(be))
    except Exception as e:
        print("Unable to retrieve file contents: {0}".format(e))
