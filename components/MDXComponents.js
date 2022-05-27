import NextImage from 'next/image'
import slugify from 'slugify'
import { Link } from './elements/Link'

const normalTextStyle = "font-normal leading-relaxed text-xl";

export const Heading1 = ({children}) => {
    const id = slugify(children)
    return (
        <a href={`#${id}`} className="mt-8 mb-4 hover:underline" >
            <h1 id={id} className="text-xl xs:text-3xl font-extrabold">
                {children}
            </h1>
        </a>
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
        <p className={normalTextStyle}>
            {children}
        </p>
    )
}

export const UnorderedList = ({children}) => {
    return (
        <ul className={`list-disc list-inside ${normalTextStyle}`}>
            {children}
        </ul>
    )
}

export const OrderedList = ({children}) => {
    return (
        <ol className={`list-decimal list-inside ${normalTextStyle}`}>
            {children}
        </ol>
    )
}

export const Image = ({src, alt}) => {
    return (
        <div className='relative overflow-hidden rounded-lg w-[100%] h-[30vh] xs:h-[50vh]' >
            <NextImage alt={alt} className='p-4 self-center' src={src} layout="fill" objectFit="cover" />
        </div>
    )
}

export const Video = ({src, type="video/mp4"}) => {
    return (
        <div className='my-8 mx-2 overflow-hidden self-center rounded-xl w-[100%]' >
            <video className='object-cover' controls muted playsInline>
                <source src={src} type={type} />
            </video>
        </div>

    )
}

export const Anchor = ({href, children}) => {
    return (
        <Link href={href} className={`underline ${normalTextStyle} text-yellow-300 hover:font-bold`} >
            {children}
        </Link>
    )
}

export const components = {
    //img: ResponsiveImage,
    h1: Heading1,
    h2: Heading2,
    p: Paragraph,
    ul: UnorderedList,
    ol: OrderedList,
    Image,
    Video,
    a: Anchor,
    // pre: Pre,
    // code: InlineCode,
}
