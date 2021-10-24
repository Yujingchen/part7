import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry =  (name) => {
  const [country, setCountry] = useState(null)

  console.log(country)
  useEffect(() => {
  axios.get(`https://restcountries.com/v3.1/name/${name}?fullText=true`).then(
  (res) => {
  const raw = res.data[0]
  console.log(raw);
  const country = { 
    found: true, 
    data: { name: raw.name.name, capital:raw.capital[0], population: raw.population, flag:raw.flag }}

 setCountry(country)})
  },[name])

  return country
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.data.name} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div> 
      {country.data.flag} 
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App
