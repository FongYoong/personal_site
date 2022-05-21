import { AnimatePresence, m } from "framer-motion";

const text = "Programming Languages".split('');

const InterestLangTitle = ({className, progress=0}) => {
    return (
        <code className={className}>
            <AnimatePresence initial={false}>
                {text.slice(0, Math.round(progress * text.length)).map((c, index) => 
                    <m.span
                        className="inline-block whitespace-pre"
                        key={`${index}_${c}`}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={{
                            initial: {
                                x: '100vw',
                            },
                            animate: {
                                x: '0vw',
                            },
                            exit: {
                                x: '100vw',
                            },
                        }}
                        transition={{
                            duration: 0.5,
                            type: 'tween'
                            //type: "spring",
                            //stiffness: 100,
                        }}
                    >
                        {c}
                    </m.span>
                )}
            </AnimatePresence>
        </code>
    )
}

export default InterestLangTitle;