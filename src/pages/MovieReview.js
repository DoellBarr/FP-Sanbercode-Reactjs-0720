import React, {Component} from "react"
import axios from "axios"

import {Card,
        CardActionArea,
        CardContent,
        CardMedia,
        Typography,
        Divider,} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'


function minuteToHours(num){
  var hours = (num / 60);
  var rhours = Math.floor(hours);
  var minutes = (hours - rhours) * 60;
  var rminutes = Math.round(minutes);
  return ( rhours === 0 ? "" : rhours + " Jam") + (rminutes === 0 ? "" : " " + rminutes + " Menit")
}


class MovieReview extends Component {
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
        review: el.review,
        image: el.image_url,
      }})
      this.setState({movies})
    })
  }

  render(){
    return (
      <>
        <h1>Daftar Film Film Terbaik</h1>
        <Card className="card">
          {
            this.state.movies.map((item, index) => {
              return(
              <CardActionArea key={index}>
                <CardMedia component = "img"
                  alt={item.title}
                  height="140"
                  image={item.image}

                  title={item.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {item.title} ({item.year})
                  </Typography>
                  <Typography variant="h5" component="h2">
                    Genre: {item.genre}
                  </Typography>
                  <Typography variant="h5" component="h2">
                    {minuteToHours(item.duration)}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {item.review}
                  </Typography>
                </CardContent>
                <Divider/>
                <br/>
                <br/>
              </CardActionArea>
                )
            })
          }
        </Card>
      </>
    )
  }
}

export default MovieReview
