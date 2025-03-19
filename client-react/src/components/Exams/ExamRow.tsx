import React from 'react';
import { TableRow, TableCell } from '@mui/material';
import FolderRow from './FolderRow';
import FileRow from './FileRow';
import { ExamFileType, ExamFolderType } from '../../models/Exam';

interface ExamRowProps {
    row: ExamFileType | ExamFolderType;
}

const ExamRow: React.FC<ExamRowProps> = ({ row }) => {
    return row.type === 'folder' ? <FolderRow folder={row} /> : <FileRow file={row} />;
};

export default ExamRow;
