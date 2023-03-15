import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ReactMarkdown from 'react-markdown';
import './App.css';

type Memo = {
  id: string;
  content: string;
  createdAt: number;
};

const MemoApp: React.FC = () => {
  const [memos, setMemos] = useState<Memo[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const storedMemos = localStorage.getItem('memos');
    if (storedMemos) {
      setMemos(JSON.parse(storedMemos));
    }
  }, []);

  const saveMemo = () => {
    if (input.trim().length === 0) return;

    const newMemo: Memo = {
      id: uuidv4(),
      content: input,
      createdAt: Date.now(),
    };
    setMemos([...memos, newMemo].sort((a, b) => b.createdAt - a.createdAt));
    setInput('');
  };

  useEffect(() => {
    localStorage.setItem('memos', JSON.stringify(memos));
  }, [memos]);

  const deleteMemo = (id: string) => {
    setMemos(memos.filter((memo) => memo.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">メモアプリ</h2>
          <textarea
            className="w-full h-20 p-2 bg-gray-200 rounded resize-none mb-4"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          ></textarea>
          <button
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
            onClick={saveMemo}
          >
            保存
          </button>
          <div className="mt-8">
            {memos.map((memo) => (
              <div key={memo.id} className="mb-4 bg-gray-200 rounded-lg p-4">
                <ReactMarkdown>{memo.content}</ReactMarkdown>
                <button
                  className="bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 mt-2 py-1 px-2"
                  onClick={() => deleteMemo(memo.id)}
                >
                  削除
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoApp;
