import React from 'react';
import logo from './starwars.png';
import { BrowserRouter as Router, Route, RouteComponentProps } from "react-router-dom";
import './App.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

import { Character } from './components/Character'
import { Characters } from './components/AllCharacters'


const client = new ApolloClient({
  uri: '/graphql',
});


function LoadHomePage() {
  return (
    <div>
      <h1> Characters </h1>
      <Characters />
    </div>
  );
}


type TParams = { id: string };

function LoadCharacterPage({ match } : RouteComponentProps<TParams> ) {
  const id = Number(match.params.id)
  return <Character id={id} />
}
 
function AppRouter() {
   return (
     <Router>
       <div className="center-div">
        <img className="logo" src={logo} alt="Logo" />
        <ApolloProvider client={client}>
         <Route path="/" exact component={LoadHomePage} />
         <Route path="/character/:id" component={LoadCharacterPage} />
        </ApolloProvider>
       </div>
     </Router>
   );
 }

export { AppRouter }
