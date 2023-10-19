import React, { useState } from 'react';

const SearchableSelect = ({ options, onChangeDrop }) => {
    const [filter, setFilter] = useState('');
    const filteredOptions = options.filter((option) =>
        option.locationname.toLowerCase().includes(filter.toLowerCase())
    );

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    return (
        <div className="input-group">
            <input
                type="text"
                className="form-control"
                placeholder="Search..."
                value={filter}
                onChange={handleFilterChange}
            />

            <select
                className="form-select"
                onChange={(e) => { onChangeDrop(e.target.value); console.log(e.target.value); }}
            >
                {filteredOptions.map((option, index) => (
                    <option key={index} value={option.locationname}>
                        {option.locationname}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SearchableSelect;
