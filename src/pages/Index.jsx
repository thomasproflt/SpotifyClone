import Carousel from "../components/Carousel"
import CarouselArtists from "../components/CarouselArtists"
import { Artists } from "../data/Artists.data"
import { Musics } from "../data/Musics.data"

export const Index = ({ setCurrentMusic }) => {
    return (
        <div className="w-full h-full bg-black flex justify-center">

            <div className="md:bg-gradient-to-t from-[#121212] via-[#141915] to-[#141915] rounded-xl md:p-6 w-full h-full overflow-auto pb-20 md:pb-6">
                <h1 className="px-3 text-[18px] font-semibold mb-4">
                    Recentes
                </h1>
                <Carousel data={Musics} setCurrentMusic={setCurrentMusic} />

                <h1 className="px-3 text-[18px] font-semibold mt-10 mb-4">
                    Artistas ouvidos recentemente
                </h1>
                <CarouselArtists data={Artists} setCurrentMusic={setCurrentMusic} />

            </div>

        </div>
    )
}