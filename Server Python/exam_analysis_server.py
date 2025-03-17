# from flask import Flask, request, jsonify
# import os
# from openai import OpenAI
# from flask_cors import CORS
# import json

# with open('config.json', 'r') as file:
#     data = json.load(file)
# # הגדרת מפתח ה-API
# my_api_key = data['api_key']
# os.environ['OPENAI_API_KEY'] = my_api_key
# client = OpenAI()
# my_model = "gpt-4o-mini"

# app = Flask(__name__)
# CORS(app) 
# @app.route('/grade_exam', methods=['POST'])
# def grade_exam():
#     if 'student_exam' not in request.files or 'teacher_exam' not in request.files:
#         return jsonify({'error': 'Missing files!'}), 400
    
#     student_exam_file = request.files['student_exam']
#     teacher_exam_file = request.files['teacher_exam']

#     # קריאת תוכן הקבצים
#     student_exam = student_exam_file.read().decode('utf-8')
#     teacher_exam = teacher_exam_file.read().decode('utf-8')

#     # יצירת בקשה למודל GPT
#     prompt = f"""
#     תלמידה ענתה על המבחן הבא:
#     {student_exam}

#     התשובות הנכונות הן:
#     {teacher_exam}

#     אנא תן ציון מדויק במספרים ואחוזים לתשובות של התלמידה והסבר את הציון. גם במקרה שהתשובה נכונה אך לא זהה תן את כל הנקודות בשאלות הסבר בדוק האם רעיון תשובת התלמידה קרוב לרעיון תשובת המורה אם כן תן את כל הנקודות
#     אך אם בהסבר קיים אפילו חלק ששגוי לגמרי הורד נקודות
#     """
    
#     response = client.chat.completions.create(
#         model=my_model,
#         messages=[{"role": "user", "content": prompt}]
#     )

#     # החזרת התגובה
#     return jsonify({'response': response.choices[0].message.content})

# @app.route('/', methods=['GET'])
# def get_welcom():
#     return "--------------welcom to grade_exam ✨------------------"

# if __name__ == '__main__':
#     app.run(debug=True)
import os
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS
import pytesseract 
from PIL import Image
import io 
import json
from openai import OpenAI 

app = Flask(__name__)
CORS(app)

# with open('config.json', 'r') as file:
#     data = json.load(file)

load_dotenv() 
my_api_key = os.getenv("OPENAI_API_KEY")
# my_api_key = data['api_key']

# my_api_key = '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'
os.environ['OPENAI_API_KEY'] = my_api_key

client = OpenAI()
my_model = "gpt-4o-mini"

def grade_exam(student_exam, teacher_exam):
    prompt = f"""
    תלמידה ענתה על המבחן הבא:
    {student_exam}

    התשובות הנכונות הן:
    {teacher_exam}

    אנא תן ציון מדויק באחוזים לתשובות של התלמידה והסבר את הציון. אם התשובות של התלמידה נכונות, גם אם הן שונות מהתשובות של המורה, אנא ציין זאת כ"נכון",  והסבר שהן כוללות את המידע הבסיסי הנדרש. 
    אם התשובות נכונות אך חסרות פרטים זניחים , יש לציין זאת, אך לא להוריד ציונים  .
    אם יש בהן חלק שגוי לחלוטין אז יש להוריד בציון
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
# def grade():
#     data = request.json
#     student_exam_path = data.get('student_exam_path')
#     teacher_exam_path = data.get('teacher_exam_path')
    
#     if not student_exam_path or not teacher_exam_path:
#         return jsonify({"error": "Both student_exam_path and teacher_exam_path are required."}), 400
    
#     # קריאת תוכן הקבצים
#     try:
#         with open(student_exam_path, 'r', encoding='utf-8') as student_file:
#             student_exam = student_file.read()

#         with open(teacher_exam_path, 'r', encoding='utf-8') as teacher_file:
#             teacher_exam = teacher_file.read()
#     except Exception as e:
#         return jsonify({"error": str(e)}), 400

#     grade_result = grade_exam(student_exam, teacher_exam)
#     response = jsonify({"grade": grade_result})
#     return response
def grade():
    data = request.json
    # שינוי מהשורות הבאות: 
    student_exam_image = data.get('student_exam_image')  # שינוי
    teacher_exam_image = data.get('teacher_exam_image')  # שינוי
    language = request.args.get('language', 'eng')  # שורה נוספה

    if not student_exam_image or not teacher_exam_image:
        return jsonify({"error": "Both student_exam_image and teacher_exam_image are required."}), 400

    try:
        # קריאת תוכן התמונה באמצעות pytesseract
        student_exam = pytesseract.image_to_string(Image.open(io.BytesIO(student_exam_image)), lang=language)  # שינוי
        teacher_exam = pytesseract.image_to_string(Image.open(io.BytesIO(teacher_exam_image)), lang=language)  # שינוי
    except Exception as e:
        return jsonify({"error": str(e)}), 400

    grade_result = grade_exam(student_exam, teacher_exam)
    response = jsonify({"grade": grade_result})
    return response
if __name__ == '__main__':
    app.run(debug=True)