import { useState, useEffect, useRef, forwardRef } from 'react'
import Link from 'next/link'
import { LazyMotion, domAnimation, m } from "framer-motion";

const navPages = [
    {
        title: "Home",
        href: "/"
    },
    {
        title: "Projects",
        href: "/projects"
    },
    {
        title: "Blog",
        href: "/blog"
    }
]

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

    const navButtonsRef = useRef([]);
    const [highlightParams, setHighlightParams] = useState(initialHighlightParams);

    useEffect(() => {
        let pageIndex;
        const page = navPages.find((p, index) => {
            if(p.href === currentPage) {
                pageIndex = index;
                return true
            }
        });
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
                {navPages.map((page, index) =>
                    <NavbarButton key={index} ref={el => navButtonsRef.current[index] = el}
                        href={page.href} >
                        {page.title}
                    </NavbarButton>)
                }
            </div>
        </div>
    )
}

export default Navbar;