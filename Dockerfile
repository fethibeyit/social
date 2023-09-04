RUN echo "hello world"
RUN echo $RENDER_EXTERNAL_URL
RUN echo $DB_URL
RUN echo $DB_USER
RUN echo $DB_PASS

FROM maven:3.8.5-openjdk-17 AS build
COPY . .
RUN echo "hello world"
RUN echo $RENDER_EXTERNAL_URL
RUN echo $DB_URL
RUN echo $DB_USER
RUN echo $DB_PASS
RUN mvn clean package -Dspring.profiles.active=prod

FROM openjdk:17-jdk-slim
COPY --from=build /target/social-0.0.1-SNAPSHOT.jar social-app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "social-app.jar"]