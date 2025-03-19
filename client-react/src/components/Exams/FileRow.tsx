import React from 'react';
import { TableRow, TableCell, Button } from '@mui/material';
import { ExamFileType } from '../../models/Exam';
import { useNavigate } from 'react-router-dom';

interface FileRowProps {
    file: ExamFileType;
}

const FileRow: React.FC<FileRowProps> = ({ file }) => {
    const navigate = useNavigate();
    return (
        <TableRow>
            <TableCell>{file.examName}</TableCell> {/* 🔹 שינוי `name` ל-`examName` */}
<TableCell>{file.topicName}</TableCell> {/* 🔹 להוסיף אם רלוונטי */}
<TableCell>{file.teacherId}</TableCell> {/* 🔹 להוסיף אם רלוונטי */}
<TableCell>{file.modified}</TableCell>
<TableCell>
    {/* <a href={file.examPath} target="_blank" rel="noopener noreferrer">View</a> 🔹 שינוי `url` ל-`examPath` */}
    <Button
                                        variant="outlined"
                                       onClick={() => navigate('/exams/students-exams', { state:"C:\Users\\user1\Desktop\תמונות תמר\DSC_9651.JPG" })}
                                    >
                                        view students exams                                    </Button>
</TableCell>

            <TableCell>
                <img src="/pdf-icon.png" alt="PDF" style={{ width: '30px' }} />
            </TableCell>
            
        
        </TableRow>
    );
};

export default FileRow;
