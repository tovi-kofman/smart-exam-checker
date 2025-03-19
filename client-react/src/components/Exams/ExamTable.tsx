import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import ExamRow from './ExamRow';
import { ExamFileType, ExamFolderType } from '../../models/Exam';

interface ExamTableProps {
    data: (ExamFileType | ExamFolderType)[];
}

const ExamTable: React.FC<ExamTableProps> = ({ data }) => {
    return (
        <TableContainer component={Paper}>
            <Table>
            <TableHead>
    <TableRow>
        <TableCell>Exam Name</TableCell> {/* 🔹 התאמה לשדה שלך */}
        <TableCell>Topic</TableCell> {/* 🔹 להוסיף אם צריך */}
        <TableCell>Teacher ID</TableCell> {/* 🔹 להוסיף אם צריך */}
        <TableCell>Modified</TableCell>
        <TableCell>Actions</TableCell>
    </TableRow>
</TableHead>

                <TableBody>
                    {data.map((row) => (
                        <ExamRow key={row.id} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ExamTable;
