import { useState } from 'react';
import axios from 'axios';

interface UseGradeExamResult {
    gradeExam: (studentExamImage: string, teacherExamImage: string,studentEmail:string) => Promise<void>;
    loading: boolean;
    error: string | null;
    grade: string | null;
    evaluation: string | null; // הוספת הערכה
}

const useGradeExam = (): UseGradeExamResult => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [grade, setGrade] = useState<string | null>(null);
    const [evaluation, setEvaluation] = useState<string | null>(null); // הוספת state להערכה

    const gradeExam = async (studentExamImage: string, teacherExamImage: string, studentEmail: string): Promise<void> => {
        setLoading(true);
        setError(null); 
        console.log("1"+studentExamImage) ;
        console.log("2"+teacherExamImage) ;
        
        try {
            const response = await axios.post('http://localhost:5000/grade', {
                student_exam_url: studentExamImage,
                teacher_exam_url: teacherExamImage,
                student_email: studentEmail, 
            });
    
          
            setGrade(response.data.grade); 
            setEvaluation(response.data.evaluation); // שמירת ההערכה
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError(error.message);
                console.error('Error during submission:', error.message);
            } else {
                setError('Unexpected error occurred');
                console.error('Unexpected error:', error);
            }
        } finally {
            setLoading(false);
        }
    };
    
    return { gradeExam, loading, error, grade, evaluation };
};

export default useGradeExam;
