import { forwardRef } from "react";
import { m } from "framer-motion";

const Button = forwardRef(({children, className='', padding=true, ...props}, ref) => {

    return (
        <m.button ref={ref} className={`h-full rounded-md opacity-100 hover:opacity-80 ${padding ? "p-[0.5em]" : ""} ${className}`}
            animate={{
                scale:1
            }}
            whileHover={{scale: 1.1, opacity: 0.6}}
            whileTap={{scale: 0.9}}
            {...props}
      >
        {children}
      </m.button>
    )
});

export default Button;