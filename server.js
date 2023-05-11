const queryEngine = require('@comunica/query-sparql').QueryEngine;
const myEngine = new queryEngine();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;

// const myEngine = newEngine({ config: 'config/config.json' });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/query', async (req, res) => {
    const query = req.body.query;
    console.log(query);
    try {
        const result = await myEngine.query(query, { sources: 'config/config.json' });
        const bindings = await result.bindings();
        res.json(bindings.map(binding => binding.toObject()));
    } catch (err) {
        res.status(400).send(err.message);
    }
});

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

app.get('/', (req, res) => {
    res.send('Comunica OWL Endpoint is running. Send SPARQL queries to the /query endpoint.');
});

app.listen(port, () => console.log(`Comunica server listening on port ${port}`));
