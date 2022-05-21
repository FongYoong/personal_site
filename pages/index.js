import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import lax from "lax.js"
// import Page, { meta } from '../writings/blog/some_post.mdx'
import { get_all_projects } from '../lib/mdxUtils'
import { academicCourses, notableProjects } from '../lib/constants'
import { DownButton } from '../components/Indicators'
import AcademicCourseCard from '../components/home/AcademicCourseCard'
import InterestMath from '../components/home/InterestMath'
import InterestGraphics from '../components/home/InterestGraphics'
import InterestLangTitle from '../components/home/InterestLangTitle'
import InterestLangContent from '../components/home/InterestLangContent'
import SkillContent from '../components/home/SkillContent'
import animStyles from '../styles/anim.module.css'
import ProjectCard from '../components/home/ProjectsCard'
import { FaChevronCircleRight } from 'react-icons/fa'

export default function Home() {

  const academicsRef = useRef();
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

  // const showInterestMath = interestMathProgress > 0 && interestGraphicsProgress <= 0.01;
  // const showInterestGraphics = interestGraphicsProgress > 0.01 && interestLangProgress <= 0.01;
  // const showInterestLang = interestLangProgress > 0.01;

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
            [-400, 100],
            [0, 1],
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
          const maxScroll = 6000;
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
            [0, '-screenHeight']
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
  }, []);

  return (
    <div className='relative w-full min-h-[3000vh] flex flex-col gap-4 justify-start items-center overflow-x-hidden' >
      <div className='hey_there flex flex-col justify-start items-center h-screen' >
        <h1 className="pt-[20vh] text-center text-5xl xs:text-7xl font-bold">
          Hey there! <span className={animStyles.wave}>👋</span>
        </h1>
        <DownButton className="h-[4em]" delay={0} />
        <DownButton className="h-[3em]"  delay={0.3} />
        <DownButton className="h-[2em]"  delay={0.7} />
        <DownButton className="h-[1em]"  delay={1} />
      </div>
      <div className='stumbled'>
        <h2 className="text-5xl font-bold">
        Looks like you&apos;ve stumbled upon my top-secret site <span className={animStyles.shake} >😲</span>
        </h2>
      </div>
      <div className='overview_intro pt-[25vh]'>
        <h2 className="text-5xl font-bold">
          But since you&apos;re here anyway...
        </h2>
      </div>

      {/* Academics */}
      <div ref={academicsRef} className='' />
      <div className='academicsUni fixed left-0 top-0 w-screen h-screen p-4 flex flex-col gap-4 justify-center items-center'>
        <Image alt='UTAR image' className='rounded-md' src='/images/utar_campus.jpg' width='300' height='170' />
        <p className="text-2xl text-center font-normal">
          I&apos;m a 4th year&nbsp;
          <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-violet-300 to-pink-400" >
            Electrical & Electronics
          </span>
          &nbsp;undergraduate student at <a className='underline' href="https://study.utar.edu.my/utar-at-a-glance.php" target="noopener" >UTAR</a> (2019-2023)
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

      {/* Interests */}
      <div ref={interestsRef} className='mt-[1500px]' />
      <div className='interestsContainer fixed left-0 top-0 w-screen h-screen pt-[10vh] flex flex-col gap-8 justify-center items-center content-start'>
        <div className='relative w-full h-[15%]'>
          <h2 className="interestsTitle absolute bottom-0 w-full text-center text-3xl xs:text-5xl font-bold">
            My theoretical interests include...
          </h2>
          <h2 className={`interestsMathTitle ${showInterestMath? '':'pointer-events-none'} absolute bottom-0 w-full text-center text-3xl xs:text-5xl font-bold`} >
            Most kind of math <br />
            <span className='text-center text-sm font-normal' >
              Except boring <a className='underline' href="https://en.wikipedia.org/wiki/Category_theory" target="noopener" >category theory</a>
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
            className={`interestsLangTitle absolute bottom-0 p-2 w-full break-words text-center text-2xl xs:text-4xl font-bold`}
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
          Notable Projects
      </h2>
      <div className={`relative w-screen flex flex-wrap gap-4 p-2 justify-center items-center content-start`}>
              {notableProjects.map((projectInfo, index) => {
                return (
                  <ProjectCard key={index} info={projectInfo} />
                )
              })}
              <Link href='projects' >
                  <a target="noopener" >
                      <button className="h-full text-lg sm:text-2xl font-normal text-black rounded-lg bg-white hover:bg-slate-300 p-[0.5em]" >
                          <FaChevronCircleRight className='inline-block' /> More Projects
                      </button>
                  </a>
              </Link>
      </div>


      {/* Hobbies, side interests, livestreaming, video editing, graphic design, music */}



      {/* Contact/Work/Resume */}



      {/* <div className='skillsContainer relative w-screen flex flex-col gap-8 justify-center items-center content-start'>
        <h2 className="text-3xl xs:text-5xl font-bold">
          My skills include:
        </h2>
      </div> */}
      {/* <div className='skillsTitle'>
        <h2 className="text-5xl font-bold">
          My skills include:
        </h2>
      </div> */}


      {/* Projects */}
      {/* <div className='projects_overview_intro pt-[10vh] flex flex-col justify-center items-center'>
        <h2 className="text-5xl xs:text-7xl font-bold">
          Check out some of my projects:
        </h2>
      </div> */}


      {/* <h1 className="text-3xl font-bold underline spinMe">
        Hey there!
      </h1>
      <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-violet-400 to-pink-600">
          Hello, world!
      </h1> */}
    </div>
  )
}

export async function getStaticProps() {
  // Call an external API endpoint to get posts
  const allProjects = await get_all_projects();

  console.log(allProjects)

  return {
    props: {
      
    }
  };

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  // return {
  //   props: {
  //     posts,
  //   },
  // }
}

  {/* <Scroll.Container scrollAxis="y" className='h-screen' >
    <Scroll.Section className="h-full flex flex-wrap justify-center content-center" keyframes={keyframes.heading} >
      <h1>Page One</h1>
    </Scroll.Section>
    <Scroll.Section className="h-full flex flex-wrap justify-center content-center" keyframes={keyframes.heading} >
      <h1>Page Two</h1>
    </Scroll.Section>
    <Scroll.Section className="h-full flex flex-wrap justify-center content-center" keyframes={keyframes.heading}>
      <h1>Page Three</h1>
    </Scroll.Section>
  </Scroll.Container> */}