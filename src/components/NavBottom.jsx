import { NavLink } from "react-router-dom"

const NavBottom = () => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-black z-50">
      <nav className="flex justify-around items-center py-2">

        <NavItem to="/" icon="bi-house-door-fill" label="Home" />
        <NavItem to="/search" icon="bi-search" label="Buscar" />
        <NavItem to="/explore" icon="bi-compass" label="Explorar" />

      </nav>
    </div>
  )
}

const NavItem = ({ to, icon, label }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex flex-col items-center justify-center text-xs ${isActive ? "text-white" : "text-zinc-400"
        }`
      }
    >
      <i className={`bi ${icon} text-lg mb-1`}></i>
      <span>{label}</span>
    </NavLink>
  )
}

export default NavBottom