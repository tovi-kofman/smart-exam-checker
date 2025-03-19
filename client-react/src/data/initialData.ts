import { ExamFileType, ExamFolderType } from '../models/Exam';

const initialData: (ExamFileType | ExamFolderType)[] = [
    {
        id: 1, // 🔹 id כ- number לפי המודל שלך
        userId: 123, // 🔹 הוספת userId
        examName: "Math Exam", // 🔹 שינוי `name` ל-`examName`
        topicName: "Algebra", // 🔹 שדה נוסף
        sharing: true, // 🔹 אם השדה הזה בשימוש
        modified: new Date().toISOString(), // 🔹 עדכון `modified`
        teacherId: 456, // 🔹 שדה teacherId
        examPath: "/path/to/exam.pdf", // 🔹 שינוי `url` ל-`examPath`
        type: "file", // 🔹 לוודא שסוג הנתון תואם
        parentId: undefined, // 🔹 אם אין תיקייה אב
    },
    {
        id: 2, // 🔹 תיקייה לדוגמה
        folderName: "Physics Exams", // 🔹 שם התיקייה
        type: "folder",
        parentId: undefined,
        children: [],
    }
]

export default initialData;
