import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const Carousel = ({ data, setCurrentMusic }) => {
    const [index, setIndex] = useState(0)
    const [itemsPerView, setItemsPerView] = useState(5)

    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const update = () => {
            const mobile = window.innerWidth < 768
            setIsMobile(mobile)

            if (mobile) setItemsPerView(1)
            else if (window.innerWidth < 1024) setItemsPerView(2)
            else setItemsPerView(5)
        }

        update()
        window.addEventListener("resize", update)
        return () => window.removeEventListener("resize", update)
    }, [])

    useEffect(() => {
        const update = () => {
            if (window.innerWidth < 640) setItemsPerView(1)
            else if (window.innerWidth < 768) setItemsPerView(2)
            else setItemsPerView(5)
        }

        update()
        window.addEventListener("resize", update)
        return () => window.removeEventListener("resize", update)
    }, [])

    useEffect(() => {
        setIndex(0)
    }, [itemsPerView])

    const maxIndex = Math.max(0, data.length - itemsPerView)

    const next = () => {
        setIndex((prev) => Math.min(prev + 1, maxIndex))
    }

    const prev = () => {
        setIndex((prev) => Math.max(prev - 1, 0))
    }

    return (
        <div className="relative w-full">
            <button
                onClick={prev}
                className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-[#1F1F1F] px-2 py-1 rounded-full"
            >
                <i className="bi bi-chevron-left"></i>
            </button>

            <button
                onClick={next}
                className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-[#1F1F1F] px-2 py-1 rounded-full"
            >
                <i className="bi bi-chevron-right"></i>
            </button>

            <div className="overflow-x-auto md:overflow-hidden no-scrollbar scroll-smooth snap-x snap-mandatory">
                <motion.div
                    animate={!isMobile ? { x: `-${index * (100 / itemsPerView)}%` } : {}}
                    transition={{ type: "spring", stiffness: 120, damping: 20 }}
                    className="flex"
                >
                    {data.map((item) => (
                        <div key={item.id} className="min-w-[70%] sm:min-w-[45%] md:min-w-[20%] p-2 snap-start">
                            <div
                                onClick={() => setCurrentMusic(item)}
                                className="relative flex flex-col p-2 hover:bg-zinc-50/5 rounded-md group transition cursor-pointer"
                            >
                                <div className="w-full h-60 overflow-hidden rounded-md mb-3">
                                    <img
                                        src={item.image}
                                        alt={item.band}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <h1 className="text-[14px] text-zinc-50 font-semibold truncate">
                                    {item.album}
                                </h1>

                                <p className="text-[14px] text-zinc-400 truncate">
                                    {item.band}
                                </p>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setCurrentMusic(item)
                                    }}
                                    className="absolute right-2 bottom-2 px-3 py-2 bg-[#1ED760] text-black rounded-full opacity-0 group-hover:opacity-100 translate-y-2 group-hover:-translate-y-2 transition"
                                >
                                    <i className="bi bi-play-fill"></i>
                                </button>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    )
}

export default Carousel