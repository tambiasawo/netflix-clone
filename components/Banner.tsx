import React from 'react'
import { Movie } from '../typings.def'
import { baseUrl } from '../constants/movie'
import Image from 'next/image'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import { Info } from '@mui/icons-material/'
import { useRecoilState } from 'recoil'
import { modalState, movieState } from '../atom/modalAtom'
import { Tooltip } from '@mui/material'

interface Props {
  netflixOriginals: Movie[]
}

const Banner = ({ netflixOriginals }: Props) => {
  const [randomMovie, setRandomMovie] = React.useState<Movie | null>(null)
  const [showModal, setShowModal] = useRecoilState(modalState)
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState)

  React.useEffect(() => {
    const index = Math.floor(Math.random() * netflixOriginals.length)
    setRandomMovie(netflixOriginals[index])
  }, [netflixOriginals])

  //when u use layout fill, the outer parent should be absolute or relativ e
  return (
    <div className="flex flex-col  py-16 md:space-y-4 lg:h-[85vh] lg:justify-end lg:pb-12">
      <div className="absolute top-0 left-0 -z-10 h-[95vh] w-screen">
        <Image
          src={`${baseUrl}${
            randomMovie?.backdrop_path || randomMovie?.poster_path
          }`}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <h1 className="text-2xl font-bold md:text-4xl lg:text-7xl ">
        {randomMovie?.title || randomMovie?.original_name || randomMovie?.name}
      </h1>
      <p className="text-md max-w-md  md:max-w-md md:text-lg lg:max-w-xl lg:text-lg">
        {randomMovie?.overview}
      </p>
      <div className="flex space-x-4">
        <button className="bannerButton bg-white text-black">
          <PlayArrowIcon
            fontSize="large"
            className="h-4 w-4 text-black md:h-7 md:w-7"
          />
          <Tooltip title="Cant play due to copyright laws">
            <span> Play</span>
          </Tooltip>
        </button>
        <button
          className="bannerButton bg-[gray]/90 text-white "
          onClick={() => {
            setShowModal(true)
            setCurrentMovie(randomMovie)
          }}
        >
          <Info className="h-5 w-5 md:h-7 md:w-7" /> <span> More Info</span>
        </button>
      </div>
    </div>
  )
}

export default Banner
