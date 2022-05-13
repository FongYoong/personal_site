export const Heading1 = ({children}) => {
    return (
        <h1 className="">
            {children}
        </h1>
    )
}

export const Heading2 = ({children}) => {
    return (
        <h2 className="">
            {children}
        </h2>
    )
}

export const Paragraph = ({children}) => {
    return (
        <p className="">
            {children}
        </p>
    )
}

export const components = {
    //img: ResponsiveImage,
    h1: Heading1,
    h2: Heading2,
    p: Paragraph,
    // pre: Pre,
    // code: InlineCode,
}
