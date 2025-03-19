# # from flask import Flask, request, jsonify
# # import os
# # from openai import OpenAI
# # from flask_cors import CORS
# # import json

# # with open('config.json', 'r') as file:
# #     data = json.load(file)
# # # הגדרת מפתח ה-API
# # my_api_key = data['api_key']
# # os.environ['OPENAI_API_KEY'] = my_api_key
# # client = OpenAI()
# # my_model = "gpt-4o-mini"

# # app = Flask(__name__)
# # CORS(app) 
# # @app.route('/grade_exam', methods=['POST'])
# # def grade_exam():
# #     if 'student_exam' not in request.files or 'teacher_exam' not in request.files:
# #         return jsonify({'error': 'Missing files!'}), 400
    
# #     student_exam_file = request.files['student_exam']
# #     teacher_exam_file = request.files['teacher_exam']

# #     # קריאת תוכן הקבצים
# #     student_exam = student_exam_file.read().decode('utf-8')
# #     teacher_exam = teacher_exam_file.read().decode('utf-8')

# #     # יצירת בקשה למודל GPT
# #     prompt = f"""
# #     תלמידה ענתה על המבחן הבא:
# #     {student_exam}

# #     התשובות הנכונות הן:
# #     {teacher_exam}

# #     אנא תן ציון מדויק במספרים ואחוזים לתשובות של התלמידה והסבר את הציון. גם במקרה שהתשובה נכונה אך לא זהה תן את כל הנקודות בשאלות הסבר בדוק האם רעיון תשובת התלמידה קרוב לרעיון תשובת המורה אם כן תן את כל הנקודות
# #     אך אם בהסבר קיים אפילו חלק ששגוי לגמרי הורד נקודות
# #     """
    
# #     response = client.chat.completions.create(
# #         model=my_model,
# #         messages=[{"role": "user", "content": prompt}]
# #     )

# #     # החזרת התגובה
# #     return jsonify({'response': response.choices[0].message.content})

# # @app.route('/', methods=['GET'])
# # def get_welcom():
# #     return "--------------welcom to grade_exam ✨------------------"

# # if __name__ == '__main__':
# #     app.run(debug=True)
# import os
# from dotenv import load_dotenv
# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import pytesseract 
# from PIL import Image
# import io 
# import json
# from openai import OpenAI 

# app = Flask(__name__)
# CORS(app)


# load_dotenv() 
# my_api_key = os.getenv("OPENAI_API_KEY")
# # my_api_key = data['api_key']

# os.environ['OPENAI_API_KEY'] = my_api_key

# client = OpenAI()
# my_model = "gpt-4o-mini"

# def grade_exam(student_exam, teacher_exam):
#     prompt = f"""
#     תלמידה ענתה על המבחן הבא:
#     {student_exam}

#     התשובות הנכונות הן:
#     {teacher_exam}

#     אנא תן ציון מדויק באחוזים לתשובות של התלמידה והסבר את הציון. אם התשובות של התלמידה נכונות, גם אם הן שונות מהתשובות של המורה, אנא ציין זאת כ"נכון",  והסבר שהן כוללות את המידע הבסיסי הנדרש. 
#     אם התשובות נכונות אך חסרות פרטים זניחים , יש לציין זאת, אך לא להוריד ציונים  .
#     אם יש בהן חלק שגוי לחלוטין אז יש להוריד בציון
#     """
    
#     response = client.chat.completions.create(
#         model=my_model,
#         messages=[
#             {
#                 "role": "system",
#                 "content": "You are a helpful assistant."
#             },
#             {
#                 "role": "user",
#                 "content": prompt
#             }
#         ])
    
#     return response.choices[0].message.content

# @app.route('/grade', methods=['OPTIONS'])
# def options():
#     return jsonify({'status': 'ok'}), 200

# @app.route('/grade', methods=['POST'])
# def grade():
#     data = request.json
#     # שינוי מהשורות הבאות: 
#     student_exam_image = data.get('student_exam_image')  # שינוי
#     teacher_exam_image = data.get('teacher_exam_image')  # שינוי
#     language = request.args.get('language', 'eng')  # שורה נוספה

#     if not student_exam_image or not teacher_exam_image:
#         return jsonify({"error": "Both student_exam_image and teacher_exam_image are required."}), 400

#     try:
#         # קריאת תוכן התמונה באמצעות pytesseract
#         student_exam = pytesseract.image_to_string(Image.open(io.BytesIO(student_exam_image)), lang=language)  # שינוי
#         teacher_exam = pytesseract.image_to_string(Image.open(io.BytesIO(teacher_exam_image)), lang=language)  # שינוי
#     except Exception as e:
#         return jsonify({"error": str(e)}), 400

#     grade_result = grade_exam(student_exam, teacher_exam)
#     response = jsonify({"grade": grade_result})
#     return response
# if __name__ == '__main__':
#     app.run(debug=True)
import os
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS
import pytesseract
from PIL import Image
import io
from openai import OpenAI
import requests
import json
import base64
from email.mime.text import MIMEText
from google.oauth2 import service_account
from googleapiclient.discovery import build


app = Flask(__name__)
CORS(app)
SERVICE_ACCOUNT_FILE = "./client_secret.json"
SCOPES = ['https://www.googleapis.com/auth/gmail.send']
load_dotenv()
my_api_key = os.getenv("OPENAI_API_KEY")
os.environ['OPENAI_API_KEY'] = my_api_key

client = OpenAI()
my_model = "gpt-4o-mini"
from google.oauth2 import service_account
from googleapiclient.discovery import build
import base64

# יצירת חיבור ל-Gmail API
SCOPES = ['https://www.googleapis.com/auth/gmail.send']
SERVICE_ACCOUNT_FILE = "client_secret.json"

credentials = service_account.Credentials.from_service_account_file(
    SERVICE_ACCOUNT_FILE, scopes=SCOPES
)

service = build('gmail', 'v1', credentials=credentials)

def send_email(to_email, grade, evaluation):
    print("Sending email via Gmail API")

    from_email = "t0534166016@gmail.com"  # כתובת המייל שלך בגוגל

    message_text = f"ציון: {grade}\nהערכה: {evaluation}"

    # יצירת אובייקט MIME
    message = MIMEMultipart()
    message['to'] = to_email
    message['from'] = from_email
    message['subject'] = 'תוצאות המבחן שלך'

    message.attach(MIMEText(message_text, 'plain'))

    # המרת ההודעה לבסיס 64
    raw_message = base64.urlsafe_b64encode(message.as_bytes()).decode()

    try:
        message_body = {'raw': raw_message}
        service.users().messages().send(userId="me", body=message_body).execute()
        print("Email sent successfully via Gmail API")
    except Exception as e:
        print(f"Error sending email: {str(e)}")


def grade_exam(student_exam, teacher_exam):
    prompt = f"""
    תלמידה ענתה על המבחן הבא:
    {student_exam}

    התשובות הנכונות הן:
    {teacher_exam}

    אנא תן ציון מדויק באחוזים לתשובות של התלמידה והסבר את הציון. 
    אם התשובות של התלמידה נכונות, גם אם הן שונות מהתשובות של המורה, ציין זאת כ"נכון" והסבר שהן כוללות את המידע הבסיסי הנדרש. 
    אם התשובות נכונות אך חסרות פרטים זניחים, יש לציין זאת, אך לא להוריד ציונים. 
    אם יש בהן חלק שגוי לחלוטין, יש להוריד בציון.
    החזר את התשובה בפורמט JSON בלבד (ללא טקסט נוסף):
    {{
        "grade": "ציון באחוזים",
        "evaluation": "הערכה מילולית"
    }}
    """

    response = client.chat.completions.create(
        model=my_model,
        messages=[
            {
                "role": "system",
                "content": "You are a helpful assistant."
            },
            {
                "role": "user",
                "content": prompt
            }
        ])

    return response.choices[0].message.content


@app.route('/grade', methods=['OPTIONS'])
def options():
    return jsonify({'status': 'ok'}), 200


@app.route('/grade', methods=['POST'])
def grade():
    data = request.json
    student_exam_url = data.get('student_exam_url')
    teacher_exam_url = data.get('teacher_exam_url')
    student_email = data.get('student_email')
    if not student_exam_url or not teacher_exam_url:
        return jsonify({"error": "Both student_exam_url and teacher_exam_url are required."}), 400

    try:
        print(student_exam_url)
        student_exam_image = Image.open(student_exam_url)
        

        student_exam = pytesseract.image_to_string(student_exam_image)

        
        teacher_exam_image = Image.open(teacher_exam_url)

        teacher_exam = pytesseract.image_to_string(teacher_exam_image)


        
    except Exception as e:
        return jsonify({"error": str(e)}), 400

    grade_result = grade_exam(student_exam, teacher_exam)
   
    
    try:
        print("grade_result  ",grade_result)

        result_json = json.loads(grade_result)
        print("result  ",result_json)
        grade = result_json.get("grade")
        evaluation = result_json.get("evaluation")
        response = jsonify({
            "grade": grade,
            "evaluation": evaluation
        })

    except json.JSONDecodeError:
        return jsonify({"error": "Failed to decode the response from the model."}), 500


    send_email(student_email, grade, evaluation)

    return response


if __name__ == '__main__':
    app.run(debug=True)
