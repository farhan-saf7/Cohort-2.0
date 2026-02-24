import React from 'react'
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'
const Card = (props) => {
  return (
    <div className='flex gap-2'>
      <div className='text-align-center h-[30rem] w-[25rem] m-4 bg-amber-950'>
        <img className='w-[100%] h-[40%] object-cover' src={props.image} alt="" />
        <h1 className='text-white text-xl font-bold text-center py-5'>{props.username}</h1>
        <p className='px-10 py-5 text-white text-l '>{props.desc}</p>
        
        <div className="flex justify-center gap-6 mt-4 text-white text-2xl py-5">
          <a href=""><FaFacebook /></a>
          <a href=""><FaInstagram /></a>
          <a href=""><FaTwitter /></a>
        </div>

      </div>
    </div>
  )
}

export default Card