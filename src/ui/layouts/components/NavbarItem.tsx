import { Link, useLocation } from "react-router";

export const NavbarItem = () => {
  const location = useLocation();

  const menuItems = [
    { path: "/ingresos", label: "Ingresos" },
    { path: "/compras", label: "Compras" },
    { path: "/gastos", label: "Gastos" },
    { path: "/planillas", label: "Planillas" },
  ];

  return (
    <div className="flex gap-6">
      {menuItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
            location.pathname === item.path
              ? "text-primary"
              : "text-base-content hover:text-primary"
          }`}
        >
          {item.label}
          {location.pathname === item.path && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"></div>
          )}
        </Link>
      ))}
    </div>
  );
};
