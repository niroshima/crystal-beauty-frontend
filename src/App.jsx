import { BrowserRouter,Routes,Route } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/loginPage'
import AdminPage from "./pages/adminPage"
import Testing from './pages/testing'
import { Toaster} from 'react-hot-toast'
import RegisterPage from './pages/client/register'

function App() {
  
  return (
    <BrowserRouter>
    <Toaster position="top-right"/>
    <Routes path="/*">
    <Route path="/admin/*" element={<AdminPage/>}/>
    <Route path="/login" element={<LoginPage/>}/>
    <Route path="/testing" element={<Testing/>}/>
    <Route path="/register" element={<RegisterPage/>}/>
    <Route path="/" element={<h1>Home</h1>}/>
    <Route path="/*" element={<h1>404 NotFound</h1>}/>
    </Routes>
    </BrowserRouter>
    
  )
}

export default App
