import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { get_all_projects, get_project, get_table_of_contents } from '../../lib/mdxUtils'
import { ClientLink, Link } from '../../components/elements/Link'
import Button from '../../components/elements/Button'
import Divider from '../../components/elements/Divider'
import { components } from '../../components/MDXComponents'
import { MDXRemote } from 'next-mdx-remote'
import Page from "../../components/page/Page"
import { BiTime, BiCalendar } from 'react-icons/bi'
import { AiFillGithub, AiOutlineRead } from 'react-icons/ai'
import { GiGamepad } from 'react-icons/gi'
import TableOfContents from '../../components/page/TableOfContents'

const TitleTop = () => {
  return (
    <ClientLink href='/projects' className='hover:underline' >
      <Button className="text-sm xs:text-md text-white bg-teal-600" >
        <p> &lt;&lt; Projects</p>
      </Button>
    </ClientLink>
  )
}

const TitleBottom = ({meta, readingTime}) => {
  return (
    <div className='flex flex-wrap gap-4 justify-start items-center content-center'>
      <div className='flex flex-col gap-2 justify-center items-start content-center'>
        <div className='flex gap-2 justify-center items-center content-center'>
          <BiCalendar />
          <p>{meta.date}</p>
        </div>
        <div className='flex gap-2 justify-center items-center content-center'>
          <BiTime />
          <p>{readingTime}</p>
        </div>
      </div>
      <Divider className='bg-white' orientation='vertical' />
      <div className='flex gap-4 justify-center items-center content-center'>
        <Link href={meta.github_link} className="hover:opacity-60 border-black border-2 rounded-full" >
            <AiFillGithub size='2em' /> GitHub
        </Link>
        {meta.demo_link &&
            <Link href={meta.demo_link} >
                <Button className="text-sm xs:text-md bg-purple-700" >
                    <GiGamepad size='2em' className='inline-block' /> Demo
                </Button>
            </Link>
        }
        {meta.docs_link &&
            <Link href={meta.docs_link} >
                <Button className="text-sm xs:text-md bg-purple-700" >
                    <AiOutlineRead size='2em' className='inline-block' /> Documentation
                </Button>
            </Link>
        }
      </div>
    </div>
  )
}

export default function ProjectWriteUp({project_id, meta, data, tableOfContents, readingTime}) {
    const router = useRouter();

    useEffect(() => {
      const fragment = router.asPath.split("#")[1]
      if (fragment) {
        try {
          const scrollElement = document.querySelector(`#${fragment}`);
          if (scrollElement) {
            scrollElement.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
          }
        }
        catch (error) {

        }
      }
      //element.scrollIntoView({behavior: "smooth", block: "nearest", inline: "nearest"});
    }, [router])


    return (
      <Page showTitleBorder className="w-auto md:w-[60%]"
        title={meta.title} 
        titleTop={<TitleTop />}
        titleBottom={<TitleBottom meta={meta} readingTime={readingTime} />}
      >
        <div className="flex flex-col w-[80%] lg:w-[50%] p-2 justify-center items-start content-center" >
          <TableOfContents headers={tableOfContents} />
          <MDXRemote components={components} {...data} />
        </div>
      </Page>
    )
}

export async function getStaticPaths() {
    const projects = await get_all_projects();

    return {
      paths: projects.map((project_data) => {
          return {
              params: {
                project_id: project_data.project_id
              }
          }
      }),
      fallback: false
    }
};

export async function getStaticProps({params}) {
  const { mdxData, readingTime } = await get_project(params.project_id);
  const toc = get_table_of_contents(mdxData.compiledSource);
  return {
    props: {
      project_id: params.project_id,
      meta: mdxData.frontmatter,
      data: mdxData,
      tableOfContents: toc,
      readingTime
    }
};



  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  // return {
  //   props: {
  //     posts,
  //   },
  // }
}
