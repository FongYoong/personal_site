import { useState } from "react";
import { m } from "framer-motion";
import { ClientLink } from "../elements/Link";
import { MdExpandLess, MdExpandMore } from 'react-icons/md'

const TableOfContents = ({headers}) => {
    const [show, setShow] = useState(false)
    return (
        <m.div
            tabIndex={0}
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
                    backgroundColor: "#52057B"
                },
                show: {
                    backgroundColor: "#892CDC"
                }
            }}
            transition={{
                duration: 0.3,
            }}
            onClick={() => setShow(!show)}
        >
            <div className='flex gap-1 justify-center items-center content-center' >
                {show ? <MdExpandLess /> : <MdExpandMore /> }
                <h1 className={`${show?'font-bold':'font-normal'} text-lg xs:text-2xl text-center break-words`}>
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
                    <p key={index} className="text-lg xs:text-2xl hover:underline"
                        onClick={(e) => {
                            e.stopPropagation();
                            const scrollElement = document.querySelector(`#${header.id}`);
                            const elementPosition = scrollElement.getBoundingClientRect().top;
                            const offsetPosition = elementPosition + window.pageYOffset - 80;
                            window.scrollTo({
                                top: offsetPosition,
                                behavior: "smooth"
                            });
                            //scrollElement.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
                        }}
                    >
                        {`${index + 1}. ${header.title}`}
                    </p>
                )}
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