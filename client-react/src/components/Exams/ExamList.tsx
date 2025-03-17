import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Button,
    Menu,
    MenuItem
} from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';

const data = [
    { name: 'תשובון 89-ocr.pdf', type: 'PDF', sharing: 'Shared', modified: '2025-03-10' },
    { name: 'תשובון 90-ocr.pdf', type: 'PDF', sharing: 'Shared', modified: '2025-03-11' },
    { name: 'תשובון 91-ocr.pdf', type: 'PDF', sharing: 'Private', modified: '2025-03-12' },
];

const ExamList = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);

    const handleMenuClick = (event, row) => {
        setAnchorEl(event.currentTarget);
        setSelectedRow(row);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleDelete = () => {
        console.log(`Deleting row: ${selectedRow.name}`);
        handleMenuClose();
    };

    const handleDownload = (url) => {
        const link = document.createElement('a');
        link.href = url;
        link.download = selectedRow.name; // שם הקובץ להורדה
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        handleMenuClose();
    };

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <Typography variant="h6" gutterBottom>
                    Your Exams
                </Typography>
                <Button
                    variant="outlined"
                    style={{
                        marginLeft: 'auto',
                        borderRadius: '20px',
                        fontWeight: 'bold',
                        color: '#3f51b5',
                        backgroundColor: 'white',
                        border: '1px solid #3f51b5',
                        boxShadow: 'none'
                    }}
                    startIcon={<UploadIcon />}
                >
                    Upload File
                </Button>
            </div>
            <TableContainer component={Paper} style={{ boxShadow: 'none', borderRadius: '8px', backgroundColor: '#f9f9f9', width: '100%' }}>
                <Table style={{ borderCollapse: 'collapse' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ border: '1px solid #e0e0e0', backgroundColor: '#f0f0f0', fontWeight: "bold" }}>Document Name</TableCell>
                            <TableCell style={{ border: '1px solid #e0e0e0', backgroundColor: '#f0f0f0', fontWeight: "bold" }}>Type</TableCell>
                            <TableCell style={{ border: '1px solid #e0e0e0', backgroundColor: '#f0f0f0', fontWeight: "bold" }}>Sharing</TableCell>
                            <TableCell style={{ border: '1px solid #e0e0e0', backgroundColor: '#f0f0f0', fontWeight: "bold" }}>Modified</TableCell>
                            <TableCell style={{ border: '1px solid #e0e0e0', backgroundColor: '#f0f0f0', fontWeight: "bold" }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, index) => (
                            <TableRow key={index} sx={{ '&:hover': { backgroundColor: '#e3e3e3' } }}>
                                <TableCell sx={{ border: '1px solid #e0e0e0', color: '#555' }}>{row.name}</TableCell>
                                <TableCell sx={{ border: '1px solid #e0e0e0', color: '#555' }}>{row.type}</TableCell>
                                <TableCell sx={{ border: '1px solid #e0e0e0', color: '#555' }}>{row.sharing}</TableCell>
                                <TableCell sx={{ border: '1px solid #e0e0e0', color: '#555' }}>{row.modified}</TableCell>
                                <TableCell sx={{ border: '1px solid #e0e0e0', color: '#555' }}>
                                    <Button onClick={(event) => handleMenuClick(event, row)}>Menu</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleDelete}>Delete</MenuItem>
                <MenuItem onClick={() => handleDownload('http://example.com/' + selectedRow?.name)}>Download</MenuItem>
            </Menu>
        </>
    );
};

export default ExamList;
