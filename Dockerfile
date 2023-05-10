# Use the official Apache Jena Fuseki Docker image as base image
# FROM stain/jena-fuseki

# Copy your .ttl file to the container
# COPY /database/malware.owl /fuseki/databases/malware.owl

# Expose the Fuseki port
# EXPOSE 3030


# Use a base image with Node.js and Comunica installed
FROM node:14

# Set the working directory for the container
WORKDIR /app

# Copy the local RDF file to the container
COPY /database/malware.owl /app/databases/malware.owl

# Install the Comunica SPARQL endpoint package
RUN npm install -g @comunica/query-sparql @comunica/query-sparql-file

# Expose the default SPARQL endpoint port (3000)
EXPOSE 3000

# Set the entrypoint command to start Comunica with the local RDF file
CMD ["sh", "-c", "export PATH=$PATH:/usr/local/lib/node_modules/comunica-sparql-file/node_modules/.bin && query-sparql-file --port 3000 file:databases/malware.owl"]

