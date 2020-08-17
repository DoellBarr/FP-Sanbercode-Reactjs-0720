import React, {Component} from "react"
import axios from "axios"

import {Table,
        TableBody,
        TableCell,
        TableContainer,
        TableHead,
        TableRow,
        Paper,
        Link,} from '@material-ui/core'

// function minuteToHours(num){
//   var hours = (num / 60);
//   var rhours = Math.floor(hours);
//   var minutes = (hours - rhours) * 60;
//   var rminutes = Math.round(minutes);
//   return ( rhours === 0 ? "" : rhours + " Jam") + (rminutes === 0 ? "" : " " + rminutes + " Menit")
// }

  const preventDefault = (event) => event.preventDefault();

function changeIt(num){
  if (num === 1) {
    return "Yes"
  } else {
    return "No"
  }
}

class Game extends Component {
  constructor(props){
    super(props)
    this.state = {
      games: []
    }
  }

  componentDidMount(){
    axios.get(`https://www.backendexample.sanbersy.com/api/games`)
    .then(res => {
      let games = res.data.map(el=>{ return {
        id: el.id,
        name: el.name,
        singlePlayer: el.singlePlayer,
        release: el.release,
        multiplayer: el.multiplayer,
        genre: el.genre,
        platform: el.platform,
        image: el.image_url,
      }})
      this.setState({games})
    })
  }


  render(){
    return (
      <>
        <h1>Daftar Film Film Terbaik</h1>
        <TableContainer component={Paper}>
        <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>No</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Genre</TableCell>
            <TableCell align="right">Single Player</TableCell>
            <TableCell align="right">Multi Player</TableCell>
            <TableCell align="right">Platform Device</TableCell>
            <TableCell align="right">Release</TableCell>
            <TableCell align="right">Image Url</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            this.state.games.map((item, index) => {
              return(
              <TableRow key={index}>
                    <TableCell>{index+1}</TableCell>
                    <TableCell align="right">{item.name}</TableCell>
                    <TableCell align="right">{item.genre}</TableCell>
                    <TableCell align="right">{changeIt(item.singlePlayer)}</TableCell>
                    <TableCell align="right">{changeIt(item.multiplayer)}</TableCell>
                    <TableCell align="right">{item.platform}</TableCell>
                    <TableCell align="right">{item.release}</TableCell>
                    <TableCell align="right"><Link href={item.image} onClick={preventDefault}>
                                              {item.image}
                                              </Link>
                    </TableCell>
                  </TableRow>
                )
            })
          }
          </TableBody>
          </Table>
          </TableContainer>
      </>
    )
  }
}

export default Game
