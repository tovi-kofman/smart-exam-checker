import React, { useState } from 'react';

const GradeExam = () => {
    const [studentExamPath, setStudentExamPath] = useState('');
    const [teacherExamPath, setTeacherExamPath] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch('http://127.0.0.1:5000/grade', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    student_exam_path: studentExamPath,
                    teacher_exam_path: teacherExamPath,
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setResult(data.grade);
            setError(null);
        } catch (err) {
            setError(err.message);
            setResult(null);
        }
    };

    return (
        <div>
            <h1>Grade Exam</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Student Exam Path:
                        <input
                            type="text"
                            value={studentExamPath}
                            onChange={(e) => setStudentExamPath(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Teacher Exam Path:
                        <input
                            type="text"
                            value={teacherExamPath}
                            onChange={(e) => setTeacherExamPath(e.target.value)}
                        />
                    </label>
                </div>
                <button type="submit">Submit</button>
            </form>
            {result && <div>Grade: {result}</div>}
            {error && <div>Error: {error}</div>}
        </div>
    );
};

export default GradeExam;