import { SideBarItem } from './SideBarItem';

export const SideBar = () => {
    return (
        <>
            <div className="drawer-side">
                <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                
                {/* ✅ Mejorado pero manteniendo tu estructura */}
                <div className="bg-gradient-to-b from-base-100 to-base-200 min-h-full w-80 shadow-xl border-r border-base-300">
                    
                    {/* Header elegante */}
                    <div className="p-4 border-b border-base-300 bg-base-100/50">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                                <span className="text-white font-bold">A</span>
                            </div>
                            <div>
                                <h2 className="font-bold text-base-content">Admin Panel</h2>
                                <p className="text-xs text-base-content/60">Gestión Financiera</p>
                            </div>
                        </div>
                    </div>

                    {/* Menu principal */}
                    <ul className="menu p-4 space-y-2">
                        <SideBarItem />
                    </ul>

                    {/* Footer con logout */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-base-300 bg-base-100/30">
                        <button className="btn btn-error btn-sm w-full">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            Cerrar Sesión
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}