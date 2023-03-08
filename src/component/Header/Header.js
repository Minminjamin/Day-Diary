import React from 'react';
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate()
    return (
        <div>
            <h1 className='font-extrabold text-3xl mt-3 cursor-pointer' onClick={() => (navigate('/'))}>하루 일기</h1>
        </div>
    );
};

export default Header;