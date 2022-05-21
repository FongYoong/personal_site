import Link from 'next/link'
import { m } from "framer-motion";
import { AiFillGithub } from 'react-icons/ai'
import { GiGamepad } from 'react-icons/gi'
import { MdOutlineSummarize } from 'react-icons/md'

const ProjectCard = ({info}) => {

    return (
        <m.div
            className={`relative text-black p-4 rounded-lg w-full xs:w-auto flex flex-col gap-2 justify-center items-start content-center`}
            style={{
                backgroundColor: info.backgroundColor,
            }}
            initial="hide"
            whileInView="show"
            viewport={{ once: false }}
            variants={{
                hide: {
                    scale: 0.8
                },
                show: {
                    scale: 1
                }
            }}
            transition={{
                type: "spring",
                bounce: 0.4,
                duration: 0.8
            }}
        >
            <div className='w-full flex flex-wrap gap-1 justify-center items-center content-center' >
                <div className='text-black'>
                    {info.icon}
                </div>
                <div className='flex flex-wrap grow gap-1 justify-between items-center content-center' >
                    <h1 className={`font-bold text-lg xs:text-2xl text-center break-words`}>
                        {info.title}
                    </h1>
                    <h2 className='font-bold text-sm xs:text-md text-start'>
                        ({info.year})
                    </h2>
                </div>

            </div>
            {/* <p className={`font-bold text-sm xs:text-md text-black text-start`}>
                {info.year}
            </p> */}
            <div className='bg-black opacity-20 h-[2px] w-full px-2' />
            <p className={`font-bold text-sm xs:text-lg text-start`}>
                {info.description}
            </p>
            <div className='w-full flex flex-wrap gap-2 justify-end items-center content-center' >
                <a className='hover:opacity-60 border-black border-2 rounded-full' href={info.githubUrl} target="noopener" >
                    <AiFillGithub size='2em' />
                </a>
                {info.demoUrl &&
                    <a href={info.demoUrl} target="noopener" >
                        <button className="h-full text-sm xs:text-md font-normal text-white rounded-lg bg-black hover:bg-slate-700 p-[0.5em]" >
                            <GiGamepad className='inline-block' /> Demo
                        </button>
                    </a>
                }

                <Link href={info.url} >
                    <a target="noopener" >
                        <button className="h-full text-sm xs:text-md font-normal text-white rounded-lg bg-black hover:bg-slate-700 p-[0.5em]" >
                            <MdOutlineSummarize className='inline-block' /> Write-up
                        </button>
                    </a>
                </Link>
            </div>
            

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

export default ProjectCard;