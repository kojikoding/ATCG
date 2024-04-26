import React, { useState } from 'react';

function TestCaseGeneratorPage({ onLogout }) {
  const [text, setText] = useState('');
  const [analysisResult, setAnalysisResult] = useState('');

  const analyzeText = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/chat', { // Ensure URL matches your Flask server address
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: text }),
      });
      if (response.ok) {
        const data = await response.json();
        setAnalysisResult(data.reply);
      } else {
        const error = await response.text();
        console.error('Failed to analyze text:', error);
      }
    } catch (error) {
      console.error('Error submitting text for analysis:', error);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <header className="bg-blue-950 py-6 mb-8 text-center shadow-xl">
        <h1 className="text-4xl font-bold tracking-wide uppercase">Automated Test Case Generation</h1>
        <button onClick={onLogout} className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
          Logout
        </button>
      </header>
      <main>
        <section className="bg-gray-800 p-8 rounded-xl shadow-lg mb-10">
          <h2 className="text-2xl font-semibold mb-5">Introduction</h2>
          <p className="text-gray-300 leading-relaxed">
            Automated test case generation is a process of automatically creating test cases for software applications based on various inputs, such as requirements, specifications, or existing code. This process ensures the quality and reliability of the software product.
          </p>
        </section>
        <div className="bg-gray-700 p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-6">Enter Text</h2>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text here..."
            className="form-textarea mt-1 block w-full rounded-md border-gray-600 shadow-inner p-4 text-gray-300"
            rows="6"
          ></textarea>
          <button
            onClick={analyzeText}
            className="mt-8 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition duration-300 ease-in-out hover:scale-105"
          >
            Analyze
          </button>
          {analysisResult && (
            <div className="mt-4 p-4 bg-gray-800 rounded-xl shadow-inner">
              <h3 className="text-xl font-semibold mb-2">Analysis Result:</h3>
              <p className="text-gray-300 whitespace-pre-wrap">{analysisResult}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default TestCaseGeneratorPage;

