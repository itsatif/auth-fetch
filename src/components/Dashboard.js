import React, { useState, useEffect } from 'react'
import Post from './Post';
import '../App.css';
import axios from 'axios'



export default function Dashboard() {
  const [data,setData] = useState([]);
  const [resp,setResp] = useState([]);
  const [keyword, setKeyword] = useState("");
  useEffect(() => {
    (async () => {
      let fetchData = await axios.get("https://jsonplaceholder.typicode.com/posts")
      setResp(fetchData.data)
      setData(fetchData.data);
    })()
  }, [])

  function handleSearch(){
    console.log(keyword);
    if(keyword.length>0){
      let sol = resp.filter(e=>e.body.includes(keyword) || e.title.includes(keyword) || e.title.includes(keyword.toUpperCase) || e.body.includes(keyword.toUpperCase) || e.userId===parseInt(keyword) || e.id===parseInt(keyword));
      setResp(sol)
     // console.log(sol);
    }else{
      setResp(data)
    }
  }
  return (
      <div>
        <div className='Header'>
          <input type="text" placeholder='Enter text to search' onChange={e=>setKeyword(e.target.value)}></input>
          <button onClick={handleSearch}>Search</button>
        </div>
        <div className='main'>
          {
            resp.map((ele, i) => {
              return <Post key={i} id={ele.id} userId={ele.userId} title={ele.title} body={ele.body} />
            })
          }
        </div>
      </div>
  )
}