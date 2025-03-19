import { useContext, useState } from 'react';
// import { storage } from '../firebase';
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Button, MenuItem, Select, TextField } from '@mui/material';
import { UserContext } from '../../context/UserReducer';
import { useExamContext } from '../../context/ExamContext';
import { ExamFileType } from '../../models/Exam';

const FileUpload = () => {
    const { user } = useContext(UserContext);
    const { data, setData } = useExamContext();

    const [file, setFile] = useState<File | null>(null);
    const [selectedTopic, setSelectedTopic] = useState<string>('');
    const [selectedFolderId, setSelectedFolderId] = useState<number | undefined>(undefined);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setFile(event.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) return;
        
        // const fileRef = ref(storage, `exams/${file.name}`);
        // await uploadBytes(fileRef, file);
        // const url = await getDownloadURL(fileRef);

        
        const newExam: ExamFileType = {
            id: Date.now(), 
            userId: user.id,
            examName: file.name, 
            topicName: selectedTopic, 
            sharing: false, 
            modified: new Date().toISOString(),
            teacherId: user.id, 
            examPath: 'url', 
            type: 'file', 
            parentId: selectedFolderId 
        };
        
        setData([...data, newExam]);
        setFile(null); // 🔹 לנקות את הבחירה אחרי ההעלאה
    };

    return (
        <div>
            {/* העלאת קובץ */}
            <input type="file" onChange={handleFileChange} style={{ display: 'none' }} id="file-upload" />
            <Button variant="contained" onClick={() => document.getElementById('file-upload')?.click()}>
                Select File
            </Button>

            {/* בחירת נושא */}
            <TextField
                label="Topic"
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                style={{ marginLeft: 10 }}
            />

            {/* בחירת תיקיית יעד */}
            <Select
                value={selectedFolderId || ''}
                onChange={(e) => setSelectedFolderId(Number(e.target.value))}
                displayEmpty
                style={{ marginLeft: 10 }}
            >
                <MenuItem value="">No Folder</MenuItem>
                {data
                    .filter(item => item.type === 'folder')
                    .map(folder => (
                        <MenuItem key={folder.id} value={folder.id}>
                            {folder.id}
                        </MenuItem>
                    ))}
            </Select>

            {/* העלאת קובץ */}
            <Button variant="contained" onClick={handleUpload} style={{ marginLeft: 10 }}>
                Upload File
            </Button>
        </div>
    );
};

export default FileUpload;
