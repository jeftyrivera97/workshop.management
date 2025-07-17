

import { Outlet } from 'react-router-dom';
import { Drawer } from './Drawer';



export const Layout = () => {
    return (
        <>
            <Drawer />
            <Outlet />
        </>
    )
}
