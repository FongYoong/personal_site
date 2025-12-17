import { Link } from '../elements/Link';

const Footer = () => {

    return (
        <footer className='relative mt-16 p-4 w-full bg-slate-900 flex flex-col gap-4 justify-start items-center content-center' >
            <h1 className="text-center text-sm xs:text-md font-normal" >
                © {new Date().getFullYear()} Fong Yoong
                <br />
                Source code available at <Link href="https://github.com/FongYoong/personal_site" className='underline' >GitHub</Link>
                <br />
                Built with <Link href="https://nextjs.org/" className='underline' >Next.js</Link> and hosted on <Link href="https://vercel.com/" className='underline' >Vercel</Link>
            </h1>
        </footer>
    )
}

export default Footer;