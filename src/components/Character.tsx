import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';


const CHARACTER_WITH_FILMS = gql`
  query($id: Int!) {
    characterwithfilms(id: $id) {
      name
      eye_color
      hair_color
      skin_color
      gender
      films {
        title
      }
    }
  }
`;


const LoadCharacter = (id:number) => {
  const { loading, error, data } = useQuery(CHARACTER_WITH_FILMS, 
    {variables: {id: id}});
  return { loading, error, data }
}

type CharacterProps = {
  id: number
}

type FilmType = {
  title:string
}

function Character({id}:CharacterProps) {
  const {loading, error, data } = LoadCharacter(id)
  
  if (error) return (
    <div>
      <p>Error!</p> 
      <p>Maybe you are in development mode and the server is not running.</p>
    </div>
  )

  if (loading) return <p>Loading ... </p>


  let {name, eye_color, skin_color, hair_color, gender, films} = data.characterwithfilms

  return (
    <div>
      <h1> {name}</h1>
      <h3> Appearance </h3>
      <ul>
        <li> Eye color: {eye_color} </li>
        <li> Skin color: {skin_color} </li>
        <li> Hair color: {hair_color} </li>
        <li> Gender: {gender} </li>
      </ul>
      <h3> Films </h3>
      <ul>
        {films.map((film: FilmType)=> {
          return (<li key={film.title}> {film.title} </li>) 
        })}
      </ul>
     <div id="home-link">
       <button><a href='/'>Home</a></button>
     </div>
    </div>
  )
}
 

export { Character , LoadCharacter, CHARACTER_WITH_FILMS }