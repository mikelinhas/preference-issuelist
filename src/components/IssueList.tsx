import React, { useState, useEffect } from 'react';
import { Issue } from './Issue'

type IssueType = {
  _id: string
  title: string
  description: string
  severity: string
  status: string
}

const LoadData = () => {
  return fetch("/db/getAllIssues").then(response => response.json());
}

function renderIssue({_id, title, description, severity, status}:IssueType) {
  return (
    <Issue key={_id}
           _id={_id} 
           title={title} 
           description={description} 
           severity={severity} 
           status={status}>          
    </Issue>
  )
}


function IssueList() {

  const [issues, setIssues] = useState([]);

  useEffect(() => {
    LoadData().then(issues => setIssues(issues));
  }, []);

  function addNewIssue() {
    postNewIssue("/db/addNewIssue").then(result => {
      LoadData().then(issues => setIssues(issues))
    })
  }

  async function postNewIssue(url:string) {
    const response = await fetch(url, {
      method: 'POST', 
      headers: { 'Content-Type': 'application/json'}
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  return (
    <div>

      <table>
        <thead>
          <tr>
            <th className="table-col-25">Title</th>
            <th className="table-col-45">Description</th>
            <th className="table-col-10">Severity</th>
            <th className="table-col-10">Status</th>
            <th className="table-col-5"></th>
          </tr>
        </thead>
        <tbody>
          {issues.map((issue)=> {
            return renderIssue(issue)
          })}
        </tbody>
      </table>

        <button onClick={addNewIssue}> Add new Issue </button>
    </div>
  )
}

export { LoadData, IssueList }