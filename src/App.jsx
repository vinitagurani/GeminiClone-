import React, { useEffect, useRef, useState } from 'react';
import { URL } from './constants';
import './App.css';
import Answers from './components/Answers';
import Spinner from './components/Spinner';
import RecentSearch from './components/RecentSearch';
import QuestionAnswer from './components/QuestionAnswer';

const App = () => {
  const [question, setQuestion] = useState('');
  const [result, setResult] = useState([]);
  const [recentHistory, setRecentHistory] = useState(JSON.parse(localStorage.getItem('history')));
  const [selectedHistory, setSelectedHistory] = useState('');
  const scrollToAns = useRef();
  const [loader, setLoader] = useState(false);

  const askQuestion = async () => {
    if (!question.trim()) {
      if (!selectedHistory)
        return false;
    }
    if (question.trim()) {
      const history = JSON.parse(localStorage.getItem('history') || '[]');

      // Normalize for comparison (case-insensitive + trim)
      const normalizedQuestion = question.trim().toLowerCase();
      const isDuplicate = history.some(
        item => item.trim().toLowerCase() === normalizedQuestion
      );

      if (!isDuplicate) {
        const updatedHistory = [question, ...history];
        localStorage.setItem('history', JSON.stringify(updatedHistory));
        setRecentHistory(updatedHistory);
      }
    }
    const payloadData = question ? question : selectedHistory;
    let payload = {
      "contents": [{
        "parts": [{
          "text": payloadData
        }]
      }]
    }
    setLoader(true);
    let response = await fetch(URL, {
      method: "POST",
      body: JSON.stringify(payload),
    });
    response = await response.json();
    let dataString = response.candidates[0].content.parts[0].text;
    dataString = dataString.split("* ");
    dataString = dataString.map(i => i.trim());
    setResult([...result, { type: 'q', text: payloadData }, { type: 'a', text: dataString }]);
    setQuestion('');
    setTimeout(() => { scrollToAns.current.scrollTop = scrollToAns.current.scrollHeight; }, 500);
    setLoader(false);
  }
  console.log("recent history:", recentHistory);

  const enterClick = (e) => {
    if (e.key == 'Enter') {
      askQuestion();
    }
  }
  useEffect(() => {
    console.log("selected history", selectedHistory);
    console.log("Result is: ", result);
    askQuestion();
  }, [selectedHistory]);

  const [darkMode, setDarkMode] = useState(() => {
    if (localStorage.getItem('theme')) {
      return localStorage.getItem('theme') ;
    }
    else {
      // return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      'dark';
    }
  });
  useEffect(() => {
    if (darkMode == 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
    else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);
  return (
    <div className='grid grid-cols-5 lg:text-center h-screen'>
      {/* left */}
      <div className='flex flex-col col-span-1 bg-white dark:bg-zinc-800 py-5 h-screen overflow-y-hidden justify-between '>
        <RecentSearch recentHistory={recentHistory} setRecentHistory={setRecentHistory} setSelectedHistory={setSelectedHistory} />

        <select className='lg:px-3 px-2 text-sm dark:text-white' onChange={(e)=>setDarkMode(e.target.value)} value = {darkMode}>
          <option className = 'dark:bg-zinc-500' value="dark">Dark</option>
          <option className='dark:bg-zinc-500'  value="light">Light</option>
        </select>
      </div>
      {/* right */}
      <div className='col-span-4 text-center max-h-[80vh] min-h-[80vh] p-2 relative'>
        {
          result.length === 0 && <h1 className='absolute top-10 left-70  text-bold lg:text-4xl text-2xl bg-clip-text  bg-gradient-to-r dark:from-red-400 dark:via-indigo-300 dark:to-purple-400 text-transparent from-red-700 via-indigo-600 to-purple-950 pb-5'>Hello User, Ask me Anything </h1>
        }
        <div className='container p-3 overflow-y-scroll mb-4 scroll-smooth scrollbar-hide max-h-[80vh] min-h-[80vh]' ref={scrollToAns}>
          <div className='dark:text-zinc-300 '>
            <ul>
              {
                result && result.map((item, index) => (
                  <QuestionAnswer key={index + Math.random()} item={item} index={index} />
                ))
              }
            </ul>
          </div>
        </div>
        <div className='dark:bg-zinc-800 w-1/2 dark:text-white m-auto rounded-4xl border-1 dark:border-zinc-700 flex p-3 items-center max-h-50'>
          <input type="text" placeholder='Ask me anything' className='dark:text-white w-full outline-none' onChange={(e) => setQuestion(e.target.value)} value={question} onKeyDown={enterClick} />
          <button className='cursor-pointer' onClick={() => askQuestion()}>
            {loader ? <Spinner size="1rem" /> : 'Ask'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default App