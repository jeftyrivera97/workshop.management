import { Link } from "react-router-dom"
import '../../css/ui.css'

export const SideBarItem = () => {
  return (
    <>
      <li ><Link to="/home"><p className="menuItems">Home</p></Link></li> &nbsp;
      <li ><Link to="/ingresos"><p className="menuItems">Ingresos</p></Link></li> &nbsp;
      <li ><Link to="/compras"><p className="menuItems">Compras</p></Link></li> &nbsp;
      <li ><Link to="/gastos"><p className="menuItems">Gastos</p></Link></li> &nbsp;
      <li ><Link to="/planillas"><p className="menuItems">Planillas</p></Link></li>&nbsp;
    </>
  )
}
