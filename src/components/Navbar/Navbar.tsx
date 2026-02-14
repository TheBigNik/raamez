'use client'

import { useTheme } from '../Theme/ThemeProvider'
import { Button } from '../ui/button'
import { MoonIcon, SunIcon } from 'lucide-react'

const Navbar = () => {
    const { theme, toggleTheme } = useTheme()
  return (
    <div className='flex items-center justify-between'>
        <div className='font-peyda font-extrabold text-4xl'>
            رامز
        </div>
        <div>
            <Button variant={"outline"}
            onClick={toggleTheme}
            >
                {theme === "dark" ? (
                    <SunIcon/>
                ) : (
                    <MoonIcon/>
                )}
            </Button>
        </div>
    </div>
  )
}

export default Navbar