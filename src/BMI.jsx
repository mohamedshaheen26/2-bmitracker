import React, { useEffect, useState } from "react";

const BMI = () => {
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [bmi, setBmi] = useState("");
  const [msg, setMsg] = useState("");

  const clear = (e) => {
    setWeight(0);
    setHeight(0);
    setBmi("");
    setMsg("");
  };

  const calcBmi = (e) => {
    e.preventDefault();

    if (weight === 0 || height === 0) {
      alert("Please Enter a valid weight and height");
    } else {
      const heightInCm = height / 100;
      const calculationBmi = weight / (heightInCm * heightInCm);
      setBmi(calculationBmi.toFixed(1));

      if (calculationBmi < 16.0) {
        setMsg("Severe Thinness");
      } else if (calculationBmi >= 16.0 && calculationBmi < 18.5) {
        setMsg("UnderWeight");
      } else if (calculationBmi >= 18.5 && calculationBmi < 25.0) {
        setMsg("Normal");
      } else if (calculationBmi >= 25.0 && calculationBmi < 30.0) {
        setMsg("OverWeight");
      } else if (calculationBmi >= 30.0 && calculationBmi < 35.0) {
        setMsg("Moderately Obese");
      } else if (calculationBmi >= 35.0 && calculationBmi < 40.0) {
        setMsg("Severely Obese");
      } else {
        setMsg("Morbidly Obese");
      }
    }
  };

  const handleFocus = (setter) => {
    setter("");
  };

  const handleBlur = (value, setter) => {
    if (!value) {
      setter(0);
    }
  };

  return (
    <div className='container'>
      <h2 className='center'>BMI Calculator</h2>
      <form onSubmit={calcBmi}>
        <div>
          <label htmlFor='weight'>weight (kg)</label>
          <input
            id='weight'
            type='number'
            value={weight}
            onFocus={() => handleFocus(setWeight)}
            onBlur={() => handleBlur(weight, setWeight)}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='height'>height (cm)</label>
          <input
            id='height'
            type='number'
            value={height}
            onFocus={() => handleFocus(setHeight)}
            onBlur={() => handleBlur(height, setHeight)}
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
    </div>
  );
};

export default BMI;
