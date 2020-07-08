import React, {useState, useEffect, ReactNode} from 'react';

type SelectType = {
  _id: string
  text: string
  options: string[]
  label: string
  children: ReactNode
}

const Select = ({text, _id, options, label}:SelectType) => {

  let update_object = {text: text, modified: false}

  const [update, setUpdate] = useState(update_object);

  const post_url = "/db/update" + label

  function updateText(value:string, id:string) {
    setUpdate({text:value, modified:true})
  }

  useEffect(() => {
    if(update.modified) {
      let data = {id:_id, text: update.text}
      postUpdate(post_url, data).then(result => console.log(result))
    }
  });

  async function postUpdate(url:string, data:object) {
    const response = await fetch(url, {
      method: 'POST', 
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(data) 
    });
    return response.json(); 
  }

  const optionItems = options.map((option:string) =>
    <option key={option} value={option}>{option}</option>
  );

  return (
    <td>
      <select value={update.text} onChange={e => updateText(e.target.value, _id)}>
        {optionItems}
      </select>   
    </td>
  )
}

export default Select