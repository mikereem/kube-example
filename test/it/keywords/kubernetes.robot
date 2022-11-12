*** Settings ***
Documentation   Kubernetes related generic keywords
Resource    parameters.robot

Library    Process
Library    String

*** Keywords ***
Run CMD
    [Documentation]     Run a command and return only the output
    [Arguments]     ${cmd}
    ${out}  ${err}=     Run Keyword    Run CMD Return Stdout Stderr     ${cmd}
    [Return]    ${out}

Execute CMD
    [Documentation]     Executing the given command
    [Arguments]     ${cmd}
    ${result}=  Run Process     ${cmd}  shell=True  stdout=/tmp/out.txt     stderr=/tmp/err.txt
    Log    ${result.stdout}
    Log    ${result.stderr}
    Log    ${result.rc}
    [Return]    ${result}

Run CMD Return Stdout Stderr
    [Documentation]     Run a command, validate the rc and return the output and error
    [Arguments]     ${cmd}
    ${result}=  Execute CMD     ${cmd}
    Should Be Equal As Integers    ${result.rc}    0
    ...     Command: ${cmd} execution failed.\n Stdout: ${result.stdout}\n Stderr: ${result.stderr}     values=False
    [Return]    ${result.stdout}    ${result.stderr}

Kubectl
    [Documentation]     Execute a kubectl command
    [Arguments]     ${command}
    ${output}=      Run CMD    ${KUBECTL_CMD} ${command}
    [Return]    ${output}

Wait Pod Readiness
    [Documentation]     Wait until the given Pod becames Ready
    [Arguments]     ${label}
    Wait Until Keyword Succeeds    2 times    30 sec
    ...     Kubectl    wait --for=condition=Ready pod -l ${label} --timeout=120s

Pod Health Check
    [Documentation]     Health check for the given Pod
    [Arguments]     ${label}
    ${status}=  Kubectl    get pod -l ${label} --field-selector=status.phase=Running | grep Running | awk 'NR=3{{printf $3}}'
    Log    Pod ${label} status: ${status}
    ${status_lower}=    Convert To Lower Case   ${status}
    Run Keyword If    "${status_lower}" != "running"    Fail    Pod ${label} is not running