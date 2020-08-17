import React, {Component} from "react"
import axios from "axios"

import {Icon,
        Table,
        TableBody,
        TableCell,
        TableContainer,
        TableHead,
        TableRow,
        Paper,
        Link,} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'


function minuteToHours(num){
  var hours = (num / 60);
  var rhours = Math.floor(hours);
  var minutes = (hours - rhours) * 60;
  var rminutes = Math.round(minutes);
  return ( rhours === 0 ? "" : rhours + " Jam") + (rminutes === 0 ? "" : " " + rminutes + " Menit")
}

  const preventDefault = (event) => event.preventDefault();


class Movie extends Component {
  constructor(props){
    super(props)
    this.state = {
      movies: []
    }
  }

  componentDidMount(){
    axios.get(`https://www.backendexample.sanbersy.com/api/movies`)
    .then(res => {
      let movies = res.data.map(el=>{ return {
        id: el.id,
        title: el.title,
        rating: el.rating,
        year: el.year,
        duration: el.duration,
        genre: el.genre,
        description: el.description,
        image: el.image_url,
      }})
      this.setState({movies})
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
            <TableCell align="right">Title</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Year</TableCell>
            <TableCell align="right">Duration</TableCell>
            <TableCell align="right">Genre</TableCell>
            <TableCell align="right">Rating</TableCell>
            <TableCell align="right">Image Url</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            this.state.movies.map((item, index) => {
              return(
              <TableRow key={index}>
                    <TableCell>{index+1}</TableCell>
                    <TableCell align="right">{item.title}</TableCell>
                    <TableCell align="right">{item.description}</TableCell>
                    <TableCell align="right">{item.year}</TableCell>
                    <TableCell align="right">{minuteToHours(item.duration)}</TableCell>
                    <TableCell align="right">{item.genre}</TableCell>
                    <TableCell align="right">{item.rating}</TableCell>
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

export default Movie
