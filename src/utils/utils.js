import axios from "axios";
import { navigate, useNavigate } from "react-router-dom";
import { baseDevelopmentURL } from "./constants";

export const logoutUser = ({token}) => {
    const navigate = useNavigate();
    const resp = await axios.post(`${baseDevelopmentURL}/logout`, {data: {
        token: token
    }});

    console.log(resp);
    
    if (resp.data.ok) {
        navigate('/');
    }
};