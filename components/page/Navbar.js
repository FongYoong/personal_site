import { useState, useEffect, useRef, forwardRef } from 'react'
import { m } from "framer-motion";
import useBreakpoint from 'use-breakpoint';
import { breakpoints } from '../../lib/constants';
import { ClientLink } from '../elements/Link';
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
    // {
    //     title: "Blog",
    //     href: "/blog"
    // },
    {
        title: "Contact",
        href: "/contact"
    },
]

const NavbarButton = forwardRef(({children, href, aClassName, className, onClick, selected=false}, ref) => {
    return (
        <ClientLink href={href} className={aClassName} ref={ref} onClick={onClick} scroll={true} >
            <button className={`text-lg rounded-md ${selected?'bg-violet-600 font-bold underline':'font-normal'} hover:bg-violet-700 active:bg-violet-900 p-[0.5em] ${className}`} >
                {children}
            </button>
        </ClientLink>
    )
})

const initialHighlightParams = {
    left: 0,
    width: 0,
};

export const Navbar = ({currentPage}) => {

    const { breakpoint } = useBreakpoint(breakpoints, 'mobile');
    const navButtonsRef = useRef([]);
    const [highlightParams, setHighlightParams] = useState(initialHighlightParams);
    const [ready, setReady] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    let pageIndex;
    const page = navPages.find((p, index) => {
        if(p.href === currentPage) {
            pageIndex = index;
            return true
        }
    });

    

    useEffect(() => {
        setTimeout(() => {
            setReady(true)
        }, 100);
    }, [])

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
        <div className={`${ready?'opacity-100':'opacity-0'} transition-opacity pointer-events-none z-[100] fixed w-full min-h-[10vh] flex flex-col justify-center items-center content-center py-2 px-2`}>
            {
                breakpoint === 'mobile' ?
                <div className="pointer-events-auto overflow-hidden place-self-start max-w-full relative flex justify-center items-start content-center" >
                    <button className="z-10 bg-slate-700 text-white text-lg rounded-md hover:bg-violet-700 active:bg-violet-900 p-[0.5em]"
                        onClick={() => setShowMobileMenu(!showMobileMenu)}
                    >
                        {showMobileMenu ? <CgClose size='10vw' /> : <HiMenu size='10vw' />}
                    </button>
                    <m.div className='overflow-hidden rounded-md flex flex-col gap-2 justify-center items-center content-center bg-[#4b4368] '
                        initial='hide'
                        animate={showMobileMenu ? 'show' : 'hide'}
                        exit="hide"
                        variants={{
                            hide: {
                                width: 0,
                                height: 0,
                            },
                            show: {
                                width: '100vw',
                                height: 'auto',
                            },
                        }}
                        transition={{
                            type: "tween",
                            duration: 0.3
                            //bounce: 0.4
                        }}
                    >
                        {navPages.map((page, index) =>
                            <NavbarButton key={index} selected={pageIndex == index}
                                aClassName="w-full"
                                className="w-full"
                                onClick={() => setShowMobileMenu(false)}
                                href={page.href}
                            >
                                {page.title}
                            </NavbarButton>)
                        }
                    </m.div>
                </div>
                :
                <div className="pointer-events-auto bg-black place-self-end relative flex gap-2 justify-center items- content-center">
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
                    {navPages.map((page, index) =>
                        <NavbarButton key={index} ref={el => navButtonsRef.current[index] = el}
                            className='h-full'
                            href={page.href} >
                            {page.icon ? page.icon : page.title}
                        </NavbarButton>)
                    }
                </div>
            }
        </div>
    )
}

export const NavbarSpace = () => {
    return (
        <div className='relative pt-[15vh]' />
    )
}