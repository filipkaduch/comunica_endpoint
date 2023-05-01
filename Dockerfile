FROM node:14

# Install dependencies
RUN apt-get update && \
    apt-get install -y git && \
    rm -rf /var/lib/apt/lists/*

# Clone the Comunica repository and install dependencies
RUN git clone https://github.com/comunica/comunica.git /app
WORKDIR /app
RUN npm install

# Set up environment variables for Comunica
ENV COMMUNICA_CONFIG='file:/app/packages/actor-init-sparql/config/config-default.json'
ENV COMMUNICA_CONFIG_PATH='/app/packages/actor-init-sparql/config/'

# Expose the SPARQL endpoint port
EXPOSE 3000

# Copy your ontology file to the container
COPY /database/malware.owl /app/malware.owl

# Start the SPARQL endpoint
CMD ["npm", "run", "sparql", "--", "--port", "3000", "--config", "config/config.json"]
