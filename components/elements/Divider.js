 import { forwardRef } from "react"

const Divider = forwardRef(({className, orientation='horizontal', ...props}, ref) => {

    return (
        <div ref={ref} className={`opacity-30 ${orientation==='horizontal'?'h-[2px] w-full px-2':'w-[2px] h-full py-2'}  ${className}`} {...props} />
    )
}) 

export default Divider;
