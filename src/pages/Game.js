import React, {useRef, useEffect} from "react"
import {Grid, html} from 'gridjs'
import "gridjs/dist/theme/mermaid.css";

function changeIt(num){
  if (num === 1) {
    return "Yes"
  } else {
    return "No"
  }
}

const Game = () => {
  const wrapperRef = useRef(null);

  useEffect(() => {
      new Grid({
        sort: {
          multiColumn: false,
        },
        columns: [
          'Name',
          'Genre',
          'Single Player',
          'Multi Player',
          'Platform',
          'Release',
          'Image'
        ],
        server:{
          url: 'https://backendexample.sanbersy.com/api/data-game',
          then: data => data.map(el=> [
            el.name,
            el.genre,
            (changeIt(`${el.singleplayer}`)),
            (changeIt(`${el.multiplayer}`)),
            el.platform,
            el.release,
            html(`<img width = '250px' height '250px' alt = '${el.name}' src = '${el.image_url}'></img>`)
          ]),
        }
      }).render(wrapperRef.current)
    })

    return <div ref = {wrapperRef} />
  }

export default Game
