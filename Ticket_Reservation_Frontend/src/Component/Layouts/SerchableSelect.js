import React, { useEffect, useState } from 'react';
import Select from 'react-select';

const SearchableSelect = ({ options, onChangeDrop, name, value }) => {
    // Define your list of locations as an array of objects with 'value' and 'label' properties.
    const dropdownoptions = options.map(location => ({
        value: location,
        label: location,
    }));
    // State to store the selected option
    const [selectedOption, setSelectedOption] = useState();

    useEffect(() => {
        setSelectedOption({ value: value ? value : '', label: value ? value : '' });
    }, [value, name])


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
                isClearable
                options={dropdownoptions}
                isSearchable
                placeholder="Select a location..."
                required
                name={name ? name : 'location'}
            />
        </div>
    );

};

export default SearchableSelect;
