import React, { useState, useEffect } from 'react';

function AddFoodForm({ show, handleClose, selectedDate, handleAddFood}) {
    const [formData, setFormData] = useState({
        foodItem: '',
        kcal: '',
        carbs: '',
        protein: '',
        fats: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
            setFormData(prev => ({ ...prev, [name]: value }));
        
    };
    
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!formData.foodItem|| !formData.kcal || !formData.carbs || !formData.protein || !formData.fats){
            alert('All fields must be filled. ');
            return;
        } 

        if (!isNaN(formData.kcal)){
            alert('Calories must be a number');
            return;
        }
        if (!isNaN(formData.carbs)){
            alert('Carbohydrates must be a number');
            return;
        }
        if (!isNaN(formData.protein)){
            alert('Protein must be a number');
            return;
        }
        if (!isNaN(formData.fats)){
            alert('Fats must be a number');
            return;
        }
        const token = sessionStorage.getItem('token');
        const formattedDate = selectedDate.format('YYYY-MM-DD');  // Format the date to 'YYYY-MM-DD'
        const url = `http://localhost:8080/addFood?date=${encodeURIComponent(formattedDate)}`;
        const foodData = {
            foodItem: formData.foodItem,
            kcalInput: formData.kcal,
            carbsInput: formData.carbs,
            proteinInput: formData.protein,
            fatsInput: formData.fats
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
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Add Food Item</h3>
                    <div>
                        <label htmlFor="foodInput" className="block text-sm font-medium text-gray-700">Food Item:</label>
                        <input
                            type="text"
                            id="foodInput"
                            name="foodItem"
                            value={formData.foodItem}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div className="text-md text-gray-600 font-bold">
                        Enter nutritional information based on a 100 gram serving size.
                    </div>

                    <div>
                        <label htmlFor="kcalInput" className="block text-sm font-medium text-gray-700">Calories (kcal):</label>
                        <input type="number" id="kcalInput" name="kcal" value={formData.kcal} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                    </div>
                    <div>
                        <label htmlFor="carbsInput" className="block text-sm font-medium text-gray-700">Carbohydrates (g):</label>
                        <input type="number" id="carbsInput" name="carbs" value={formData.carbs} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                    </div>
                    <div>
                        <label htmlFor="proteinInput" className="block text-sm font-medium text-gray-700">Protein (g):</label>
                        <input type="number" id="proteinInput" name="protein" value={formData.protein} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                    </div>
                    <div>
                        <label htmlFor="fatsInput" className="block text-sm font-medium text-gray-700">Fats (g):</label>
                        <input type="number" id="fatsInput" name="fats" value={formData.fats} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                    </div>
                    <div className="flex justify-end gap-4">
                        <button type="button" onClick={handleClose} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Submit</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default AddFoodForm;
