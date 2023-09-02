import React, { useState } from "react";
import "./App.css";

function App() {
  const [date, setDate] = useState("");
  const [distance, setDistance] = useState("");
  const [data, setData] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!date || isNaN(parseFloat(distance))) {
      alert("Пожалуйста, введите корректные данные.");
      return;
    }

    const newEntry = { date, distance: parseFloat(distance) };
    const existingIndex = data.findIndex((item) => item.date === date);

    if (existingIndex !== -1) {
      const newData = [...data];
      newData[existingIndex].distance += parseFloat(distance);
      setData(newData);
    } else {
      const newData = [...data, newEntry];
      newData.sort((a, b) => new Date(b.date) - new Date(a.date));
      setData(newData);
    }

    setDate("");
    setDistance("");
  };

  const handleDelete = (date) => {
    const newData = data.filter((item) => item.date !== date);
    setData(newData);
  };

  return (
    <div className="App">
      <h1>Учёт тренировок</h1>
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="date-container">
          <label htmlFor="dateInput">Дата (ДД.ММ.ГГГГ):</label>
          <input
            type="date"
            id="dateInput"
            value={date}
            name="date"
            onChange={(e) => setDate(e.target.value)}
            pattern="\d{2}\-\d{2}\-\d{4}"
            required
          />
        </div>
        <div className="distance-container">
          <label htmlFor="distanceInput">Пройдено километров:</label>
          <input
            type="number"
            id="distanceInput"
            name = "distance"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            required
          />
        </div>
        <button className="submit-btn" type="submit">
          OK
        </button>
      </form>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Дата</th>
              <th>Пройдено км</th>
              <th>Удалить</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.date}>
                <td>{item.date.split("-").reverse().join("-")}</td>
                <td>{item.distance}</td>
                <td>
                  <button onClick={() => handleDelete(item.date)}>✘</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
