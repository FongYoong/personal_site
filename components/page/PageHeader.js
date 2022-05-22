import Head from 'next/head'

const PageHeader = ({title='Untitled', description=''}) => {

  return (
    <Head>
      <title>{`${title} | FongYoong`}</title>
      <meta name="description" content={description} />
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    </Head>
  )
}

export default PageHeader;