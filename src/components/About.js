import React,{useContext} from 'react'
import notecontext from '../context/notes/noteContext'

const About = () => {
  const a = useContext(notecontext)
  return (
    <div>
      <h1>This is about {a.name} and {a.class}</h1>
    </div>
  )
}

export default About;
