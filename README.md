# kube-example
An example project to demonstrate a K8S ready setup of a Spring Boot + ReactJS application.

### Local startup

To start up the whole application with all components locally:
```bash
docker-compose up
```
The frontend can be accessed on http://localhost:8080
The backend can be accessed on http://localhost:8081/api/v1
### Building backend

```bash
mvn clean install
mvn dockerfile:push
```

### Building frontend

```bash
make build
make push
```

### Development of backend

You will need a running postges db and the Spring Boot app can be simply executed.
The backend can be accessed on http://localhost:8082/api/v1

### Development of frontend

First, we need a dev container:
```bash
make build-dev
```
Then get into the dev container:
```bash
make dev
```
Then startup the ReactJS app in development mode:
```bash
npm start
```
The frontend can be accessed on http://localhost:3000

### Kubernetes deployment

#### Minikube

Startup minikube cluster:
```bash
minikube start
# optional for a web dashboard
minikube dashboard
# enable ingress controller for minikube - should be done once
minikube addons enable ingress
# enable tunneling
minikube tunnel
```
Deploying postgres:
```bash
kubectl apply -f .\k8s\postres.yaml
```
Deploying backend:
```bash
kubectl apply -f .\kube-backend\k8s\deployment.yaml
kubectl apply -f .\kube-backend\k8s\service.yaml
kubectl apply -f .\kube-backend\k8s\ingress.yaml
```
Deploying frontend:
```bash
kubectl apply -f .\kube-frontend\k8s\configmap.yaml
kubectl apply -f .\kube-frontend\k8s\deployment.yaml
kubectl apply -f .\kube-frontend\k8s\service.yaml
kubectl apply -f .\kube-frontend\k8s\ingress.yaml
```
Rollback example:
```bash
kubectl rollout history deployment.apps/backend-deployment
kubectl rollout undo deployment.apps/backend-deployment
```