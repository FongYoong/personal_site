import { useState } from 'react'
// import dynamic from 'next/dynamic'
// const InterestLangCard = dynamic(() => import('./InterestLangCard').then((mod) => mod.default), {
//     ssr: false,
// });
import { m, AnimatePresence } from "framer-motion";
import { Ring } from '@uiball/loaders'
import { AiFillYoutube } from 'react-icons/ai'
import { BsSpotify } from 'react-icons/bs'

const musicCategories = [
    {
        title: 'My Songs',
        description: "Songs I've made over the years.",
        iframe: {
            src: "https://www.youtube-nocookie.com/embed/videoseries?list=PLstYoDVV4Zg3omRM9puwSBoMb61xSCpR_",
            title: "YouTube video player",
            frameBorder: "0",
            allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
            allowFullScreen: true,
        }
    },
    {
        isSpotify: true,
        title: 'Spotify',
        description: 'My main Spotify playlist.',
        iframe: {
            src: "https://open.spotify.com/embed/playlist/6khCMAXcGJBVRQLbUkadTA?utm_source=generator",
            title: "Spotify audio player",
            frameBorder: "0",
            allow:"autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture",
            allowFullScreen: "",
        }
    },
    {
        title: 'AOR West Coast',
        description: "My self-curated list of the album-oriented rock (AOR) format from the 80s.",
        iframe: {
                src: "https://www.youtube-nocookie.com/embed/videoseries?list=PLstYoDVV4Zg2Q0RtBIIUjdaeeWhR4nKfC",
                title: "YouTube video player",
                frameBorder: "0",
                allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
                allowFullScreen: true,
        }
    },
    {
        title: 'City Pop',
        description: "My self-curated list of Japan's 70s/80s music before its economic bubble burst.",
        iframe: {
            src: "https://www.youtube.com/embed/videoseries?list=PLstYoDVV4Zg1tCL_DGytoRzouW6OOEYCp",
            title: "YouTube video player",
            frameBorder: "0",
            allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
            allowFullScreen: true,
        }
    }
]

const HobbiesMusic = ({className}) => {

    const [selected, setSelected] = useState(-1);

    return (
        <div className={`mt-8 flex flex-col gap-8 justify-center items-center content-center ${className}`} >
            <h2 className="mt-4 text-center text-3xl xs:text-5xl font-bold">
                And music too...
            </h2>
            <div className={`flex flex-wrap gap-4 justify-center items-center content-center`} >
                {
                    musicCategories.map((category, index) => 
                        <m.button key={index} className=" hobbiesMusicButton h-full text-sm xs:text-md font-normal text-white rounded-lg p-[0.5em]"
                            initial='normal'
                            animate={selected == index ? 'selected' : 'normal'}
                            whileHover={{ opacity: 0.6 }}
                            variants={{
                                normal: {
                                    backgroundColor: '#533E85'
                                },
                                selected: {
                                    scale: 1.1,
                                    backgroundColor: category.isSpotify ? '#1DB954':'#FF0000'
                                }
                            }}
                            onClick={() => {
                                setSelected(index)
                            }}
                        >
                            <div className='flex flex-col gap-1 justify-center items-center content-center' >
                                {category.isSpotify ? <BsSpotify className='inline-block' /> : <AiFillYoutube className='inline-block' />}
                                <h1 className={`font-bold text-md xs:text-xl text-center`}>
                                    {category.title}
                                </h1>
                            </div>
                        </m.button>
                    )
                }
            </div>
            <div className='relative w-full flex flex-col justify-center items-center content-center'>
                <AnimatePresence exitBeforeEnter>
                    <m.div
                        className='z-0 w-full'
                        key={selected > -1 ? musicCategories[selected].title : null}
                        initial='hide'
                        animate={selected > -1 ? 'show' : 'hide'}
                        exit="exit"
                        variants={{
                            hide: {
                                scale: 0
                            },
                            show: {
                                scale: 1
                            },
                            exit: {
                                translateX: '100vw'
                            }
                        }}
                        transition={{
                            type: "tween",
                            //bounce: 0.4,
                            duration: 0.5
                        }}
                    >
                        {
                            selected > -1 && 
                            <>
                                <p className={`mb-4 font-normal text-sm xs:text-lg text-start`}>
                                    {selected > -1 ? musicCategories[selected].description : ''}
                                </p>
                                <iframe
                                    style={{
                                        position: 'relative',
                                        zIndex: 1,
                                        borderRadius: 12
                                    }}
                                    width='100%' height='300'
                                    {...musicCategories[selected].iframe}
                                />
                                <div className='z-0 absolute top-[50%] left-[50%]' >
                                    <Ring
                                        size={40}
                                        lineWeight={5}
                                        speed={2} 
                                        color="white"
                                    />
                                </div>
                            </>

                        }
                    </m.div>
                </AnimatePresence>
            </div>

        </div>
    )
}

export default HobbiesMusic;