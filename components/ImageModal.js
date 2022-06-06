import Image from 'next/image'
import { createContext } from 'react'
import { m } from "framer-motion";
// import { IoMdCloseCircle } from 'react-icons/io'

export const ImageModalContext = createContext(undefined);

export const ImageModal = ({show, setShow, imageUrl, alt}) => {

    return (
        <m.div className='cursor-zoom-out fixed top-0 left-0 w-screen h-screen z-[60] flex flex-col justify-center items-center content-center'
            style={{
                background: "rgba(0,0,0,0.7)"
            }}
            initial='hide'
            animate={show ? 'show' : 'hide'}
            variants={{
                hide: {
                    opacity: 0,
                    pointerEvents: "none"
                },
                show: {
                    opacity: 1,
                    pointerEvents: "auto"
                }
            }}
            transition={{
                duration: 0.3,
            }}
            onClick={() => setShow(false)}
        >
            <div className='relative h-[80%] w-[95%] lg:w-[50%]' >
                {imageUrl && 
                    <Image alt={alt} src={imageUrl} layout="fill" objectFit="contain" 
                        placeholder="blur" blurDataURL="/images/placeholder.svg"
                    />
                }
            </div>
            <p className='p-4 bg-black text-center text-sm xs:text-lg font-light' > ◦ Click anywhere to close</p>
        </m.div>
    )
}

