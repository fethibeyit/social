FROM maven:3.8.5-openjdk-17 AS build
COPY . .
RUN mvn -Pprod clean package

FROM openjdk:17-jdk-slim
COPY --from=build /target/social-0.0.1-SNAPSHOT.jar social-app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "social-app.jar"]