import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router'
import { LazyMotion, AnimatePresence, domAnimation, m } from "framer-motion";
import { Waveform } from '@uiball/loaders'
import { Navbar, NavbarSpace } from "../components/page/Navbar";
import PageFooter from "../components/page/PageFooter";
import { SideInfo, SideInfoContext } from '../components/SideInfo';
import '../styles/globals.css'

export const animation = {
  name: "Fade",
  variants: {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
    },
  },
  transition: {
    duration: 0.2,
  },
};

const typicalPageTitles = {
    "/": "Home",
    "/projects": "Projects",
    "/blog": "Blog",
    "/contact": "Contact",
}

const getPageTitle = (pathname) => {
  if (pathname in typicalPageTitles) {
    return typicalPageTitles[pathname]
  }
  else if (true) {
    return undefined

  }
  return undefined
}

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [ loadedFirstTime, setLoadedFirstTime ] = useState(false);
  const [loadingTitle, setLoadingTitle] = useState(getPageTitle(router.pathname));
  const [showWaitTitle, setShowWaitTitle] = useState(false);
  const waitTitleTimeout = useRef()
  const [loadingState, setLoadingState] = useState('hide');
  const [showSideInfo, setShowSideInfo] = useState(false);
  const [sideInfo, setSideInfo] = useState({
    contentId: null,
    content: null
  });
  
  const displaySideInfo = (contentId, content) => {
    setSideInfo({
      contentId,
      content
    });
    setShowSideInfo(true);
  };
  const hideSideInfo = () => {
    setShowSideInfo(false);
  };

  useEffect(() => {
    setLoadedFirstTime(true);
    const start = (pathname) => {
      setLoadingTitle(getPageTitle(pathname))
      setLoadingState("show");
      setShowWaitTitle(false);
      if (waitTitleTimeout.current) {
        clearTimeout(waitTitleTimeout.current);
      }
      waitTitleTimeout.current = setTimeout(() => {
          setShowWaitTitle(true);
      }, 4000);
    };
    const end = () => {
      setLoadingState("hide");
    };
    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", end);
    router.events.on("routeChangeError", end);
    return () => {
      router.events.off("routeChangeStart", start);
      router.events.off("routeChangeComplete", end);
      router.events.off("routeChangeError", end);
    };
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      <SideInfoContext.Provider value={[displaySideInfo, hideSideInfo]}>
        <m.div className='z-10 fixed left-0 top-0 w-screen h-screen bg-teal-400 flex flex-col gap-8 justify-center items-center content-center'
          initial="hide"
          animate={loadingState}
          variants={{
            hide: {
              opacity: 0,
              pointerEvents: 'none'
            },
            show: {
              opacity: 1,
              pointerEvents: 'all',
              transition: {
                delay: 0.5,
              }
            },
          }}
        >
          <h1 className='text-center text-black text-5xl xs:text-7xl font-bold' >
            {loadingTitle}
          </h1>
          <div>
            <Waveform 
              size={40}
              lineWeight={3.5}
              speed={1} 
              color="black" 
            />
          </div>
          <h2 className={`text-center text-black text-xl xs:text-3xl font-bold transition-opacity ${showWaitTitle?'opacity-100':'opacity-0'}`} >
            Looks like it&apos;s taking quite long...
          </h2>
        </m.div>
        <div className="bg-black text-base text-white font-normal">
          <SideInfo show={showSideInfo} setShow={setShowSideInfo} contentId={sideInfo.contentId} >
            {sideInfo.content}
          </SideInfo>
          <Navbar currentPage={router.pathname} />
          <div className="min-h-screen flex flex-col justify-center items-center content-center" >
            <NavbarSpace />
            <AnimatePresence exitBeforeEnter>
              <m.main
                className='grow w-full flex flex-col justify-start items-center content-center'
                key={router.route.concat(animation.name)}
                initial="initial"
                animate="animate"
                exit="exit"
                variants={animation.variants}
                transition={animation.transition}
              >
                <Component {...pageProps} />
              </m.main>
            </AnimatePresence>
            <PageFooter />
          </div>
        </div>
      </SideInfoContext.Provider>
    </LazyMotion>
  )
}

export default MyApp
