import { useState, useContext } from 'react'
import { SideInfoContext } from '../SideInfo';
import Image from 'next/image'
import { m } from "framer-motion";
import useBreakpoint from 'use-breakpoint';
import { breakpoints } from '../../lib/constants';
import { MdExpandLess, MdExpandMore } from 'react-icons/md'

const SkillTool = ({info}) => {
    const { breakpoint } = useBreakpoint(breakpoints, 'mobile');
    return (
        <a href={info.titleUrl} target="noopener"
                    // onClick={() => {
            //     displaySideInfo(info.title,
            //         <a className='hover:underline' href={info.titleUrl} target="noopener" >
            //             <div className='flex flex-col justify-center items-center content-start' >
            //                 <div className='flex gap-4' >
            //                     <h2 className="text-md xs:text-lg font-bold">
            //                         {info.title}
            //                     </h2>
            //                     <FiExternalLink size={15} />
            //                 </div>

            //                 <p className="text-md text-left font-normal break-words">
            //                     {info.description}
            //                 </p>
            //             </div>
            //         </a>
            //     )
            // }}
        >
            <div className='hover:opacity-60 hover:underline rounded-md flex flex-col justify-center items-center content-center'>
                <Image alt={info.title} className=''
                    src={info.imageUrl} objectFit='contain'
                    width={breakpoint === 'mobile' ? 50 : 100} height={breakpoint === 'mobile' ? 50 : 100}
                    onClick={(e) => { 
                        e.stopPropagation()
                    }}
                />
                <p className={`text-sm xs:text-md text-center font-normal break-words`}>
                    {info.title}
                </p>
            </div>
        </a>
    )
}

const SkillCard = ({info, show, setShow}) => {

    //const [displaySideInfo, hideSideInfo] = useContext(SideInfoContext);

    return (
        // bg-slate-700 hover:bg-slate-500
        <m.div
            tabIndex={0}
            className="skillsCard relative cursor-pointer hover:bg-[#892CDC] p-2 rounded-md w-[90%] flex flex-col justify-center items-center content-center"
            initial='hide'
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
            onClick={() => setShow()}
        >
            <div className='flex gap-1 justify-center items-center content-center' >
                {show ? <MdExpandLess /> : <MdExpandMore /> }
                <p className={`${show?'font-bold':'font-normal'} text-lg xs:text-2xl text-center break-words`}>
                    {info.title}
                </p>
            </div>
            <m.div
                className='overflow-hidden flex flex-wrap gap-8 justify-center items-center content-center'
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
                {
                    info.tools.map((toolInfo, index) => 
                        <SkillTool key={index} info={toolInfo} />
                    )
                }
                {/* <p className="text-md text-center font-normal break-words">
                    {info.tools.length}
                </p> */}
            </m.div>

            {/* <Image alt={info.title} className={`rounded-md ${info.className}`}
                src={info.imageUrl} objectFit='contain'
                width={breakpoint === 'mobile' ? 100 : 150} height={breakpoint === 'mobile' ? 56.25 : 85}
            />
            {(breakpoint !== 'mobile') &&
                <p className={`text-lg xs:text-2xl text-center font-normal break-words`}>
                    {info.title}
                </p>
            } */}
            
        </m.div>
    )
}

export default SkillCard;