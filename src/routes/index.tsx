import {RouteObject} from "react-router-dom";
import {lazy, LazyExoticComponent, Suspense} from "react";
import Loading from "../pages/loading";
import NotFound from "@/pages/404";
import Layout from "@/components/layout";

const withLazy = (L: LazyExoticComponent<() => JSX.Element>) => {
    return <Suspense fallback={<Loading/>}>
        <L/>
    </Suspense>
}

const Login = () => withLazy(lazy(() => import("@/pages/user/login")))
const Welcome = () => withLazy(lazy(() => import("@/pages/welcome")))
const Admin = () => withLazy(lazy(() => import("@/pages/admin")))
const SubPage = () => withLazy(lazy(() => import("@/pages/admin/subPage")))
const List = () => withLazy(lazy(() => import("@/pages/list")))
const Index = () => withLazy(lazy(() => import("@/pages")))


const routes: RouteObject[] = [
    {
        path: 'user',
        children: [
            {
                path: 'login',
                element: <Login/>
            },
        ],
    },
    {
        path: '',
        element:<Layout/>,
        children: [
            {
                path: 'welcome',
                index: true,
                element: <Welcome/>
            },
            {
                path: 'admin',
                children: [
                    {
                        path: '',
                        element: <Admin/>
                    },
                    {
                        path: 'sub-page',
                        element: <SubPage/>
                    },
                ],
            },
            {
                path: 'list',
                element: <List/>
            },
        ]
    },
    {
        path: '*',
        element: <NotFound/>
    },
];

export default routes