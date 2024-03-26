import React, { useState, useEffect } from 'react';
import SavingsForm from './SavingsForm';
import SavingsBreakdown from './SavingsBreakdown';
import SavingsComparison from './SavingsComparison';
import SavingsSummary from './SavingsSummary';
import './SaveNowVsLaterCalc.css'; // Ensure the CSS path is correct

function SaveNowVsLater() {
    const [formData, setFormData] = useState({
        startingBalance: 25000, // Default starting balance
        apy: 1.10, // Default APY
        monthlyContribution: 100, // Default monthly contribution
        yearsToSave: 5, // Default years to save
        frequency: 'Monthly' // Default frequency
    });
    const [savingsData, setSavingsData] = useState([]);

    useEffect(() => {
        // This effect runs when formData changes.
        setSavingsData(calculateSavings(formData));
    }, [formData]);

    return (
        <div className="save-now-vs-later-container">
            <SavingsForm formData={formData} setFormData={setFormData} />
            <SavingsSummary data={savingsData} />
            <SavingsBreakdown data={savingsData} />
            <SavingsComparison currentApy={formData.apy} />
        </div>
    );
}

function calculateSavings({ startingBalance, apy, monthlyContribution, yearsToSave, frequency }) {
    let balance = parseFloat(startingBalance);
    let monthlyRate = apy / 100 / 12;
    let calculatedData = [];
    
    for (let year = 1; year <= yearsToSave; year++) {
        let yearData = {
            year: new Date().getFullYear() + year - 1,
            startingBalance: balance,
            contributions: 0,
            interestEarned: 0,
            endBalance: 0,
        };
        
        for (let month = 1; month <= 12; month++) {
            let interest = balance * monthlyRate;
            yearData.interestEarned += interest;
            balance += interest; // Add interest to the balance
            
            if (frequency === 'Monthly') {
                yearData.contributions += parseFloat(monthlyContribution);
                balance += parseFloat(monthlyContribution); // Add monthly contribution at the end of the month
            }
        }
        
        yearData.endBalance = balance;
        calculatedData.push(yearData);
    }
    
    return calculatedData;
}

export default SaveNowVsLater;
