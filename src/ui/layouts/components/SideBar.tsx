import { SideBarItem } from './SideBarItem';



export const SideBar = () => {
    return (
        <>
            <div className="drawer-side">
                <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 min-h-full w-80 p-4">
                    {/* Sidebar content here */}
                    <SideBarItem />
                </ul>
            </div>

        </>
    )
}
