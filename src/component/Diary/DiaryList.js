import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const DiaryList = ({currentMonth}) => {
    const [diary, setDiary] = useState([])
    
    useEffect(()=> {
        const getData = async() => {
            const diaryData = await axios.get('http://localhost:3001/data')
            setDiary(diaryData.data)
        }

        getData()
    },[])

    const filterDiary = diary.filter((item) => {
        const diaryDate = new Date(item.id)
        return (
            diaryDate.getFullYear() === currentMonth.getFullYear() && diaryDate.getMonth() === currentMonth.getMonth()
        )
    })

    return (
        <div className='mt-3 flex justify-center  flex-wrap'>
            <div className=' bg-green-400 h-12 px-7 w-11/12 items-center flex justify-center rounded-lg text-white font-medium hover:bg-green-700'>
                <Link to = '/new'><p className=''>글쓰기</p></Link>
            </div>
            
            {filterDiary.map((item) => (
                <div key={item.id} className = 'mt-3 w-11/12 h-14 bg-slate-300 font-medium rounded-md flex items-center whitespace-nowrap text-ellipsis overflow-hidden'>
                    <Link to={`/${item.id}`} className="flex">
                        <p className='ml-3 mr-5'>{item.id}</p>
                        <p className='ml-3'>{item.diary}</p>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default DiaryList;