import React, { useState, useEffect } from 'react';
import { MenuItem, FormControl, Select, InputLabel } from '@mui/material';

const WeightSelect = ({setSelectedWeight, selectedWeight, availableWeights }) => {

    const handleChange = (event) => {
        setSelectedWeight(event.target.value);
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%'
        }}>
            <FormControl style={{ width: 250, marginTop: '30px' }}>
                <InputLabel id="weight-select-label">Weight</InputLabel>
                <Select
                    labelId="weight-select-label"
                    id="weight-select"
                    value={selectedWeight}
                    onChange={handleChange}
                    label="Weight"
                >
                    {availableWeights.map(weight => (
                        <MenuItem key={weight} value={weight}>
                            {weight} kg
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};

export default WeightSelect;
