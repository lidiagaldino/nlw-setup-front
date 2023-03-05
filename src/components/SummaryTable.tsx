import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { api } from '../lib/axios'
import { generateRangeBetweenDays } from '../utils/generate-range-between-days'
import HabitDay from './HabitDay'

const weeekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
const summaryDays = generateRangeBetweenDays()
const minSummaryDays = 18 * 7
const amountOfDaysToFill = minSummaryDays - summaryDays.length

type Summary = {
    id: string;
    date: string;
    ammount: number;
    completed: number;
}[]

const SummaryTable = () => {
    const [summary, setSummary] = useState<Summary>([])
    console.log(summary);

    useEffect(() => {
        api.get('/summary').then(response => {
            setSummary(response.data.message);
        })
    }, [])

    return (
        <div className='w-full flex'>
            <div className='grid grid-rows-7 grid-flow-row gap-3'>

                {weeekDays.map((weekDay, index) => {
                    return (
                        <div key={`${weekDay}-${index}`} className='text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center'>
                            {weekDay}
                        </div>
                    )
                })}

            </div>

            <div className='grid grid-rows-7 grid-flow-col gap-2'>

                {summary.length > 0 && summaryDays.map((date) => {
                    const dayInSummary = summary.find(day => {
                        return dayjs(date).isSame(day.date, 'day')
                    })

                    return (
                        <HabitDay date={date} amount={dayInSummary?.ammount} defaultCompleted={dayInSummary?.completed} key={date.toString()} />
                    )
                })}

                {amountOfDaysToFill > 0 && Array.from({ length: amountOfDaysToFill }).map((_, i) => {
                    return (
                        <div key={i} className='bg-zinc-900 w-10 h-10 text-white rounded m-2 flex items-center justify-center opacity-40 cursor-not-allowed'></div>
                    )
                })}
            </div>
        </div>
    )
}

export default SummaryTable