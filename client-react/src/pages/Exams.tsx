import React, { JSX, useState } from 'react';
import {
    Drawer,
    List,
    ListItemButton,
    ListItemText,
    Collapse,
    Divider,
    ListSubheader,
    Box,
    Typography
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import ExamList from '../components/Exams/ExamList';
import { Outlet } from 'react-router-dom';

const MyExams = () => <ExamList/>
const SharedByYou = () => <Typography>Shared by You Content</Typography>;
const OtherExams = () => <Typography>Other Exams Content</Typography>;
const MyAssignments = () => <Typography>My Assignments Content</Typography>;
const SharedAssignments = () => <Typography>Shared Assignments Content</Typography>;
const OtherAssignments = () => <Typography>Other Assignments Content</Typography>;

const Exams = () => {
    const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({});
    const [currentComponent, setCurrentComponent] = useState<JSX.Element | null>(null);

    const handleClick = (section: string) => {
        setOpenSections((prevOpenSections) => ({
            ...prevOpenSections,
            [section]: !prevOpenSections[section],
        }));
    };

    const handleComponentChange = (component: JSX.Element | null) => {
        setCurrentComponent(component);
    };

    return (
        <Box display="flex" height="70vh" >
            <Drawer variant="permanent" anchor="left">
                <List
                    component="nav"
                    sx={{ marginTop: '64px' }}
                >
                    <ListItemButton onClick={() => {
                        handleClick('exams');
                        handleComponentChange(null); // Reset component when opening section
                    }}>
                        <ListItemText primary="Exams" />
                        {openSections['exams'] ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={openSections['exams']} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton onClick={() => handleComponentChange(<MyExams />)}>
                                <ListItemText primary="My Exams" />
                            </ListItemButton>
                            <ListItemButton onClick={() => handleComponentChange(<SharedByYou />)}>
                                <ListItemText primary="Shared by You" />
                            </ListItemButton>
                            <ListItemButton onClick={() => handleComponentChange(<OtherExams />)}>
                                <ListItemText primary="Other Exams" />
                            </ListItemButton>
                        </List>
                    </Collapse>
                    <Divider />
                    <ListItemButton onClick={() => {
                        handleClick('assignments');
                        handleComponentChange(null); 
                    }}>
                        <ListItemText primary="Assignments" />
                        {openSections['assignments'] ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={openSections['assignments']} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton onClick={() => handleComponentChange(<MyAssignments />)}>
                                <ListItemText primary="My Assignments" />
                            </ListItemButton>
                            <ListItemButton onClick={() => handleComponentChange(<SharedAssignments />)}>
                                <ListItemText primary="Shared Assignments" />
                            </ListItemButton>
                            <ListItemButton onClick={() => handleComponentChange(<OtherAssignments />)}>
                                <ListItemText primary="Other Assignments" />
                            </ListItemButton>
                        </List>
                    </Collapse>
                    <Divider />
                </List>
            </Drawer>
            <Box flexGrow={1}  sx={{width:"60vw"}} >
                 <Outlet />
            </Box>
        </Box>
    );
};

export default Exams;
// import React, { JSX, useState } from 'react';
// import {
//     Drawer,
//     List,
//     ListItemButton,
//     ListItemText,
//     Collapse,
//     Divider,
//     Box,
//     Typography
// } from '@mui/material';
// import { ExpandLess, ExpandMore } from '@mui/icons-material';
// import ExamList from '../components/Exams/ExamList';
// import { Outlet } from 'react-router-dom';

// const MyExams = () => <ExamList />;
// const SharedByYou = () => <Typography>Shared by You Content</Typography>;
// const OtherExams = () => <Typography>Other Exams Content</Typography>;
// const MyAssignments = () => <Typography>My Assignments Content</Typography>;
// const SharedAssignments = () => <Typography>Shared Assignments Content</Typography>;
// const OtherAssignments = () => <Typography>Other Assignments Content</Typography>;

// const Exams = () => {
//     const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({});
//     const [currentComponent, setCurrentComponent] = useState<JSX.Element | null>(null);

//     const handleClick = (section: string) => {
//         setOpenSections((prevOpenSections) => ({
//             ...prevOpenSections,
//             [section]: !prevOpenSections[section],
//         }));
//     };

//     const handleComponentChange = (component: JSX.Element | null) => {
//         setCurrentComponent(component);
//     };

//     return (
//         <Box display="flex" height="100vh">
//             <Drawer variant="permanent" anchor="left" sx={{ width: '240px', flexShrink: 0 }}>
//                 <List component="nav" sx={{ marginTop: '64px' }}>
//                     <ListItemButton onClick={() => {
//                         handleClick('exams');
//                         handleComponentChange(null); // Reset component when opening section
//                     }}>
//                         <ListItemText primary="Exams" />
//                         {openSections['exams'] ? <ExpandLess /> : <ExpandMore />}
//                     </ListItemButton>
//                     <Collapse in={openSections['exams']} timeout="auto" unmountOnExit>
//                         <List component="div" disablePadding>
//                             <ListItemButton onClick={() => handleComponentChange(<MyExams />)}>
//                                 <ListItemText primary="My Exams" />
//                             </ListItemButton>
//                             <ListItemButton onClick={() => handleComponentChange(<SharedByYou />)}>
//                                 <ListItemText primary="Shared by You" />
//                             </ListItemButton>
//                             <ListItemButton onClick={() => handleComponentChange(<OtherExams />)}>
//                                 <ListItemText primary="Other Exams" />
//                             </ListItemButton>
//                         </List>
//                     </Collapse>
//                     <Divider />
//                     <ListItemButton onClick={() => {
//                         handleClick('assignments');
//                         handleComponentChange(null); 
//                     }}>
//                         <ListItemText primary="Assignments" />
//                         {openSections['assignments'] ? <ExpandLess /> : <ExpandMore />}
//                     </ListItemButton>
//                     <Collapse in={openSections['assignments']} timeout="auto" unmountOnExit>
//                         <List component="div" disablePadding>
//                             <ListItemButton onClick={() => handleComponentChange(<MyAssignments />)}>
//                                 <ListItemText primary="My Assignments" />
//                             </ListItemButton>
//                             <ListItemButton onClick={() => handleComponentChange(<SharedAssignments />)}>
//                                 <ListItemText primary="Shared Assignments" />
//                             </ListItemButton>
//                             <ListItemButton onClick={() => handleComponentChange(<OtherAssignments />)}>
//                                 <ListItemText primary="Other Assignments" />
//                             </ListItemButton>
//                         </List>
//                     </Collapse>
//                     <Divider />
//                 </List>
//             </Drawer>
//             <Box flexGrow={1} sx={{ padding: '20px', overflowY: 'auto' }}>
//                 {currentComponent || <Outlet />}
//             </Box>
//         </Box>
//     );
// };

// export default Exams;
