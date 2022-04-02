FROM khipu/openjdk17-alpine
ARG JAR_FILE
ENV APP_HOME=/usr/app/
WORKDIR $APP_HOME
COPY target/${JAR_FILE} backend.jar
EXPOSE 8081
ENTRYPOINT ["java","-jar","backend.jar"]