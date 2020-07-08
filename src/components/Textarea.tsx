import React, {useState, useEffect, ReactNode} from 'react';

type TextareaType = {
  _id: string
  text: string
  label: string
  children: ReactNode
}

const Textarea = ({text, _id, label}:TextareaType) => {

  let update_object = {text: text, modified: false}

  const [update, setUpdate] = useState(update_object);

  const post_url = "/db/update" + label
  const timeout_duration = 2000

  function updateText(value:string, id:string) {
    setUpdate({text:value, modified:true})
  }

  useEffect(() => {
    if(update.modified) {
      let timer = setTimeout(() => {
        let data = {id:_id, text: update.text}
        postUpdate(post_url, data).then(result => console.log(result))
      }, timeout_duration)
      return () => {
        clearTimeout(timer)
      }
    }
  });

  async function postUpdate(url:string, data:object) {
    const response = await fetch(url, {
      method: 'POST', 
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }


  return (
    <td>
      <textarea value={update.text}
          onChange={e => updateText(e.target.value, _id)}></textarea>    
    </td>
  )
}

export default Textarea