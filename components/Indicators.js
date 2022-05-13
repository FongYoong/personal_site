import { forwardRef } from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";


export const DownButton = forwardRef(({className, duration=2, delay=0}, ref) => {

    return (
        <LazyMotion features={domAnimation}>
            <m.div ref={ref} className={`border-white border-solid border-t-0 border-r-2 border-b-2 border-l-0 rotate-45 aspect-square ${className}`}
                initial='animate'
                animate='animate'
                variants={{
                    animate: {
                        opacity: [1, 0, 1],
                    }
                }}
                transition={{
                    duration: duration,
                    delay: delay,
                    times: [0, 0.5, 1],
                    repeat: Infinity
                }}
            />
        </LazyMotion>
    )
})