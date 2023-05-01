const express = require('express');
const {ActorInitSparql} = require('@comunica/actor-init-sparql');

const app = express();

// Set up Comunica
const comunicaConfig = {
    '@context': [
        'https://linkedsoftwaredependencies.org/bundles/npm/@comunica/actor-init-sparql/^2.1.0/components/context.jsonld',
        {
            'mySparqlEndpoint': {
                '@id': 'cax://mySparqlEndpoint',
                '@type': '@id',
            },
        },
    ],
    'mySparqlEndpoint': {
        '@id': 'https://malware-ontology.onrender.com/sparql',
        '@type': 'mySparqlEndpoint',
    },
};
const comunica = new ActorInitSparql({config: comunicaConfig});

// Define a route that queries your ontology using Comunica
app.get('/sparql', async (req, res) => {
    const queryResult = await comunica.query(req.query.query);
    const bindingsStream = queryResult.bindingsStream;
    bindingsStream.on('data', (bindings) => {
        // Do something with each binding
        console.log(bindings.toObject());
    });
    bindingsStream.on('end', () => {
        // Send the result as JSON
        res.json(queryResult);
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
