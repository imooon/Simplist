import React from 'react'
import simplist_icon from '../assets/add.png'

const Simplist = () => {
  return (
    <div className='bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl'>
      
        {/*--- title ---*/}

        <div className='flex items-center mt-7 gap-2'>
            <img className='w-8' src={simplist_icon} alt="" />
            <h1 className='text-2xl font-semibold'>Write your tasks here</h1>
        </div>

    </div>
  )
}

export default Simplist
