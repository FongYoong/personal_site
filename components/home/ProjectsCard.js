import { m } from "framer-motion";
import Button from '../elements/Button';
import Divider from '../elements/Divider';
import { Link, ClientLink } from '../elements/Link';
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
            <Divider className='bg-black' />
            <p className={`font-bold text-sm xs:text-lg text-start`}>
                {info.description}
            </p>
            <div className='w-full flex flex-wrap gap-2 justify-end items-center content-center' >
                <Link href={info.githubUrl} className="hover:opacity-60 border-black border-2 rounded-full" >
                    <AiFillGithub size='2em' />
                </Link>
                {info.demoUrl &&
                    <Link href={info.demoUrl} >
                        <Button className="text-sm xs:text-md text-white bg-black" >
                            <GiGamepad className='inline-block' /> Demo
                        </Button>
                    </Link>
                }

                <ClientLink href={info.url} newTab >
                    <Button className="text-sm xs:text-md text-white bg-black" >
                        <MdOutlineSummarize className='inline-block' /> Write-up
                    </Button>
                </ClientLink>
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