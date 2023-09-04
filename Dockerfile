# syntax = docker/dockerfile:1.2
RUN --mount=type=secret,id=_env,dst=/etc/secrets/.env cat /etc/secrets/.env

FROM maven:3.8.5-openjdk-17 AS build
COPY . .
RUN mvn clean package -Dspring.profiles.active=prod

FROM openjdk:17-jdk-slim
COPY --from=build /target/social-0.0.1-SNAPSHOT.jar social-app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "social-app.jar"]