import { FC, createContext, useState, useEffect, ReactNode } from "react";
import { LoginDTO } from "../model/LoginDTO";
import { useNavigate } from "react-router-dom";
import api from "../api";

export const AuthContext = createContext({});

const AuthProvider: FC<ReactNode> = ({children}) => {

    const [isToken, setIsToken] = useState(false)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();
    const [error, setError] = useState(false)

    useEffect(() => {
       const token = (localStorage.getItem('token'))
       if(token){
           setIsToken(true);
           api.defaults.headers.common['Authorization'] = token; 
       }else{
            navigate('/login');
       }
       setLoading(false);
    },[])
    
    const handleLogin = async (user: LoginDTO) =>{
        try {
            const {data: token} = await api.post('/auth', user);
            setIsToken(true);
            localStorage.setItem('token', token)
            api.defaults.headers.common['Authorization'] = token;
            navigate('/')
        } catch (error) {
            console.log(error)
          
        }
    }

    const handleLogout = async () =>{
        localStorage.removeItem('token');
        setIsToken(false);
        navigate('/login');
    }
    
    if (loading){
        return (<h1>loading</h1>)
    }

    if (error){
        return (<h1>erro</h1>)
    }

    return(
        <AuthContext.Provider value={{handleLogin, handleLogout, isToken}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider