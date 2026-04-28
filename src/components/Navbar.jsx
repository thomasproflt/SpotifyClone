import { Bell, Menu } from "lucide-react"

const Navbar = ({ toggleSidebar }) => {
    return (
        <nav className="w-full h-16 bg-black text-white p-4 flex items-center justify-between">

            <button onClick={toggleSidebar} className="md:hidden">
                <Menu />
            </button>

            <div className="w-25 h-25 select-none pointer-events-none">
                <img
                    src="/Full_Logo_Green_PMS_C.svg"
                    alt="spotify"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-contain"
                />
            </div>

            <div className="flex items-center gap-4">
                <Bell size={18} className="text-zinc-400" />
                <div>teste</div>
            </div>

        </nav>
    )
}

export default Navbar