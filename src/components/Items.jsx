import React from 'react'
import check from '../assets/check.png'
import uncheck from '../assets/uncheck.png'
import bin from '../assets/bin.png'

const Items = ({text}) => {
  return (
    <div className='flex items-center my-3 gap-2'>
      <div className='flex flex-1 items-center cursor-pointer'>
        <img src={check} alt="" className='w-7'/>
        <p className='text-slate-700 ml-4 text-[17px]'>{text}</p>
      </div>
      <img src={bin} alt="" className='w-3.5 cursor-pointer'/>
    </div>
  )
}

export default Items
