import { useState, useEffect, useRef, useCallback } from "react";
import { m } from "framer-motion";
import { useInView } from 'react-intersection-observer';
import Button from '../elements/Button';
import { MdExpandLess, MdExpandMore } from 'react-icons/md';
import 'intersection-observer';

const TableOfContents = ({headers}) => {
    const [show, setShow] = useState(false);

    const ref = useRef();
    const [inViewRef, inView] = useInView({
        initialInView: true,
        threshold: 0,
    });

    const setRefs = useCallback(
        (node) => {
          // Ref's from useRef needs to have the node assigned to `current`
          ref.current = node;
          // Callback refs, like the one from `useInView`, is a function that takes the node as an argument
          inViewRef(node);
        },
        [inViewRef],
    );

    useEffect(() => {
        if (!inView && floatingState === "back") {
            setFloatingState("toc")
        }
    }, [inView])


    const [floatingState, setFloatingState] = useState("toc"); // toc, back
    const [lastScrollPosition, setLastScrollPosition] = useState(0);

    return (
        <m.div
            tabIndex={0}
            ref={setRefs}
            className="relative cursor-pointer hover:bg-[#892CDC] my-4 p-2 rounded-md w-[90%] flex flex-col justify-center items-center content-center"
            initial='show'
            animate={show ? 'show' : 'hide'}
            whileHover={{ 
                boxShadow: '0px 0px 0px 1px rgba(255,255,255,255)',
            }}
            whileTap={{ 
                boxShadow: '0px 0px 0px 2px rgba(255,255,255,255)',
            }}
            whileFocus={{
                boxShadow: '0px 0px 0px 1px rgba(255,255,255,255)',
            }}
            variants={{
                hide: {
                    backgroundColor: "#6922a8"
                },
                show: {
                    backgroundColor: "#6922a8"
                }
            }}
            transition={{
                duration: 0.3,
            }}
            onClick={() => setShow(!show)}
        >
            <div className='flex gap-1 justify-center items-center content-center' >
                {show ? <MdExpandLess /> : <MdExpandMore /> }
                <h1 className={`${show?'font-bold':'font-normal'} text-md xs:text-lg text-center break-words`}>
                    Table of Contents
                </h1>
            </div>
            <m.div
                className='overflow-hidden flex flex-col gap-2 justify-center items-start content-center'
                initial='hide'
                animate={show ? 'show' : 'hide'}
                variants={{
                    hide: {
                        marginTop: 0,
                        height: 0,
                    },
                    show: {
                        marginTop: 8,
                        height: 'auto',
                    }
                }}
                transition={{
                    duration: 0.3,
                }}
            >
                {headers.map((header, index) => 
                    <p key={index} className="text-md xs:text-lg hover:underline"
                        onClick={(e) => {
                            e.stopPropagation();
                            const scrollElement = document.querySelector(`#${header.id}`);
                            const elementPosition = scrollElement.getBoundingClientRect().top;
                            const offsetPosition = elementPosition + window.pageYOffset - 80;
                            window.scrollTo({ top: offsetPosition, behavior: "smooth" });
                            //scrollElement.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
                        }}
                    >
                        {`${index + 1}. ${header.title}`}
                    </p>
                )}
            </m.div>
            <m.div
                className='pointer-events-none fixed w-screen h-screen left-0 top-0 z-10 flex flex-col gap-2 justify-end items-end content-end'
                initial='hide'
                animate={floatingState === "back" ? "show" : (inView ? 'hide' : 'show')}
                variants={{
                    hide: {
                        x: '100vw'
                    },
                    show: {
                        x: 0
                    }
                }}
                transition={{
                    type: 'spring',
                    bounce: 0.2,
                    damping: 15
                }}
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <div className="m-4" >
                    <Button className="pointer-events-auto text-md xs:text-lg bg-purple-700"
                        onClick={(e) => {
                            if (floatingState === "toc") {
                                setShow(true);
                                setLastScrollPosition(window.pageYOffset);
                                // ref.current.scrollIntoView({behavior: "auto", block: "nearest", inline: "nearest"});
                                const elementPosition = ref.current.getBoundingClientRect().top;
                                const offsetPosition = elementPosition + window.pageYOffset - 80;
                                window.scrollTo({ top: offsetPosition, behavior: "auto" });
                                setFloatingState("back")
                            }
                            else if (floatingState === "back") {
                                window.scrollTo({ top: lastScrollPosition, behavior: "auto" });
                                setFloatingState("toc")
                            }
                        }}
                    >
                        {floatingState === "toc" ? <MdExpandLess size="2em" /> : "Go Back"}
                    </Button>
                </div>
                {/* {headers.map((header, index) => 
                    <p key={index} className="text-sm xs:text-md hover:underline"
                    
                    >
                        {`${index + 1}. ${header.title}`}
                    </p>
                )} */}
            </m.div>
        </m.div>
    )
}

export default TableOfContents;

{/* <ClientLink key={index} href={`${baseUrl}#${header}`} className="hover:underline" >
<p  className="text-lg xs:text-2xl">
    {`${index + 1}. ${header}`}
</p>
</ClientLink> */}