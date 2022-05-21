import { useState } from 'react'
import SkillCard from './SkillCard';

const skills = [
    {
      title: 'Web/App/Desktop Development',
      tools: [
        {
            title: 'React',
            titleUrl: 'https://reactjs.org/',
            imageUrl: '/images/skills/react.svg'
        },
        {
            title: 'Node.js',
            titleUrl: 'https://nodejs.org/en/',
            imageUrl: '/images/skills/node.svg'
        },
        {
            title: 'Android Studio',
            titleUrl: 'https://developer.android.com/studio',
            imageUrl: '/images/skills/android_studio.svg'
        },
        {
            title: 'WPF',
            titleUrl: 'https://docs.microsoft.com/en-us/visualstudio/designers/getting-started-with-wpf',
            imageUrl: '/images/skills/wpf.svg'
        },
        {
            title: 'QT',
            titleUrl: 'https://www.qt.io/',
            imageUrl: '/images/skills/qt.svg'
        },
      ]
    },
    {
        title: 'Scripting and Data Processing',
        tools: [
            {
                title: 'Linux',
                titleUrl: 'https://www.linux.org/',
                imageUrl: '/images/skills/linux.svg'
            },
            {
                title: 'Web Scraping',
                titleUrl: 'https://github.com/puppeteer/puppeteer',
                imageUrl: '/images/skills/web_scraping.svg'
            },
            {
                title: 'OpenCV',
                titleUrl: 'https://opencv.org/',
                imageUrl: '/images/skills/opencv.svg'
            },
            {
                title: 'MATLAB',
                titleUrl: 'https://www.mathworks.com/products/matlab.html',
                imageUrl: '/images/skills/matlab.svg'
            },
        ]
    },
    {
        title: 'Embedded Systems',
        tools: [
            {
                title: 'Arduino',
                titleUrl: 'https://www.arduino.cc/',
                imageUrl: '/images/skills/arduino.svg'
            },
            {
                title: 'PIC',
                titleUrl: 'https://www.microchip.com/en-us/products/microcontrollers-and-microprocessors',
                imageUrl: '/images/skills/microchip.svg'
            },
            {
                title: 'KiCAD',
                titleUrl: 'https://www.kicad.org/',
                imageUrl: '/images/skills/kicad.svg'
            },
            {
                title: 'Proteus',
                titleUrl: 'https://www.labcenter.com/',
                imageUrl: '/images/skills/proteus.jpg'
            },
            {
                title: 'Multisim',
                titleUrl: 'https://www.ni.com/en-my/shop/electronic-test-instrumentation/application-software-for-electronic-test-and-instrumentation-category/what-is-multisim.html',
                imageUrl: '/images/skills/multisim.jpg'
            },
        ]
    },
    {
        title: 'Media Editing',
        tools: [
            {
                title: 'Unity',
                titleUrl: 'https://unity.com/',
                imageUrl: '/images/skills/unity.svg'
            },
            {
                title: 'Blender',
                titleUrl: 'https://www.blender.org/',
                imageUrl: '/images/skills/blender.svg'
            },
            {
                title: 'Adobe Premiere Pro',
                titleUrl: 'https://www.adobe.com/my_en/products/premiere.html',
                imageUrl: '/images/skills/premiere_pro.svg'
            },
            {
                title: 'Adobe Photoshop',
                titleUrl: 'https://www.adobe.com/products/photoshop.html',
                imageUrl: '/images/skills/photoshop.svg'
            },
        ]
    }
];

const hiddenSkills = Array(skills.length).fill(false);

const SkillContent = ({className, show}) => {

    const [showSkills, setShowSkills] = useState(hiddenSkills)

    // const containerRef = useRef();
    // const [overflow, setOverflow] = useState(false);

    // useEffect(() => {
    //     if (containerRef.current) {
    //         if (containerRef.current.clientHeight < containerRef.current.scrollHeight) {
    //             setOverflow(true);
    //         }
    //     }
    // }, [containerRef]);

    return (
        <div className={`${show?'':'pointer-events-none'} flex flex-col gap-2 xs:gap-8 justify-start items-center content-center ${className}`} >
            {skills.map((info, index) => {
                return (
                    <SkillCard key={index} show={showSkills[index]} setShow={() => {
                        if(showSkills[index]) {
                            setShowSkills(hiddenSkills)
                        }
                        else {
                            const state = hiddenSkills.slice();
                            state[index] = true;
                            setShowSkills(state);
                        }
                    }}
                    info={info} />
            )})}
        </div>
    )
}

export default SkillContent;