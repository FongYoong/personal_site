import Page from "../../components/page/Page"
import { get_all_projects } from '../../lib/mdxUtils'

export default function Blog() {

  return (
    <>
        <Page title="Blog">

        </Page>
    </>
  )
}

export async function getStaticProps() {
  // Call an external API endpoint to get posts
  const allProjects = await get_all_projects();

  console.log(allProjects)

  return {
    props: {
      
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
