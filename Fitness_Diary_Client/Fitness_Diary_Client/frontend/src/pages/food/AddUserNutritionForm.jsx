import React, { useState, useEffect } from 'react';

function AddUserNutritionForm({ show, handleClose, selectedItem, selectedDate, handleAddFood}) {
    const [formData, setFormData] = useState({
        amount: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
            setFormData(prev => ({ ...prev, [name]: value }));
        
    };
    
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = sessionStorage.getItem('token');
        const formattedDate = selectedDate.format('YYYY-MM-DD');  // Format the date to 'YYYY-MM-DD'
        const url = `http://localhost:8080/addUserNutrition?date=${encodeURIComponent(formattedDate)}`;
        const foodData = {
            idInput: selectedItem.id,
            foodItem: selectedItem.foodItem,
            kcalInput: selectedItem.calories,
            carbsInput: selectedItem.carbohydrates,
            proteinInput: selectedItem.protein,
            fatsInput: selectedItem.fats,
            amountInput: formData.amount
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(foodData)
            });

            if (response.ok) {
                const newFood = await response.json();
                console.log(newFood)
                handleAddFood(newFood);
                handleClose();
            } else {
                throw new Error('Failed to add the food item.');
            }
        } catch (error) {
            console.error('Error submitting food data:', error);
            alert('Failed to add new food item.');
        }
    };

    if (!show) return null;

    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-10" onClick={handleClose}></div>
            <div className="fixed inset-0 z-20 flex items-center justify-center">
                <form className="bg-white p-8 rounded-lg shadow-lg space-y-4" onSubmit={handleSubmit}>
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Select amount of {selectedItem.foodItem}</h3>
                    <div>
                        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount (g):</label>
                        <input type="number" id="amount" name="amount" value={formData.amount} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                    </div>

                    <div className="flex justify-end gap-4">
                        <button type="button" onClick={handleClose} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700">Cancel</button>
                        <button type="submit" onClick= {handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Submit</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default AddUserNutritionForm;
