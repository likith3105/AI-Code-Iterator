// pages/index.tsx
import { useState } from 'react';
import CodeEditor from '../components/CodeEditor';
import DiffViewer from 'react-diff-viewer';

export default function Home() {
  const [code, setCode] = useState('// paste your game code here');
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [explanation, setExplanation] = useState('');

  // Helper function to highlight modified lines
  const highlightModifiedLines = (code: string) => {
    return code.split('\n').map((line, i) => {
      if (line.startsWith('[MODIFIED]')) {
        return (
          <div key={i} style={{ backgroundColor: '#2d6a4f', color: 'white', padding: '2px' }}>
            {line.replace('[MODIFIED]', '')}
          </div>
        );
      }
      return <div key={i}>{line}</div>;
    });
  };

  const handleIterate = async () => {
    const res = await fetch('/api/iterate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, prompt }),
    });

    const data = await res.json();
    if (data.result) {
      const [newCode, ...explanationParts] = data.result.split('Explanation:');
      setResult(newCode.trim());
      setExplanation(explanationParts.join('Explanation:').trim());
    }
  };

  const handleIntegrate = () => {
    setCode(result);
    setResult('');
    setExplanation('');
  };

  return (
    <div className="w-full max-w-6xl p-6 rounded-2xl shadow-xl bg-white/5 border border-white/10 backdrop-blur-xl">
        <h1 className="text-3xl mb-6">🧠 Code Iterator AI Tool</h1>


      <CodeEditor value={code} onChange={(val) => setCode(val || '')} />

      <input
        className="border mt-4 p-2 w-full"
        placeholder="What would you like to change?"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

<div className="flex gap-4 mt-4">
          <button
            onClick={handleIterate}
            className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-xl"
          >
            ✨ Get Suggestions
          </button>
          {result && (
            <button
              onClick={handleIntegrate}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-xl"
            >
              ✅ Integrate Code
            </button>
          )}
        </div>


      {result && (
  <div className="mt-4 bg-gray-900 text-white p-4 rounded">
    <h2 className="text-lg font-bold">Suggested Code:</h2>
    <DiffViewer oldValue={code} newValue={result} splitView={true} />
    
    
   
  </div>
)}
    </div>
  );
}
