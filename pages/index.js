import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import lax from "lax.js"
// import Page, { meta } from '../writings/blog/some_post.mdx'
import { get_all_projects } from '../lib/mdxUtils'
import { DownButton } from '../components/Indicators'
import AcademicCourse from '../components/AcademicCourse'
import InterestMath from '../components/animations/InterestMath'
import animStyles from '../styles/anim.module.css'
import InterestGraphics from '../components/animations/InterestGraphics'

const academicCourses = [
  {
    imageUrl: '/images/courses/power_systems.jpg',
    title: 'Power Systems',
    description: 'PSSE Xplore and ETAP for simulation'
  },
  {
    imageUrl: '/images/courses/ic_design.jpg',
    title: 'IC Design',
    description: '30nm schematic-to-layout design with Synopsys'
  },
  {
    imageUrl: '/images/courses/power_electronics.jpg',
    title: 'Power Electronics',
    description: 'Proteus for simulation'
  },
  {
    imageUrl: '/images/courses/embedded_systems.jpg',
    title: 'Embedded Systems',
    description: 'Systems programming in C, RTOS, ESP32'
  },
  {
    imageUrl: '/images/courses/antenna.jpg',
    title: 'Antennas',
    description: 'MATLAB and CST Studio for simulation'
  }
]

export default function Home() {

  const academicsRef = useRef();
  const interestsRef = useRef();

  const [interestMathProgress, setInterestMathProgress] = useState(0);
  const [interestGraphicsProgress, setInterestGraphicsProgress] = useState(0);
  const [interestGraphics3DTitle, setInterestGraphics3DTitle] = useState(false);

  useEffect(() => {
    // Setup lax
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

    // Add your elements
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
            [0, "-screenWidth"],
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
      []
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
      ".academicCourses", {
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
          // skewY: [
          //   [100, 300, 500],
          //   [0, 0, 20],
          // ],
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
          if (scrollY > minScroll && scrollY < maxScroll) {
            const progress = 1 - (maxScroll - scrollY) / (maxScroll - minScroll);
            setInterestMathProgress(Math.round(progress * 100) / 100)
          }
          else {
            setInterestMathProgress(0)
          }
        }
      }
    );
    lax.addElements(
      ".interestsMathCanvas", {
        interestsScrollY: {
          translateX: [
            [2000, 2500],
            [0, '-screenWidth'],
          ],
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
            [2000, 2500, 3500, 4500],
            [0, 1, 1, 0],
          ],
        }
      },
      {
        onUpdate: (driverValues, domElement) => {
          const scrollY = driverValues.interestsScrollY[0];
          const minScroll = 2000;
          const changeTitleScroll = 3000;
          const maxScroll = 4000;
          if (scrollY > minScroll && scrollY < maxScroll) {
            if (scrollY > changeTitleScroll) {
              setInterestGraphics3DTitle(true);
            }
            else {
              setInterestGraphics3DTitle(false);
            }
            const progress = 1 - (maxScroll - scrollY) / (maxScroll - minScroll);
            setInterestGraphicsProgress(Math.round(progress * 100) / 100)
          }
          else {
            setInterestGraphicsProgress(0)
          }
        }
      }
    );
    lax.addElements(
      ".interestsGraphicsCanvas", {
        interestsScrollY: {
          opacity: [
            [500, 2000, 2500],
            [0, 0, 1],
          ],
          translateX: [
            [4000, 4500],
            [0, '-screenWidth'],
          ],
        }
      }
    );
  

    // lax.addElements(
    //   ".academicSuccess", {
    //     academicsScrollY: {
    //       translateX: [
    //         [200, 400],
    //         [0, 1],
    //       ],
    //       opacity: [
    //         [400, 600],
    //         [0, 0],
    //       ],
    //       // rotateY: [
    //       //   [0, 200],
    //       //   [0, 90],
    //       // ],
    //       // translateX: [
    //       //   [0, 400],
    //       //   [0, 0, 40],
    //       // ],
    //     }
    //   },
    //   []
    // );
    // lax.addElements(
    //   ".skills", {
    //     academicsScrollY: {
    //       opacity: [
    //         [200, 400],
    //         [0, 0],
    //       ],
    //     }
    //   },
    //   []
    // );
    // lax.addElements(
    //   ".projects_overview_intro", {
    //     scrollY: {
    //       scale: [
    //         ["elInY-300", "elCenterY", "elOutY"],
    //         [0, 1, 1],
    //       ],
    //     }
    //   },
    //   []
    // );
  }, []);

  return (
    // <div className='relative h-[120vh]' >
    <div className='relative w-full min-h-[2000vh] flex flex-col gap-4 justify-start items-center overflow-x-hidden' >
      {/* <div className='absolute top-0 left-0 flex flex-col justify-start items-center w-screen h-screen' >
        <h1 className="pt-[20vh] text-5xl xs:text-7xl font-bold spinMe ">
          Hey there! <span className={animStyles.wave}>👋</span>
        </h1>
        <DownButton className="h-[4em]" delay={0} />
        <DownButton className="h-[3em]"  delay={0.3} />
        <DownButton className="h-[2em]"  delay={0.7} />
        <DownButton className="h-[1em]"  delay={1} />
      </div> */}
      <div className='hey_there flex flex-col justify-start items-center h-screen' >
        <h1 className="pt-[20vh] text-5xl xs:text-7xl font-bold">
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
      <div className='academicsUni z-10 fixed left-0 top-0 w-screen h-screen p-4 flex flex-col gap-4 justify-center items-center'>
        <Image alt='UTAR image' className='rounded-md' src='/images/utar_campus.jpg' width='300' height='170' />
        <p className="text-2xl text-center font-normal">
          I&apos;m a 4th year&nbsp;
          <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-violet-300 to-pink-400" >
            Electrical & Electronics
          </span>
          &nbsp;undergraduate student at <a className='underline' href="https://study.utar.edu.my/utar-at-a-glance.php" target="noopener" >UTAR</a> (2019-2023)
        </p>
      </div>

      <div className='academicCoursesContainer fixed left-0 top-0 w-screen h-screen p-4 flex flex-wrap gap-8 justify-center items-center content-center xs:content-center'>
        <h2 className="academicCoursesTitle text-3xl xs:text-5xl font-bold">
          With courses like:
        </h2>
        <div className='flex flex-wrap gap-8 justify-center items-center content-center' >
          {academicCourses.map((ex, index) => {
            return (
              <AcademicCourse key={index} info={ex} />
          )})}
        </div>
      </div>

      {/* Interests */}
      <div ref={interestsRef} className=' mt-[1500px]' />
      <div className='interestsContainer fixed left-0 top-0 w-screen h-screen py-4 flex flex-wrap gap-8 justify-center items-center content-center'>
        <div className='relative w-[100%] h-[20%]'>
          <h2 className="interestsTitle absolute bottom-0 w-full text-center text-3xl xs:text-5xl font-bold">
            My theoretical interests include...
          </h2>
          <h2 className="interestsMathTitle absolute bottom-0 w-full text-center text-3xl xs:text-5xl font-bold">
            Most kind of math <br />
            <span className='text-center text-sm font-normal' >
              Except boring <a className='underline' href="https://en.wikipedia.org/wiki/Category_theory" target="noopener" >category theory</a>
            </span>
          </h2>
          <h2
            className={'interestsGraphicsTitle absolute bottom-0 w-full text-center text-3xl xs:text-5xl font-bold'}
          >
            <span className={`${interestGraphics3DTitle ? "text-pink-500" : "text-green-500"}`}
              style={{
                textShadow: interestGraphics3DTitle ? '2px 1px 2px #c377f2' : '0px 0px 0px'
              }}
            >
              {interestGraphics3DTitle ? "3D" : "2D"}
            </span>
            &nbsp;Graphicss
          </h2>
        </div>
        <div className='relative w-[100%] h-[60%]' >
          <InterestMath className="interestsMathCanvas absolute w-full h-full"
            show={interestMathProgress > 0 && interestGraphicsProgress <= 0.01 }
            progress={interestMathProgress}
          />
          <InterestGraphics className="interestsGraphicsCanvas absolute w-full h-full"
            show={interestGraphicsProgress > 0.01 }
            progress={interestGraphicsProgress}
          />
        </div>
      </div>


      {/* For experiences, create a layout of images with popovers, or show modal when clicked.
          Include images of crucial subjects, design tools etc
          Can add mathematical symbols, cool visuals and animations like sine waves etc, some mathematical pattern
      */}


      {/* Skills and interests */}
      {/* <div className='skills pointer-events-none fixed left-0 top-0 w-screen h-screen p-4 flex flex-col justify-center items-center'>
        <p className="text-4xl text-center font-normal">
          <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-violet-300 to-pink-400" >
            Key Skills
          </span>
        </p>
      </div> */}

      {/* Projects */}
      {/* <div className='projects_overview_intro pt-[10vh] flex flex-col justify-center items-center'>
        <h2 className="text-5xl xs:text-7xl font-bold">
          Check out some of my projects:
        </h2>
      </div> */}


      {/* Hobbies, side interests, livestreaming, video editing, graphic design, music */}


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