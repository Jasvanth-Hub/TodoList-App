import React from 'react'

function Navbar() {
    return (
        <nav className='flex justify-between bg-blue-900 text-white py-2 sticky top-0 z-3 ' >
            <div className="logo"><span className='font-bold  sm:text-xl mx-8' >i-Task</span></div>
            <ul className="flex gap-8 mx-8 ">
            <li ><a className='cursor-pointer hover:text-orange-300'  href="#container">Home</a></li>
                <li ><a className='cursor-pointer hover:text-orange-300'  href="#box2">Your Tasks</a></li>
            </ul>
        </nav>
    )
}

export default Navbar
