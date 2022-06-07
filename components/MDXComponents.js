import { useContext } from 'react'
import NextImage from 'next/image'
import slugify from 'slugify'
import { Link } from './elements/Link'
import { ImageModalContext } from './ImageModal';

const normalTextStyle = "text-left font-normal leading-relaxed text-xl";

export const Heading1 = ({children}) => {
    const id = slugify(children)
    return (
        <a href={`#${id}`} className="mt-8 mb-4 hover:underline" >
            <h1 id={id} className="text-3xl font-extrabold">
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

export const ParagraphIndent = ({href, children}) => {
    return (
        <span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </span>
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

export const Image = ({width, height, src, alt="", title=""}) => {
    const [displayImageModal, hideImageModal] = useContext(ImageModalContext);
    return (
        <div className="relative my-4 self-center" >
            <div className='rounded-md border-2 border-slate-500'  >
                <NextImage
                    className='cursor-zoom-in opacity-100 hover:opacity-70'
                    alt={alt ? alt : (title ? title : alt)}
                    src={src} width={width} height={height} layout="intrinsic" objectFit="contain" 
                    placeholder="blur" blurDataURL="/images/placeholder.svg"
                    onClick={() => {
                        displayImageModal(src, alt)
                    }}
                />
            </div>
            {title && <p className='mt-2 text-center text-md xs:text-lg font-light' > ◦ {title}</p>}
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

export const Pre = ({children}) => {
    return (
        <pre className="relative w-full my-2 p-4 rounded-md bg-slate-700 whitespace-pre-wrap" >
            {children}
        </pre>
    )
}

export const Code = ({children}) => {
    return (
        <code className="" >
            {children}
        </code>
    )
}


export const components = {
    //img: ResponsiveImage,
    h1: Heading1,
    h2: Heading2,
    p: Paragraph,
    ParagraphIndent,
    ul: UnorderedList,
    ol: OrderedList,
    Image,
    Video,
    a: Anchor,
    pre: Pre,
    code: Code,
    // pre: Pre,
    // code: InlineCode,
}

