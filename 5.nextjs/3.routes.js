/*
in pages folder every file is a route
home page is index.js
other pages like about.js can be accessed with: domain/about address

nested routes:
for domain/blog domain/blog/first and domain/blog/second:
create a folder called blog then inside we have index.js , first.js and second.js
*/

//Dynamic routes: display different product pages by their id in on dynamic page
//route structur:
/*
in pages:
product folder=>
index.js
[productId].js
//for nested dynamic routes: create productId folde with index.js inside the create another dynamic routes
in productId file we have to 
import { useRouter } from 'next/router'
and: 
const router = useRouter()
const productId = router.query.productId or const { productId, reviewId } = router.query if its more
*/ 