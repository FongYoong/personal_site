import PageHeader from "../../components/page/PageHeader"
import Divider from "../elements/Divider";

const Page = ({className, showTitleBorder, title, titleTop, titleBottom, children}) => {

  return (
    <>
        <PageHeader title={title} />
        <div className={`mb-4 p-2 flex flex-col gap-4 justify-center items-start content-center ${className} `} >
          {titleTop}
          <h1 className="text-center text-4xl xs:text-5xl font-bold" >
              {title}
          </h1>
          {titleBottom}
          {showTitleBorder && <Divider className="bg-white" />}
        </div>
        {children}
    </>
  )
}

export default Page;