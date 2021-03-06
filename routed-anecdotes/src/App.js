import React, { useState } from 'react'
import {
  Switch, Route, Link, useRouteMatch, useHistory
} from "react-router-dom"
import { useField } from './hooks/index';

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link to='/' style={padding}>anecdotes</Link>
      <Link to='/createAnecdote' style={padding}>create new</Link>
      <Link to='/about' style={padding}>about</Link>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote =><Link to={`/anecdotes/${anecdote.id}`}> <li key={anecdote.id} >{anecdote.content}</li></Link>)}
    </ul>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>.

    See <a href='https://github.com/fullstack-hy/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  // const [content, setContent] = useState('')
  // const [author, setAuthor] = useState('')
  // const [info, setInfo] = useState('')
  const content = useField('content')
  const author = useField('author')
  const info = useField('info')

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value ,
      author:author.value,
      info:info.value,
      votes: 0
    })
  }
  const handleReset = () => {
    content.resetValue();
    author.resetValue();
    info.resetValue();
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' {...content} />
        </div>
        <div>
          author
          <input name='author' {...author} />
        </div>
        <div>
          url for more info
          <input name='info' {...info} />
        </div>
        <button>create</button>
        <input type="reset" value="reset" onClick={handleReset}/>
      </form>
    </div>
  )
}
  const Anecdote = ({anecdote}) => {
    if (anecdote) { 
      const anecdoteComponent = (
        <div>
          <h1> {anecdote.content} </h1>
          <p> has {anecdote.votes} votes</p>
          <h1> for more info see {anecdote.info} </h1>
        </div>
      )
    return anecdoteComponent }
    return null;
  }

  const Notification = ({notification}) => {
    return (
      <div>{notification}</div>
    )
  }

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])
  const [notification, setNotification] = useState('')
  
  const history = useHistory();

  const addNew = (anecdote) => {
    console.log( anecdote.content);
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`A new anecdote: "${anecdote.content}", is created!`)
    setTimeout(()=>{setNotification('')}, 10000)
    history.push('/')
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const match = useRouteMatch('/anecdotes/:id')
  const anecdote = match ? anecdotes.find(anecdote => anecdote.id === String(match.params.id)) : null

  return (
    <div>
        <h1>Software anecdotes</h1>
        <Menu />
        <Notification notification={notification}/>
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/createAnecdote">
            <CreateNew addNew={addNew} />
          </Route>
          <Route path="/anecdotes/:id">
            <Anecdote anecdote={anecdote} />
          </Route>
          <Route path="/">
            <AnecdoteList anecdotes={anecdotes}/>
          </Route>
        </Switch>
      <Footer />
    </div>
  )
}

export default App;