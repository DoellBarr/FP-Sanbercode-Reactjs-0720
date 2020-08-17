import React, {useEffect, useState} from 'react'
import axios from 'axios'

const Register = () => {
	const [user, setUser] = useState(null)
	const [input, setInput] = useState({
		username: "",
		password: ""
	})
	const [selectedId, setSelectedId] = useState(0)
	const [statusForm, setStatusForm] = useState("create")

	useEffect ( () => {
		if(user === null){
			axios.get(`https://www.backendexample.sanbersy.com/api/users`)
			.then (res => {
				setUser(res.data.map(el=> {
					return {
						id: el.id,
						username: el.username,
						password: el.password
					}
				}))
			})
		}
	}, [user])

	const handleSubmit = (event) => {
		event.preventDefault()

		let username = input.username
		console.log(input);

		if (statusForm === "create") {
			axios.post('https://www.backendexample.sanbersy.com/api/users', {
				username: input.username,
				password: input.password
			})
			.then(res => {
				setUser([...user, {id: res.data.id, ...input}])
				alert("Registration Success, Please Go To Home Tab Now!")
			})
			.catch(err=>{
				console.log(err);
			})
		} else if(statusForm === "edit"){
			axios.put(`https://www.backendexample.sanbersy.com/api/users/${selectedId}`, {
				username: input.username,
				password: input.password
			})
			.then(res => {
				let singleUser = user.find(el => el.id === selectedId)
				singleUser.username = input.username
				singleUser.password = input.password

			})
			.catch(err=>{
				console.log(err);
			})
		}

		setStatusForm("create")
		setSelectedId(0)
		setInput({
			username: "",
			password: "",

		})
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
	  	<h1>Registration Form</h1>
	  	<form onSubmit={handleSubmit}>
	  		<div>
	  			<label style={{float: "left"}}>
	  				Username:
	  			</label>
	  			<input style = {{float: "right"}} type="text" name="username" value={input.username} onChange={handleChange}/>
	  			<br/>
	  			<br/>
	  		</div>
	  		<div>
	  			<label style={{float: "left"}}>
	  				Password:
	  			</label>
	  			<input minlength="8" style = {{float: "right"}} type="password" name="password" value={input.password} onChange={handleChange}/>
	  			<br/>
	  			<br/>
	  		</div>
	  		<button>submit</button>
	  	</form>
	  </>
	)
}

export default Register
