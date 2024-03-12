import React, { useState } from 'react';
import SavingsForm from './SavingsForm';
import SavingsBreakdown from './SavingsBreakdown';
import SavingsComparison from './SavingsComparison';
import SavingsSummary from './SavingsSummary';
import { mockSavingsData } from '../../__mocks__/MockData'; // Adjust the path as necessary

function SaveNowVsLater() {
    const [savingsData, setSavingsData] = useState(mockSavingsData); // Example state, adjust according to your actual data structure and source

    // Function to update savings data based on form input
    // This is a placeholder function, you'll need to replace it with actual logic
    const handleCalculate = (formData) => {
        console.log(formData); // Process the form data to update the savingsData state
        // setSavingsData(updatedData);
    };

    return (
        <div>
            <SavingsForm onCalculate={handleCalculate} />
            <SavingsSummary data={savingsData} />
            <SavingsBreakdown data={savingsData} />
            <SavingsComparison currentApy={1.2} /> {/* Example APY, replace with actual data */}
        </div>
    );
}

export default SaveNowVsLater;
