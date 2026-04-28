import React, { useState } from "react"
import { Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar"
import SidebarMusics from "./components/SidebarMusics"
import NowPlayingBar from "./components/NowPlayingBar"
import { Index } from "./pages/Index"
import NavBottom from "./components/NavBottom"

function App() {
  const [collapsed, setCollapsed] = useState(false)
  const [currentMusic, setCurrentMusic] = useState(null)

  const hasPlayer = !!currentMusic

  return (
    <div
      className={`h-screen grid ${hasPlayer
          ? "grid-rows-[64px_1fr_80px]"
          : "grid-rows-[64px_1fr]"
        } ${collapsed 
  ? "md:grid-cols-[80px_1fr]" 
  : "md:grid-cols-[240px_1fr]"
}
grid-cols-1 bg-black`}
    >
      <div className="col-span-2">
        <Navbar toggleSidebar={() => setCollapsed(!collapsed)} />
      </div>

      <SidebarMusics collapsed={collapsed} toggle={() => setCollapsed(!collapsed)} />

      <main className="h-full p-2 overflow-hidden">
        <Routes>
          <Route path="/" element={<Index setCurrentMusic={setCurrentMusic} />} />
        </Routes>
      </main>

      {hasPlayer && (
        <div className="col-span-2 overflow-hidden">
          <NowPlayingBar music={currentMusic} />
        </div>
      )}
      <NavBottom />
    </div>
  )
}

export default App