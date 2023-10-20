import os
import io
from zipfile import ZipFile

from flask import Flask, request, jsonify, send_file
from flask_cors import CORS

from db import Cloudant
from watsonx_cos import get_objects
from nlu import get_charts_nlu

app = Flask(__name__)
cors = CORS(app)

cloudant = Cloudant()

@app.route("/signup", methods=["POST"])
def signup():
    user_data = request.json
    res = cloudant.sign_up(user_data)
    return jsonify({"message" : "success", "data": res})

@app.route("/login", methods=["POST"])
def login():
    user_data = request.json
    message, status_code = cloudant.login(user_data["mobileNumber"], user_data["password"])
    return jsonify({"message" : message}), status_code

@app.route("/user", methods=["GET"])
def get_user_data():
    mobileNumber = request.args.get('mobileNumber')
    data, message, status_code = cloudant.user(mobileNumber)
    return jsonify({'data': data, 'message': message}), status_code


@app.route("/image", methods=["POST"])
def process_image():
    files = request.files.getlist('image')
    categories = cloudant.upload_image(files)  
    return jsonify({'data': categories, 'message': 'success'})

@app.route("/image", methods=["GET"])
def get_image():
    cloudant.get_image()
    return jsonify({'message': 'success'})


@app.route("/transaction", methods=["GET"])
def get_transaction_data():
    mobileNumber = request.args.get('mobileNumber')
    data, message, status_code = cloudant.get_transaction_data(mobileNumber)
    return jsonify({'data': data, 'message': message}), status_code

@app.route("/transaction", methods=["POST"])
def post_transaction_data():
    transaction_data = request.json
    message, status_code = cloudant.transaction(transaction_data)
    return jsonify({'message': message}), status_code


def send_zip(image_paths):
    zip_buffer = io.BytesIO()

    with ZipFile(zip_buffer, 'w') as zipf:
        for image_path in image_paths:
            with open(image_path, 'rb') as img_file:
                file_name = os.path.basename(image_path)
                zipf.writestr(file_name, img_file.read())

    # Set the stream position to the beginning
    zip_buffer.seek(0)

    # Send the zip file as a response
    return send_file(zip_buffer, as_attachment=True, download_name='images.zip')


@app.route("/trends", methods=["GET"])
def trends():
    get_charts_nlu()
    image_paths = [
        'images/trending_charts.png',
        'images/trending_charts1.png',
        'images/trending_charts2.png'
    ]
    return send_zip(image_paths)

@app.route("/user_charts", methods=["GET"])
def user_charts():
    get_objects()
    image_paths = [
        'images/user_charts1.jpg',
        'images/user_charts2.jpg'
    ]
    return send_zip(image_paths)


if __name__ == "__main__":
    app.run(debug=True)
