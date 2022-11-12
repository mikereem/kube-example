*** Settings ***
Documentation  Backend tests
Resource    ../keywords/parameters.robot
Resource    ../keywords/kubernetes.robot
Resource    ../keywords/deploy.robot
Library     HttpCtrl.Client
Library     String
Suite Setup     Setup
Suite Teardown  Teardown

*** Test Cases ***
Create item test
    [Documentation]     Basic test
    [Tags]  SanityCheck     Nightly
    Log To Console    Creating test item
    ${create_body}=     Set Variable    {"title": "Pay bills", "description": "Bills should be paid"}
    Initialize Client    backend.kube.local
    Set Request Header    Content-Type    application/json
    Send Http Request    POST    /api/v1/todos     ${create_body}
    ${status}=  Get Response Status
    Should Be Equal As Integers    ${status}    200
    Send Http Request    GET    /api/v1/todos
    ${status}=  Get Response Status
    ${body}=    Get Response Body
    ${body}=    Decode Bytes To String    ${body}    UTF-8
    Should Be Equal As Integers    ${status}    200
    ${excepted_item}=   Set Variable    "Pay bills"
    Should Contain    ${body}    ${excepted_item}

*** Keywords ***
Setup
    [Documentation]     Suite setup
    Deploy Postgres
    Deploy Backend

Teardown
    [Documentation]     Suite teardown
    Uninstall Postgres
    Uninstall Backend
