import { Link } from "react-router-dom"
import '../../css/ui.css'

export const SideBarItem = ({ onNavigate }: { onNavigate: () => void }) => {
  return (
    <>
      <li ><Link to="/home" onClick={onNavigate}><p className="menuItems">Inicio</p></Link></li> &nbsp;
      <li ><Link to="/ingresos" onClick={onNavigate}><p className="menuItems">Ingresos</p></Link></li> &nbsp;
      <li ><Link to="/compras" onClick={onNavigate}><p className="menuItems">Compras</p></Link></li> &nbsp;
      <li ><Link to="/gastos" onClick={onNavigate}><p className="menuItems">Gastos</p></Link></li> &nbsp;
      <li ><Link to="/planillas" onClick={onNavigate}><p className="menuItems">Planillas</p></Link></li>&nbsp;
    </>
  )
}
