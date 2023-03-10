import * as Checkbox from '@radix-ui/react-checkbox'
import * as Popover from '@radix-ui/react-popover'
import dayjs from 'dayjs'
import { Check } from 'phosphor-react'
import React, { useEffect, useState } from 'react'
import { api } from '../lib/axios'
import ProgessBar from './ProgessBar'

interface HabitsListProps {
    date: Date,
    onCompletedChange: (completed: number) => void
}

interface HabitsInfo {
    possibleHabits: Array<{
        id: string,
        title: string,
        created_at: string
    }>,
    completedHabits: string[]
}

const HabitsList = ({ date, onCompletedChange }: HabitsListProps) => {

    const [habitsInfo, setHabitsInfo] = useState<HabitsInfo>()

    useEffect(() => {
        api.get('/day', {
            params: {
                date: date.toISOString(),
            }
        }).then(response => { setHabitsInfo(response.data) })
    }, [])

    async function handleToggleHabit(habitId: string) {
        const isHabitAlreadyCompleted = habitsInfo?.completedHabits.includes(habitId)

        await api.patch(`/habits/${habitId}/toggle`)

        let completedHabits: string[] = []

        if (isHabitAlreadyCompleted) {
            completedHabits = habitsInfo!.completedHabits.filter(id => id != habitId)

        } else {
            completedHabits = [...habitsInfo!.completedHabits, habitId]
        }


        setHabitsInfo({
            possibleHabits: habitsInfo!.possibleHabits,
            completedHabits
        })

        onCompletedChange(completedHabits.length)
    }

    const isDateInPast = dayjs(date).endOf('day').isBefore(new Date)

    return (
        <div className='mt-6 flex flex-col gap-3'>

            {habitsInfo?.possibleHabits.map(habit => {
                return (
                    <Checkbox.Root key={habit.id} onCheckedChange={() => handleToggleHabit(habit.id)} disabled={isDateInPast} defaultChecked={habitsInfo.completedHabits.includes(habit.id)} className='flex items-center gap-3 group'>

                        <div className='h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500'>
                            <Checkbox.Indicator>
                                <Check size={20} className='text-white' />
                            </Checkbox.Indicator>
                        </div>

                        <span className='font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400'>{habit.title}</span>

                    </Checkbox.Root>
                )
            })}


        </div>
    )
}

export default HabitsList