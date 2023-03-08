import React, { useState } from 'react';

const Navigation = ({onDateChange}) => {
    const [date, setDate] = useState(new Date())

    const prevOnHandle = () => {
        setDate(prevDate => {
            const prevMonth = prevDate.getMonth() - 1
            const newDate = new Date(prevDate.getFullYear(), prevMonth, 1)
            onDateChange(newDate)
            return newDate
        })
    }

    const nextOnHandle = () => {
        setDate(nextDate => {
            const nextMonth = nextDate.getMonth() + 1
            const newDate =  new Date(nextDate.getFullYear(), nextMonth, 1)
            onDateChange(newDate)
            return newDate
        })
    }
    return (
        <div className='mt-6 flex justify-between text-xl h-20 items-center border-b-2'>
            <button onClick={prevOnHandle} className = 'ml-3 bg-slate-200 w-20 h-16 rounded-lg hover:bg-slate-600 hover:text-white'>지난 달</button>
            <h1>{date.getFullYear()}년 {date.getMonth() + 1}월</h1>
            <button onClick={nextOnHandle} className = 'mr-3 bg-slate-200 w-20 h-16 rounded-lg hover:bg-slate-600 hover:text-white'>다음 달</button>
        </div>
    );
};

export default Navigation;