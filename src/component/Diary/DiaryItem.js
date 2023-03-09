import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { HiEmojiHappy,HiEmojiSad } from 'react-icons/hi';

const DiaryItem = () => {
    const {id} = useParams()
    
    const [diaryItem, setDiaryItem] = useState()
    
    const navigate = useNavigate()
    
    useEffect(()=> {
        const fetchDate = async () => {
            try{
                const diaryDate = await axios.get(`http://localhost:3001/data/${id}`)
                setDiaryItem(diaryDate.data)
            } catch(error) {
                console.log(error)
            }
        }

        fetchDate()
    },[id])

    const emotionDate = () => {
        if(diaryItem.emotion === 'sad') {
            return <HiEmojiSad  className = ' w-28 h-28 cursor-pointer mr-4'/>
        } else {
            return <HiEmojiHappy className = ' w-28 h-28 cursor-pointer mr-4'/>
        }
    }

    const onHandleClick = () => {
        navigate(`/${id}/update`)
    }

    return (
        <div className='mt-5 flex flex-col items-start text-left mx-5 '>
            {diaryItem && (
                <div className='w-full'>
                    <p className=' font-extrabold text-2xl'>날짜 : </p>
                    <p className=' mt-4 text-lg  bg-slate-200 rounded-lg w-52 h-12'>{diaryItem.id}</p>

                    <p className=' mt-5 font-extrabold text-2xl'>그 날 하루의 감정 : </p>
                    <p className=' mt-4 text-lg'>{emotionDate()}</p>

                    <p className=' mt-5 font-extrabold text-2xl'>그 날 하루의 일기 : </p>
                    <p className=' mt-4 text-lg  bg-slate-200 rounded-lg h-24 w-3/4'>{diaryItem.diary}</p>

                    <button onClick={onHandleClick} className = 'mt-16 bg-green-400 w-52 h-14 rounded-lg  text-white font-medium hover:bg-green-700'>수정하기</button>
                </div>
            )}
        </div>
        
    );
};

export default DiaryItem;
