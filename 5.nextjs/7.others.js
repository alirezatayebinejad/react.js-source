//if all pages have same layout but we want to change one page layout

//in _app.js
import Head from 'next/head'
import Footer from '@/layout/Footer'
import Header from '@/layout/Header'
import 'styles/globals.css'
import 'styles/layout.css'

function MyApp({ Component, pageProps }) {
    if (Component.getLayout) {
        return Component.getLayout(<Component {...pageProps} />)
    }
    return (
        <>
            <Head>
                <title>Codevolution</title>
                <meta name='description' content='Awesome YouTube channel' />
            </Head>
            <Header />
            <Component {...pageProps} />
            <Footer />
        </>
    )
}
export default MyApp;

//in about.js
import Head from 'next/head'
import Footer from '../components/layout/Footer'

function About() {
    return (
        <>
            <Head>
                {/* <title>About Codevolution</title> */}
                <meta name='description' content='Free tutorials on web development' />
            </Head>
            <h1 className='content'>About</h1>
        </>
    )
}
//export default About
About.getLayout = page => (
    <>
        {page}
        <Footer />
    </>
)

//typescript with next js
//create a tsconfig.json
//yarn add --dev typescript @types/react
//yarn dev

//TypeScript + data fetching
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next';
//export const getStaticProps: GetStaticProps = async context =>{
// ...
//}
//export const getStaticPaths: GetStaticPaths = async context =>{
// ...
//}
//export const getServerSideProps: GetServerSideProps = async context =>{
// ...
//}


//TypeScript + api routes
/*
    import type { NextApiRequest, NextApiResponse } from "next";
    type Data = {
        name: string;
    }
    export default (req: NextApiRequest, res: NextApiResponse<Data>) => {
        res.status(200).json({ name: "John Doe" });
    }
*/


//Preview mode - to see changes in preview mode without rebuilding - goo for creating cms based projects

//in pages/news/index.js
function News({ data }) {
    return <h1 className='content'>{data}</h1>
}
//export default News

export async function getStaticProps(context) {
    console.log('Running getStaticProps', context.previewData)
    return {
        props: {
            data: context.preview
                ? 'List of draft articles'
                : 'List of published articles'
        }
    }
}

//in pages/api/preview.js
export function handler(req, res) {
    res.setPreviewData({
        user: 'Vishwas'
    })
    res.redirect(req.query.redirect)
}
//in pages/api/disable-preview.js
export function handler(req, res) {//export default
    res.clearPreviewData()
    res.end('Preview mode disabled')
}


//redirects
//in next.config.js
module.exports = {
    redirects: async () => {
        return [
            {
                source: '/about',
                destination: '/',
                permanent: false
            },
            {
                source: '/old-blog/:id',
                destination: '/new-blog/:id',
                permanent: true
            }
        ]
    }
}


//environment variables - variables data is not available in client side

//create a .env.local file and inside:
DB_USER = Vishwas
DB_PASSWORD = Password
NEXT_PUBLIC_ANALYTICS_ID = 123 //this can be rendered in clientside because NEXT_PUBLIC

//new use process.env.DB_USER to use its value in other components


