import React, {useContext, useEffect} from "react";
import {Routes, Route, Navigate} from "react-router-dom";

import {authRoutes, publicRoutes} from "../routes";
import Not404 from "../pages/404notfound";
import {Context} from "../index"
const AppRouter = () => {
    const {user} = useContext(Context)

    return(

            <Routes>
                {user.isAuth && authRoutes.map(({path, component}) => <Route key={path} path={path} element={component} exact></Route>)}
                {publicRoutes.map(({path, component}) => <Route key={path} path={path} element={component} exact></Route>)}
                {authRoutes.map(({path}) => <Route path={path} element={<Navigate to="/Admin" replace/>} ></Route>)}
                <Route path="*" element={<Not404/>}/>
            </Routes>

    );
}
export default AppRouter;