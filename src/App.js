import { BrowserRouter, Routes, Route } from "react-router-dom";
import DiaryInsert from "./component/Diary/DiaryInsert";
import Header from "./component/Header/Header";
import { useState } from "react";
import DiaryList from './component/Diary/DiaryList';
import Navigation from './component/Navigation/Navigation';

function App() {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const onDateChange = (date) => {
    setCurrentMonth(date)
  }
  
  return (
    <div className="flex justify-center text-center mx-4">
      <div className="w-1/3 h-screen shadow-lg shadow-slate-400 rounded-b-xl">
        
        <BrowserRouter>
          <Header/>
          <Routes>
            <Route path="/" element={<><Navigation onDateChange={onDateChange} /><DiaryList currentMonth={currentMonth} /></>} />
            <Route path="/new" element={<DiaryInsert />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
