import React from 'react';
import {Container, Paper} from '@material-ui/core'

const Home = () => {
	return(
	<>
		<h1>Hello!</h1>
			<Container maxWidth = 'm'>
				<Paper elevation ={3}>
					I'm a newbie on this web dev <br/>
					Intro on About tab, the List of Movie and Game is already on tab too, click the hamburger icon<br/>
					If you want to see the review of a movie, you can click the Movie Review tab
				</Paper>
			</Container>
	</>
		)
}

export default Home