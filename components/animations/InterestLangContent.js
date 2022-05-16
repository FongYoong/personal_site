// import { useState, useRef, useLayoutEffect } from 'react'
// import dynamic from 'next/dynamic'
// const InterestLangCard = dynamic(() => import('./InterestLangCard').then((mod) => mod.default), {
//     ssr: false,
// });
import InterestLangCard from './InterestLangCard'

const programmingLanguages = [
    {
      imageUrl: '/images/programming_languages/rust.svg',
      className: 'invert',
      title: 'Rust',
      titleUrl: 'https://www.rust-lang.org/',
      description: "Challenges me to rethink memory-safety, thread-safety, error handling, and lifetimes."
    },
    {
      imageUrl: '/images/programming_languages/javascript.svg',
      title: 'JavaScript',
      titleUrl: 'https://blog.codinghorror.com/javascript-the-lingua-franca-of-the-web/',
      description: "Say what you want, it's the lingua franca of the web."
    },
    {
      imageUrl: '/images/programming_languages/typescript.svg',
      title: 'TypeScript',
      titleUrl: 'https://www.typescriptlang.org/',
      description: 'Superset of Javascript that provides order to chaos.'
    },
    {
      imageUrl: '/images/programming_languages/python.svg',
      title: 'Python',
      titleUrl: 'https://peps.python.org/pep-0020/',
      description: 'My go-to tool for numerical computing and scripting.'
    },
    {
        imageUrl: '/images/programming_languages/cpp.svg',
        title: 'C++',
        titleUrl: 'https://docs.microsoft.com/en-us/cpp/cpp/welcome-back-to-cpp-modern-cpp',
        description: "Modern C++ can look very different from the 'old' C++ taught in classrooms."
      },
    {
      imageUrl: '/images/programming_languages/csharp.svg',
      title: 'C#',
      titleUrl: 'https://docs.microsoft.com/en-us/dotnet/core/introduction',
      description: 'Awesome tooling for Windows development.'
    },
    {
      imageUrl: '/images/programming_languages/java.svg',
      title: 'Java',
      titleUrl: 'https://news.ycombinator.com/item?id=21703463',
      description: "Boilerplate hell and boring but puts food on the table."
    },
    {
        imageUrl: '/images/programming_languages/perl.svg',
        title: 'Perl',
        className: 'invert',
        titleUrl: 'https://peps.python.org/pep-0020/',
        description: 'Wonderful for quick text processing.'
      },
    {
      imageUrl: '/images/programming_languages/systemverilog.svg',
      title: 'SystemVerilog',
      titleUrl: 'https://en.wikipedia.org/wiki/SystemVerilog',
      description: 'Feels poorly designed (so many keywords!) but essential for RTL design and verification.'
    },
];

const InterestLangContent = ({className}) => {

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
        <div className={`flex flex-wrap gap-8 justify-center items-center content-start ${className}`} >
            {programmingLanguages.map((info, index) => {
                return (
                    <InterestLangCard key={index} info={info} />
            )})}
        </div>
    )
}

export default InterestLangContent;