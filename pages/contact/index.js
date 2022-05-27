import Page from "../../components/page/Page"
import { Link } from '../../components/elements/Link';
import Button from "../../components/elements/Button"
import Divider from '../../components/elements/Divider';
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai'
import { CgFileDocument } from 'react-icons/cg'

export default function Contact() {

  return (
    <Page title="Contact">
      <div className="flex flex-wrap gap-2 justify-center items-center content-center" >
        <Link href="https://github.com/FongYoong" >
          <Button>
            <AiFillGithub size='4em' /> GitHub
          </Button>
        </Link>
        <Link href="https://www.linkedin.com/in/chien-yoong-fong-74866b18b/" >
          <Button>
            <AiFillLinkedin size='4em' /> LinkedIn
          </Button>
        </Link>
      </div>
      {/* <Link href="/documents/resume.pdf" >
        <Button className='mt-8 font-bold text-lg xs:text-2xl text-white bg-violet-700' >
          <CgFileDocument className='inline-block' /> View My Resume <br />
        </Button>
      </Link> */}
    </Page>
  )
}
