import { useState } from 'react'
import './styles/global.css'
import './lib/dayjs'


import Habits from './components/HabitDay'
import Header from './components/Header'
import SummaryTable from './components/SummaryTable'

function App() {

  return (
    <div className='w-screen h-screen flex items-center justify-center'>
      <div className='w-full max-w-5xl px-6 flex flex-col gap-16 '>
        <Header />
        <SummaryTable />
      </div>
    </div>

  )
}

export default App
