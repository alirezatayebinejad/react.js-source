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
*/