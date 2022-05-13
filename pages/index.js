import { useRef, useEffect } from 'react'
import Image from 'next/image'
import lax from "lax.js"
// import Page, { meta } from '../writings/blog/some_post.mdx'
import { get_all_projects } from '../lib/mdxUtils'
import { DownButton } from '../components/Indicators'
import AcademicCourse from '../components/AcademicCourse'
import animStyles from '../styles/anim.module.css'

const academicCourses = [
  {
    imageUrl: '/images/courses/power_systems.jpg',
    title: 'Power Systems',
    description: 'PSSE Xplore and ETAP for simulation',
    link: ''
  },
  {
    imageUrl: '/images/courses/ic_design.jpg',
    title: 'IC Design',
    description: '30nm schematic-to-layout design with Synopsys',
    link: ''
  },
  {
    imageUrl: '/images/courses/power_electronics.jpg',
    title: 'Power Electronics',
    description: 'Proteus for simulation',
    link: ''
  },
  {
    imageUrl: '/images/courses/embedded_systems.jpg',
    title: 'Embedded Systems',
    description: 'Systems programming in C, RTOS, ESP32',
    link: ''
  },
  {
    imageUrl: '/images/courses/antenna.jpg',
    title: 'Antennas',
    description: 'MATLAB and CST Studio for simulation',
    link: ''
  }
]

export default function Home() {

  const academicsRef = useRef();

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
          // opacity: [
          //   [0, 200],
          //   [1, 0],
          // ],
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
          // rotateY: [
          //   [0, 200],
          //   [0, 90],
          // ],
          // translateX: [
          //   [0, 400],
          //   [0, 0, 40],
          // ],
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
          // rotateY: [
          //   [0, 200],
          //   [0, 90],
          // ],
          // translateX: [
          //   [0, 400],
          //   [0, 0, 40],
          // ],
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
          // rotateY: [
          //   [0, 200],
          //   [0, 90],
          // ],
          // translateX: [
          //   [0, 400],
          //   [0, 0, 40],
          // ],
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
      ".academicSuccess", {
        academicsScrollY: {
          translateX: [
            [200, 400],
            [0, 1],
          ],
          opacity: [
            [400, 600],
            [0, 0],
          ],
          // rotateY: [
          //   [0, 200],
          //   [0, 90],
          // ],
          // translateX: [
          //   [0, 400],
          //   [0, 0, 40],
          // ],
        }
      },
      []
    );
    lax.addElements(
      ".skills", {
        academicsScrollY: {
          opacity: [
            [200, 400],
            [0, 0],
          ],
        }
      },
      []
    );
    lax.addElements(
      ".projects_overview_intro", {
        scrollY: {
          scale: [
            ["elInY-300", "elCenterY", "elOutY"],
            [0, 1, 1],
          ],
        }
      },
      []
    );
  }, []);

  return (
    // <div className='relative h-[120vh]' >
    <div className='relative w-full min-h-[800vh] flex flex-col gap-4 justify-start items-center overflow-x-hidden' >
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

      {/* Academics*/}
      <div ref={academicsRef} className=' pt-[10vh]' />
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

      {/* For experiences, create a layout of images with popovers, or show modal when clicked.
          Include images of crucial subjects, design tools etc
          Can add mathematical symbols, cool visuals and animations like sine waves etc, some mathematical pattern
      */}


      {/* Skills and interests */}
      <div className='skills pointer-events-none fixed left-0 top-0 w-screen h-screen p-4 flex flex-col justify-center items-center'>
        <p className="text-4xl text-center font-normal">
          <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-violet-300 to-pink-400" >
            Key Skills
          </span>
        </p>
      </div>

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