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
          <div className="min-h-screen" >
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
              <div className='relative mt-16 p-4 w-full bg-slate-900 flex flex-col gap-4 justify-start items-center content-center'>
                <h1 className="text-center text-sm xs:text-md font-normal" >
                  © 2022 Fong Yoong
                  <br />
                  Source code available at <a className='underline' href="https://github.com/FongYoong/personal_site" target="noopener" >GitHub</a>
                  <br />
                  Built with <a className='underline' href="https://nextjs.org/" target="noopener" >Next.js</a> and hosted on <a className='underline' href="https://vercel.com/" target="noopener" >Vercel</a>
                </h1>

              </div>
            </footer>
          </div>
        </div>
      </SideInfoContext.Provider>
    </LazyMotion>
  )
}

export default MyApp
