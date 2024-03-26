import React from 'react';

function SavingsForm({ formData, setFormData }) {
  // Function to handle form input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({ ...prevFormData, [name]: parseFloat(value) }));
  };

  // Function to submit the form
  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you would typically call a function to recalculate savings based on new formData
    // Since we're updating formData using setFormData, it should trigger any useEffect hooks that depend on formData
  };

  return (
    <form onSubmit={handleSubmit} className="savings-form">
      <label htmlFor="startingBalance">Starting Savings Balance</label>
      <input
        type="number"
        id="startingBalance"
        name="startingBalance"
        value={formData.startingBalance}
        onChange={handleInputChange}
      />

      <label htmlFor="apy">Annual Percentage Yield (APY)</label>
      <input
        type="number"
        id="apy"
        name="apy"
        step="0.01"
        value={formData.apy}
        onChange={handleInputChange}
      />

      <label htmlFor="monthlyContribution">Monthly Contribution</label>
      <input
        type="number"
        id="monthlyContribution"
        name="monthlyContribution"
        value={formData.monthlyContribution}
        onChange={handleInputChange}
      />

      <label htmlFor="yearsToSave">Years to Save</label>
      <input
        type="number"
        id="yearsToSave"
        name="yearsToSave"
        value={formData.yearsToSave}
        onChange={handleInputChange}
      />

      <button type="submit" className="form-button">Calculate</button>
    </form>
  );
}

export default SavingsForm;
