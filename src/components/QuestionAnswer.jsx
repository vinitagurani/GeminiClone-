import React from 'react'
import Answers from './Answers'

const QuestionAnswer = ({item, index}) => {
    return (
        <div className={item.type === 'q' ? 'flex justify-end' : ''}>
            {
                item.type === 'q' ?
                    <li className='text-right px-3 py-2 border-1 dark:bg-zinc-700 dark:border-zinc-700 rounded-tl-3xl rounded-br-3xl rounded-bl-3xl max-w-fit mb-2 '><Answers ans={item.text} index={index} totalResult={1} type={item.type} /></li>
                    :
                    item.text.map((ansItem, ansIndex) => (
                        <li className='text-left px-1 mb-4' key={ansIndex + Math.random()}><Answers ans={ansItem} index={ansIndex} totalResult={item.length} type={item.type} /></li>
                    ))
            }
        </div>
    )
}

export default QuestionAnswer