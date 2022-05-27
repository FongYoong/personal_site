import Image from 'next/image'
import { m } from "framer-motion";
import useBreakpoint from 'use-breakpoint';
import { breakpoints } from '../../lib/constants';
import Button from '../elements/Button';
import { Link } from '../elements/Link';
import { MdExpandLess, MdExpandMore } from 'react-icons/md'

const SkillTool = ({info}) => {
    const { breakpoint } = useBreakpoint(breakpoints, 'mobile');
    return (
        <Link href={info.titleUrl} >
            <Button padding={false} className="hover:underline text-sm xs:text-md flex flex-col justify-center items-center content-center" >
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
            </Button>
            {/* <div className='hover:opacity-60 hover:underline rounded-md flex flex-col justify-center items-center content-center'>
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
            </div> */}
        </Link>
    )
}

const SkillCard = ({info, show, setShow}) => {

    return (
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
                <h1 className={`${show?'font-bold':'font-normal'} text-lg xs:text-2xl text-center break-words`}>
                    {info.title}
                </h1>
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
            </m.div>
        </m.div>
    )
}

export default SkillCard;