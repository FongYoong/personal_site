import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import lax from "lax.js"
import { m } from "framer-motion";
import { Link, ClientLink } from '../components/elements/Link';
import PageHeader from '../components/page/PageHeader'
import { academicCourses, notableProjects } from '../lib/constants'
import { DownArrow } from '../components/Indicators'
import Button from '../components/elements/Button'
import AcademicCourseCard from '../components/home/AcademicCourseCard'
import InterestMath from '../components/home/InterestMath'
import InterestGraphics from '../components/home/InterestGraphics'
import InterestLangTitle from '../components/home/InterestLangTitle'
import InterestLangContent from '../components/home/InterestLangContent'
import SkillContent from '../components/home/SkillContent'
import ProjectCard from '../components/home/ProjectsCard'
import HobbiesMusic from '../components/home/HobbiesMusic'
import animStyles from '../styles/anim.module.css'
import { FaChevronCircleRight } from 'react-icons/fa'
import { AiOutlineComment } from 'react-icons/ai'

export default function Home() {

  const academicsRef = useRef();
  const workRef = useRef();
  const interestsRef = useRef();
  const skillsRef = useRef();

  const [interestMathProgress, setInterestMathProgress] = useState(0);
  const [interestGraphicsProgress, setInterestGraphicsProgress] = useState(0);
  const [showInterestGraphics3DTitle, setShowInterestGraphics3DTitle] = useState(false);
  const [interestLangProgress, setInterestLangProgress] = useState(0);

  const [showAcademics, setShowAcademics] = useState(false);
  const [showInterestMath, setShowInterestMath] = useState(false);
  const [showInterestGraphics, setShowInterestGraphics] = useState(false);
  const [showInterestLang, setShowInterestLang] = useState(false);
  const [showSkills, setShowSkills] = useState(false);

  useEffect(() => {
    lax.init();
    lax.addDriver("scrollY", function () {
      return window.scrollY;
    });
    lax.addDriver("academicsScrollY", function () {
      if(academicsRef.current) {
        const rect = academicsRef.current.getBoundingClientRect();
        return -rect.top;
      }
    });
    lax.addDriver("workScrollY", function () {
      if(workRef.current) {
        const rect = workRef.current.getBoundingClientRect();
        return -rect.top;
      }
    });
    lax.addDriver("interestsScrollY", function () {
      if(interestsRef.current) {
        const rect = interestsRef.current.getBoundingClientRect();
        return -rect.top;
      }
    });
    lax.addDriver("skillsScrollY", function () {
      if(skillsRef.current) {
        const rect = skillsRef.current.getBoundingClientRect();
        return -rect.top;
      }
    });

    lax.addElements(
      ".hey_there", {
        scrollY: {
          // rotate: [
          //   [0, 1e9],
          //   [0, 1e9]
          // ]
          // translateX: [
          //   ["elCenterY", "elOutY"],
          //   [0, 'screenWidth'],
          // ],
          // opacity: [
          //   ["elCenterY + 200", "elOutY + 200"],
          //   [1, 0],
          // ]
          // scale: [
          //   ["elCenterY", "elOutY"],
          //   [1, 0],
          // ],
          blur: [
            ["elCenterY", "elCenterY+100", "elOutY-200"],
            [0, 20, 40],
          ],
        }
      },
      []
    );
    lax.addElements(
      ".stumbled", {
        scrollY: {
          translateX: [
            ["elInY-400", "elCenterY", "elOutY"],
            ["screenWidth", 0, 0],
          ],
        }
      },
      []
    );
    lax.addElements(
      ".overview_intro", {
        scrollY: {
          translateX: [
            ["elInY-400", "elCenterY", "elOutY"],
            ["-screenWidth", 0, 0],
          ],
        }
      },
      []
    );
    lax.addElements(
      ".academicsUni", {
        academicsScrollY: {
          scale: [
            [-800, -300, 100],
            [0, 1, 1.1],
          ],
          translateX: [
            [100, 500],
            [0, "-screenWidth - 10"],
          ],
        }
      },
      []
    );
    lax.addElements(
      ".academicCoursesContainer", {
        academicsScrollY: {
          opacity: [
            [100, 500, 1300, 1500],
            [0, 1, 1, 0],
          ],
        }
      },
      {
        onUpdate: (driverValues, domElement) => {
          const scrollY = driverValues.academicsScrollY[0];
          const minScroll = 500;
          const maxScroll = 1500;
          if (scrollY > minScroll) {
            if (scrollY < maxScroll) {
              setShowAcademics(true);
            }
            else {
              setShowAcademics(false);
            }
          }
          else {
            setShowAcademics(false);
          }
        }
      }
    );
    lax.addElements(
      ".academicCoursesTitle", {
        academicsScrollY: {
          translateY: [
            [100, 700, 1500],
            {
              640: ["-screenHeight", -10, 0], // Screen width < 640
              1536: ["-screenHeight", -100, -10], // Screen width > 640
            },
          ],
        }
      },
      []
    );
    lax.addElements(
      ".academicCourseCard", {
        academicsScrollY: {
          translateX: [
            [100, 700, 1500],
            ["200+index*100", 0, -20],
          ],
        }
      },
      []
    );
    lax.addElements(
      ".academicCoursesImage", {
        academicsScrollY: {
          scale: [
            [100, 500, 1500],
            [1, 1.1, 1.5],
          ],
        }
      },
      []
    );

    lax.addElements(
      ".workContainer", {
        workScrollY: {
          opacity: [
            [100, 500, 1600, 1800],
            [0, 1, 1, 0],
          ],
        }
      },
    );
    lax.addElements(
      ".workTitle", {
        workScrollY: {
          scale: [
            [0, 400, 1800],
            [0, 1, 1.1],
          ],
        }
      },
      []
    );
    lax.addElements(
      ".workCard", {
        workScrollY: {
          scale: [
            ["200 + index*200", "600 + index*200"],
            [0, 1],
          ],
        }
      },
      []
    );

    lax.addElements(
      ".interestsContainer", {
        interestsScrollY: {
          rotateY: [
            [100, 300, 500],
            [90, 20, 0],
          ],
          opacity: [
            [6000, 6500],
            [1, 0],
          ],
        }
      },
      []
    );
    lax.addElements(
      ".interestsTitle", {
        interestsScrollY: {
          opacity: [
            [500, 1000],
            [1, 0],
          ],
        }
      },
      []
    );
    lax.addElements(
      ".interestsMathTitle", {
        interestsScrollY: {
          opacity: [
            [500, 1000, 2000, 2500],
            [0, 1, 1, 0],
          ],
        }
      },
      {
        onUpdate: (driverValues, domElement) => {
          const scrollY = driverValues.interestsScrollY[0];
          const minScroll = 500;
          const maxScroll = 2500;
          if (scrollY > minScroll) {
            if (scrollY < maxScroll) {
              setShowInterestMath(true);
              const progress = 1 - (maxScroll - scrollY) / (maxScroll - minScroll);
              setInterestMathProgress(Math.round(progress * 100) / 100)
            }
            else {
              setShowInterestMath(false);
            }
          }
          else {
            setInterestMathProgress(0);
            setShowInterestMath(false);
          }
        }
      }
    );
    lax.addElements(
      ".interestsMathCanvas", {
        interestsScrollY: {
          opacity: [
            [2000, 2500],
            [1, 0],
          ],
        }
      }
    );
    lax.addElements(
      ".interestsGraphicsTitle", {
        interestsScrollY: {
          opacity: [
            [2000, 2500, 4200, 4500],
            [0, 1, 1, 0],
          ],
          skewX: [
            [2500, 3500],
            [0, -15],
          ],
          scale: [
            [3500, 4500],
            [1, 1.2],
          ],
        }
      },
      {
        onUpdate: (driverValues, domElement) => {
          const scrollY = driverValues.interestsScrollY[0];
          const minScroll = 2000;
          const changeTitleScroll = 3250;
          const maxScroll = 4500;
          if (scrollY > minScroll) {
            if (scrollY < maxScroll) {
              setShowInterestGraphics(true);
              if (scrollY > changeTitleScroll) {
                setShowInterestGraphics3DTitle(true);
              }
              else {
                setShowInterestGraphics3DTitle(false);
              }
              const progress = 1 - (maxScroll - scrollY) / (maxScroll - minScroll);
              setInterestGraphicsProgress(Math.round(progress * 100) / 100)
            }
            else {
              setShowInterestGraphics(false);
            }
          }
          else {
            setInterestGraphicsProgress(0)
            setShowInterestGraphics(false);
          }
        }
      }
    );
    lax.addElements(
      ".interestsGraphicsCanvas", {
        interestsScrollY: {
          opacity: [
            [500, 2000, 2500, 4300, 4500],
            [0, 0, 1, 1, 0],
          ],
        }
      }
    );
  
    lax.addElements(
      ".interestsLangTitle", {
        interestsScrollY: {
          opacity: [
            [4500, 5000],
            [0, 1],
          ],
        }
      },
      {
        onUpdate: (driverValues, domElement) => {
          const scrollY = driverValues.interestsScrollY[0];
          const minScroll = 4500;
          const maxScroll = 6500;
          if (scrollY > minScroll) {
            if (scrollY < maxScroll) {
              setShowInterestLang(true);
              const progress = 1 - (maxScroll - scrollY) / (maxScroll - minScroll);
              setInterestLangProgress(Math.round(progress * 100) / 100)
            }
            else {
              setShowInterestLang(false);
            }
          }
          else {
            setInterestLangProgress(0);
            setShowInterestLang(false);
          }
        }
      }
    );
    lax.addElements(
      ".interestsLangContent", {
        interestsScrollY: {
          opacity: [
            [4500, 5000],
            [0, 1],
          ],
        }
      },
      []
    );
    lax.addElements(
      ".interestsLangCard", {
        interestsScrollY: {
          rotateX: [
            ["4500 + index*100", "5000 + index*100"],
            [90, 0],
          ],
        }
      },
      []
    );
    
    lax.addElements(
      ".skillsContainer", {
        skillsScrollY: {
          opacity: [
            [-300, 0],
            [0, 1],
          ],
          translateY: [
            [1000, 1300],
            [0, '-1.5*screenHeight']
          ]
        }
      },
      {
        onUpdate: (driverValues, domElement) => {
          const scrollY = driverValues.skillsScrollY[0];
          const minScroll = 0;
          const maxScroll = 1500;
          if (scrollY > minScroll) {
            if (scrollY < maxScroll) {
              setShowSkills(true);
            }
            else {
              setShowSkills(false);
            }
          }
          else {
            setShowSkills(false);
          }
        }
      }
    );
    lax.addElements(
      ".skillsTitle", {
        skillsScrollY: {
          translateY: [
            [-300, 200],
            ["screenHeight", 0],
          ],
        }
      },
      []
    );
    lax.addElements(
      ".skillsCard", {
        skillsScrollY: {
          translateX: [
            //["4500 + index*100", "5000 + index*100"],
            ["100 + index*100", "400 + index*100"],
            ["screenWidth * Math.pow(-1, index)", 0],
          ],
        }
      },
      []
    );
    lax.addElements(
      ".hobbiesMusicButton", {
        scrollY: {
          translateX: [
            ["elCenterY-600+index*80", "elCenterY-400+index*80", "elOutY"],
            ["screenWidth", 0, 0],
          ],
        }
      },
      []
    );
  }, []);

  return (
    // min-h-[3000vh]
    <>
      <PageHeader title="Home" />
      {/* <div className='fixed z-20 right-0 bottom-0' >
        Scroll Down
      </div> */}
      <div className='relative pb-8 w-full flex flex-col gap-4 justify-start items-center content-center overflow-hidden' >
        <div className='hey_there flex flex-col justify-start items-center h-screen' >
          <h1 className="text-center text-5xl xs:text-7xl font-bold">
            Hey there! <span className={animStyles.wave}>👋</span>
          </h1>
          <br />
          <h1 className="text-center text-2xl xs:text-4xl font-bold">
            Keep scrolling down...
          </h1>
          <DownArrow className="h-[4em]" delay={0} />
          <DownArrow className="h-[3em]"  delay={0.3} />
          <DownArrow className="h-[2em]"  delay={0.7} />
          <DownArrow className="h-[1em]"  delay={1} />
        </div>
        {/* <div className='stumbled px-4'>
          <h2 className="text-5xl font-bold">
          Looks like you&apos;ve stumbled upon my top-secret site <span className={animStyles.shake} >😲</span>
          </h2>
        </div>
        <div className='overview_intro pt-[25vh] px-4'>
          <h2 className="text-5xl font-bold">
            But since you&apos;re here anyway...
          </h2>
        </div> */}

        {/* Academics */}
        <div ref={academicsRef} className='' />
        <div className='academicsUni fixed left-0 top-0 w-screen h-screen p-4 flex flex-col gap-4 justify-center items-center'>
          <Image alt='UTAR image' className='rounded-md' src='/images/utar_campus.jpg' width='300' height='170'
            placeholder="blur" blurDataURL="/images/placeholder.svg"
          />
          <p className="text-2xl text-center font-normal">
            I&apos;m an&nbsp;
            <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-violet-300 to-pink-400" >
              Electrical & Electronics
            </span>
            &nbsp;graduate from <Link href="https://study.utar.edu.my/utar-at-a-glance.php" className='underline' >UTAR</Link> (Jan 2019- Dec 2022)
          </p>
        </div>

        <div className={`academicCoursesContainer ${showAcademics?'':'pointer-events-none'} fixed left-0 top-0 w-screen h-screen p-4 flex flex-wrap gap-8 justify-center items-center content-center`}>
          <h2 className="academicCoursesTitle text-3xl xs:text-5xl font-bold">
            With courses like:
          </h2>
          <div className='flex flex-wrap gap-8 justify-center items-center content-center' >
            {academicCourses.map((info, index) => {
              return (
                <AcademicCourseCard key={index} info={info} />
            )})}
          </div>
        </div>

        {/* Work */}
        <div ref={workRef} className='mt-[1500px]' />
        <div className={`workContainer fixed left-0 top-0 w-screen h-screen p-4 flex flex-col gap-8 justify-center items-center content-center`}>
          <div className="workTitle flex gap-2 sm:gap-4 justify-center items-center pt-12 sm:pt-0" >
            <h2 className="text-lg sm:text-2xl font-bold text-center">
              What I currently do at
            </h2>
            <Link href="https://en.wikipedia.org/wiki/Intel" className='border-2 border-transparent transition-all duration-300 hover:border-blue-500 p-2 rounded-md' >
              <Image alt='Intel logo' className='rounded-md' src='/images/intel_logo.svg' width={120} height={0.38 * 120}
                placeholder="blur" blurDataURL="/images/placeholder.svg"
              />
            </Link>
          </div>
          <ul className="list-disc list-inside p-4 space-y-4 rounded-lg">
            {[
              <span key="" >Pre-silicon validation of <b>Debug</b> features in client SoCs, particularly <b>trace, trigger and run control</b>.</span>,
              <span key="" >Maintaining <b>SystemVerilog/UVM simulation</b> tests and Python-based <b>emulation</b> test content, with some Perspec along the way for core stuff.</span>,
              <span key="" >Working with <b>TAP</b> and functional protocols/fabrics for register configurations and debug use cases in post-silicon.</span>,
              "Developing mostly Python scripts for post-processing checks and various innovation initiatives to improve pre-silicon design quality",
            ].map((el, index) => 
              <li key={index} className="workCard text-md sm:text-lg" >
                {el}
              </li>
            )}
          </ul>
        </div>

        {/* Interests */}
        <div ref={interestsRef} className='mt-[1800px]' />
        <div className='interestsContainer fixed left-0 top-0 w-screen h-screen pt-[10vh] flex flex-col gap-8 justify-center items-center content-start'>
          <div className='relative w-full h-[15%]'>
            <h2 className="interestsTitle absolute bottom-0 w-full text-center text-3xl xs:text-5xl font-bold">
              My theoretical interests include...
            </h2>
            <h2 className={`interestsMathTitle ${showInterestMath? '':'pointer-events-none'} absolute bottom-0 w-full text-center text-3xl xs:text-5xl font-bold`} >
              Most kind of math <br />
              <span className='text-center text-sm font-normal' >
                Except boring <Link href="https://en.wikipedia.org/wiki/Category_theory" className='underline' >category theory</Link>
              </span>
            </h2>
            <h2 className={`interestsGraphicsTitle ${showInterestGraphics? '':'pointer-events-none'} absolute bottom-0 w-full text-center text-3xl xs:text-5xl font-bold`} >
              <span className={`${showInterestGraphics3DTitle ? "text-pink-500" : "text-green-500"}`}
                style={{
                  textShadow: showInterestGraphics3DTitle ? '2px 1px 2px #c377f2' : '0px 0px 0px'
                }}
              >
                {showInterestGraphics3DTitle ? "3D" : "2D"}
              </span>
              &nbsp;Graphics
            </h2>
            <InterestLangTitle
              className={`interestsLangTitle ${showInterestLang? '':'pointer-events-none'} absolute bottom-0 p-2 w-full break-words text-center text-2xl xs:text-4xl font-bold`}
              progress={interestLangProgress / 0.6}
            />
          </div>
          <div className='relative w-full grow' >
            <InterestMath className='interestsMathCanvas absolute w-full h-full'
              show={showInterestMath}
              progress={interestMathProgress}
            />
            <InterestGraphics className='interestsGraphicsCanvas absolute w-full h-full'
              show={showInterestGraphics}
              progress={interestGraphicsProgress}
            />
            <InterestLangContent show={showInterestLang} className='interestsLangContent absolute w-full h-full' />
          </div>
        </div>

        {/* Skills */}
        <div ref={skillsRef} className='mt-[6300px]' />
        <div className={`skillsContainer ${showSkills? '':'pointer-events-none'} fixed left-0 top-0 w-screen h-screen pt-[10vh] flex flex-col gap-8 justify-center items-center content-start`}>
          <div className='relative w-full h-[10%]'>
            <h2 className="skillsTitle absolute bottom-0 w-full text-center text-3xl xs:text-5xl font-bold">
              My skills include...
            </h2>
          </div>
          <div className='relative w-full grow' >
            <SkillContent show={true} className='absolute w-full h-full' />
          </div>
        </div>
        
        {/* Projects */}
        <div className='mt-[1500px]' />
        <h2 className="text-center text-3xl xs:text-5xl font-bold">
            I like side projects...
        </h2>
        <div className={`relative w-full flex flex-wrap gap-4 p-2 justify-center items-center content-start`}>
          {notableProjects.map((projectInfo, index) => {
            return (
              <ProjectCard key={index} info={projectInfo} />
            )
          })}
        </div>
        <ClientLink href='/projects' className="relative" newTab >
          <Button className='text-lg xs:text-2xl text-black bg-white' >
            <FaChevronCircleRight className='inline-block' /> More Projects
          </Button>
        </ClientLink>

        {/* Hobbies, side interests, livestreaming, video editing, graphic design, music */}
        <HobbiesMusic className="hobbiesMusic relative p-4 w-full" />

        {/* Contact/Work/Resume */}
        <m.div className='relative mt-8 flex flex-col gap-8 justify-center items-center content-center'
          initial="hide"
          whileInView="show"
          viewport={{ once: false }}
          variants={{
              hide: {
                  scale: 0
              },
              show: {
                scale: 1
              }
          }}
          transition={{
              type: 'spring',
              bounce: 0.3
          }}
        >
          <h2 className="text-center text-2xl xs:text-5xl font-bold">
              Hope you enjoyed the tour 😊
          </h2>
          <ClientLink href='/contact' className="w-[90%] xs:w-auto">
            <Button className='w-full font-bold text-lg xs:text-3xl text-white bg-violet-700' >
              <AiOutlineComment className='inline-block' /> Contact Me
            </Button>
          </ClientLink>
          {/* <Link href="/documents/resume.pdf" className="w-[100%] xs:w-auto" >
            <Button className='w-full font-bold text-lg xs:text-3xl text-white bg-pink-700' >
                <CgFileDocument className='inline-block' /> View My Resume
            </Button>
          </Link> */}
        </m.div>

        {/* <h1 className="text-3xl font-bold underline spinMe">
          Hey there!
        </h1>
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-violet-400 to-pink-600">
            Hello, world!
        </h1> */}
      </div>
    </>
  )
}

// const InterestMath = dynamic(
//   () => import('../components/home/InterestMath'),
//   { loading: () => <Loader className='w-full' /> }
// )
// const InterestGraphics = dynamic(
//   () => import('../components/home/InterestGraphics'),
//   { loading: () => <Loader className='w-full' /> }
// )