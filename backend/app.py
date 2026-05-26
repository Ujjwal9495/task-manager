from flask import Flask, request
from flask_cors import CORS

from gmail_service import send_email

app = Flask(__name__)

CORS(app)


@app.route("/")
def home():
    return {
        "message": "Flask backend is working"
    }


# TEST EMAIL ROUTE
@app.route("/test-email")
def test_email():

    send_email(
        "cloudburst659@gmail.com",
        "Task Manager Test",
        "Flask email system is working successfully!"
    )

    return {
        "message": "Test email sent successfully"
    }


# SEND EMAIL API
@app.route("/send-email", methods=["POST"])
def send_email_route():

    data = request.get_json()

    receiver_email = data.get("receiver_email")
    subject = data.get("subject")
    body = data.get("body")

    send_email(receiver_email, subject, body)

    return {
        "message": "Email sent successfully"
    }


if __name__ == "__main__":
    app.run(debug=True)