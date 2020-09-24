import { Grid, html } from 'gridjs';
import React, {useRef, useEffect} from 'react';
import "gridjs/dist/theme/mermaid.css";

function minuteToHours(num){
  var hours = (num / 60);
  var rhours = Math.floor(hours);
  var minutes = (hours - rhours) * 60;
  var rminutes = Math.round(minutes);
  return ( rhours === 0 ? "" : rhours + " Jam") + (rminutes === 0 ? "" : " " + rminutes + " Menit")
}

const Movieh = () =>{
  const wrapperRef = useRef(null);

  useEffect(() => {
    new Grid ({
      sort: {
        multiColumn: false,
      },
      columns : [
        'Title',
        'Year',
        'Genre',
        'Duration',
        'Rating',
        'Description',
        'Image'
      ],
      pagination: {
        url: (prev, page, limit) => `${prev}?limit = ${limit} & offset = ${page*limit}`
      },
      server:{
        url: 'https://backendexample.sanbersy.com/api/data-movie',
        then: data => data.map(el => [
          el.title,
          el.year,
          el.genre,
          (minuteToHours(`${el.duration}`)),
          el.rating,
          el.description,
          html(`<img width = '300px' height '300px' alt = '${el.title}' src = '${el.image_url}'></img>`)
        ]),
        handle: (res) => {
          if (res.ok) return res.json()
        }
      }
    }).render(wrapperRef.current)
  })
  return <div ref = {wrapperRef} />

}

export default Movieh