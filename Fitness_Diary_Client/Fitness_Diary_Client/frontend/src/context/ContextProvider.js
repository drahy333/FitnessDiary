import React, { createContext, useContext, useState, useEffect } from 'react';

const StateContext = createContext();
const initialState = {
  chat: false,
  cart: false,
  userProfile: false,
  notification: false
}

export const ContextProvider = ({ children }) => {
  const [screenSize, setScreenSize] = useState(undefined);
  const [currentColor, setCurrentColor] = useState('#03C9D7');
  const [currentMode, setCurrentMode] = useState('Light');
  const [themeSettings, setThemeSettings] = useState(false);
  const [activeMenu, setActiveMenu] = useState(true);
  const [isClicked, setIsClicked] = useState(initialState);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [exercises, setExercises] = useState([]);
  const [cardioExercises, setCardioExercises] = useState([]);
  const [sleeps, setSleeps] = useState([]);
  const [foods, setFoods] = useState([]);
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const setMode = (e) => {
    setCurrentMode(e.target.value);
    localStorage.setItem('themeMode', e.target.value);
  };

  const setColor = (color) => {
    setCurrentColor(color);
    localStorage.setItem('colorMode', color);
  };

  const handleClick = (clicked) => setIsClicked({ ...initialState, [clicked]: true });

  return (
    <StateContext.Provider value={{
      currentColor,
      currentMode,
      activeMenu,
      screenSize, setScreenSize,
      handleClick, isClicked, initialState,
      setIsClicked, setActiveMenu, setCurrentColor,
      setCurrentMode, setMode, setColor,
      themeSettings, setThemeSettings, isLoggedIn, setIsLoggedIn,
      userInfo, setUserInfo, exercises, setExercises, cardioExercises, setCardioExercises, foods, setFoods,
      sleeps, setSleeps
    }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
