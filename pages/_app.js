import { useRouter } from 'next/router'
import Head from 'next/head'
import { LazyMotion, AnimatePresence, domAnimation, m } from "framer-motion";
import Navbar from "../components/Navbar";
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

  const router = useRouter()

  return (
    <div className="bg-black text-base text-white font-normal">
      <Navbar currentPage={router.pathname} />
      <div className="p-4 pt-[12vh] min-h-screen" >
        <Head>
          <title>{router.pathname}</title>
          <meta name="description" content={router.pathname} />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          <LazyMotion features={domAnimation}>
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
          </LazyMotion>
        </main>
        <footer>

        </footer>
      </div>

    </div>
  )
}

export default MyApp
