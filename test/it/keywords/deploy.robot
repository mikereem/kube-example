*** Settings ***
Documentation  Deployment keywords
Resource    ../keywords/parameters.robot
Resource    ../keywords/kubernetes.robot

*** Keywords ***
Deploy Postgres
     Kubectl    apply -f ../k8s/persistent-volume.yaml
     Kubectl    apply -f ../k8s/postgres.yaml
     Wait Pod Readiness    app=postgres
     Wait Until Keyword Succeeds    10 times    30 sec    Pod Health Check    app=postgres
     Sleep    5 sec
     Log To Console    Postgres deployed
     Wait Pod Readiness    app=pgadmin
     Wait Until Keyword Succeeds    10 times    30 sec    Pod Health Check    app=pgadmin
     Sleep    5 sec
     Log To Console    Pgadmin deployed

Uninstall Postgres
    Kubectl    delete deployment pgadmin
    Kubectl    delete ingress pgadmin-ingress
    Kubectl    delete service pgadmin-service
    Kubectl    delete pvc pgadmin-pvc
    Kubectl    delete deployment postgres
    Kubectl    delete secret postgres-secret
    Kubectl    delete service postgres-service
    Kubectl    delete pvc postgres-pvc
    Kubectl    delete pv pv-local

Deploy Backend
    Kubectl    apply -f ../kube-backend/k8s/deployment.yaml
    Kubectl    apply -f ../kube-backend/k8s/service.yaml
    Kubectl    apply -f ../kube-backend/k8s/ingress.yaml
    Wait Pod Readiness    app=backend
    Wait Until Keyword Succeeds    10 times    30 sec    Pod Health Check    app=backend
    Sleep    5 sec
    Log To Console    Backend deployed

Uninstall Backend
    Kubectl    delete ingress backend-ingress
    Kubectl    delete service backend-service
    Kubectl    delete deployment backend-deployment