import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { loginRequest, verifyTokenRequest } from "../api/auth";
import Cookies from "js-cookie";

export const AuthContext = createContext();
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);

    const signIn = async (user) => {
        try {
            const res = await loginRequest(user);
            setUser(res.data);
            setIsAuthenticated(true);
            Cookies.set("token", res.data.token, {expires: 1/24});
        } catch (error) {
            setErrors(error.response.data);
        }
    };

    const logout = () => {
        Cookies.remove("token");
        setUser(null);
        setIsAuthenticated(false);
      };

    useEffect(() => {
        async function checkLogin (){
            const cookies = Cookies.get();
            if(!cookies.token){
                setIsAuthenticated(false);
                setLoading(false);
                return setUser(null)
            }
            try{
                const res = await verifyTokenRequest({token:cookies.token});
                if(!res.data) {
                    setIsAuthenticated(false);
                    setLoading(false);
                    return
                } 
                setLoading(false);
                setIsAuthenticated(true);
                setUser(res.data);
            }catch(error){
                console.log(error);
                setIsAuthenticated(false);
                setUser(null);
                setLoading(false);
            }
        } checkLogin();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                signIn,
                user,
                isAuthenticated,
                logout,
                errors,
                loading
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthContext;