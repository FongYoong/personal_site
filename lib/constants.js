export const breakpoints = { mobile: 0, tablet: 480, desktop: 1280 };
// import { AiFillControl } from 'react-icons/ai'
import { RiGameFill  } from 'react-icons/ri'
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

// For home page
export const notableProjects = [
    {
        title: 'Light-based indoor positioning',
        url: '/projects/supermarket_ips',
        githubUrl: 'https://github.com/FongYoong/supermarket_ips_app',
        demoUrl: 'https://youtu.be/irgtomYejGQ',
        description: 'A realtime solution using visible light communication',
        year: 2022,
        icon: <MdOutlineSell />,
        backgroundColor: '#CAB8FF',
    },
    {
        title: 'Family Feud Web Game',
        url: '/projects/family_feud',
        githubUrl: 'https://github.com/FongYoong/new_year_answer_battle_web',
        demoUrl: 'https://new-year-answer-battle-web.netlify.app/',
        description: "A cool web rendition of the popular game",
        year: 2023,
        icon: <RiGameFill />,
        backgroundColor: '#FCFFA6',
    },
    {
        title: 'Ari Language',
        url: '/projects/ari_language',
        githubUrl: 'https://github.com/FongYoong/ari-lang',
        description: 'C-like interpreter',
        year: 2021,
        icon: <BsCodeSlash />,
        backgroundColor: '#FFCCD2',
    },
    {
        title: 'Oasis SIB Worship',
        url: '/projects/oasis_sib_worship',
        githubUrl: 'https://github.com/FongYoong/oasis-sib-worship',
        demoUrl: 'http://oasis-sib-worship.vercel.app/',
        description: 'Website to organize worship songs',
        year: 2022,
        icon: <BsFillFileEarmarkMusicFill />,
        backgroundColor: '#B5DEFF',
    },
    // {
    //     title: 'Atem Mini Simulator',
    //     url: '/projects/oasis_sib_atem_guide',
    //     githubUrl: 'https://github.com/FongYoong/oasis-sib-atem-guide',
    //     demoUrl: 'http://oasis-sib-atem-guide.vercel.app/',
    //     description: "Simulates the Atem Mini's basic functionalities",
    //     year: 2021,
    //     icon: <AiFillControl />,
    //     backgroundColor: '#FCFFA6',
    // },
    // {
    //     title: 'Cloud Reservation',
    //     url: '/projects/cloud_reservation',
    //     githubUrl: 'https://github.com/FongYoong/cloud-reservation-nextjs',
    //     demoUrl: 'https://cloud-reservation-nextjs.vercel.app/',
    //     description: 'Proof-of-concept website for products and services',
    //     year: 2021,
    //     icon: <MdOutlineSell />,
    //     backgroundColor: '#CAB8FF',
    // },

];