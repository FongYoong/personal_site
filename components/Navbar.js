import { useState, useEffect, useRef, forwardRef } from 'react'
import Link from 'next/link'
import { LazyMotion, domAnimation, m } from "framer-motion";
import useBreakpoint from 'use-breakpoint';
import { breakpoints } from '../lib/constants';
import { AiFillHome } from 'react-icons/ai'
import { CgClose } from 'react-icons/cg'
import { HiMenu } from 'react-icons/hi'
 
const navPages = [
    {
        title: "Home",
        href: "/",
        icon: <AiFillHome className='h-full' />
    },
    {
        title: "Projects",
        href: "/projects"
    },
    {
        title: "Blog",
        href: "/blog"
    },
    {
        title: "Contact",
        href: "/contact"
    },
]

const NavbarButton = forwardRef(({children, href, className, onClick, selected=false}, ref) => {
    return (
        <Link href={href} scroll={false} >
            <a ref={ref} onClick={onClick} >
                <button className={`text-lg font-normal rounded-md ${selected?'bg-violet-600':''} hover:bg-violet-700 active:bg-violet-900 p-[0.5em] ${className}`} >
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

    const { breakpoint } = useBreakpoint(breakpoints, 'mobile');
    const navButtonsRef = useRef([]);
    const [highlightParams, setHighlightParams] = useState(initialHighlightParams);
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    let pageIndex;
    const page = navPages.find((p, index) => {
        if(p.href === currentPage) {
            pageIndex = index;
            return true
        }
    });

    useEffect(() => {
        if (breakpoint !== 'mobile') {
            if (page) {
                const currentButton = navButtonsRef.current[pageIndex];
                setHighlightParams({
                    left: currentButton.offsetLeft,
                    width: currentButton.clientWidth,
                })
            }
            else {
                setHighlightParams(initialHighlightParams)
            }
        }
    }, [currentPage, breakpoint])
    
    return (
        <div className="pointer-events-none z-[100] fixed w-full min-h-[10vh] flex flex-col justify-center items-start xs:items-end content-center py-2 px-2">
            <div className="pointer-events-auto bg-black relative flex gap-2 justify-center content-center" >
                {
                    breakpoint === 'mobile' ?
                    <>
                        <NavbarButton href='/' >
                            <AiFillHome size='10vw' />
                        </NavbarButton>
                        <button className="text-white text-lg rounded-md hover:bg-violet-700 active:bg-violet-900 p-[0.5em]"
                            onClick={() => setShowMobileMenu(!showMobileMenu)}
                        >
                            {showMobileMenu ? <CgClose size='10vw' /> : <HiMenu size='10vw' />}
                        </button>
                    </>
                    :
                    <>
                        <LazyMotion features={domAnimation}>
                            <m.div className='h-full absolute top-0 border-y-2 border-y-violet-300 bg-transparent'
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
                        {navPages.map((page, index) =>
                            <NavbarButton key={index} ref={el => navButtonsRef.current[index] = el}
                                className='h-full'
                                href={page.href} >
                                {page.icon ? page.icon : page.title}
                            </NavbarButton>)
                        }
                    </>
                }
            </div>
            <m.div className='pointer-events-auto overflow-hidden rounded-md relative w-full flex flex-wrap gap-2 justify-center items-center content-center bg-[#5C527F] '
                initial='hide'
                animate={showMobileMenu ? 'show' : 'hide'}
                exit="hide"
                variants={{
                    hide: {
                        //borderWidth: 0,
                        rotateY: 90
                    },
                    show: {
                        //borderWidth: 2,
                        rotateY: 0
                    },
                }}
                transition={{
                    type: "tween",
                    duration: 0.3
                    //bounce: 0.2
                }}
            >
                {navPages.slice(1).map((page, index) =>
                    <NavbarButton key={index} selected={pageIndex - 1 == index}
                        onClick={() => setShowMobileMenu(false)}
                        href={page.href} >
                        {page.icon ? page.icon : page.title}
                    </NavbarButton>)
                }
            </m.div>
        </div>
    )
}

export default Navbar;