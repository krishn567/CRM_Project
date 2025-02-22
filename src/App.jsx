// import { BrowserRouter, Route, Routes } from "react-router-dom"
// import Login from "./Login/Login"
// import Register from "./Login/Register"
// import Home from "./PAGES/Home"
// import EmailVarify from "./Login/EmailVarify"
// import SuccessEmail from "./Login/SuccessEmail"
// import ForgotPassword from "./Login/ForgotPassword"
// import ResetPassword from "./Login/ResetPassword"
// import CreateWokspace from "./Workspace/CreateWorkspace"
// import Demo from "./Workspace/Demo"
 

  

// function App() {
  

//   return (
//     <>

//                <BrowserRouter>
//                <Routes>
//                 <Route path="/"element={<Register/>}></Route> 
//                 <Route path="/" element={<Register/>}></Route>
//                 <Route path="/login" element={<Login/>}></Route> 
//                 <Route path="/home" element={<Home/>}></Route>
//                 <Route path="/email-verification/"element={<EmailVarify/>}></Route>                
//                 <Route path="/successemail" element={<SuccessEmail/>}></Route>
//                 <Route path="/login/forgotpassword" element={<ForgotPassword/>}></Route>
//                 <Route path="/reset-password" element={<ResetPassword/>}></Route>
//                 <Route path="/workspacepage"element={<CreateWokspace/> }></Route>
//                </Routes>
//                </BrowserRouter> 
//                {/* <Demo/> */}
               
               
//     </>
//   )
// }

// export default App
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login/Login";
import Register from "./Login/Register";
import Home from "./PAGES/Home";
import EmailVarify from "./Login/EmailVarify";
import SuccessEmail from "./Login/SuccessEmail";
import ForgotPassword from "./Login/ForgotPassword";
import ResetPassword from "./Login/ResetPassword";
import CreateWorkspace from "./Workspace/CreateWorkspace";
//  import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.";
// import AcceptInvitation from "./Components/AcceptInvitation";
import WorkspaceAll from "./Workspace/WorkspaceAll";
import Dashbord from "./PAGES/Dashbord";
import Education from "./PAGES/Education";
import Experience from "./PAGES/Experience ";
import Demo from "./PAGES/demo";
import WorkspaceDetail from "./PAGES/WorkspaceDetail";
import { WorkspaceProvider } from "./Components/WorkspaceContext";
 
 
 

function App() {
  return (
    <>
        <WorkspaceProvider> 
      <BrowserRouter>
        <Routes>
          <Route path="/sign-up" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home/:workspace_id" element={<Home />} />
          <Route path="/email-verification" element={<EmailVarify />} />
          <Route path="/successemail" element={<SuccessEmail />} />
          <Route path="/login/forgotpassword" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/workspacepage"element={< CreateWorkspace/>} />           
          <Route path="/worksspaceall" element={<WorkspaceAll/>}></Route> 
          <Route path="/dashboard"element={<Dashbord/>}></Route>
          <Route path="/education"element={<Education/>}></Route>
          <Route path="/experience"element={<Experience/>}></Route>
          <Route path="/workspacedetail"element={<WorkspaceDetail/>}></Route>
          <Route path="/demo"element={<Demo/>}></Route>
          
           
           
          {/* <Route
            path="/workspacepage"
            element={
              <ProtectedRoute>
                <CreateWorkspace />
              </ProtectedRoute>
            }
          /> */}
        </Routes>
      </BrowserRouter>
      </WorkspaceProvider> 
    </>
  );
}

export default App;
