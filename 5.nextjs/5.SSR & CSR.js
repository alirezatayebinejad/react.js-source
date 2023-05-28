
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

//client side data fetching - when seo is not important or in components that we can not use ssr 

import { useState, useEffect } from 'react'

function Dashboard() {
    const [isLoading, setIsLoading] = useState(true)
    const [dashboardData, setDashboardData] = useState(null)
    useEffect(() => {
        async function fetchDashboardData() {
            const response = await fetch('http://localhost:4000/dashboard')
            const data = await response.json()
            setDashboardData(data)
            setIsLoading(false)
        }
        fetchDashboardData()
    }, [])

    if (isLoading) {
        return <h2>Loading...</h2>
    }

    return (
        <div>
            <h2>Dashboard</h2>
            <h2>Posts - {dashboardData.posts}</h2>
            <h2>Likes - {dashboardData.likes}</h2>
            <h2>Followers - {dashboardData.followers}</h2>
            <h2>Following - {dashboardData.following}</h2>
        </div>
    )
}
//export default Dashboard


//SWR package for client side data fetching - more features like auto update UI when data changes

import useSWR from 'swr'

const fetcher = async () => {
    const response = await fetch('http://localhost:4000/dashboard')
    const data = await response.json()
    return data
}

function DashboardSWR() {
    const { data, error } = useSWR('dashboard', fetcher)

    if (error) return 'An error has occurred.'
    if (!data) return 'Loading...'

    return (
        <div>
            <h2>SWR Dashboard</h2>
            <h2>Posts - {data.posts}</h2>
            <h2>Likes - {data.likes}</h2>
            <h2>Followers - {data.followers}</h2>
            <h2>Following - {data.following}</h2>
        </div>
    )
}
//export default DashboardSWR

//serverside rendering and clientside rendering combined

import { useState } from 'react'
import { useRouter } from 'next/router'

function EventList({ eventList }) {
    const [events, setEvents] = useState(eventList)
    const router = useRouter()

    const fetchSportsEvents = async () => {
        const response = await fetch('http://localhost:4000/events?category=sports')
        const data = await response.json()
        setEvents(data)
        router.push('/events?category=sports', undefined, { shallow: true })
    }
    return (
        <>
            <button onClick={fetchSportsEvents}>Sports Events</button>
            <h1>List of events</h1>
            {events.map(event => {
                return (
                    <div key={event.id}>
                        <h2>
                            {event.id} {event.title} {event.date} | {event.category}
                        </h2>
                        <p>{event.description}</p>
                        <hr />
                    </div>
                )
            })}
        </>
    )
}
//export default EventList

export async function getServerSideProps(context) {
    const { query } = context
    const { category } = query
    const queryString = category ? 'category=sports' : ''
    const response = await fetch(`http://localhost:4000/events?${queryString}`)
    const data = await response.json()

    return {
        props: {
            eventList: data
        }
    }
}

