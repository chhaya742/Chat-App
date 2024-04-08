import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SignUp from "./pages/Signup/SignUp";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";

function App() {
    const { authUser } = useAuthContext();
    
    return (
        <div className='p-4 h-screen flex items-center justify-center'>
		<div>
			<h1>HELLO WORLD</h1>
		</div>
            <Routes>
                <Route path='/' element={authUser ? <Home /> : <Navigate to="/login" />} />
                <Route path='/login' element={!authUser ? <Login /> : <Navigate to="/" />} />
                <Route path='/signup' element={!authUser ? <SignUp /> : <Navigate to="/" />} />
            </Routes>
            <Toaster />
        </div>
    );
}

export default App;
