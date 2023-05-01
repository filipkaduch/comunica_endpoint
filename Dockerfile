# Use the official Apache Jena Fuseki Docker image as base image
FROM stain/jena-fuseki

# Copy your .ttl file to the container
COPY /database/malware.owl /fuseki/databases/malware.owl

# Expose the Fuseki port
EXPOSE 3030

# Start Fuseki with your data as the default dataset
CMD ["fuseki-server", "--file=/fuseki/databases/malware.owl", "/malware.owl"]

