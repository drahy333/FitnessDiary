import React from 'react';
import DatePickerControl from './DatePickerControl';
const DateRangePickerControl = ({ startDate, endDate, setStartDate, setEndDate }) => {
    return (
        <div className="flex flex-col items-center space-y-4">
            <div className="text-lg font-semibold">Date Range</div>
            <div className="flex justify-between items-center w-full px-4">
                <DatePickerControl
                    selectedDate={startDate}
                    setSelectedDate={setStartDate}
                    label={'From'}
                />
                {/* <span className="mx-2 text-sm font-medium">to</span> */}
                <DatePickerControl
                    selectedDate={endDate}
                    setSelectedDate={setEndDate}
                    label = {'Until'}
                />
            </div>
        </div>
    );
};

export default DateRangePickerControl;
