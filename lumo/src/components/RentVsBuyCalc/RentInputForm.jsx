import React, { useState } from 'react';

const RentInputForm = ({ onRentDataChange }) => {
  // Define state for each input field
  const [location, setLocation] = useState('');
  const [monthlyRent, setMonthlyRent] = useState('');

  // Update state on input change
  const handleLocationChange = (e) => setLocation(e.target.value);
  const handleMonthlyRentChange = (e) => setMonthlyRent(e.target.value);

  // Handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass the state to the parent component
    onRentDataChange({ location, monthlyRent });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="location">Where do you plan to live?</label>
        <input
          type="text"
          id="location"
          name="location"
          value={location}
          onChange={handleLocationChange}
          required
        />
      </div>
      <div>
        <label htmlFor="monthlyRent">Comfortable monthly rent</label>
        <input
          type="number"
          id="monthlyRent"
          name="monthlyRent"
          value={monthlyRent}
          onChange={handleMonthlyRentChange}
          required
        />
      </div>
      <button type="submit">Calculate</button>
    </form>
  );
};

export default RentInputForm;

