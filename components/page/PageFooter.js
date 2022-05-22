

const Footer = () => {

    return (
        <footer className='relative mt-16 p-4 w-full bg-slate-900 flex flex-col gap-4 justify-start items-center content-center' >
            <h1 className="text-center text-sm xs:text-md font-normal" >
                © 2022 Fong Yoong
                <br />
                Source code available at <a className='underline' href="https://github.com/FongYoong/personal_site" target="noopener" >GitHub</a>
                <br />
                Built with <a className='underline' href="https://nextjs.org/" target="noopener" >Next.js</a> and hosted on <a className='underline' href="https://vercel.com/" target="noopener" >Vercel</a>
            </h1>
        </footer>
    )
}

export default Footer;