export const breakpoints = { mobile: 0, tablet: 768, desktop: 1280 };
import { AiFillControl } from 'react-icons/ai'
import { BsFillFileEarmarkMusicFill, BsCodeSlash } from 'react-icons/bs'
import { MdOutlineSell } from 'react-icons/md'

// For home page
export const academicCourses = [
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
];

export const notableProjects = [
    {
        title: 'Oasis SIB Worship',
        url: '/projects',
        githubUrl: 'https://github.com/FongYoong/oasis-sib-worship',
        demoUrl: 'http://oasis-sib-worship.vercel.app/',
        description: 'Website to organize worship songs',
        year: 2022,
        icon: <BsFillFileEarmarkMusicFill />,
        backgroundColor: '#B5DEFF',
    },
    {
        title: 'Ari Language',
        url: '/projects',
        githubUrl: 'https://github.com/FongYoong/ari-lang',
        description: 'C-like interpreter',
        year: 2021,
        icon: <BsCodeSlash />,
        backgroundColor: '#FFCCD2',
    },
    {
        title: 'Cloud Reservation',
        url: '/projects',
        githubUrl: 'https://github.com/FongYoong/cloud-reservation-nextjs',
        demoUrl: 'https://cloud-reservation-nextjs.vercel.app/',
        description: 'Proof-of-concept website for products and services',
        year: 2021,
        icon: <MdOutlineSell />,
        backgroundColor: '#CAB8FF',
    },
    {
        title: 'Atem Mini Simulator',
        url: '/projects',
        githubUrl: 'https://github.com/FongYoong/oasis-sib-atem-guide',
        demoUrl: 'http://oasis-sib-atem-guide.vercel.app/',
        description: "Simulates the Atem Mini's basic functionalities",
        year: 2021,
        icon: <AiFillControl />,
        backgroundColor: '#FCFFA6',
    },
];