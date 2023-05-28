// in nextjs we can write api's as it is a fullstack framwork
// to create api you have to create an api folder insite the page folder

//in pages/api/index.js
export default function handler(req, res) {
    res.status(200).json({ name: 'Home API route' })
}


//in pages/api/[...params].js
export default function handler(req, res) {
    const params = req.query.params
    console.log(params)
    res.status(200).json(params)
}

//in pages/api/comments/index.js
import { comments } from '../../../data/comments'

export default function handler(req, res) {
    if (req.method === 'GET') {
        res.status(200).json(comments)
    } else if (req.method === 'POST') {
        const comment = req.body.comment
        const newComment = {
            id: Date.now(),
            text: comment
        }
        comments.push(newComment)
        res.status(201).json(newComment)
    }
}

//in pages/api/comments/[commentId].js
import { comments } from '../../../data/comments'

export default function handler(req, res) {
    const { commentId } = req.query
    if (req.method === 'GET') {
        const comment = comments.find(comment => comment.id === parseInt(commentId))
        res.status(200).json(comment)
    } else if (req.method === 'DELETE') {
        const deletedComment = comments.find(
            comment => comment.id === parseInt(commentId)
        )
        const index = comments.findIndex(
            comment => comment.id === parseInt(commentId)
        )
        comments.splice(index, 1)
        res.status(200).json(deletedComment)
    }
}

//in data/comments.js
export const comments = [
    {
        id: 1,
        text: 'This is the first comment'
    },
    {
        id: 2,
        text: 'This is the second comment'
    },
    {
        id: 3,
        text: 'This is the third comment'
    }
]

//in pages/comments/index.js

import { useState } from 'react'
function CommentsPage() {
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState('')

    const fetchComments = async () => {
        const response = await fetch('/api/comments')
        const data = await response.json()
        setComments(data)
    }

    const submitComment = async () => {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ comment }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()
        console.log(data)
    }

    const deleteComment = async commentId => {
        const response = await fetch(`/api/comments/${commentId}`, {
            method: 'DELETE'
        })
        const data = await response.json()
        console.log(data)
        fetchComments()
    }
    return (
        <>
            <div>
                <input
                    type='text'
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                />
                <button onClick={submitComment}>Submit comment</button>
            </div>
            <hr />
            <button onClick={fetchComments}>Load comments</button>
            {comments.map(comment => {
                return (
                    <div key={comment.id}>
                        {comment.id}. {comment.text}
                        <button onClick={() => deleteComment(comment.id)}>Delete</button>
                    </div>
                )
            })}
        </>
    )
}
//export default CommentsPage

//in pages/comments/[commentId].js

import { comments } from '../../data/comments'

function Comment({ comment }) {
    return (
        <div>
            {comment.id}. {comment.text}
        </div>
    )
}
//export default Comment

export async function getStaticProps(context) {
    const { params } = context
    const { commentId } = params

    const comment = comments.find(comment => comment.id === parseInt(commentId))
    console.log(comment)

    /** Don't do this 
    const response = await fetch(`http:localhost:3000/api/comments/${commentId}`)
    const data = await response.json()
    */

    return {
        props: {
            comment
        }
    }
}

export async function getStaticPaths() {
    return {
        paths: [
            { params: { commentId: '1' } },
            { params: { commentId: '2' } },
            { params: { commentId: '3' } }
        ],
        fallback: false
    }
}

