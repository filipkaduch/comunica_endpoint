const queryEngine = require('@comunica/query-sparql-file').QueryEngine;
const myEngine = new queryEngine();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;

// const myEngine = newEngine({ config: 'config/config.json' });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/query', async (req, res) => {
    console.log(req);
    const query = req.query.query;
    console.log(query);
    try {
        const bindingsStream = await myEngine.queryBindings(query, { sources: [{ type: 'file', value: 'database/malware.owl' }, { type: 'file', value: 'database/cve_gen/CVE-2000-owl.owl' }] });
        const createValues = [];
        // Consume results as a stream (best performance)
        bindingsStream.on('data', (binding) => {
            createValues.push(binding);
            console.log(binding.toString()); // Quick way to print bindings for testing
        });
        bindingsStream.on('end', () => {
            // The data-listener will not be called anymore once we get here.
        });
        bindingsStream.on('error', (error) => {
            console.error(error);
        });

        // Consume results as an array (easier)
        const bindings = await bindingsStream.toArray();
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).send({results: {bindings: createValues}});
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
});

app.get('/', (req, res) => {
    res.send('Comunica OWL Endpoint is running. Send SPARQL queries to the /query endpoint.');
});

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

app.listen(port, () => console.log(`Comunica server listening on port ${port}`));
