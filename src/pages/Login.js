import React, { useEffect, useState } from "react"
import axios from 'axios'


const Login = () =>{
  const [user, setUser] = useState(null)
  const [input, setInput] = useState({username: "" , password: ""})
  const [, setSelectedId] = useState (0)
  const [statusForm, setStatusForm] = useState("create")

  useEffect ( () => {
    if(user === null){
      axios.get(`https://backendexample.sanbersy.com/api/users`)
      .then(res => {
        setUser(res.data.map(el=>{
          return{
            id: el.id,
            username: el.username,
            password: el.password
          }
        }))
      })
    }
  }, [user])

  const handleSubmit = (event) =>{
    event.preventDefault()

    let users = input.username
    console.log(users);

        if (users.replace(/\s/g, '') !== ""){
          if(statusForm === "create"){
        axios.post(`https://backendexample.sanbersy.com/api/login`,{
          username: input.username,
          password: input.password,
        })
        .then(res => {
          setUser([...user, {id: res.data.id, ...input}])
          localStorage.setItem("user", JSON.stringify({username: input.username, password: input.password}))
          alert("Berhasil Login, Silahkan Klik tab Home")
        })
        .catch(err=>{
          console.log(err);
        })

      }
    }

    setStatusForm("create")
    setSelectedId(0)
    setInput({username: "", password: ""})
  }

  const handleChange = (event) =>{
    let value = event.target.value
    let name = event.target.name
    switch (name){
      case "username":{
        setInput({...input, username: value})
        break;
      }
      case "password":{
        setInput({...input, password: value})
        break;
      }
      default:{break;}
    }
  }

  return(
    <>
      <form onSubmit={handleSubmit}>
        <label>Username: </label>
        <input type="text" name="username" onChange={handleChange} value={input.username}/>
        <br/>
        <label>Password: </label>
        <input type="password" name="password" onChange={handleChange} value={input.password}/>
        <br/>
        <button>Login</button>
      </form>
    </>
  )
}

export default Login