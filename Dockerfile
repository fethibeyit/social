# syntax = docker/dockerfile:1

FROM maven:3.8.5-openjdk-17 AS build
#RUN --mount=type=secret,id=secretkeys,dst=/etc/secrets/secretkeys
ARG DATABASE_URL
ARG DATABASE_USERNAME
ARG DATABASE_PASSWORD
ARG JWT_SECRET
COPY . .

RUN mvn clean package -Dspring.profiles.active=prod -Pprod

FROM openjdk:17-jdk-slim
ARG DATABASE_URL
ARG DATABASE_USERNAME
ARG DATABASE_PASSWORD
ARG JWT_SECRET
COPY --from=build /target/social-0.0.1-SNAPSHOT.jar social-app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "-Dspring.profiles.active=prod", "social-app.jar"]