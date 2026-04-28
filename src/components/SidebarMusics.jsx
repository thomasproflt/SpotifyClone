import { NavLink } from "react-router-dom"
import { Home, Search, Compass, PanelLeft } from "lucide-react"

const SidebarMusics = ({ collapsed, toggle }) => {
    return (
        <aside className="hidden md:flex h-full bg-black p-2">

            <div className="bg-[#0E0E0E] rounded-xl p-3 h-full flex flex-col">

                {/* Botão expandir/encolher */}
                <button
                    onClick={toggle}
                    className="mb-4 flex w-full max-w-9 items-center justify-start p-2 hover:bg-zinc-800 rounded-lg cursor-pointer"
                >
                    <PanelLeft size={18} />
                </button>

                <nav className="flex flex-col gap-1">

                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `flex items-center ${collapsed ? "justify-center" : "gap-3"
                            } px-3 py-2 rounded-lg ${isActive ? "bg-zinc-800" : "hover:bg-zinc-800"
                            }`
                        }
                    >
                        <Home size={18} className="shrink-0" />
                        {!collapsed && "Início"}
                    </NavLink>

                    <NavLink
                        to="/search"
                        className={({ isActive }) =>
                            `flex items-center ${collapsed ? "justify-center" : "gap-3"
                            } px-3 py-2 rounded-lg ${isActive ? "bg-zinc-800" : "hover:bg-zinc-800"
                            }`
                        }
                    >
                        <Search size={18} className="shrink-0" />
                        {!collapsed && "Buscar"}
                    </NavLink>

                    <NavLink
                        to="/explore"
                        className={({ isActive }) =>
                            `flex items-center ${collapsed ? "justify-center" : "gap-3"
                            } px-3 py-2 rounded-lg ${isActive ? "bg-zinc-800" : "hover:bg-zinc-800"
                            }`
                        }
                    >
                        <Compass size={18} className="shrink-0" />
                        {!collapsed && "Explorar"}
                    </NavLink>

                </nav>

            </div>
        </aside>
    )
}

export default SidebarMusics