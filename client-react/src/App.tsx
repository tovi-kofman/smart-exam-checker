// import './App.css'
// import ExamUpLoad from './components/Exams/ExamUpLoad'

// function App() {

//   return (
//     <>
// <ExamUpLoad/>
//     </>
//   )
// }

// export default App
import { RouterProvider } from "react-router-dom";
import UserReducer, { UserContext, initialUserState } from "./context/UserReducer";
import { router } from "./AppRoutes";
import { useReducer } from "react";

    
const App = () => {
    
    const [user, userDispatch] = useReducer(UserReducer, initialUserState);
    return (
        
        // <Router>
        //     <Routes>
        //         <Route path="/" element={<AppLayout />}>
        //             <Route index element={<Home />} />
        //             <Route path="home" element={<Home />} /> 
        //             {/* כאן תוכל להוסיף עוד Routes לדפים נוספים */}
        //         </Route>
        //     </Routes>
        // </Router>
        <>
        {/* <GradeExam/> */}
        <UserContext value={{ user, userDispatch }}>
           
      <RouterProvider router={router} />
  </UserContext>
        </>
    );
};

export default App;
