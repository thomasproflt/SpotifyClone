import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const NowPlayingBar = ({ music }) => {
    const audioRef = useRef(null)
    const requestRef = useRef(null)
    const progressBarRef = useRef(null) // Ref direto para o input de progresso

    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [volume, setVolume] = useState(0.7)

    // Sincroniza a barra e o tempo a 60fps
    const animate = () => {
        if (audioRef.current) {
            const current = audioRef.current.currentTime
            const dur = audioRef.current.duration
            setCurrentTime(current)

            // Injeta a porcentagem direto no CSS do input para performance máxima
            if (progressBarRef.current && dur > 0) {
                const percentage = (current / dur) * 100
                progressBarRef.current.style.setProperty('--progress', `${percentage}%`)
            }

            requestRef.current = requestAnimationFrame(animate)
        }
    }

    useEffect(() => {
        if (isPlaying) {
            requestRef.current = requestAnimationFrame(animate)
        } else {
            cancelAnimationFrame(requestRef.current)
        }
        return () => cancelAnimationFrame(requestRef.current)
    }, [isPlaying])

    // Update Volume style
    const updateVolumeStyle = (v) => {
        const volumeInput = document.getElementById('volume-input')
        if (volumeInput) {
            volumeInput.style.setProperty('--progress', `${v * 100}%`)
        }
    }

    useEffect(() => {
        if (music && audioRef.current) {
            audioRef.current.src = music.audio
            audioRef.current.play()
            audioRef.current.volume = volume
            setIsPlaying(true)
            updateVolumeStyle(volume)
        }
    }, [music])

    const togglePlay = () => {
        if (isPlaying) audioRef.current.pause()
        else audioRef.current.play()
        setIsPlaying(!isPlaying)
    }

    const formatTime = (time) => {
        if (!time) return "0:00"
        const min = Math.floor(time / 60)
        const sec = Math.floor(time % 60)
        return `${min}:${sec < 10 ? "0" : ""}${sec}`
    }

    return (
        <AnimatePresence>
            {music && (
                <motion.div
                    initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }}
                    className="fixed md:static bottom-20 md:bottom-0 left-0 w-full bg-[#050505] px-4 py-3 flex flex-col md:flex-row md:items-center md:justify-between z-50"
                >
                    <audio
                        ref={audioRef}
                        onEnded={() => setIsPlaying(false)}
                        onLoadedMetadata={() => {
                            if (audioRef.current) {
                                setDuration(audioRef.current.duration)
                            }
                        }}
                    />

                    {/* LEFT */}
                    <div className="flex items-center justify-between w-full md:w-[30%]">
                        <div className="flex items-center gap-3">
                            <img src={music.image} className="w-12 h-12 md:w-14 md:h-14 rounded" alt="Capa" />

                            <div className="flex flex-col truncate">
                                <span className="text-white text-sm font-medium truncate">
                                    {music.album}
                                </span>
                                <span className="text-zinc-400 text-[11px] truncate">
                                    {music.band}
                                </span>
                            </div>
                        </div>

                        {/* BOTÃO MOBILE */}
                        <button
                            onClick={togglePlay}
                            className="md:hidden bg-white text-black w-8 h-8 rounded-full flex items-center justify-center"
                        >
                            <i className={`bi ${isPlaying ? "bi-pause-fill" : "bi-play-fill"}`}></i>
                        </button>
                    </div>

                    {/* CENTER (60FPS Progress) */}
                    <div className="hidden md:flex flex-col items-center max-w-[40%] w-full">
                        <div className="flex items-center gap-5 mb-2">
                            <i className="bi bi-shuffle text-zinc-400 hover:text-[#1db954] cursor-pointer"></i>
                            <i className="bi bi-skip-start-fill text-zinc-400 hover:text-white text-2xl cursor-pointer"></i>
                            <button onClick={togglePlay} className="bg-white text-black w-8 h-8 rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition">
                                <i className={`bi ${isPlaying ? "bi-pause-fill" : "bi-play-fill"} text-xl`}></i>
                            </button>
                            <i className="bi bi-skip-end-fill text-zinc-400 hover:text-white text-2xl cursor-pointer"></i>
                            <i className="bi bi-repeat text-zinc-400 hover:text-[#1db954] cursor-pointer"></i>
                        </div>

                        <div className="flex items-center gap-2 w-full group-range">
                            <span className="text-[11px] text-zinc-400 min-w-[35px] text-right">{formatTime(currentTime)}</span>
                            <input
                                ref={progressBarRef}
                                type="range"
                                min="0"
                                max={duration || 0}
                                step="0.01"
                                value={currentTime}
                                onChange={(e) => {
                                    const time = parseFloat(e.target.value)
                                    audioRef.current.currentTime = time
                                    setCurrentTime(time)
                                }}
                                className="spotify-range"
                                style={{ '--progress': '0%' }}
                            />
                            <span className="text-[11px] text-zinc-400 min-w-[35px]">{formatTime(duration)}</span>
                        </div>
                    </div>

                    {/* RIGHT (Volume) */}
                    <div className="hidden md:flex items-center justify-end gap-3 w-[30%]">
                        <div className="flex items-center gap-2 w-32 group-range">
                            <i className="bi bi-volume-up text-zinc-400 text-lg"></i>
                            <input
                                id="volume-input"
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={volume}
                                onChange={(e) => {
                                    const v = parseFloat(e.target.value)
                                    setVolume(v)
                                    audioRef.current.volume = v
                                    updateVolumeStyle(v)
                                }}
                                className="spotify-range"
                                style={{ '--progress': `${volume * 100}%` }}
                            />
                        </div>
                    </div>

                    <div className="w-full mt-2 md:hidden group-range">
                        <input
                            ref={progressBarRef}
                            type="range"
                            min="0"
                            max={duration || 0}
                            step="0.01"
                            value={currentTime}
                            onChange={(e) => {
                                const time = parseFloat(e.target.value)
                                audioRef.current.currentTime = time
                                setCurrentTime(time)
                            }}
                            className="spotify-range"
                            style={{ '--progress': '0%' }}
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default NowPlayingBar