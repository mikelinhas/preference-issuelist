import React, {ReactNode} from 'react';
import Textarea from './Textarea'
import Select from './Select'

type IssueType = {
  _id: string
  title: string
  description: string
  severity: string
  status: string
  children: ReactNode
}

const Issue = ({_id, title, description, severity, status, ...props}:IssueType) => {

  const severity_options = ["", "High","Medium","Low"]
  const status_options = ["", "TODO","DOING","DONE"]

  function deleteIssue() {
    postDeleteIssue("/db/deleteIssue", _id).then(result => {
      window.location.reload(false);
    })
  }

  async function postDeleteIssue(url:string, id:string) {
    const response = await fetch(url, {
      method: 'POST', 
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({id:id}) 
    });
    return response.json();
  }

  return (
    <tr key={_id} {...props}>

      <Textarea text={title} _id={_id} label="Title"> </Textarea>

      <Textarea text={description} _id={_id} label="Description"> </Textarea>

      <Select text={severity} _id={_id} options={severity_options} label="Severity"> </Select>

      <Select text={status} _id={_id} options={status_options} label="Status"> </Select>

      <td> <button onClick={deleteIssue}> x </button> </td>

    </tr>
  )
}

export { Issue }