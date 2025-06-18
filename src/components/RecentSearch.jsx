import React from 'react'
import Button from './DeleteButton';
import DeleteButton from './DeleteButton';

const RecentSearch = ({ recentHistory, setRecentHistory, setSelectedHistory }) => {
    const clearHistory = () => {
        localStorage.removeItem('history');
        setRecentHistory([]);
    }
    return (
        <div >
            <h1 className='md:text-xl dark:text-white flex md:justify-between lg:px-3 text-sm px-2 md:flex-row flex-col gap-2'>
                <span>Recent Searches</span>
                <button className='dark:text-white cursor-pointer bg-gray-500 rounded-full w-10 h-10 flex justify-center items-center' onClick={clearHistory}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"  />
                    </svg>
                </button>
            </h1>
            <ul className='text-left overflow-auto pt-4'>
                {recentHistory && recentHistory.map((item, index) => (
                    <li onClick={() => setSelectedHistory(item)} className='p-1 px-5 dark:text-zinc-400 cursor-pointer hover:bg-zinc-700 hover:text-zinc-200 truncate flex items-center justify-between' key={index + Math.random()}>
                        <span >{item}</span>
                        <span onClick={(e) => e.stopPropagation()}>
                            <DeleteButton recentHistory={recentHistory} indexToDelete={index} setRecentHistory={setRecentHistory} />              
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default RecentSearch