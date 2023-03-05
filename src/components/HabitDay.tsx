import React, { useState } from 'react'
import * as Popover from '@radix-ui/react-popover';
import * as Checkbox from '@radix-ui/react-checkbox';
import ProgessBar from './ProgessBar';
import clsx from 'clsx';
import { Check } from 'phosphor-react';
import dayjs from 'dayjs';
import HabitsList from './HabitsList';

interface HabitsProps {
    date: Date,
    defaultCompleted?: number,
    amount?: number
}

const HabitDay = ({ defaultCompleted = 0, amount = 0, date }: HabitsProps) => {
    const [completed, setCompleted] = useState(defaultCompleted)

    const completedPer = amount > 0 ? Math.round((completed / amount) * 100) : 0

    const dayAndMonth = dayjs(date).format('DD/MM')
    const dayOfWeek = dayjs(date).format('dddd')

    function handleCompletedChanged(completed: number) {
        setCompleted(completed);
    }

    return (
        <Popover.Root>
            <Popover.Trigger className={clsx(' w-10 h-10 text-white rounded m-2 flex items-center justify-center transition-colors', {
                'bg-zinc-900 border-zinc-800': completedPer == 0,
                'bg-violet-900 border-violet-800': completedPer > 0 && completedPer < 20,
                'bg-violet-800 border-violet-700': completedPer >= 20 && completedPer < 40,
                'bg-violet-700 border-violet-600': completedPer >= 40 && completedPer < 60,
                'bg-violet-600 border-violet-500': completedPer >= 60 && completedPer < 80,
                'bg-violet-500 border-violet-400': completedPer >= 80,
            })} />

            <Popover.Portal>
                <Popover.Content className='min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col '>
                    <span className='font-semibold text-zinc-400'>{dayOfWeek}</span>
                    <span className='mt-1 font-extrabold leading-tight text-3xl'>{dayAndMonth}</span>

                    <ProgessBar progress={completedPer} />

                    <HabitsList date={date} onCompletedChange={handleCompletedChanged} />


                    <Popover.Arrow height={8} width={16} className='fill-zinc-900' />
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    )
}

export default HabitDay