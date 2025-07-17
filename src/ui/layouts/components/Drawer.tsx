


import { NavBar } from './Navbar';
import { SideBar } from './SideBar';

export const Drawer = () => {
    return (
        <div className="drawer">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                <NavBar />
                
            </div>
            <SideBar />
        </div>

    )
}
