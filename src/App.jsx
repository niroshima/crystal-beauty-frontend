import { BrowserRouter,Routes,Route } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/loginPage'
import AdminPage from "./pages/adminPage"
import Testing from './pages/testing'
import { Toaster} from 'react-hot-toast'
import RegisterPage from './pages/client/register'
import HomePage from './pages/homePage'
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  
  return (
    <GoogleOAuthProvider clientId="20674058572-nmflpouah54np788a95vs9acvnr6q8jc.apps.googleusercontent.com">
    <BrowserRouter>
    <Toaster position="top-right"/>
    <Routes path="/*">
    <Route path="/admin/*" element={<AdminPage/>}/>
    <Route path="/login" element={<LoginPage/>}/>
    <Route path="/testing" element={<Testing/>}/>
    <Route path="/register" element={<RegisterPage/>}/>
    <Route path="/*" element={<HomePage/>}/>
   
    </Routes>
    </BrowserRouter>
      </GoogleOAuthProvider>
  )
}

export default App
