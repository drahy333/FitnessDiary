import React from 'react';
import { IconButton, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const DatePickerControl = ({ selectedDate, setSelectedDate, label }) => {
    return (
        <div className="flex justify-center items-center">
            <IconButton 
                aria-label="previous day" 
                onClick={() => setSelectedDate(selectedDate.subtract(1, 'day'))}
            >
                <BsChevronLeft size="1.5em"/>
            </IconButton>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label= {label}
                    value={selectedDate}
                    onChange={(newValue) => {
                        setSelectedDate(newValue);
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            helperText={params.inputProps.placeholder}
                            sx={{
                                width: 250,
                                '.MuiInputBase-root': {
                                    color: 'blue',
                                    '&:hover:not(.Mui-disabled):before': {
                                        borderBottom: '2px solid orange',
                                    },
                                },
                                '.MuiInputLabel-root': {
                                    color: 'green',
                                },
                                '.MuiSvgIcon-root': {
                                    color: 'red',
                                }
                            }}
                        />
                    )}
                />
            </LocalizationProvider>
            <IconButton 
                aria-label="next day" 
                onClick={() => setSelectedDate(selectedDate.add(1, 'day'))}
            >
                <BsChevronRight size="1.5em"/>
            </IconButton>
        </div>
    );
};

export default DatePickerControl;
