import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { HiEmojiHappy,HiEmojiSad } from 'react-icons/hi';

const DiaryUpdate = () => {
    const [date, setDate] = useState(new Date())
    const [emotion, setEmotion] = useState()
    const [diary, setDiary] = useState()
    
    const {id} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async() => {
            try{
                const diaryData = await axios.get(`http://localhost:3001/data/${id}`)
                setDate(diaryData.data.id)
                setEmotion(diaryData.data.emotion)
                setDiary(diaryData.data.diary)
            } catch(error) {
                console.log(error)
            }
        }

        fetchData()
    }, [])

    const onPut = async() => {
        try {
            await axios.put(`http://localhost:3001/data/${id}`, {
                id : date,
                emotion : emotion,
                diary : diary
            })
            navigate('/')
            setDate('')
            setEmotion('')
            setDiary('')
        } catch(error) {
            console.log(error)
        }

    }

    const handlePut = (e) => {
        if(date === '') {
            window.confirm('날짜를 선택해주세요.')
        } if (emotion === '') {
            window.confirm('감정을 선택해주세요.')
        } if(diary === '') {
            window.confirm('일기를 작성해주세요.')
        } else {
            onPut()
        }

        e.preventDefault();
    }

    const onHandleDelete = async() => {
        try {
            await axios.delete(`http://localhost:3001/data/${id}`)
            navigate('/')
        } catch(error) { 
            console.log(error)
        }
    }

    return (
        <div>
            <form onSubmit={handlePut} className = 'mt-3 flex flex-col items-start mx-4'>
                <h1 className='font-extrabold text-xl'>일기 수정하기</h1>
                
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

                <button type='submit' className = 'mt-10 bg-green-400 w-52 h-14 rounded-lg  text-white font-medium hover:bg-green-700'>일기 저장하기</button>
                <button onClick={onHandleDelete} className = 'mt-10 bg-red-400 w-52 h-14 rounded-lg  text-white font-medium hover:bg-red-700'>일기 삭제하기</button>
            </form>
        </div>
    );
};

export default DiaryUpdate;