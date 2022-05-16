import { createContext } from 'react'
import { m, AnimatePresence } from "framer-motion";
import { IoMdCloseCircle } from 'react-icons/io'

export const SideInfoContext = createContext(undefined);
  

export const SideInfo = ({show, setShow, contentId, children}) => {


    return (
        <m.div className='fixed bg-slate-700 overflow-auto bottom-0 left-0 w-screen max-h-[30vh] z-50'
            initial='hide'
            animate={show ? 'show' : 'hide'}
            variants={{
                hide: {
                    translateY: '30vh'
                },
                show: {
                    translateY: '0vh'
                }
            }}
            transition={{
                duration: 0.5,
                // type: 'tween'
                type: 'spring',
                // stiffness: 50
            }}
        >
            <div className='absolute top-0 right-[20px] hover:opacity-50'>
                <button onClick={() => {
                    setShow(false)
                }}>
                    <IoMdCloseCircle size={40} />
                    {/* <BsChevronBarDown /> */}
                </button>
            </div>
            <div className='p-4 w-full'>
                <AnimatePresence exitBeforeEnter>
                    <m.div
                        className=''
                        key={contentId}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={{
                            initial: {
                                opacity: 0,
                            },
                            animate: {
                                opacity: 1,
                            },
                            exit: {
                                opacity: 0,
                            },
                        }}
                        transition={{
                            duration: 0.1,
                        }}
                    >
                        {children}
                    </m.div>
                </AnimatePresence>
            </div>

        </m.div>
    )
}

