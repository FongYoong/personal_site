import PageHeader from "../../components/page/PageHeader"
import PageTitle from "./PageTitle";

const Page = ({title, children}) => {

  return (
    <>
        <PageHeader title={title} />
        <PageTitle>
            {title}
        </PageTitle>
        {children}
    </>
  )
}

export default Page;