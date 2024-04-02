import React from 'react';

const RentInputForm = ({ monthlyRent, onInputChange }) => {
  return (
    <form>
      <div>
        <label htmlFor="monthlyRent">Comfortable monthly rent</label>
        <input
          type="number"
          id="monthlyRent"
          name="monthlyRent"
          value={monthlyRent}
          onChange={onInputChange} // Use the centralized change handler
          required
        />
      </div>
    </form>
  );
};

export default RentInputForm;
