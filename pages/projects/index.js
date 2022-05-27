import { get_all_projects } from '../../lib/mdxUtils'
import Page from "../../components/page/Page"
import ProjectsCard from "../../components/projects/ProjectsCard"

export default function Projects({projects}) {

  return (
    <Page title="Projects">
      <div className="flex flex-wrap gap-2 justify-center items-center content-center" >
        {projects.map((info) => (
          <ProjectsCard key={info.project_id} info={info} />
        ))}
      </div>
    </Page>
  )
}

export async function getStaticProps() {
  const projects = await get_all_projects();

  return {
    props: {
      projects
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
