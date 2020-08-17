import React, {useState, useEffect} from 'react'
import axios from 'axios'

import {Paper, Typography, Button , Container, TextField} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'



const ChangePassword = () => {

	const [password, setPassword]									= useState('')
	const [errorPassword, setErrorPassword]				= useState('')
	const [confirmPassword, setConfirmPassword] 	= useState('')

	const handleChange = (event) => {
		const value = event.target.value
		setPassword(value)
		if(!value){
			setErrorPassword('Passsword jangan kosong')
		} else {
			setErrorPassword('')
		}
	}

	const newHandleChange = (event) => {
		const value = event.target.value
		setConfirmPassword(value)
		if(password !== value){
			console.log("Password tidak sama")
		}
	}

	const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const classes = useStyles()
	return (
		<>
		 	<Container maxwidth="m">
				<Paper elevation={3}>
					<Typography>
						<form className={classes.root}>
								<TextField
	          id="standard-password-input"
	          label="New Password"
	          type="password"
	          autoComplete="current-password"
						value={password}
						onChange={handleChange}
	        />

							<br/>
								<TextField
						id="standard-password-input"
						label="Password"
						type="password"
						autoComplete="current-password"
						value={confirmPassword}
						onChange={newHandleChange}
					/>
							<br/>
							<button>Save</button>
						</form>
					</Typography>
				</Paper>
			</Container>
		</>
		)

}

export default ChangePassword
