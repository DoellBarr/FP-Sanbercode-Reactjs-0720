// React component
import React, {useState, useEffect} from "react"
import axios from "axios"
import "./Movies.css"

// Material-Ui Component
import {Button, 
        Table,
        TableBody,
        TableCell,
        TableContainer,
        TableHead,
        TableRow,
        Paper,
        Link,} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import {Delete, Create} from '@material-ui/icons'

const preventDefault = (event) => event.preventDefault();


const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  table: {
    minWidth: 650,
  },
}));

const changeIt = (num) => {
  if (num === 1) {
    return "Yes"
  } else{
    return "No"
  }
}
 

const Games = () => {
  const classes = useStyles()
  
  const [games, setGames] =  useState(null)
  const [input, setInput]  =  useState({
    name: "",
    singlePlayer: 0,
    multiplayer: 0,
    platform: "",
    genre: "",
    release: 2010,
    image_url: ""
  })
  const [selectedId, setSelectedId]  =  useState(0)
  const [statusForm, setStatusForm]  =  useState("create")

  useEffect( () => {
    if (games === null){
      axios.get(`https://www.backendexample.sanbersy.com/api/games`)
      .then(res => {
          setGames(res.data.map(el=>{ return {
            id: el.id, 
            name: el.name, 
            singlePlayer: el.singlePlayer,
            multiplayer: el.multiplayer,
            platform: el.platform,
            genre: el.genre,
            release: el.release,
            image_url: el.image_url
          }
        }))
      })
    }
  }, [games])
  
  const handleChange = (event) =>{
    let typeOfInput = event.target.name

    switch (typeOfInput){
      case "name":
      {
        setInput({...input, name: event.target.value});
        break
      }
      case "singlePlayer":
      {
        setInput({...input, singlePlayer: event.target.value});
        break
      }
      case "multiplayer":
      {
        setInput({...input, multiplayer: event.target.value});
          break
      }
      case "platform":
      {
        setInput({...input, platform: event.target.value});
          break
      }
      case "genre":
        {
          setInput({...input, genre: event.target.value});
            break
        }
      case "release":
        {
          setInput({...input, release: event.target.value});
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
      
      if (statusForm === "create"){        
        axios.post(`https://www.backendexample.sanbersy.com/api/games`, {
            id: input.id, 
            name: input.name, 
            singlePlayer: input.singlePlayer,
            multiplayer: input.multiplayer,
            platform: input.platform,
            genre: input.genre,
            release: input.release,
            image_url: input.image_url
        })
        .then(res => {
            setGames([...games, {id: res.data.id, ...input}])
        })
      }else if(statusForm === "edit"){
        axios.put(`https://www.backendexample.sanbersy.com/api/games/${selectedId}`, {
            id: input.id, 
            name: input.name, 
            singlePlayer: input.singlePlayer,
            multiplayer: input.multiplayer,
            platform: input.platform,
            genre: input.genre,
            release: input.release,
            image_url: input.image_url
        })
        .then(res => {
            let singleGame = games.find(el=> el.id === selectedId)
            singleGame.name = input.name
            singleGame.singlePlayer = input.singlePlayer
            singleGame.multiplayer = input.multiplayer
            singleGame.platform = input.platform
            singleGame.genre = input.genre
            singleGame.release = input.release
            singleGame.image_url = input.image_url
            setGames([...games])
        })
      
      
      setStatusForm("create")
      setSelectedId(0)
      setInput({
        name: "",
        singlePlayer: 0,
        multiplayer: 0,
        platform: "",
        genre: "",
        release: 2010,
        image_url: ""
      })
    }
  }

  const Action = ({itemId}) =>{
    const handleDelete = () => {  
      let newGames = games.filter(el => el.id != itemId)
  
      axios.delete(`https://backendexample.sanbersy.com/api/data-game/${itemId}`)
      .then(res => {
        console.log(res)
      })
            
      setGames([...newGames])
      
    }
    
    const handleEdit = () =>{
      let singleGame = games.find(x=> x.id === itemId)
      setInput({
        name: singleGame.name,
        singlePlayer: singleGame.singlePlayer,
        multiplayer: singleGame.multiplayer,
        platform: singleGame.platform,
        genre: singleGame.genre,
        release: singleGame.release,
        image_url: singleGame.image_url,
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
      <h1>Daftar Game</h1>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>No</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Single Player</TableCell>
            <TableCell align="right">Multi Player</TableCell>
            <TableCell align="right">Platform</TableCell>
            <TableCell align="right">Genre</TableCell>
            <TableCell align="right">Release</TableCell>
            <TableCell align="right">Image Url</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

            {
              games !== null && games.map((item, index)=>{
                return(                    
                  <TableRow key={index}>
                    <TableCell>{index+1}</TableCell>
                    <TableCell align="right">{item.name}</TableCell>
                    <TableCell align="right">{changeIt(item.singlePlayer)}</TableCell>
                    <TableCell align="right">{changeIt(item.multiplayer)}</TableCell>
                    <TableCell align="right">{item.platform}</TableCell>
                    <TableCell align="right">{item.genre}</TableCell>
                    <TableCell align="right">{item.release}</TableCell>
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
      <h1>Games Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label style={{float: "left"}}>
            Name:
          </label>
          <input style={{float: "right"}} type="text" name="name" value={input.name} onChange={handleChange}/>
          <br/>
          <br/>
        </div>
        <div>
          <label style={{float: "left"}}>
            Single Player:
          </label>
          <input style={{float: "right"}} type="number" max={1} min={0} name="singlePlayer" value={input.singlePlayer} onChange={handleChange}/>
          <br/>
          <br/>
        </div>
        <div style={{marginTop: "20px"}}>
          <label style={{float: "left"}}>
            Multi Player:
          </label>
          <input style={{float: "right"}} type="number" max={1} min={0} name="multiplayer" value={input.multiplayer} onChange={handleChange}/>
          <br/>
          <br/>
        </div>
        <div style={{marginTop: "20px"}}>
          <label style={{float: "left"}}>
            Platform:
          </label>
          <input style={{float: "right"}} type="text" name="platform" value={input.platform} onChange={handleChange}/>
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
            Release:
          </label>
          <input style={{float: "right"}} type="number" min={1990} max={2020} name="release" value={input.release} onChange={handleChange}/>
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

export default Games