import { useContext } from 'react'
import { SideInfoContext } from '../SideInfo';
import Image from 'next/image'
import { m } from "framer-motion";
import useBreakpoint from 'use-breakpoint';
import { breakpoints } from '../../lib/constants';
import { FiExternalLink } from 'react-icons/fi'

const InterestLangCard = ({info}) => {

    const { breakpoint } = useBreakpoint(breakpoints, 'mobile');
    const [displaySideInfo, hideSideInfo] = useContext(SideInfoContext);
    //const [show, setShow] = useState(false);

    return (
        <m.div
            tabIndex={0}
            className="interestsLangCard relative rounded-md flex flex-col justify-center items-center content-center"
            animate={{
                boxShadow: '0px 0px 0px 1px rgba(255,255,255,0)'
            }}
            whileHover={{ 
                boxShadow: '0px 0px 0px 1px rgba(255,255,255,255)',
            }}
            whileTap={{ 
                boxShadow: '0px 0px 0px 2px rgba(255,255,255,255)',
            }}
            whileFocus={{
                boxShadow: '0px 0px 0px 1px rgba(255,255,255,255)',
            }}
            transition={{
                duration: 0.5
            }}
            onClick={() => {
                displaySideInfo(info.title,
                    <a className='hover:underline' href={info.titleUrl} target="noopener" >
                        <div className='flex flex-col justify-center items-center content-start' >
                            <div className='flex gap-4' >
                                <h2 className="text-md xs:text-lg font-bold">
                                    {info.title}
                                </h2>
                                <FiExternalLink size={15} />
                            </div>

                            <p className="text-md text-left font-normal break-words">
                                {info.description}
                            </p>
                        </div>
                    </a>
                )
            }}
        >
            <Image alt={info.title} className={`rounded-md ${info.className}`}
                src={info.imageUrl} objectFit='contain'
                width={breakpoint === 'mobile' ? 100 : 150} height={breakpoint === 'mobile' ? 56.25 : 85}
            />
            {(breakpoint !== 'mobile') &&
                <p className={`text-lg xs:text-2xl text-center font-normal break-words`}>
                    {info.title}
                </p>
            }
            {/* <m.div className='bg-white rounded-md'
                initial="hide"
                animate={show ? 'show' : 'hide'}
                variants={{
                    hide: {
                        opacity: 0,
                        width: '0vw',
                        height: '0vh',
                        position: 'absolute'
                    },
                    show: {
                        opacity: 1,
                        width: '80vw',
                        height: '25vh',
                        position: 'fixed',
                        bottom: 0,
                        left: 0
                    },
                }}
                transition={{
                    duration: 0.5,
                }}
            >
             Hey man
            </m.div> */}
            
        </m.div>
    )
}

export default InterestLangCard;

            {/* <div className='relative w-[100px] xs:w-[150px] h-[56.25px] xs:h-[85px] rounded-md overflow-hidden'> */}

            {/* <m.div
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
            </m.div> */}
            {/* <m.div
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
            </m.div> */}