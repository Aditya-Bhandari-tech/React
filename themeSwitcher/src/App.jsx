
import { useState } from 'react'
import './App.css'
import { ThemeContextProvider } from './context/theme'

function App() {
const [themeMode, setthemeMode] = useState('light')
const darktheme = () => {
          setthemeMode('dark')
}

const lighttheme = () => {
          setthemeMode('light')
}

  return (
    

    <ThemeContextProvider value={{themeMode, darktheme, lighttheme}}>
      
<div className="flex flex-wrap min-h-screen items-center">
                <div className="w-full">
                    <div className="w-full max-w-sm mx-auto flex justify-end mb-4">
                        {/* themeBtn */}
                    </div>

                    <div className="w-full max-w-sm mx-auto">
                       {/*  Card*/}
                    </div>
                </div>
            </div>

    </ThemeContextProvider>
  )
}

export default App
