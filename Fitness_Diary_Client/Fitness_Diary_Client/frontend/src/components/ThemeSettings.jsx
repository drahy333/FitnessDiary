import {React, useState } from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { BsCheck } from 'react-icons/bs';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { themeColors } from '../data/dummy';
import { useStateContext } from '../context/ContextProvider';
import Button from './Button';
import { useNavigate } from 'react-router-dom';


const ThemeSettings = () => {
  const { setColor, setMode, currentMode, currentColor, setThemeSettings, setIsLoggedIn} = useStateContext();
  const navigate = useNavigate(); 
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedAttribute, setSelectedAttribute] = useState('weight');
  const [newValue, setNewValue] = useState('');


  const handleUpdateUserInfo = async () => {
    const token = sessionStorage.getItem('token');
    const url = 'http://localhost:8080/updateUserInfo';
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ [selectedAttribute]: newValue })
      });
  
      if (response.ok) {
        console.log('User info updated successfully');
        alert('User info updated successfully');
        setShowUpdateForm(false);
      } else {
        throw new Error('Failed to update user info');
      }
    } catch (error) {
      console.error('Update failed:', error);
    }
  };
  

  
  const handleLogout = async () => {
    console.log("triggered")
    try {
      const token = sessionStorage.getItem('token');
      const response = await fetch('http://localhost:8080/logout', { 
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });
      
      if (response.ok) {
        console.log('Logged out successfully');
        sessionStorage.removeItem('token');
        setIsLoggedIn(false);
        setThemeSettings(false); 
        navigate('/');

      } else {
        throw new Error('Failed to log out.');
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="bg-half-transparent w-screen fixed nav-item top-0 right-0">
      <div className="float-right h-screen dark:text-gray-200  bg-white dark:bg-[#484B52] w-400">
        <div className="flex justify-between items-center p-4 ml-4">
          <p className="font-semibold text-lg">Settings</p>
          <button
            type="button"
            onClick={() => setThemeSettings(false)}
            style={{ color: 'rgb(153, 171, 180)', borderRadius: '50%' }}
            className="text-2xl p-3 hover:drop-shadow-xl hover:bg-light-gray"
          >
            <MdOutlineCancel />
          </button>
        </div>
        <div className="flex-col border-t-1 border-color p-4 ml-4">
          <p className="font-semibold text-xl ">Theme Option</p>
          {/* Theme selection controls */}
          <div className="mt-4">
            <input
              type="radio"
              id="light"
              name="theme"
              value="Light"
              onChange={setMode}
              checked={currentMode === 'Light'}
            />
            <label htmlFor="light" className="ml-2 text-md cursor-pointer">
              Light
            </label>
          </div>
          <div className="mt-2">
            <input
              type="radio"
              id="dark"
              name="theme"
              value="Dark"
              onChange={setMode}
              checked={currentMode === 'Dark'}
            />
            <label htmlFor="dark" className="ml-2 text-md cursor-pointer">
              Dark
            </label>
          </div>
        </div>
        <div className="p-4 border-t-1 border-color ml-4">
          <p className="font-semibold text-xl ">Theme Colors</p>
          <div className="flex gap-3">
            {themeColors.map((item, index) => (
              <TooltipComponent key={index} content={item.name} position="TopCenter">
                <button
                  type="button"
                  className="h-10 w-10 rounded-full cursor-pointer"
                  style={{ backgroundColor: item.color }}
                  onClick={() => setColor(item.color)}
                >
                  <BsCheck className={`ml-2 text-2xl text-white ${item.color === currentColor ? 'block' : 'hidden'}`} />
                </button>
              </TooltipComponent>
            ))}
          </div>
          <div className='mt-10'>
  <Button onClick={() => setShowUpdateForm(!showUpdateForm)} color="white" bgColor={currentColor} text="Update user information" borderRadius="10px"/>
  {showUpdateForm && (
    <div className="mt-4">
      <select 
        value={selectedAttribute} 
        onChange={(e) => setSelectedAttribute(e.target.value)} 
        className="input w-full border mt-3"
      >
        <option value="weight">Weight</option>
        <option value="height">Height</option>
        <option value="age">Age</option>
      </select>
      <input 
        type="number" 
        placeholder={`New ${selectedAttribute} (${selectedAttribute === 'weight' ? 'kg' : selectedAttribute === 'height' ? 'cm' : 'years'})`} 
        value={newValue} 
        onChange={(e) => setNewValue(e.target.value)} 
        className="input w-full border mt-3"
      />
      <div className='mt-10'>
        <Button onClick={handleUpdateUserInfo} color="white" bgColor={currentColor} text="Submit Change" borderRadius="10px" />
      </div>
    </div>
  )}
</div>


          <div className='mt-10'>
            <Button onClick={handleLogout} color="white" bgColor={currentColor} text="Log Out" borderRadius="10px"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeSettings;
