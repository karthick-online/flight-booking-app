import React, { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { flights } from "./data/flights";

const App = () => {
  const cities = ["Chennai", "Bangalore", "Delhi", "Mumbai"];

  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [departureDate, setDepartureDate] = useState(null);
  const [passengers, setPassengers] = useState(1);
  const [error, setError] = useState("");

  const handleSearch = () => {
    setError("");

    if (!from || !to || !departureDate || !passengers) {
      setError("Please fill all fields");
      return;
    }

    if (from === to) {
      setError("From and To destinations cannot be the same");
      return;
    }

    const pad = (num) => num.toString().padStart(2, "0");
    const selectedDate = `${departureDate.getFullYear()}-${pad(
      departureDate.getMonth() + 1
    )}-${pad(departureDate.getDate())}`;

    const flightAvailable = flights.find(
      (flight) =>
        flight.from === from &&
        flight.to === to &&
        flight.departureDate === selectedDate
    );

    if (!flightAvailable) {
      setError("No flight available for selected route and date");
    } else {
      alert(
        `Flight found! ${from} → ${to} on ${selectedDate} for ${passengers} passenger(s)`
      );
    }
  };

  return (
    <div className="flex align-items-center justify-content-center mt-5">
      <div className="p-card px-3" style={{ width: "400px" }}>
        <h2 className="p-text-center p-mb-4">Flight Booking</h2>

        <div className="p-grid p-ai-center mb-3">
          <div className="p-col-6">
            <label>From</label>
          </div>
          <div className="p-col-6">
            <Dropdown
              value={from}
              options={cities}
              onChange={(e) => setFrom(e.value)}
              placeholder="Select From"
              className="p-inputtext-sm"
            />
          </div>
        </div>

        <div className="p-grid p-ai-center mb-3">
          <div className="p-col-6">
            <label>To</label>
          </div>
          <div className="p-col-6">
            <Dropdown
              value={to}
              options={cities}
              onChange={(e) => setTo(e.value)}
              placeholder="Select To"
              className="p-inputtext-sm"
            />
          </div>
        </div>

        <div className="p-grid p-ai-center mb-3">
          <div className="p-col-6">
            <label>Departure Date</label>
          </div>
          <div className="p-col-6">
            <Calendar
              value={departureDate}
              onChange={(e) => setDepartureDate(e.value)}
              dateFormat="yy-mm-dd"
              className="p-inputtext-sm"
              minDate={new Date()}
            />
          </div>
        </div>

        <div className="p-grid p-ai-center mb-3">
          <div className="p-col-6">
            <label>Passengers</label>
          </div>
          <div className="p-col-6">
            <InputNumber
              value={passengers}
              onValueChange={(e) => setPassengers(e.value)}
              min={1}
              className="p-inputtext-sm"
            />
          </div>
        </div>

        {error && (
          <div className="">
            <small className="p-error" style={{ fontWeight: "bold" }}>
              {error}
            </small>
          </div>
        )}

        <div className="p-d-flex p-jc-center p-3">
          <Button label="Search Flight" onClick={handleSearch} />
        </div>
      </div>
    </div>
  );
};

export default App;
