import React, {useState} from "react";
import { FaSearch } from "react-icons/fa";

export const SearchBar = ({setResults}) => {
    const [input, setInput] = useState("");
    const fetchData = (value) => {
        fetch('http://localhost:8080/allFood', {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            })
            .then(response => response.json())
            .then(data => {
                console.log("Fetched food data:", data);
                const results = data.filter( (food) => {
                    return value && 
                    food && 
                    food.foodItem && 
                    food.foodItem.toLowerCase().includes(value);
                });
                console.log(results);
                setResults(results);
            })
            .catch(error => console.error('Error fetching foods:', error));
    }
    const handleChange = (value) => {
        setInput(value);
        fetchData(value);
    }
    return (
        <div className=" ml-3 w-1/3 h-10 bg-white flex items-center rounded-lg shadow px-4 mb-2">
            <FaSearch className="text-blue-500"/>
            <input 
                className="bg-transparent border-none h-full w-full text-lg ml-2 focus:outline-none" 
                placeholder="Search item to add.." 
                value={input} 
                onChange={(e) => handleChange(e.target.value)}
            />
        </div>
    );
};
