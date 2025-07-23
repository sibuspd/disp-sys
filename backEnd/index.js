const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to backend of DISPSYS');
});

app.listen(4000, () => {
    console.log('Server is listening on port 4000');
});


