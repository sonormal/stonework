import React, { useState } from 'react';

const Filter = ({ handleFilterUpdate }) => {
    const [selectedTypes, setSelectedTypes] = useState({});
    const [selectedColors, setSelectedColors] = useState({});
    const [selectedPrices, setSelectedPrices] = useState({});

    const handleFilterChange = (group, value) => {
        const changeGroup = {
            rodzaj: setSelectedTypes,
            kolor: setSelectedColors,
            cena: setSelectedPrices
        };

        const currentSelection = {
            rodzaj: selectedTypes,
            kolor: selectedColors,
            cena: selectedPrices
        };

        const newState = { ...currentSelection[group], [value]: !currentSelection[group][value] };

        Object.keys(newState).forEach(key => {
            if (key !== value) newState[key] = false;
        });

        changeGroup[group](newState);

        const filterValue = Object.keys(newState).find(key => newState[key]) || '';
        handleFilterUpdate(group, filterValue);
    };

    return (
        <div className="bgfilter">
            <div>
                <span className="minititle">RODZAJ</span><br/><br/>
                {['granite', 'marmur', 'kwarcyt', 'piaskowiec'].map(material => (
                    <React.Fragment key={material}>
                        <input
                            type="checkbox"
                            id={`rodzaj_${material}`}
                            name="rodzaj"
                            value={material}
                            checked={selectedTypes[material] || false}
                            onChange={() => handleFilterChange('rodzaj', material)}
                        />
                        <label htmlFor={`rodzaj_${material}`}>{material}</label><br/><br/>
                    </React.Fragment>
                ))}
            </div>
            <div>
                <span className="minititle">KOLOR</span><br/><br/>
                {['biały', 'kremowy', 'czerwony', 'czarny'].map(color => (
                    <React.Fragment key={color}>
                        <input
                            type="checkbox"
                            id={`kolor_${color}`}
                            name="kolor"
                            value={color}
                            checked={selectedColors[color] || false}
                            onChange={() => handleFilterChange('kolor', color)}
                        />
                        <label htmlFor={`kolor_${color}`}>{color}</label><br/><br/>
                    </React.Fragment>
                ))}
            </div>
            <div>
                <span className="minititle">CENA</span><br/><br/>
                {['desc', 'asc'].map(order => (
                    <React.Fragment key={order}>
                        <input
                            type="checkbox"
                            id={`cena_${order}`}
                            name="cena"
                            value={order}
                            checked={selectedPrices[order] || false}
                            onChange={() => handleFilterChange('cena', order)}
                        />
                        <label htmlFor={`cena_${order}`}>{order === 'desc' ? 'cena malejąco' : 'cena rosnąco'}</label><br/><br/>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default Filter;
