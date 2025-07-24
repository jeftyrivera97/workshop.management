import { SideBarItem } from "./SideBarItem";
import logo from "../../../../public/logo-redondo.svg"; 

export const SideBar = () => {
  const closeDrawer = () => {
    const drawer = document.getElementById("my-drawer-3") as HTMLInputElement;
    if (drawer) drawer.checked = false;
  };

  return (
    <>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="bg-gradient-to-b from-base-100 to-base-200 min-h-full w-80 shadow-xl border-r border-base-300">
          {/* Header elegante */}
          <div className="p-4 border-b border-base-300 bg-base-100/50">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 flex items-center justify-center overflow-hidden">
                <img
                  src={logo}
                  alt="Logo"
                  className="w-10 h-10 object-contain"
                  style={{ minWidth: 40, minHeight: 40 }}
                />
              </div>
              <div>
                <h2 className="font-bold text-base-content">Panel Gerencial</h2>
                <p className="text-xs text-base-content/60">
                  Datos actualizados al instante
                </p>
              </div>
            </div>
          </div>

          {/* Menu principal */}
          <ul className="menu p-4 space-y-2">
            <SideBarItem onNavigate={closeDrawer} />
          </ul>

          {/* Footer con logout */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-base-300 bg-base-100/30">
            <button className="btn btn-error btn-sm w-full">
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
