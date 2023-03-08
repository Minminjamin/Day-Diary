import React, { useState } from 'react';
import axios from 'axios';
import { HiEmojiHappy,HiEmojiSad } from 'react-icons/hi';
import { useNavigate } from "react-router-dom";

const DiaryInsert = () => {
    const [date, setDate] = useState(new Date())
    const [emotion, setEmotion] = useState()
    const [diary, setDiary] = useState()
    
    const navigate = useNavigate()

    const onPost = async() => {
        try {   
            await axios.post('http://localhost:3001/data',{
                id : date,
                emotion : emotion,
                diary : diary
            })

            setDate('')
            setEmotion('')
            setDiary('')
        } catch(error) {
            console.log(error)
        }
    }

    const handleSubmit = (e) => {
        if(date === ''){
            window.confirm('날짜를 입력해주세요')
        } if (emotion === ''){
            window.confirm('감정을 선택해주세요') 
        } if (diary === '') {
            window.confirm('일기를 입력해주세요.')
        } else {
            onPost()
            navigate('/')
        }

        e.preventDefault()
    }
    return (
        <div className=''>
            <form onSubmit={handleSubmit} className = 'mt-3 flex flex-col items-start mx-4'>
                <h1 className='font-extrabold text-xl'>새 일기 쓰기</h1>
                
                <label className='mt-4 text-lg font-bold'>오늘은 언제인가요?</label>
                <input type = 'date'
                        value = {date}
                        onChange = {(e) => setDate(e.target.value)}
                        className = ' mt-2 bg-slate-200 rounded-lg w-52 h-12'/>

                <label className='mt-4 text-lg font-bold'>오늘 하루의 기분은 어떤가요</label>
                <div className='mt-2 flex'>
                    <HiEmojiHappy onClick = {(e) => setEmotion('happy')} className = ' w-28 h-28 cursor-pointer hover:bg-slate-300 hover:rounded-lg mr-4'/>
                    <HiEmojiSad onClick = {(e) => setEmotion('sad')} className = ' w-28 h-28 cursor-pointer hover:bg-slate-300 hover:rounded-lg'/>
                </div>

                <label className='mt-4 text-lg font-bold'>오늘은 무슨 일이 있었나요?</label>
                <textarea value={diary}
                        onChange = {(e) => setDiary(e.target.value)}
                        className = ' mt-2 bg-slate-200 rounded-lg w-5/6 h-24'/>

                <button onSubmit={handleSubmit} className = 'mt-10 bg-green-400 w-52 h-14 rounded-lg  text-white font-medium hover:bg-green-700'>일기 저장하기</button>
            </form>
        </div>
    );
};

export default DiaryInsert;