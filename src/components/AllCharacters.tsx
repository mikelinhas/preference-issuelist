import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';


const ALL_CHARACTERS = gql`
  query($page: Int!) {
    characters(page: $page) {
      page
      hasMore
      characters {
        id
        name
        eye_color
      }
    }
  }
`

const LoadAllCharacters = () => {
  const { loading, error, data, fetchMore } = useQuery(ALL_CHARACTERS, 
    {variables: {page: 1}});

  return { loading, error, data, fetchMore }
  
}

type CharacterType = {
  id: number
  name: string
}

const Characters = () => {
    const { loading, error, data, fetchMore } = LoadAllCharacters()

    if (error) return (
      <div>
        <p>Error!</p> 
        <p>Maybe you are in development mode and the server is not running.</p>
      </div>
    )
     
    if (loading) return <p>Loading ... </p>

    return (
      <div>
        <ul className="character-list">
          {data.characters.characters.map((character: CharacterType) => 
            <li key={character.name}>
              <a href={ '/character/' + character.id }>{character.name}</a></li>
          )}
        </ul>
        <div id="buttons-div">
          <PreviousBtn 
            page={data.characters.page}
            fetchMore={fetchMore} 
          />
          <NextBtn 
            page={data.characters.page}
            hasMore={data.characters.hasMore} 
            fetchMore={fetchMore} />
        </div>
      </div>
    )
}

type PreviousButtonProps = {
  page: number,
  fetchMore: Function
}

const PreviousBtn = ( {page, fetchMore} : PreviousButtonProps ) => {
  let new_page:number = page - 1 
  if (page > 1) return (
    <button onClick={() => {
      fetchMore({
        variables: { page: new_page },
        updateQuery: (prevResult:object[], { fetchMoreResult } : any) => {
          return fetchMoreResult
        }
      })
    }}>Previous</button>)
    return <button disabled className="disabled">Previous</button>
}

type NextButtonProps = {
  page: number,
  hasMore: boolean,
  fetchMore: Function
}

const NextBtn = ({page, hasMore, fetchMore} : NextButtonProps) => {
  let new_page = page + 1
  if (hasMore) return (
    <button onClick={() => {
      fetchMore({
        variables: { page: new_page},
        updateQuery: (prevResult:object[], { fetchMoreResult }: any) => {
          return fetchMoreResult
        }
      })
    }}>Next</button>)
  return <button disabled className="disabled">Next</button>
}

export { NextBtn , PreviousBtn, Characters, LoadAllCharacters, ALL_CHARACTERS }