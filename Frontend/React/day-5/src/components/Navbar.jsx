import React from 'react'

const Navbar = (props) => {
  return (
    <div style={{backgroundColor:props.color}} className='mb-1 flex items-center justify-between text-white px-8 py-3'>
        <h1>{props.name}</h1>
        <div className='flex gap-10'>
            {props.links.map(function(elem,idx){
                return <h4 key={idx}>{elem}</h4>
            })}
        </div>
    </div>
  )
}

export default Navbar