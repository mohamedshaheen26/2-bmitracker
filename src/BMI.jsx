import React, { useEffect, useState } from "react";

const BMI = ({ isDarkMode, toggleDarkMode }) => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState("");
  const [msg, setMsg] = useState("");
  const [history, setHistory] = useState([]);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem("bmiHistory")) || [];
    setHistory(savedHistory);
  }, []);

  useEffect(() => {
    if (history.length > 0) {
      localStorage.setItem("bmiHistory", JSON.stringify(history));
    }
  }, [history]);

  const ToggleHistory = (e) => {
    e.stopPropagation();
    setToggle((prevMode) => !prevMode);
  };

  useEffect(() => {
    // Event listener to close the history dropdown when clicking outside
    const handleClickOutside = (e) => {
      if (!e.target.classList.contains("history")) {
        setToggle(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const clear = () => {
    setWeight("");
    setHeight("");
    setBmi("");
    setMsg("");
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("bmiHistory");
  };

  const calcBmi = (e) => {
    e.preventDefault();

    if (weight === 0 || height === 0) {
      alert("Please enter a valid weight and height");
      return;
    }

    const heightInCm = height / 100;
    const calculationBmi = weight / (heightInCm * heightInCm);
    const bmiValue = calculationBmi.toFixed(1);
    setBmi(bmiValue);

    let message = "";
    if (calculationBmi < 16.0) {
      message = "Severe Thinness";
    } else if (calculationBmi >= 16.0 && calculationBmi < 18.5) {
      message = "Underweight";
    } else if (calculationBmi >= 18.5 && calculationBmi < 25.0) {
      message = "Normal";
    } else if (calculationBmi >= 25.0 && calculationBmi < 30.0) {
      message = "Overweight";
    } else if (calculationBmi >= 30.0 && calculationBmi < 35.0) {
      message = "Moderately Obese";
    } else if (calculationBmi >= 35.0 && calculationBmi < 40.0) {
      message = "Severely Obese";
    } else {
      message = "Morbidly Obese";
    }
    setMsg(message);
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString();
    const newEntry = {
      weight,
      height,
      bmi: bmiValue,
      msg: message,
      date: formattedDate,
    };
    setHistory((prevHistory) => [...prevHistory, newEntry]);
  };

  const handleFocus = (setter) => {
    setter("");
  };

  return (
    <div className={`container ${isDarkMode ? "dark" : ""}`}>
      <h2 className='center'>BMI Calculator</h2>
      <div className='mode' onClick={toggleDarkMode}>
        <i
          id='modeIcon'
          className={`fa-solid fa-${isDarkMode ? "sun" : "moon"}`}
        ></i>
      </div>
      <form onSubmit={calcBmi}>
        <div>
          <label htmlFor='weight'>Weight (kg)</label>
          <input
            id='weight'
            type='number'
            placeholder="Enter weight in kg"
            value={weight}
            onFocus={() => handleFocus(setWeight)}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='height'>Height (cm)</label>
          <input
            id='height'
            type='number'
            placeholder="Enter height in cm"
            value={height}
            onFocus={() => handleFocus(setHeight)}
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>
        <button className='btn'>Submit</button>
      </form>
      <button className='btn btn-outline' onClick={clear}>
        Clear
      </button>
      {bmi && (
        <div className='flex'>
          <span>Your BMI is: {bmi}</span>
          <span>{msg}</span>
        </div>
      )}
      <div
        className='history'
        style={{
          right: toggle ? "-1px" : "-231px",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className='history-btn' onClick={ToggleHistory}>
          <i className={`fas fa-angle-double-${toggle ? "right" : "left"}`}></i>
          History
        </button>
        <h3>History</h3>
        {history.length > 0 && (
          <ul>
            {history.map((entry, index) => (
              <li key={index}>
                <div className='history-row'>
                  <span className='date'>{entry.date}</span>
                  <strong>BMI: {entry.bmi}</strong>
                  <div className='flex'>
                    <span>Weight: {entry.weight} kg</span>
                    <span>Height: {entry.height} cm</span>
                  </div>
                  <p>Category: {entry.msg}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
        <button className='clear-history' onClick={clearHistory}>
          Clear History
        </button>
      </div>
    </div>
  );
};

export default BMI;
