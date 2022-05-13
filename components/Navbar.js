import { useState, useEffect, useRef, forwardRef } from 'react'
import Link from 'next/link'
import { LazyMotion, domAnimation, m } from "framer-motion";

const NavbarButton = forwardRef(({children, href}, ref) => {
    return (
        <Link href={href} >
            <a ref={ref} >
                <button className="text-lg font-normal rounded-md hover:bg-violet-700 active:bg-violet-900 p-[0.5em]" >
                    {children}
                </button>
            </a>
        </Link>
    )
})

const initialHighlightParams = {
    left: 0,
    width: 0,
};

const Navbar = ({currentPage}) => {

    const firstButtonRef = useRef();
    const secondButtonRef = useRef();
    const thirdButtonRef = useRef();
    const [highlightParams, setHighlightParams] = useState(initialHighlightParams);
    useEffect(() => {
        if (currentPage == '/') {
            setHighlightParams({
                left: firstButtonRef.current.offsetLeft,
                width: firstButtonRef.current.clientWidth,
            })
        }
        else if (currentPage == '/projects') {
            setHighlightParams({
                left: secondButtonRef.current.offsetLeft,
                width: secondButtonRef.current.clientWidth,
            })
        }
        else if (currentPage == '/blog') {
            setHighlightParams({
                left: thirdButtonRef.current.offsetLeft,
                width: thirdButtonRef.current.clientWidth,
            })
        }
        else {
            setHighlightParams(initialHighlightParams)
        }
    }, [currentPage])
    
    return (
        <div className="z-[100] fixed w-full min-h-[10vh] flex flex-wrap justify-center xs:justify-end content-center py-[1em] px-[1em]">
            <div className="bg-black relative flex flex-wrap gap-4 justify-center content-center" >
                <LazyMotion features={domAnimation}>
                    <m.div className='pointer-events-none h-full absolute top-0 border-y-2 border-y-violet-300 bg-transparent'
                        animate={highlightParams.width >=0 ? 'highlight' : 'none'}
                        variants={{
                            none: {
                                opacity: 0,
                            },
                            highlight: {
                                opacity: 1,
                                left: highlightParams.left,
                                width: highlightParams.width
                            }
                        }}
                        transition={{
                            type: 'spring',
                            //duration: 0.8,
                            bounce: 0.35
                        }}
                    />
                </LazyMotion>
                <NavbarButton ref={firstButtonRef} href="/" >Home</NavbarButton>
                <NavbarButton ref={secondButtonRef} href="/projects" >Projects</NavbarButton>
                <NavbarButton ref={thirdButtonRef} href="/blog" >Blog</NavbarButton>
            </div>
        </div>
    )
}

export default Navbar;