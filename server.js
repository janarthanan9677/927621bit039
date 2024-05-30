const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 9876;
const WINDOW_SIZE = 10;
const TIMEOUT_MS = 500;

let windowNumbers = [];

app.use(cors());

const fetchNumbers = async (type) => {
    const endpoints = {
        'p': 'http://20.244.56.144/test/primes',
        'f': 'http://20.244.56.144/test/fibo',
        'e': 'http://20.244.56.144/test/even',
        'r': 'http://20.244.56.144/test/rand',
    };
    try {
        const response = await axios.get(endpoints[type], { timeout: TIMEOUT_MS });
        return response.data.numbers;
    } catch (error) {
        return [];
    }
};

const calculateAverage = (numbers) => {
    if (numbers.length === 0) return 0;
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    return (sum / numbers.length).toFixed(2);
};

app.get('/numbers/:numberid', async (req, res) => {
    const numberid = req.params.numberid;
    const type = numberid.charAt(0);

    if (!['p', 'f', 'e', 'r'].includes(type)) {
        return res.status(400).send('Invalid number ID');
    }

    const prevState = [...windowNumbers];
    const newNumbers = await fetchNumbers(type);

    const uniqueNewNumbers = newNumbers.filter((num) => !windowNumbers.includes(num));
    windowNumbers = [...windowNumbers, ...uniqueNewNumbers].slice(-WINDOW_SIZE);

    const avg = calculateAverage(windowNumbers);

    res.json({
        windowPrevState: prevState,
        windowCurrState: windowNumbers,
        numbers: newNumbers,
        avg: avg
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
document.body.append(newNumbers);