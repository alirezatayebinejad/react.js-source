//files and folder explaination just for those which are new and different from react
/*
    next.config.js : for strict mode in project to highlight some problems
    .eslintrc : configuration for es lint
    .next : created while run dev or start which is where the project runs but don't worry while development its just for running the application in production
    pages folder : responsible for routing feature and pages structure
*/

//catch all routes - when having a lot of nested routes and multiple parameters in address
//create a doc folder then inside create [...params].js file  //if we use [[...params]].js /doc route is available too as home
//inside [...params].js
//we have all the route params in an array and show content base on them so we know what page user wants
import { useRouter } from 'next/router'

function Doc() {
    const router = useRouter()
    const { params = [] } = router.query
    console.log(params)

    if (params.length === 2) {
        return (
            <h1>
                Viewing docs for feature {params[0]} and concept {params[1]}
            </h1>
        )
    } else if (params.length === 1) {
        return <h1>Viewing docs for feature {params[0]}</h1>
    }

    return <h1>Docs Home Page</h1>
}

export default Doc

//navigating 
import Link from 'next/link'

function ProductList({ productId = 100 }) {
    return (
        <>
            <Link href='/'>
                <a>Home</a>
            </Link>
            <h2>
                <Link href='product/1'>
                    <a>Product 1</a>
                </Link>
            </h2>
            <h2>
                <Link href='product/2'>
                    <a>Product 2</a>
                </Link>
            </h2>
            <h2>
                <Link href='product/3' replace>
                    <a>Product 3</a>
                </Link>
            </h2>
            <h2>
                <Link href={`product/${productId}`}>
                    <a>Product {productId}</a>
                </Link>
            </h2>
        </>
    )
}


//programmatic routing - like when hit the button then if process is ok you rout to a specific page
import Link from 'next/link'
import { useRouter } from 'next/router'

function Home() {
    const router = useRouter()

    const handleClick = () => {
        console.log('Placing your order')
        router.push('/product') //or replace instead of push
    }
    return (
        <>
            <h1>Welcome Home</h1>
            <Link href='/blog'>
                <a>Blog</a>
            </Link>
            <Link href='/product'>
                <a>Products</a>
            </Link>
            <button onClick={handleClick}>Place Order</button>
        </>
    )
}


//to replace the 404 page just create a 404.js file and return a designed component
function PageNotFound() {
    return <h1>404 Page with all the custom styling necessary</h1>
}

//export default PageNotFound