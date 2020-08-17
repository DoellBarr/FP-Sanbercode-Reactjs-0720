// React component
import React, {useState, useEffect} from "react"
import axios from "axios"
import "./Movies.css"

// Material-Ui Component
import {Button, 
        Icon,
        Table,
        TableBody,
        TableCell,
        TableContainer,
        TableHead,
        TableRow,
        Link,
        Paper} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import {Delete, Create, SendRounded} from '@material-ui/icons'


  const preventDefault = (event) => event.preventDefault();


const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  table: {
    minWidth: 650,
  },
}));

const Movies = () => {
  const classes = useStyles()
  
  const [movies, setMovies] =  useState(null)
  const [input, setInput]  =  useState({
    title: "",
    description: "",
    year: 2020,
    duration: 120,
    genre: "",
    rating: 0
  })
  const [selectedId, setSelectedId]  =  useState(0)
  const [statusForm, setStatusForm]  =  useState("create")

  useEffect( () => {
    if (movies === null){
      axios.get(`https://www.backendexample.sanbersy.com/api/movies`)
      .then(res => {
          setMovies(res.data.map(el=>{ return {
            id: el.id, 
            title: el.title, 
            description: el.description,
            year: el.year,
            duration: el.duration,
            genre: el.genre,
            rating: el.rating,
          }
        }))
      })
    }
  }, [movies])
  
  const handleChange = (event) =>{
    let typeOfInput = event.target.name

    switch (typeOfInput){
      case "title":
      {
        setInput({...input, title: event.target.value});
        break
      }
      case "description":
      {
        setInput({...input, description: event.target.value});
        break
      }
      case "year":
      {
        setInput({...input, year: event.target.value});
          break
      }
      case "duration":
      {
        setInput({...input, duration: event.target.value});
          break
      }
      case "genre":
        {
          setInput({...input, genre: event.target.value});
            break
        }
      case "rating":
        {
          setInput({...input, rating: event.target.value});
            break
        }
      case "image_url":
        {
          setInput({...input, image_url: event.target.value});
            break
        }
    default:
      {break;}
    }
  }

  const handleSubmit = (event) =>{
    // menahan submit
    event.preventDefault()

    let title = input.title
    console.log(input)

    if (title.replace(/\s/g,'') !== ""){      
      if (statusForm === "create"){        
        axios.post(`https://www.backendexample.sanbersy.com/api/movies`, {
          title: input.title,
          description: input.description,
          year: input.year,
          duration: input.duration,
          genre: input.genre,
          rating: parseInt(input.rating),
          image_url: input.image_url
        })
        .then(res => {
            setMovies([...movies, {id: res.data.id, ...input}])
        })
      }else if(statusForm === "edit"){
        axios.put(`https://www.backendexample.sanbersy.com/api/movies/${selectedId}`, {
          title: input.title,
          description: input.description,
          year: input.year,
          duration: input.duration,
          genre: input.genre,
          rating: parseInt(input.rating),
          image_url: input.image_url
        })
        .then(res => {
            let singleMovie = movies.find(el=> el.id === selectedId)
            singleMovie.title = input.title
            singleMovie.description = input.description
            singleMovie.year = input.year
            singleMovie.duration = input.duration
            singleMovie.genre = input.genre
            singleMovie.rating = input.rating
            singleMovie.image_url = input.image_url
            setMovies([...movies])
        })
      }
      
      setStatusForm("create")
      setSelectedId(0)
      setInput({
        title: "",
        description: "",
        year: 2020,
        duration: 120,
        genre: "",
        rating: 0,
        image_url: ""
      })
    }
  }

  const Action = ({itemId}) =>{
    const handleDelete = () => {  
      let newMovies = movies.filter(el => el.id != itemId)
  
      axios.delete(`https://www.backendexample.sanbersy.com/api/movies/${itemId}`)
      .then(res => {
        console.log(res)
      })
            
      setMovies([...newMovies])
      
    }
    
    const handleEdit = () =>{
      let singleMovie = movies.find(x=> x.id === itemId)
      setInput({
        title: singleMovie.title,
        description: singleMovie.description,
        year: singleMovie.year,
        duration: singleMovie.duration,
        genre: singleMovie.genre,
        rating: singleMovie.rating,
        image_url: singleMovie.image_url
      })
      setSelectedId(itemId)
      setStatusForm("edit")
    }

    return(
      <>
        <Button 
          onClick={handleEdit}
          variant="contained"
          color="primary"
          className={classes.button}
          startIcon={<Create/>}
        >
        Edit
        </Button>
        &nbsp;
        <Button 
          onClick={handleDelete}
          variant="contained"
          color="secondary"
          className={classes.button}
          startIcon={<Delete/>}
        >
          Delete
          </Button>
      </>
    )
  }

  return(
    <>
      <h1>Daftar Film</h1>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
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
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

            {
              movies !== null && movies.map((item, index)=>{
                return(                    
                  <TableRow key={index}>
                    <TableCell>{index+1}</TableCell>
                    <TableCell align="right">{item.title}</TableCell>
                    <TableCell align="right">{item.description}</TableCell>
                    <TableCell align="right">{item.year}</TableCell>
                    <TableCell align="right">{item.duration}</TableCell>
                    <TableCell align="right">{item.genre}</TableCell>
                    <TableCell align="right">{item.rating}</TableCell>
                    <TableCell align="right"><Link href={item.image_url} onClick={preventDefault}>
                                              {item.image_url}
                                              </Link>
                    </TableCell>
                    <TableCell align="right">
                      <Action itemId={item.id} />

                    </TableCell>
                  </TableRow>
                )
              })
            }
        </TableBody>
      </Table>
      {/* Form */}
      <h1>Movies Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label style={{float: "left"}}>
            Title:
          </label>
          <input style={{float: "right"}} type="text" name="title" value={input.title} onChange={handleChange}/>
          <br/>
          <br/>
        </div>
        <div>
          <label style={{float: "left"}}>
            Description:
          </label>
          <textarea style={{float: "right"}} type="text" name="description" value={input.description} onChange={handleChange}/>
          <br/>
          <br/>
        </div>
        <div style={{marginTop: "20px"}}>
          <label style={{float: "left"}}>
            Year:
          </label>
          <input style={{float: "right"}} type="number" max={2020} min={1980}  name="year" value={input.year} onChange={handleChange}/>
          <br/>
          <br/>
        </div>
        <div style={{marginTop: "20px"}}>
          <label style={{float: "left"}}>
            Duration:
          </label>
          <input style={{float: "right"}} type="number" name="duration" value={input.duration} onChange={handleChange}/>
          <br/>
          <br/>
        </div>
        <div style={{marginTop: "20px"}}>
          <label style={{float: "left"}}>
            Genre:
          </label>
          <input style={{float: "right"}} type="text" name="genre" value={input.genre} onChange={handleChange}/>
          <br/>
          <br/>
        </div>
        <div style={{marginTop: "20px"}}>
          <label style={{float: "left"}}>
            Rating:
          </label>
          <input style={{float: "right"}} type="number" max={10} min={0} name="rating" value={input.rating} onChange={handleChange}/>
          <br/>
          <br/>
        </div>
        <div style={{marginTop: "20px"}}>
          <label style={{float: "left"}}>
            Image Url:
          </label>
          <input style={{float: "right"}} type="text" name="image_url" value={input.image_url} onChange={handleChange}/>
          <br/>
          <br/>
        </div>
         <button>submit</button>
      </form>
    </TableContainer>
    </>
  )
}

export default Movies