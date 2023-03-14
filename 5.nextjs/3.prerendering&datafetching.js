//prerendering

//static generating without data
/*
by default nextjs will generate and prerender pages
*/

//static generation with data

import User from '../components/user'

function UserList({ users }) {
    return (
        <>
            <h1>List of users</h1>
            {users.map(user => {
                return (
                    <div key={user.id}>
                        <User user={user} />
                    </div>
                )
            })}
        </>
    )
}

export default UserList
//func name and return should be exacly like this
export async function getStaticProps() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    const data = await response.json()
    //   console.log(data)

    return {
        props: {
            users: data
        }
    }
}
//getStaticProps only runs on serverside not clientside
//you can write serverside code on it - accessing file system using fs module or querying a database
//you can not define in a regular component - folder it is allowed in page folder

//when you have a fetched data and want to create different paths with one page layout like blog posts and page

//in index.js
import Link from 'next/link'

function PostList({ posts }) {
    return (
        <>
            <h1>List of Posts</h1>
            {posts.map(post => {
                return (
                    <div key={post.id}>
                        <Link href={`posts/${post.id}`}>
                            <h2>
                                {post.id} {post.title}
                            </h2>
                        </Link>
                        <hr />
                    </div>
                )
            })}
        </>
    )
}

//export default PostList

export async function getStaticProps() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    const data = await response.json()

    return {
        props: {
            posts: data.slice(0, 3)
        }
    }
}

//in [postId].js
import { useRouter } from 'next/router'

function Post({ post }) {
    const router = useRouter()

    //while fallback is true this jsx will shown to not determined routes
    if (router.isFallback) {
        return <div>Loading...</div>
    }

    return (
        <>
            <h2>
                {post.id} {post.title}
            </h2>
            <p>{post.body}</p>
        </>
    )
}

//export default Post

export async function getStaticProps(context) {
    const { params } = context
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${params.postId}`
    )
    const data = await response.json()

    //if user type a not id in route it will show the 404 page even if fallback is true
    if (!data.id) {
        return {
            notFound: true
        }
    }

    console.log(`Generating page for /posts/${params.postId}`)
    return {
        props: {
            post: data
        }
    }
}

export async function getStaticPaths() {
    // const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    // const data = await response.json()
    // const paths = data.map(post => {
    //   return {
    //     params: { postId: `${post.id}` }
    //   }
    // })

    return {
        paths: [
            { params: { postId: '1' } },
            { params: { postId: '2' } },
            { params: { postId: '3' } }
        ],
        fallback: true
    }
}
//fallbacks:
/*
false=> paths will be rendered to html while build time - any paths not returned by getStaticPaths will be 404 page
      |_ good for and app with small number of paths to pre-render - pages are not added often - a blog site with a few articles

True=> paths will be rendered to html while build time
       the paths that have not been generated at build time will not result in a 404 page. instead, next.js will serve a "fallback" bersion of the page on the first request to such a path
       in the background, Nextjs will statically generate the requested path HTML and JSON. This includes running getStatiicProps
       when that's done, the browser receibes the JSON for the generated path. this will be used to automatically render the page with the required props.from the user's perspective, the page will be swapped from the fallback page to the full page.
       at the same time, nextjs keeps track of the new list of pre-rendered pages.subsequent requests to the same path will serve the generated page, just like other pages pre-rendered at build time.
    |_ the true value is most suitable if your app has a very large number of static pages that depend on data.
       a large ecommerce site. you want all the product pages to be pre-rendered but if you have a few thousand products, builds can take a really long time.
       you may statically generate a small subset of products that are popular and use fallback: true for the rest.
       when someone requests a page that;s not generated yet, the user will see the page with a loading indicator.
       shortly after, getStaticProps finishes and the page will be rendered with the requested data. from then onwards, everyone who requests the same page will get the statically pre-rendered page.
       this ensures that users always have a fast experience while preserving fast builds and the benefits of static generation
"blocking"=> the paths returned from getstatcpaths will be rendered to html at build time by getstaticprops
       the paths that have not been generated at build time will not result in a 404 page. instead, on the first request, nextjs will render the page on the server and return the generated html
       when thats done the browser receives the html for the generated path. from the users perspective, it will transition from the browser is requesting the page to the full page is loaded thesis no flash of loading/fallback state
       at the same time nextjs keeps track of the new list of pre rendered pages. subsequent requests to the same path will serve the generated page, just like other pages prerendered ate build time
    |_ on a UX level, sometimes, people prefer the page to be loaded without a loading indicator if the wait time is a few milli seconds. this helps avoid the layout shift
       some crawlers did not support javascript. the loading page would bes rendered and the the full page would be loaded which was causing a problem.
*/

//a problem is when a product data changes in database that data is not shown to user cause the change is made after the page build
//to fix this issue we use:

//incremental static regeneration

//in products/index.js
function ProductList({ products }) {
    return (
        <>
            <h1>List of products</h1>
            {products.map(product => {
                return (
                    <div key={product.id}>
                        <h2>
                            {product.id} {product.title} {product.price}
                        </h2>
                        <hr />
                    </div>
                )
            })}
        </>
    )
}
//export default ProductList

export async function getStaticProps() {
    console.log('Generating / Regenerating ProductList')
    const response = await fetch('http://localhost:4000/products')
    const data = await response.json()

    return {
        props: {
            products: data
        },
        revalidate: 30
    }
}
//in products/[productId].js
import { useRouter } from 'next/router'

function Product({ product }) {
    const router = useRouter()

    if (router.isFallback) {
        return <div>Loading...</div>
    }
    return (
        <div>
            <h2>
                {product.id} {product.title} {product.price}
            </h2>
            <p>{product.description}</p>
            <hr />
        </div>
    )
}
//export default Product

export async function getStaticProps(context) {
    const { params } = context
    const response = await fetch(
        `http://localhost:4000/products/${params.productId}`
    )
    const data = await response.json()
    console.log(`Generating page for /products/${params.productId}`)

    return {
        props: {
            product: data
        },
        revalidate: 10
    }
}

export async function getStaticPaths() {
    return {
        paths: [{ params: { productId: '1' } }],
        fallback: true
    }
}


//server side rendering (SSR) - executes on request time - codes will run in server side - slower than static rendering - good when you want data to be updated all the time

//in news/index.js
function NewsArticleList({ articles }) {
    return (
        <>
            <h1>List of News Articles</h1>
            {articles.map(article => {
                return (
                    <div key={article.id}>
                        <h2>
                            {article.id} {article.title} | {article.category}
                        </h2>
                        <hr />
                    </div>
                )
            })}
        </>
    )
}
//export default NewsArticleList

export async function getServerSideProps() {
    console.log('Pre-rendering NewsArticleList')
    const response = await fetch('http://localhost:4000/news')
    const data = await response.json()

    return {
        props: {
            articles: data
        }
    }
}

//in news/[category].js

function ArticleListByCategory({ articles, category }) {
    return (
        <>
            <h1>Showing news for category "{category}"</h1>
            {articles.map(article => {
                return (
                    <div key={article.id}>
                        <h2>
                            {article.id} {article.title}
                        </h2>
                        <p>{article.description}</p>
                        <hr />
                    </div>
                )
            })}
        </>
    )
}
//export default ArticleListByCategory

export async function getServerSideProps(context) {
    const { params, req, res, query } = context
    const { category } = params
    const response = await fetch(
        `http://localhost:4000/news?category=${category}`
    )
    const data = await response.json()

    console.log(`Pre-rendering News Articles for category ${category}`)
    res.setHeader('Set-Cookie', ['name=Vishwas'])
    console.log(req.headers.cookie)
    console.log(query)
    return {
        props: {
            articles: data,
            category
        }
    }
}

