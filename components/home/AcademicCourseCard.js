import { useState } from 'react'
import Image from 'next/image'
import { m } from "framer-motion";


const AcademicCourseCard = ({info}) => {

    const [show, setShow] = useState(false)

    return (
        <div className={`academicCourseCard relative w-[100px] xs:w-[150px] hover:bg-slate-700 rounded-md flex flex-col justify-center items-center content-center`}
            onClick={() => setShow(!show)}
            //whileHover={{ borderWidth: 2, }}
            //whileTap={{ borderWidth: 2 }}
            // initial='animate'
            // animate='animate'
            // variants={{
            //     animate: {
            //         opacity: [1, 0, 1],
            //     }
            // }}
            // transition={{
            //     duration: duration,
            //     delay: delay,
            //     times: [0, 0.5, 1],
            //     repeat: Infinity
            // }}
        >
            <div className='relative w-[100px] xs:w-[150px] h-[56.25px] xs:h-[85px] rounded-md overflow-hidden'>
                <Image alt={info.title} className='academicCoursesImage' src={info.imageUrl} layout='fill' objectFit='cover' />
            </div>
            <p className={`text-lg xs:text-2xl text-center font-normal break-words`}>
                {info.title}
            </p>
            <m.div
                initial='hide'
                animate={show ? 'show' : 'hide'}
                variants={{
                    hide: {
                        width: '0%',
                    },
                    show: {
                        width: '100%',
                    }
                }}
                transition={{
                    duration: 0.3,
                }}
            >
                <hr className='bg-white w-full' />
            </m.div>
            <m.div
                className='overflow-hidden'
                initial='hide'
                animate={show ? 'show' : 'hide'}
                variants={{
                    hide: {
                        height: 0,
                    },
                    show: {
                        height: 'auto',
                    }
                }}
                transition={{
                    duration: 0.3,
                }}
            >
                <p className="text-md text-center font-normal break-words">
                    {info.description}
                </p>
            </m.div>
        </div>
    )
}

export default AcademicCourseCard;