// import { useContext, useState } from 'react';
// import { UserContext } from '../context/UserReducer';
// import { Box, TextField, Button, Grid, Paper, Typography } from '@mui/material';
// import { UserType } from '../models/User';

// const Profile = () => {
//     const { user, userDispatch } = useContext(UserContext);
//     const [formData, setFormData] = useState<Partial<UserType>>({
//         firstName: user.firstName,
//         lastName: user.lastName,
//         email: user.email,
//         address: user.address,
//         phoneNumber: user.phoneNumber,
//     });
//     const [isEditing, setIsEditing] = useState(true);

//     const handleEdit = () => {
//         setIsEditing(true);
//     };

//     const handleCancel = () => {
//         setFormData({
//             firstName: user.firstName,
//             lastName: user.lastName,
//             email: user.email,
//             address: user.address,
//             phoneNumber: user.phoneNumber,
//         });
//         setIsEditing(false);
//     };

//     const handleSave = () => {
//         userDispatch({ type: 'UPDATE', data: { ...formData } });
//         setIsEditing(false);
//     };

//     return (
//         isEditing && ( // הוספת תנאי כאן
//             <Box 
//                 display="flex" 
//                 justifyContent="flex-start"
//                 alignItems="center" 
//                 height="100vh"
//                 paddingLeft={2}
//                 marginLeft={30}
//             >
//                 <Box display="flex" flexDirection="column" alignItems="flex-start">
//                     <Typography 
//                         variant="h5" 
//                         style={{ 
//                             marginBottom: '20px', 
//                             fontWeight: 'bold',
//                             textAlign: 'left'
//                         }}
//                     >
//                         ACCOUNT PROFILE
//                     </Typography>
//                     <Box display="flex" justifyContent="flex-end" width="100%" marginBottom="20px"> {/* מיקום הכפתור */}
//                         <Button 
//                             variant="text" 
//                             onClick={handleEdit}
//                         >
//                             Edit
//                         </Button>
//                     </Box>
//                     <Paper 
//                         elevation={0} 
//                         style={{ padding: '20px', border: '1px solid lightgray', width: '75%', borderRadius: '0' }} // מסגרת מרובעת
//                     >
//                         <Grid container spacing={2}>
//                             <Grid item xs={6} style={{ paddingLeft: '20px' }}>
//                                 <Typography variant="h6" style={{ textAlign: 'left' }}>First Name</Typography>
//                             </Grid>
//                             <Grid item xs={6}>
//                                 <TextField 
//                                     variant="outlined" 
//                                     fullWidth 
//                                     value={formData.firstName} 
//                                     onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))} 
//                                     InputProps={{
//                                         style: { backgroundColor: '#f0f0f0', borderRadius: '0' }, // הסרת רדיוס
//                                         readOnly: !isEditing,
//                                     }}
//                                 />
//                             </Grid>
//                             <Grid item xs={6} style={{ paddingLeft: '20px' }}>
//                                 <Typography variant="h6" style={{ textAlign: 'left' }}>Last Name</Typography>
//                             </Grid>
//                             <Grid item xs={6}>
//                                 <TextField 
//                                     variant="outlined" 
//                                     fullWidth 
//                                     value={formData.lastName} 
//                                     onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))} 
//                                     InputProps={{
//                                         style: { backgroundColor: '#f0f0f0', borderRadius: '0' }, // הסרת רדיוס
//                                         readOnly: !isEditing,
//                                     }}
//                                 />
//                             </Grid>
//                             <Grid item xs={6} style={{ paddingLeft: '20px' }}>
//                                 <Typography variant="h6" style={{ textAlign: 'left' }}>Email</Typography>
//                             </Grid>
//                             <Grid item xs={6}>
//                                 <TextField 
//                                     variant="outlined" 
//                                     fullWidth 
//                                     value={formData.email} 
//                                     onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))} 
//                                     InputProps={{
//                                         style: { backgroundColor: '#f0f0f0', borderRadius: '0' }, // הסרת רדיוס
//                                         readOnly: !isEditing,
//                                     }}
//                                 />
//                             </Grid>
//                             <Grid item xs={6} style={{ paddingLeft: '20px' }}>
//                                 <Typography variant="h6" style={{ textAlign: 'left' }}>Address</Typography>
//                             </Grid>
//                             <Grid item xs={6}>
//                                 <TextField 
//                                     variant="outlined" 
//                                     fullWidth 
//                                     value={formData.address} 
//                                     onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))} 
//                                     InputProps={{
//                                         style: { backgroundColor: '#f0f0f0', borderRadius: '0' }, // הסרת רדיוס
//                                         readOnly: !isEditing,
//                                     }}
//                                 />
//                             </Grid>
//                             <Grid item xs={6} style={{ paddingLeft: '20px' }}>
//                                 <Typography variant="h6" style={{ textAlign: 'left' }}>Phone Number</Typography>
//                             </Grid>
//                             <Grid item xs={6}>
//                                 <TextField 
//                                     variant="outlined" 
//                                     fullWidth 
//                                     value={formData.phoneNumber} 
//                                     onChange={(e) => setFormData(prev => ({ ...prev, phoneNumber: e.target.value }))} 
//                                     InputProps={{
//                                         style: { backgroundColor: '#f0f0f0', borderRadius: '0' }, // הסרת רדיוס
//                                         readOnly: !isEditing,
//                                     }}
//                                 />
//                             </Grid>
//                         </Grid>
//                         {isEditing && (
//                             <Box display="flex" flexDirection="column" alignItems="flex-end" marginTop={2}>
//                                 <Box display="flex" justifyContent="flex-end" width="100%">
//                                     <Button 
//                                         variant="contained" 
//                                         color="primary" 
//                                         onClick={handleSave}
//                                         style={{ width: '75%', marginBottom: '10px' }} // כפתור רחב
//                                     >
//                                         SAVE DETAILS
//                                     </Button>
//                                     <Button 
//                                         variant="outlined" 
//                                         color="secondary" 
//                                         onClick={handleCancel}
//                                     >
//                                         Cancel
//                                     </Button>
//                                 </Box>
//                             </Box>
//                         )}
//                     </Paper>
//                 </Box>
//             </Box>
//         )
//     );
// }

// export default Profile;




















// import { useContext, useState } from 'react';
// import { UserContext } from '../context/UserReducer';
// import { Container, TextField, Button, Grid, Paper, Typography, Modal, Box } from '@mui/material';
// import { UserType } from '../models/User';

// const Profile = () => {
//     const { user, userDispatch } = useContext(UserContext);
//     const [formData, setFormData] = useState<Partial<UserType>>({
//         firstName: user.firstName,
//         lastName: user.lastName,
//         email: user.email,
//         address: user.address,
//         phoneNumber: user.phoneNumber,
//     });
//     const [isEditing, setIsEditing] = useState(true); // מצב ההתחלה ל-true
//     const [openModal, setOpenModal] = useState(false); // מצב למודאל

//     const handleEdit = () => {
//         setIsEditing(true);
//         setOpenModal(true); // פתח את המודאל
//     };

//     const handleClose = () => {
//         setOpenModal(false); // סגור את המודאל
//         setFormData({
//             firstName: user.firstName,
//             lastName: user.lastName,
//             email: user.email,
//             address: user.address,
//             phoneNumber: user.phoneNumber,
//         });
//         setIsEditing(false);
//     };

//     const handleSave = () => {
//         userDispatch({ type: 'UPDATE', data: { ...formData } });
//         handleClose(); // סגור את המודאל
//     };

//     return (
//         <Container>
//             <Button variant="text" onClick={handleEdit}>
//                 Edit Profile
//             </Button>
//             <Modal open={openModal} onClose={handleClose}>
//                 <Container 
//                     style={{ 
//                         display: 'flex', 
//                         justifyContent: 'center', 
//                         alignItems: 'center', 
//                         height: '100vh', 
//                         padding: '16px' 
//                     }}
//                 >
//                     <Paper 
//                         elevation={3} 
//                         style={{ padding: '20px', width: '75%' }}
//                     >
//                         <Typography variant="h5">ACCOUNT PROFILE</Typography>
//                         <Grid container spacing={2}>
//                             <Grid item xs={6}>
//                                 <TextField 
//                                     label="First Name" 
//                                     variant="outlined" 
//                                     fullWidth 
//                                     value={formData.firstName} 
//                                     onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))} 
//                                     InputProps={{ readOnly: !isEditing }}
//                                 />
//                             </Grid>
//                             <Grid item xs={6}>
//                                 <TextField 
//                                     label="Last Name" 
//                                     variant="outlined" 
//                                     fullWidth 
//                                     value={formData.lastName} 
//                                     onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))} 
//                                     InputProps={{ readOnly: !isEditing }}
//                                 />
//                             </Grid>
//                             <Grid item xs={6}>
//                                 <TextField 
//                                     label="Email" 
//                                     variant="outlined" 
//                                     fullWidth 
//                                     value={formData.email} 
//                                     onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))} 
//                                     InputProps={{ readOnly: !isEditing }}
//                                 />
//                             </Grid>
//                             <Grid item xs={6}>
//                                 <TextField 
//                                     label="Address" 
//                                     variant="outlined" 
//                                     fullWidth 
//                                     value={formData.address} 
//                                     onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))} 
//                                     InputProps={{ readOnly: !isEditing }}
//                                 />
//                             </Grid>
//                             <Grid item xs={6}>
//                                 <TextField 
//                                     label="Phone Number" 
//                                     variant="outlined" 
//                                     fullWidth 
//                                     value={formData.phoneNumber} 
//                                     onChange={(e) => setFormData(prev => ({ ...prev, phoneNumber: e.target.value }))} 
//                                     InputProps={{ readOnly: !isEditing }}
//                                 />
//                             </Grid>
//                         </Grid>
//                         <Box display="flex" justifyContent="flex-end" marginTop={2}>
//                             <Button variant="contained" color="primary" onClick={handleSave}>
//                                 SAVE DETAILS
//                             </Button>
//                             <Button variant="outlined" color="secondary" onClick={handleClose} style={{ marginLeft: '10px' }}>
//                                 Cancel
//                             </Button>
//                         </Box>
//                     </Paper>
//                 </Container>
//             </Modal>
//         </Container>
//     );
// }

// export default Profile;







// import { useContext, useEffect, useState } from 'react';
// import { UserContext } from '../context/UserReducer';
// import { Container, TextField, Button, Grid, Paper, Typography, Modal, Box } from '@mui/material';
// import { UserType } from '../models/User';

// const Profile = () => {
//     const { user, userDispatch } = useContext(UserContext);
//     const [formData, setFormData] = useState<Partial<UserType>>({
//         firstName: user.firstName,
//         lastName: user.lastName,
//         email: user.email,
//         address: user.address,
//         phoneNumber: user.phoneNumber,
//     });
//     const [openModal, setOpenModal] = useState(true); // פתח את המודאל כבר בהתחלה

//     useEffect(() => {
//         // אם יש צורך, ניתן להוסיף לוגיקה נוספת כאן
//     }, []);

//     const handleClose = () => {
//         setOpenModal(false); // סגור את המודאל
//         setFormData({
//             firstName: user.firstName,
//             lastName: user.lastName,
//             email: user.email,
//             address: user.address,
//             phoneNumber: user.phoneNumber,
//         });
//     };

//     const handleSave = () => {
//         userDispatch({ type: 'UPDATE', data: { ...formData } });
//         handleClose(); // סגור את המודאל
//     };

//     return (
//         <Container>
//             <Modal open={openModal} onClose={handleClose}>
//                 <Container 
//                     style={{ 
//                         display: 'flex', 
//                         justifyContent: 'center', 
//                         alignItems: 'center', 
//                         height: '100vh', 
//                         padding: '16px' 
//                     }}
//                 >
//                     <Paper 
//                         elevation={3} 
//                         style={{ padding: '20px', width: '75%' }}
//                     >
//                         <Typography variant="h5">ACCOUNT PROFILE</Typography>
//                         <Grid container spacing={2}>
//                             <Grid item xs={6}>
//                                 <TextField 
//                                     label="First Name" 
//                                     variant="outlined" 
//                                     fullWidth 
//                                     value={formData.firstName} 
//                                     onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))} 
//                                 />
//                             </Grid>
//                             <Grid item xs={6}>
//                                 <TextField 
//                                     label="Last Name" 
//                                     variant="outlined" 
//                                     fullWidth 
//                                     value={formData.lastName} 
//                                     onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))} 
//                                 />
//                             </Grid>
//                             <Grid item xs={6}>
//                                 <TextField 
//                                     label="Email" 
//                                     variant="outlined" 
//                                     fullWidth 
//                                     value={formData.email} 
//                                     onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))} 
//                                 />
//                             </Grid>
//                             <Grid item xs={6}>
//                                 <TextField 
//                                     label="Address" 
//                                     variant="outlined" 
//                                     fullWidth 
//                                     value={formData.address} 
//                                     onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))} 
//                                 />
//                             </Grid>
//                             <Grid item xs={6}>
//                                 <TextField 
//                                     label="Phone Number" 
//                                     variant="outlined" 
//                                     fullWidth 
//                                     value={formData.phoneNumber} 
//                                     onChange={(e) => setFormData(prev => ({ ...prev, phoneNumber: e.target.value }))} 
//                                 />
//                             </Grid>
//                         </Grid>
//                         <Box display="flex" justifyContent="flex-end" marginTop={2}>
//                             <Button variant="contained" color="primary" onClick={handleSave}>
//                                 SAVE DETAILS
//                             </Button>
//                             <Button variant="outlined" color="secondary" onClick={handleClose} style={{ marginLeft: '10px' }}>
//                                 Cancel
//                             </Button>
//                         </Box>
//                     </Paper>
//                 </Container>
//             </Modal>
//         </Container>
//     );
// }

// export default Profile;
















import {useContext, useState } from 'react';
import { UserContext } from '../context/UserReducer';
import { Box, TextField, Button, Grid, Paper, Typography } from '@mui/material';
import { UserType } from '../models/User';

const Profile = () => {
const { user, userDispatch } = useContext(UserContext);
const [formData, setFormData] = useState<Partial<UserType>>({
firstName: user.firstName,
lastName: user.lastName,
email: user.email,
address: user.address,
phoneNumber: user.phoneNumber,
});
const [isEditing, setIsEditing] = useState(false);

const handleEdit = () => {
    setIsEditing(true);
};

const handleCancel = () => {
    setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        address: user.address,
        phoneNumber: user.phoneNumber,
    });
    setIsEditing(false);
};

const handleSave = () => {
    userDispatch({ type: 'UPDATE', data: { ...formData } });
    setIsEditing(false);
};

return (
    <Box 
        display="flex" 
        justifyContent="flex-start"
        alignItems="center" 
        height="100vh"
        paddingLeft={2}
        marginLeft={30}
    >
        <Box display="flex" flexDirection="column" alignItems="flex-start">
            <Typography 
                variant="h5" 
                style={{ 
                    marginBottom: '20px', 
                    fontWeight: 'bold',
                    textAlign: 'left'
                }}
            >
                ACCOUNT PROFILE
            </Typography>
            <Box display="flex" justifyContent="flex-end" width="100%" marginBottom="20px"> {/* מיקום הכפתור */}
                <Button 
                    variant="text" 
                    onClick={handleEdit}
                >
                    Edit
                </Button>
            </Box>
            <Paper 
                elevation={0} 
                style={{ padding: '20px', border: '1px solid lightgray', width: '75%', borderRadius: '0' }} // מסגרת מרובעת
            >
                <Grid container spacing={2}>
                    <Grid item xs={6} style={{ paddingLeft: '20px' }}>
                        <Typography variant="h6" style={{ textAlign: 'left' }}>First Name</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField 
                            variant="outlined" 
                            fullWidth 
                            value={formData.firstName} 
                            onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))} 
                            InputProps={{
                                style: { backgroundColor: '#f0f0f0', borderRadius: '0' }, // הסרת רדיוס
                                readOnly: !isEditing,
                            }}
                        />
                    </Grid>
                    <Grid item xs={6} style={{ paddingLeft: '20px' }}>
                        <Typography variant="h6" style={{ textAlign: 'left' }}>Last Name</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField 
                            variant="outlined" 
                            fullWidth 
                            value={formData.lastName} 
                            onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))} 
                            InputProps={{
                                style: { backgroundColor: '#f0f0f0', borderRadius: '0' }, // הסרת רדיוס
                                readOnly: !isEditing,
                            }}
                        />
                    </Grid>
                    <Grid item xs={6} style={{ paddingLeft: '20px' }}>
                        <Typography variant="h6" style={{ textAlign: 'left' }}>Email</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField 
                            variant="outlined" 
                            fullWidth 
                            value={formData.email} 
                            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))} 
                            InputProps={{
                                style: { backgroundColor: '#f0f0f0', borderRadius: '0' }, // הסרת רדיוס
                                readOnly: !isEditing,
                            }}
                        />
                    </Grid>
                    <Grid item xs={6} style={{ paddingLeft: '20px' }}>
                        <Typography variant="h6" style={{ textAlign: 'left' }}>Address</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField 
                            variant="outlined" 
                            fullWidth 
                            value={formData.address} 
                            onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))} 
                            InputProps={{
                                style: { backgroundColor: '#f0f0f0', borderRadius: '0' }, // הסרת רדיוס
                                readOnly: !isEditing,
                            }}
                        />
                    </Grid>
                    <Grid item xs={6} style={{ paddingLeft: '20px' }}>
                        <Typography variant="h6" style={{ textAlign: 'left' }}>Phone Number</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField 
                            variant="outlined" 
                            fullWidth 
                            value={formData.phoneNumber} 
                            onChange={(e) => setFormData(prev => ({ ...prev, phoneNumber: e.target.value }))} 
                            InputProps={{
                                style: { backgroundColor: '#f0f0f0', borderRadius: '0' }, // הסרת רדיוס
                                readOnly: !isEditing,
                            }}
                        />
                    </Grid>
                </Grid>
                {isEditing && (
                    <Box display="flex" flexDirection="column" alignItems="flex-end" marginTop={2}>
                        <Box display="flex" justifyContent="flex-end" width="100%">
                            <Button 
                                variant="contained" 
                                color="primary" 
                                onClick={handleSave}
                                style={{ width: '75%', marginBottom: '10px' }} // כפתור רחב
                            >
                                SAVE DETAILS
                            </Button>
                            <Button 
                                variant="outlined" 
                                color="secondary" 
                                onClick={handleCancel}
                            >
                                Cancel
                            </Button>
                        </Box>
                    </Box>
                )}
            </Paper>
        </Box>
    </Box>
);
}

export default Profile;