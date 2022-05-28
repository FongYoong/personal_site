import { m } from "framer-motion";
import Button from '../elements/Button';
import Divider from '../elements/Divider';
import { Link, ClientLink } from '../elements/Link';
import { BiTime, BiCalendar } from 'react-icons/bi'


const ProjectsCard = ({info}) => {
    return (
        <ClientLink className="w-full m-4" href={`/projects/${info.project_id}`} >
            <m.div
                className={`relative p-4 cursor-pointer bg-slate-700 rounded-lg w-full flex flex-col gap-2 justify-center items-start content-center opacity-100 hover:opacity-80`}
                initial="normal"
                style={{
                    boxShadow: '0px 0px 0px 1px rgba(255,255,255,255)'
                }}
                variants={{
                    normal: {
                    },
                    expand: {
                    }
                }}
                transition={{
                    type: "spring",
                    bounce: 0.4,
                    duration: 0.8
                }}
            >
                {/* <div className='w-full flex flex-wrap gap-1 justify-center items-center content-center' >
                    <div className='text-black'>
                        {info.icon}
                    </div>
                    <div className='flex flex-wrap grow gap-1 justify-between items-center content-center' >

                        <h2 className='font-bold text-sm xs:text-md text-start'>
                            ({info.year})
                        </h2>
                    </div>
                </div> */}
                <h1 className={`font-bold text-lg xs:text-2xl text-center break-words`}>
                    {info.title} 
                </h1>
                <div className='flex flex-wrap gap-2 justify-start items-center content-center'>
                    <div className="flex gap-2 justify-center items-center content-center" >
                        <BiCalendar />
                        <p className="text-sm xs:text-md"> {info.date} </p>
                    </div>
                    <div className="flex gap-2 justify-center items-center content-center" >
                        <BiTime />
                        <p className="text-sm xs:text-md"> {info.readingTime} </p>
                    </div>
                </div>
                <Divider className="bg-white" />
                <p className={`font-normal text-sm xs:text-lg text-start`}>
                    {info.description}
                </p>
                {/* <div className='w-full flex flex-wrap gap-2 justify-end items-center content-center' >
                    <Link href={meta.github_link} className="hover:opacity-60 border-black border-2 rounded-full" >
                        <AiFillGithub size='2em' />
                    </Link>
                    {meta.demoUrl &&
                        <Link href={meta.demo_link} >
                            <Button className="text-sm xs:text-md text-white bg-black" >
                                <GiGamepad className='inline-block' /> Demo
                            </Button>
                        </Link>
                    }
                </div> */}
            </m.div>
        </ClientLink>
    )
}

export default ProjectsCard;