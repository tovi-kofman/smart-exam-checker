import { Box, Button, Modal, TextField } from "@mui/material";
import { FormEvent, forwardRef, useContext, useImperativeHandle, useRef } from "react";
import { UserContext } from "../../context/UserReducer";
import { UserType } from "../../models/User";

interface UserModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: Partial<UserType>) => void;
    initialData?: Partial<UserType>;
    title: string;
    type: 'login' | 'register' | 'update';
}

const AuthModal = forwardRef(({ open, onClose, onSubmit, initialData = { firstName: '', lastName: '', email: '', password: '', address: '', phoneNumber: '' }, title, type }: UserModalProps, ref) => {
    const { user } = useContext(UserContext);
    const inputRefs = useRef<{ [key: string | number]: HTMLInputElement | null }>({
        firstName: null,
        lastName: null,
        email: null,
        password: null,
        address: null,
        phoneNumber: null
    });

    useImperativeHandle(ref, () => ({
        reset: () => {
            Object.keys(inputRefs.current).forEach((key) => {
                if (inputRefs.current[key]) {
                    inputRefs.current[key]!.value = '';
                }
            });
        },
    }));

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit({
            firstName: inputRefs.current.firstName?.value || '',
            lastName: inputRefs.current.lastName?.value || '',
            email: inputRefs.current.email?.value || '',
            password: inputRefs.current.password?.value || '',
            address: inputRefs.current.address?.value || '',
            phoneNumber: inputRefs.current.phoneNumber?.value || ''
        });
        onClose();
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    padding: 2,
                    bgcolor: 'white',
                    borderRadius: 2,
                    boxShadow: 3,
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '400px',
                    maxWidth: '90%',
                }}
            >
                <h2>{title}</h2>
                <form onSubmit={handleSubmit}>

                    <>
                        <TextField
                            label="First Name"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            required
                            defaultValue={user.firstName}
                            inputRef={(el) => (inputRefs.current.firstName = el)}
                        />
                        {/* <TextField 
                                label="Last Name" 
                                variant="outlined" 
                                fullWidth 
                                margin="normal" 
                                required 
                                defaultValue={user.lastName} 
                                inputRef={(el) => (inputRefs.current.lastName = el)} 
                            /> */}
                    </>

                    
                    <TextField
                        label="Password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        required
                        inputRef={(el) => (inputRefs.current.password = el)}
                        defaultValue={user.password}
                    />
                    {type === 'update' && (
                        <>
                        <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        required
                        type="email"
                        defaultValue={user.email}
                        inputRef={(el) => (inputRefs.current.email = el)}
                    />
                            <TextField
                                label="Address"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                required
                                defaultValue={initialData.address}
                                inputRef={(el) => (inputRefs.current.address = el)}
                            />
                            <TextField
                                label="Phone"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                required
                                defaultValue={user.phoneNumber}
                                inputRef={(el) => (inputRefs.current.phoneNumber = el)}
                            />
                        </>
                    )}
                    <Button type="submit" variant="contained" color="primary">Submit</Button>
                </form>
            </Box>
        </Modal>
    );
});

export default AuthModal;
