import { useContext, useState } from "react";
import { UserContext } from "../../context/UserReducer";
import { UserType } from "../../models/User";
import AuthService from "../../services/AuthService";
import UserProfile from "../UserProfile";
import AuthModal from "./AuthModal";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { user, userDispatch } = useContext(UserContext)
    const [showUserComponent, setShowUserComponent] = useState(false);
    const [openUserModal, setOpenUserModal] = useState(false);
    const [modalType, setModalType] = useState<'login' | 'register' | 'update'>('login');
    const navigate = useNavigate();
    const handleUserSubmit = async (data:Partial< UserType>, type: 'register' | 'update' | 'login') => {

      try {
        console.log("API URL:", import.meta.env.VITE_API_URL);

        console.log(data)
        let response;
        if (type === 'register') {
        //   response = await axios.post('http://localhost:3000/api/user/register', {
        //     email: data.email,
        //     password: data.password,
        //   });
        response=await AuthService.register(data)
        if(response)
        {
            userDispatch({ type: 'REGISTER', data: { ...data, id: response.user.id } });
            setShowUserComponent(true)
            navigate('/home')
            console.log(response.data)
        }
          
  
        }
         else if (type === 'login') {
        //   response = await axios.post('http://localhost:3000/api/user/login', {
        //     email: data.email,
        //     password: data.password,
        //   });
        response=await AuthService.login(data)
        if(response){
          console.log( response.user)
          const fullName = response.user.username; // לדוגמה: "יוסי כהן"
const spaceIndex = fullName.indexOf(' '); // מוצא את האינדקס של הרווח

const firstName = fullName.substring(0, spaceIndex); // שם פרטי
const lastName = fullName.substring(spaceIndex + 1); // שם משפחה

userDispatch({
    type: 'LOGIN',
    data: {
        ...data,
        firstName: firstName,
        lastName: lastName
    },
});
          setShowUserComponent(true)
          navigate('/home')
          //////////////
          console.log(response.data)
        }
    }
        // else if (type === 'update') {
    //       console.log(user)
    //       response = await axios.put('http://localhost:3000/api/user', {
    //         data: {
    //           firstName: data.firstName,
    //           lastName: data.lastName,
    //           email: data.email,
    //           password: data.password,
    //           address: data.address,
    //           phone: data.phone,
    //           //id:user.id
    //         }
    //       }, { headers: { 'user-id': ''+user.id } });
    //       userDispatch({
    //         type: 'UPDATE', data: {
    //           firstName: data.firstName, lastName: data.lastName, email: data.email, password: data.password, address: data.address, phone: data.phone,
    //         },
    //       });
    //       console.log(response.data.user)
    //     }
    //     setShowUserComponent(true);
    //     setOpenUserModal(false);
      } catch (error: any) {
        if (type === 'register') {
          if (error.response && error.response.data.message) {
            alert(`Registration Error: ${error.response.data.message}`);
          } else {
            console.log(error)
            alert('An error occurred during registration.');
          }
        } else if (type === 'login') {
          if (error.response && error.response.data.message) {
            alert(`Login Error: ${error.response.data.message}`);
          } else {
            alert('An error occurred during login.');
          }
        }
        else if (type === 'update') {
          if (error.response && error.response.data.message) {
            alert(`Update Error: ${error.response.data.message}`);
          } else {
            alert('An error occurred during update.');
          }
      }
      }
    };
  
    // useEffect(() => {
    //     setModalType('register');
    //     setOpenUserModal(true); // פותח את המודל
    // }, []);
    return (
      <>
        <UserContext.Provider value={{ user, userDispatch }}>
       
          <Button style={{
                            backgroundColor: 'transparent',
                            color: 'black',
                            border: 'none',
                            padding: '0',
                            fontSize: 'normal',
                            fontWeight: '545', 
                            cursor: 'pointer',
                            textTransform: 'none',
                            outline: 'none',
                            boxShadow: 'none',
                        }} onClick={() => { setModalType('login'); setOpenUserModal(true); }} >Sign In</Button>
          <Button style={{
                            backgroundColor: 'transparent',
                            color: 'black',
                            border: 'none',
                            padding: '0',
                            fontSize: 'normal',
                            fontWeight: '545', 
                            cursor: 'pointer',
                            textTransform: 'none',
                            outline: 'none',
                            boxShadow: 'none',
                        }}onClick={() => { setModalType('register'); setOpenUserModal(true); }}>Sign Up</Button>
          <AuthModal
            open={openUserModal}
            onClose={() => setOpenUserModal(false)}
            onSubmit={(data:Partial< UserType>) => handleUserSubmit(data, modalType)} // Corrected here
            title={modalType.charAt(0).toUpperCase() + modalType.slice(1)}
            type={modalType}
            initialData={user}
          />
          {/* {showUserComponent && <UserProfile />} */}
          {/* {showUserComponent && (
            <StyledButton onClick={() => { setModalType('update'); setOpenUserModal(true); }} variant="contained" color="primary">Update User</StyledButton>
          )} */}
          <style>
            {`
            body {
              overflow: hidden;
            }
          `}
          </style>
        </UserContext.Provider>
  
      </>
    );
  };
  export default Login;
  