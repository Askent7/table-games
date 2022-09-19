
import '../css/App.css';
import Button from '@mui/material/Button';
import {Autocomplete} from '@mui/material';
import {Checkbox} from "@mui/material";
import {TextField} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid"
import {Alert} from "@mui/material";
import {Stack} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";
import {ADMIN_ROUTE_LOGIN, TABLE_ROUTE} from "../utils/const";
import {login} from "../http/userApi";
import {useContext, useState} from "react";
import {observer} from "mobx-react-lite";
import {Context} from "../index";




const Login = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const navigate = useNavigate();
    const isLogin = location.pathname === ADMIN_ROUTE_LOGIN
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const logIn = async () => {
        try {
            let data;
            data = await login(email, password);
            user.setUser(user)
            user.setIsAuth(true);

            navigate(TABLE_ROUTE)



        } catch (e){
            alert(e.response.data.message)
        }
    }

    return (
        <div className="Padding">
            <Stack spacing={5} justifyContent="center"
                   alignItems="center">
                <TextField value={email} onChange={e => setEmail(e.target.value)} sx={{ width: 800 }} id="AdminLogin" label="Почта" variant="filled" />
                <TextField value={password} onChange={e => setPassword(e.target.value)}type="password" sx={{ width: 800 }} id="AdminPassword" label="Пароль" variant="filled" />

                <Button onClick={logIn} variant="contained" color="success">Войти</Button>
            </Stack>
        </div>
    );
})

export default Login;
