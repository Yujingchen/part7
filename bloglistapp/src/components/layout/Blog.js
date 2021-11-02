import React, {useState} from 'react'
import {
  useParams
} from "react-router-dom";

 export const Blog = ({blogs, handleLikesIncrease, handleAddComment}) => {
  const [comment, setComment] = useState('')
  let { id } = useParams();
  const blog = blogs.find(blog=>blog.id === id)
  const addComment= (event)=>{
    handleAddComment(event, blog.id, comment)
    setComment('')
  }
  if(!blogs || blogs.length===0) {
    return null
  }
    return (
      <div>
        <h2>Blogs</h2>
        <h2 >{blog.title}</h2>
        <a href={blog.url} target="_blank">{blog.url}</a>
        <p className="likesCount">{blog.likes} likes
        <button style={{display: "inline-Block"}} className="likeButton" onClick={(event) => handleLikesIncrease(event, blog.id)}>like</button>
        </p>
        <p> added by {blog.author} </p>
        <hr/>
        <h5>Comments</h5>
        <input id="comment" className="comment" value={comment} name="title" onChange={(event) => {setComment(event.target.value)}}></input>
        <button style={{display: "inline-Block"}} id="create-button" type="submit" onClick={(event)=>addComment(event, blog.id, comment)}>add comment</button>
        <ul>
            {blog.comments?.map(comment=><li>{comment}</li>)}
        </ul>
      </div>
    )
  }

