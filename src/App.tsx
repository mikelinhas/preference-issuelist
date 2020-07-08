import React from 'react';
import './App.css';

import { IssueList } from './components/IssueList'


function LoadHomePage() {
  return (
    <div>
      <h1> Issue List </h1>
      <IssueList />
    </div>
  );
}

 
function App() {
   return (
       <div className="center-div">
        <LoadHomePage />
       </div>
   );
 }

export { App }
