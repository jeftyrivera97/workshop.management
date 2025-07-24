import { useAuthStore } from "../../../hooks";
import { NavbarItem } from "./NavbarItem";
import logo from "../../../../public/logo-redondo.svg"; 

export const NavBar = () => {
  const { startLogout, user } = useAuthStore();

  return (
    <div className="navbar bg-base-100 shadow-lg border-b border-base-content/10 w-full">
      {/* Mobile menu button */}
      <div className="flex-none lg:hidden">
        <label
          htmlFor="my-drawer-3"
          aria-label="open sidebar"
          className="btn btn-square btn-ghost hover:bg-base-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-6 w-6 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </label>
      </div>

      {/* User info section */}
      <div className="mx-2 flex-1 px-2">
        <div className="flex items-center gap-3">
          {/* Logo */}
          <img
            src={logo}
            alt="Logo"
            className="h-8 w-auto object-contain hidden sm:block"
            style={{ maxWidth: 120 }}
          />
          {/* Avatar */}
          <div className="avatar online">
            <div>
              <span className="text-white font-bold text-sm">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
          {/* User info */}
          <div className="hidden sm:block">
            <p className="font-semibold text-base-content">{user?.name}</p>
            <p className="text-xs text-success font-medium">● En línea</p>
          </div>
        </div>
      </div>

      {/* Desktop menu */}
      <div className="hidden flex-none lg:block">
        <ul className="menu menu-horizontal">
          <NavbarItem />
        </ul>
      </div>

      {/* Logout button */}
      <div className="navbar-end">
        <button
          className="btn btn-ghost gap-2 hover:bg-error/10 hover:text-error transition-colors"
          onClick={startLogout}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          <span className="hidden md:inline">Salir</span>
        </button>
      </div>
    </div>
  );
};
