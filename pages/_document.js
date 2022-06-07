import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
                    {/* <link href="https://fonts.googleapis.com/css2?family=Archivo+Narrow&display=swap" rel="stylesheet" /> */}
                    {/* <link href="https://fonts.googleapis.com/css2?family=Sora&display=swap" rel="stylesheet" /> */}
                    {/* <link href="https://fonts.googleapis.com/css2?family=Lato&display=swap" rel="stylesheet" /> */}
                    {/* <link href="https://fonts.googleapis.com/css2?family=Ubuntu&display=swap" rel="stylesheet" /> */}
                    <link href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" rel="stylesheet" />
                    {/* <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans&display=swap" rel="stylesheet" /> */}
                    {/* <link href="https://fonts.googleapis.com/css2?family=Work+Sans&display=swap" rel="stylesheet" /> */}
                    {/* <link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro&display=swap" rel="stylesheet" /> */}
                    {/* <link href="https://fonts.googleapis.com/css2?family=Quicksand&display=swap" rel="stylesheet" /> */}
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument