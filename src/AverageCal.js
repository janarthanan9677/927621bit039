import React, { useState } from 'react';
import axios from 'axios';

const AverageCalculator = () => {
    const [numberType, setNumberType] = useState('e');
    const [data, setData] = useState(null);

    const fetchNumbers = async () => {
        try {
            const response = await axios.get(`http://localhost:9876/numbers/${numberType}`);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data', error);
        }
    };

    return (
        <div>
            <h1>Average Calculator</h1>
            <div>
                <label>
                    Select Number Type:
                    <select value={numberType} onChange={(e) => setNumberType(e.target.value)}>
                        <option value="prime">Prime</option>
                        <option value="fibonacci">Fibonacci</option>
                        <option value="even">Even</option>
                        <option value="random">Random</option>
                    </select>
                </label>
                <button onClick={fetchNumbers}>Fetch Numbers</button>
            </div>
            {data && (
                <div>
                    <h2>Response</h2>
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default AverageCalculator;
