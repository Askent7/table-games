import Login from "./pages/Login";
import Table from "./pages/Table";
import Add from "./pages/Add"
import Change from "./pages/Change";
import Main from "./pages/Main"
import {ADD_ROUTE, ADMIN_ROUTE_LOGIN, TABLE_ROUTE, MAIN_ROUTE} from "./utils/const";
import Category from "./pages/Category";
import GamePage from "./pages/GamePage";



export const authRoutes = [
    {
        path: TABLE_ROUTE,
        component: <Table/>
    },
    {
        path: ADD_ROUTE,
        component: <Add/>
    },
    {
        path: ADD_ROUTE + '/:id',
        component: <Change/>
    }
]

export const publicRoutes = [
    {
        path: ADMIN_ROUTE_LOGIN,
        component: <Login/>
    },
    {
        path: MAIN_ROUTE,
        component: <Main/>
    },
    {
        path: MAIN_ROUTE + '/:id',
        component: <Category/>
    },
    {
        path: MAIN_ROUTE + '/Game/:id',
        component: <GamePage/>
    }
]