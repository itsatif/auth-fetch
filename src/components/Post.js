import React from 'react'

export default function Post({id,userId,title,body}) {
    return (
        <div className='Post-Box'>
            <a href={'#'+id}>@{userId}</a>
            <div className='Title'>{title}</div>
            <div className='body'>{body}</div>
            <div style={{textAlign:'center',color:'black'}}>{id}</div>
        </div>
    )
}