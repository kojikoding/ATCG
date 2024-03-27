// App.js or your component file

import React, { useState } from "react";
import "./App.css"; // Assuming you have an App.css file for styles

function App() {
  const [currentPage, setCurrentPage] = useState("");

  const navigateToPage = (pageId) => {
    setCurrentPage(pageId);
  };

  const analyzeText = () => {
    const text = document.getElementById("textInput").value;
    console.log("Text to be analyzed:", text);
    // You can send this text to your NLP model for analysis here
  };

  return (
    <div>
      <header
        style={{
          backgroundColor: "#333",
          color: "#fff",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <h1>Automated Test Case Generation</h1>
      </header>
      <div
        className="container"
        style={{ maxWidth: "800px", margin: "20px auto", padding: "0 20px" }}
      >
        <section id="intro-section" style={{ marginBottom: "30px" }}>
          <h2>Introduction</h2>
          <p>
            Automated test case generation is a process of automatically
            creating test cases for software applications. These test cases are
            generated based on various inputs, such as requirements,
            specifications, or even existing code. This helps in ensuring the
            quality and reliability of the software product.
          </p>
        </section>
        <div
          className="button-layout"
          style={{ textAlign: "center", marginBottom: "20px" }}
        >
          <button
            onClick={() => navigateToPage("page1")}
            style={{
              padding: "10px 20px",
              margin: "0 10px",
              border: "none",
              borderRadius: "5px",
              backgroundColor: "#007bff",
              color: "#fff",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Enter Text
          </button>
          {/* Add more buttons for navigation here */}
        </div>
        {currentPage === "page1" && (
          <div id="page1">
            <h2>Enter Text</h2>
            <textarea
              id="textInput"
              placeholder="Enter text here..."
              style={{
                width: "100%",
                height: "200px",
                padding: "10px",
                fontSize: "16px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            ></textarea>
            <button
              className="submit-button"
              onClick={analyzeText}
              style={{
                display: "block",
                margin: "20px auto",
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                backgroundColor: "#007bff",
                color: "#fff",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              Submit
            </button>
          </div>
        )}
        {/* Add more pages for navigation here */}
      </div>
    </div>
  );
}

export default App;
