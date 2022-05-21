import { useState } from 'react';
import { useRouter } from 'next/router'
import Head from 'next/head'
import { LazyMotion, AnimatePresence, domAnimation, m } from "framer-motion";
import Navbar from "../components/Navbar";
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

function MyApp({ Component, pageProps }) {
  const router = useRouter();
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

  return (
    <LazyMotion features={domAnimation}>
      <SideInfoContext.Provider value={[displaySideInfo, hideSideInfo]}>
        <div className="bg-black text-base text-white font-normal">
          <SideInfo show={showSideInfo} setShow={setShowSideInfo} contentId={sideInfo.contentId} >
            {sideInfo.content}
          </SideInfo>
          <Navbar currentPage={router.pathname} />
          <div className="p-4 pt-[12vh] min-h-screen" >
            <Head>
              <title>{router.pathname}</title>
              <meta name="description" content={router.pathname} />
              <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
              <AnimatePresence exitBeforeEnter>
                <m.div
                  className=''
                  key={router.route.concat(animation.name)}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={animation.variants}
                  transition={animation.transition}
                >
                  <Component {...pageProps} />
                </m.div>
              </AnimatePresence>
            </main>
            <footer>

            </footer>
          </div>
        </div>
      </SideInfoContext.Provider>
    </LazyMotion>
  )
}

export default MyApp
