import { forwardRef } from "react"
import NextLink from 'next/link'

export const Link = forwardRef(({newTab=true, children, ...props}, ref) => {
    return (
        <a ref={ref} target={newTab ? "_blank" : ""} rel={newTab ? "noopener noreferrer" : ""} {...props} >
            {children}
        </a>
    )
})

export const ClientLink = forwardRef(({href, scroll=true, newTab=false, children, ...props}, ref) => {

    return (
        <NextLink ref={ref} href={href} passHref scroll={scroll} 
            target={newTab ? "_blank" : ""}
            {...props}
        >
            {children}
        </NextLink>
    )
}) 