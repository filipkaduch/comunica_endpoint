const queryEngine = require('@comunica/query-sparql').QueryEngine;
const newEngine = new queryEngine();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;

const myEngine = newEngine({ config: 'config/config.json' });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/query', async (req, res) => {
    const query = req.body.query;
    try {
        const result = await myEngine.query(query, { sources: 'config/config.json' });
        const bindings = await result.bindings();
        res.json(bindings.map(binding => binding.toObject()));
    } catch (err) {
        res.status(400).send(err.message);
    }
});

app.listen(port, () => console.log(`Comunica server listening on port ${port}`));
