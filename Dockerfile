FROM openjdk:8-jre-alpine

WORKDIR /app

COPY blazegraph.jar /app/
COPY /database/malware.owl /app/malware.owl
COPY /database/cve_gen/CVE-2000-owl.owl /app/cve_gen/CVE-2000-owl.owl

EXPOSE 3000

CMD java -server -Xmx4g -jar blazegraph.jar &
