import React, { useState } from 'react';
import Select from 'react-select';

const SearchableSelect = ({ options, onChangeDrop }) => {
    // Define your list of locations as an array of objects with 'value' and 'label' properties.
    const dropdownoptions = options.map(location => ({
        value: location.locationname,
        label: location.locationname,
    }));

    // State to store the selected option
    const [selectedOption, setSelectedOption] = useState(null);

    // Handler for selecting an option
    const handleSelect = (selectedOption) => {
        setSelectedOption(selectedOption);
        onChangeDrop(selectedOption?.value);
    };

    return (
        <div>
            <Select
                value={selectedOption}
                onChange={handleSelect}
                options={dropdownoptions}
                isSearchable
                placeholder="Select a location..."

            />
        </div>
    );

};

export default SearchableSelect;
