import React from 'react';
import { TableRow, TableCell } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import { ExamFolderType } from '../../models/Exam';

interface FolderRowProps {
    folder: ExamFolderType;
}

const FolderRow: React.FC<FolderRowProps> = ({ folder }) => {
    return (
        <TableRow>
            <TableCell>
                <FolderIcon />
            </TableCell>
            <TableCell>{folder.folderName}</TableCell>
            <TableCell>{folder.parentId}</TableCell>
            <TableCell>-</TableCell>
        </TableRow>
    );
};

export default FolderRow;
