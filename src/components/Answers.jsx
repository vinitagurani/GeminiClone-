import React, { useEffect, useState } from 'react'
import { checkHeading, removeStars } from '../helper'
import ReactMarkdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
const Answers = ({ ans, index, totalResult, type}) => {
    const [heading, setHeading] = useState(false);
    const [answer, setAnswer] = useState(ans);
    useEffect(() => {
        if (checkHeading(ans)) {
            setHeading(true);
            setAnswer(removeStars(answer));
        }
        else {
            setHeading(false);
        }
    }, [ans]);

    const renderer = {
        code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
                <SyntaxHighlighter
                    {...props}
                    style={dark}
                    language={match[1]}
                    PreTag="div"
                >
                    {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
            ) : (
                    <code {...props} className = {className }>
                        {children}
                    </code>
            )
            
        }
    }
    return (
        <div className={totalResult === 1 ? 'dark:text-white text-lg' : index === 0 ? 'text-lg dark:text-white' : heading ? 'font-bold pt-3 text-lg dark:text-white' : 'pl-5'}>
            <ReactMarkdown components={ renderer}>{answer}</ReactMarkdown>
        </div>
  )
}

export default Answers