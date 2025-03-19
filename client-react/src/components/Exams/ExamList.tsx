// import React, { useState } from 'react';
// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Paper,
//     Typography,
//     Button,
//     IconButton,
//     Menu,
//     MenuItem,
//     CircularProgress
// } from '@mui/material';
// import UploadIcon from '@mui/icons-material/Upload';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import * as pdfjsLib from "pdfjs-dist";
//     // import "pdfjs-dist/build/pdf.worker.entry";
// const data = [
//     { name: 'תשובון 89-ocr.pdf', type: 'PDF', sharing: 'Shared', modified: '2025-03-10', url: 'https://example.com/file1.pdf' },
//     { name: 'תשובון 90-ocr.pdf', type: 'PDF', sharing: 'Shared', modified: '2025-03-11', url: 'https://example.com/file2.pdf' },
//     { name: 'תשובון 91-ocr.pdf', type: 'PDF', sharing: 'Private', modified: '2025-03-12', url: 'https://example.com/file3.pdf' },
// ];

// const SERVER_URL = "http://127.0.0.1:5000/grade"; // עדכן לפי כתובת השרת

// const ExamList = () => {
//     const [anchorEl, setAnchorEl] = useState(null);
//     const [selectedRow, setSelectedRow] = useState(null);
//     const [result, setResult] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     const handleMenuClick = (event, row) => {
//         setAnchorEl(event.currentTarget);
//         setSelectedRow(row);
//     };

//     const handleMenuClose = () => {
//         setAnchorEl(null);
//         setSelectedRow(null);
//     };

//     const handleDelete = () => {
//         console.log(`Deleted: ${selectedRow.name}`);
//         handleMenuClose();
//     };

//     const handleDownload = () => {
//         if (selectedRow && selectedRow.url) {
//             const link = document.createElement('a');
//             link.href = selectedRow.url;
//             link.download = selectedRow.name;
//             document.body.appendChild(link);
//             link.click();
//             document.body.removeChild(link);
//         }
//         handleMenuClose();
//     };

    
    
//     const handleCheckExam = async (row) => {
//         setLoading(true);
//         setResult(null);
//         setError(null);
    
//         try {
//             // 1️⃣ הורדת ה-PDF כ-Blob
//             const response = await fetch(row.url);
//             const pdfBlob = await response.blob();
    
//             // 2️⃣ קריאת ה-PDF באמצעות pdf.js
//             const pdfData = new Uint8Array(await pdfBlob.arrayBuffer());
//             const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
    
//             const formData = new FormData();
            
//             // 3️⃣ מעבר על כל העמודים והמרתם לתמונות
//             for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
//                 const page = await pdf.getPage(pageNum);
//                 const scale = 2; // קנה מידה גבוה יותר לרזולוציה טובה
//                 const viewport = page.getViewport({ scale });
    
//                 const canvas = document.createElement("canvas");
//                 const context = canvas.getContext("2d");
//                 canvas.width = viewport.width;
//                 canvas.height = viewport.height;
    
//                 await page.render({ canvasContext: context, viewport }).promise;
    
//                 // 4️⃣ המרת ה-Canvas ל-BLOB
//                 const imageBlob = await new Promise((resolve) => {
//                     canvas.toBlob(resolve, "image/jpeg", 0.9);
//                 });
    
//                 // 5️⃣ הוספת כל תמונה ל-FormData
//                 formData.append("student_exam_images", imageBlob, `${row.name}_page${pageNum}.jpg`);
//             }
    
//             // 6️⃣ שליחת כל התמונות לשרת
//             const serverResponse = await fetch(SERVER_URL, {
//                 method: "POST",
//                 body: formData,
//             });
    
//             const resultData = await serverResponse.json();
//             setResult(resultData.grade);
//         } catch (error) {
//             console.error("Error checking exam:", error);
//             setError("Failed to check exam. Please try again.");
//         } finally {
//             setLoading(false);
//         }
//     };
    

//     return (
//         <>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
//                 <Typography variant="h6" gutterBottom>
//                     Your Exams
//                 </Typography>
//                 <Button
//                     variant="outlined"
//                     style={{
//                         marginLeft: 'auto',
//                         borderRadius: '20px',
//                         fontWeight: 'bold',
//                         color: '#3f51b5',
//                         backgroundColor: 'white',
//                         border: '1px solid #3f51b5',
//                         boxShadow: 'none'
//                     }}
//                     startIcon={<UploadIcon />}
//                 >
//                     Upload File
//                 </Button>
//             </div>
//             <TableContainer component={Paper} style={{ boxShadow: 'none', borderRadius: '8px', backgroundColor: '#f9f9f9', width: '100%' }}>
//                 <Table style={{ borderCollapse: 'collapse' }}>
//                     <TableHead>
//                         <TableRow>
//                             <TableCell style={{ fontWeight: "bold", backgroundColor: '#f0f0f0' }}>Document Name</TableCell>
//                             <TableCell style={{ fontWeight: "bold", backgroundColor: '#f0f0f0' }}>Type</TableCell>
//                             <TableCell style={{ fontWeight: "bold", backgroundColor: '#f0f0f0' }}>Sharing</TableCell>
//                             <TableCell style={{ fontWeight: "bold", backgroundColor: '#f0f0f0' }}>Modified</TableCell>
//                             <TableCell style={{ fontWeight: "bold", backgroundColor: '#f0f0f0' }}>Actions</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {data.map((row, index) => (
//                             <TableRow key={index} sx={{ '&:hover': { backgroundColor: '#e3e3e3' } }}>
//                                 <TableCell>{row.name}</TableCell>
//                                 <TableCell>{row.type}</TableCell>
//                                 <TableCell>{row.sharing}</TableCell>
//                                 <TableCell>{row.modified}</TableCell>
//                                 <TableCell>
//                                     <Button
//                                         variant="contained"
//                                         color="primary"
//                                         onClick={() => handleCheckExam(row)}
//                                         style={{ marginRight: "10px" }}
//                                     >
//                                         Check Exam
//                                     </Button>
//                                     <IconButton onClick={(event) => handleMenuClick(event, row)}>
//                                         <MoreVertIcon />
//                                     </IconButton>
//                                 </TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
            
//             {/* תפריט האפשרויות */}
//             <Menu
//                 anchorEl={anchorEl}
//                 open={Boolean(anchorEl)}
//                 onClose={handleMenuClose}
//             >
//                 <MenuItem onClick={handleDownload}>Download</MenuItem>
//                 <MenuItem onClick={handleDelete}>Delete</MenuItem>
//             </Menu>

//             {/* Spinner בזמן טעינה */}
//             {loading && (
//                 <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
//                     <CircularProgress />
//                 </div>
//             )}

//             {/* תוצאה מעוצבת */}
//             {result && !loading && (
//                 <div style={{
//                     marginTop: "20px",
//                     padding: "15px",
//                     backgroundColor: "#e8f5e9",
//                     border: "1px solid #4caf50",
//                     borderRadius: "5px",
//                     textAlign: "center",
//                     color: "#2e7d32",
//                     fontWeight: "bold"
//                 }}>
//                     Grade Result: {result}
//                 </div>
//             )}

//             {/* הודעת שגיאה */}
//             {error && (
//                 <div style={{
//                     marginTop: "20px",
//                     padding: "15px",
//                     backgroundColor: "#ffebee",
//                     border: "1px solid #d32f2f",
//                     borderRadius: "5px",
//                     textAlign: "center",
//                     color: "#d32f2f",
//                     fontWeight: "bold"
//                 }}>
//                     {error}
//                 </div>
//             )}
//         </>
//     );
// };

// export default ExamList;






















// import React, { useContext, useState } from 'react';
// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Paper,
//     Typography,
//     Button,
// } from '@mui/material';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import FolderIcon from '@mui/icons-material/Folder';
// import { ExamFileType, ExamFolderType, ExamType } from '../../models/Exam';
// import { useNavigate } from 'react-router-dom';
// import useModal from '../../hooks/useModal';
// import ModalWrapper from '../ModalWrapper';
// import FileMenu from '../FileMenu';
// import ActionButtons from '../ActionButtons';
// import { UserContext } from '../../context/UserReducer';

// const initialData: (ExamFileType | ExamFolderType)[] = [
//     {
//         id: 1,
//         folderName: "Folder 1",
//         type: 'folder',
//         children: [
//             {
//                 id: 2,
//                 userId: 1,
//                 examName: "Math Exam",
//                 topicName: "Algebra",
//                 sharing: true,
//                 modified: "2023-10-01",
//                 teacherId: 1,
//                 examPath: "C:\\Users\\user1\\Desktop\\ציפי לימודים שנה ב\\מבחנים לניסוי\\a.png",
//                 parentId: 1,
//                 type: 'file',
//             },
//             {
//                 id: 3,
//                 folderName: "Subfolder 1",
//                 type: 'folder',
//                 parentId: 1,
//                 children: [],
//             },
//         ],
//     },
//     {
//         id: 4,
//         folderName: "Folder 2",
//         type: 'folder',
//         children: [],
//     },
//     {
//         id: 5,
//         userId: 1,
//         examName: "Math Exam",
//         topicName: "Algebra",
//         sharing: true,
//         modified: "2023-10-01",
//         teacherId: 1,
//         examPath: "C:\\Users\\user1\\Desktop\\ציפי לימודים שנה ב\\מבחנים לניסוי\\a.png",
//         parentId: 1,
//         type: 'file',
//     },
// ];

// const ExamList: React.FC = () => {
//     const [data, setData] = useState(initialData); // מצב לאחסון הנתונים
//     const [openFolderId, setOpenFolderId] = useState<number | null>(null);
//     const {user}= useContext(UserContext)
//     const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
//     const [selectedRow, setSelectedRow] = React.useState<number | null>(null);
//     const { isOpen, openModal, closeModal, modalData } = useModal();
//     const navigate = useNavigate();

//     const handleFolderClick = (folderId: number) => {
//         setOpenFolderId(openFolderId === folderId ? null : folderId);
//     };

//     const handleMenuClick = (event: React.MouseEvent<HTMLElement>, index: number) => {
//         setAnchorEl(event.currentTarget);
//         setSelectedRow(index);
//     };

//     const handleMenuClose = () => {
//         setAnchorEl(null);
//         setSelectedRow(null);
//     };

//     return (
//         <>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
//                 <Typography variant="h6" gutterBottom>
//                     Your Exams
//                 </Typography>
//                 <ActionButtons data={data} setData={setData} openModal={openModal} modalData={modalData} />
//             </div>
//             <TableContainer component={Paper} style={{ boxShadow: 'none' }}>
//                 <Table>
//                     <TableHead>
//                         <TableRow>
//                             <TableCell style={{ border: 'none', color: 'rgb(110, 110, 110)', fontWeight: "bold" }}></TableCell>
//                             <TableCell style={{ border: 'none', color: 'rgb(110, 110, 110)', fontWeight: "bold" }}>Exam Name</TableCell>
//                             <TableCell style={{ border: 'none', color: 'rgb(110, 110, 110)', fontWeight: "bold" }}></TableCell>
//                             <TableCell style={{ border: 'none', color: 'rgb(110, 110, 110)', fontWeight: "bold" }}>Modified</TableCell>
//                             <TableCell style={{ border: 'none', color: 'rgb(110, 110, 110)', fontWeight: "bold" }}>Actions</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody style={{ border: '1px solid #e0e0e0' }}>
//                         {data.map((row, index) => (
//                             <TableRow key={index} sx={{ '&:hover': { backgroundColor: '#f0f0f0' } }}>
//                                 <TableCell sx={{ color: 'rgb(75, 75, 75)' }}>
//                                     {row.type === 'folder' ? (
//                                         <FolderIcon
//                                             style={{ color: 'rgb(144, 144, 144)', fontSize: '24px', cursor: 'pointer' }}
//                                             onClick={() => handleFolderClick(row.id)}
//                                         />
//                                     ) : (
//                                         <img
//                                             src="/a.png"
//                                             alt={row.examName}
//                                             style={{ width: '50px', height: 'auto', marginRight: '8px', cursor: 'pointer' }}
//                                             onClick={() => window.open("/a.png", "_blank")}
//                                         />
//                                     )}
//                                 </TableCell>
//                                 <TableCell sx={{ color: 'rgb(75, 75, 75)', alignItems: 'center' }}>
//                                     {/* {row.examName} */}
                                    
//                                 </TableCell>
//                                 <TableCell sx={{ color: 'rgb(75, 75, 75)' }}>{row.sharing}</TableCell>
//                                 <TableCell sx={{ color: 'rgb(75, 75, 75)' }}>{row.modified}</TableCell>
//                                 <TableCell>
//                                     <Button
//                                         variant="outlined"
//                                         onClick={() => navigate('/exams/students-exams', { state:"C:\Users\\user1\Desktop\תמונות תמר\DSC_9651.JPG" })}
//                                     >
//                                         view students exams
//                                     </Button>
//                                     <Button
//                                         onClick={(event) => handleMenuClick(event, index)}
//                                         sx={{ marginLeft: 1 }}
//                                     >
//                                         <MoreVertIcon />
//                                     </Button>
//                                     <FileMenu
//                                         anchorEl={anchorEl}
//                                         selectedRow={selectedRow}
//                                         handleMenuClose={handleMenuClose}
//                                         examPath={row.examPath}
//                                         examName={row.examName}
//                                         openModal={openModal}
//                                     />
//                                 </TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//             <ModalWrapper
//                 open={isOpen}
//                 handleClose={closeModal}
//                 title={modalData?.title || ''}
//                 onConfirm={modalData?.onConfirm}
//                 confirmText={modalData?.confirmText}
//                 initialName={modalData?.initialName}
//                 setNewName={modalData?.setNewName || (() => {})}
//             >
//                 {modalData?.children}
//             </ModalWrapper>
//             {openFolderId !== null && (
//                 <div>
//                     {data.find(item => item.id === openFolderId)?.children.map((file, index) => (
//                         <div key={index}>
//                             <Typography>{file.examName || file.folderName}</Typography>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </>
//     );
// };

// export default ExamList;
import React from 'react';
import { Typography, Paper } from '@mui/material';
import ExamTable from './ExamTable';
import FileUpload from './FileUpLoad';
import { useExamContext } from '../../context/ExamContext';

const ExamList: React.FC = () => {
    const { data, setData } = useExamContext();

    return (
        <Paper sx={{ padding: '16px' }}>
            <Typography variant="h6">Your Exams</Typography>
            <FileUpload />
            <ExamTable data={data} />
        </Paper>
    );
};

export default ExamList;
