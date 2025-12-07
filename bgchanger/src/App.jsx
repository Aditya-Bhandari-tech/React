import { useState } from 'react'

import './App.css'

function App() {
  const [color , setColor] = useState("White");
 

  return (
    
      <div className='w-full h-screen duration-200 '
      style={{backgroundColor: color}}>

        <div className='fixed flex flex-wrap justify-center 
        bottom-12 inset-x-0 px-2'>

          <div className='flex  flex-wrap justify-center
          gap-3 shadow-lg  bg-amber-200 px-3 py-2 rounded-xl'>

            <button 
            onClick={() => setColor("red")}
          className='outline-none px-4  py-2 rounded-full
             text-white'
            style={{backgroundColor: 'red'}}
            >Red</button>

            <button 
            onClick={() => setColor("green")}
          className='outline-none px-4  py-2 rounded-full
             text-white'
            style={{backgroundColor: 'green'}}
            >Green</button>

            <button 
            onClick={() => setColor("blue")}
          className='outline-none px-4  py-2 rounded-full
             text-white'
            style={{backgroundColor: 'blue'}}
            >blue </button>

            <button 
            onClick={() => setColor("black")}
          className='outline-none px-4  py-2 rounded-full
             text-white'
            style={{backgroundColor: 'black'}}
            >black </button>

          </div>


         </div>
      </div>
  )
}

export default App

