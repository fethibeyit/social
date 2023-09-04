# syntax = docker/dockerfile:1.2

FROM maven:3.8.5-openjdk-17 AS build
RUN --mount=type=secret,id=secretkeys,dst=/etc/secrets/secretkeys cat /etc/secrets/secretkeys
COPY . .
RUN cat /etc/secrets/secretkeys
RUN env
RUN mvn clean package -Dspring.profiles.active=prod

FROM openjdk:17-jdk-slim
COPY --from=build /target/social-0.0.1-SNAPSHOT.jar social-app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "social-app.jar"]