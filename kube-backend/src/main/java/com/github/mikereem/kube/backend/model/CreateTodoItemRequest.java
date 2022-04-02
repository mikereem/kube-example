package com.github.mikereem.kube.backend.model;

public record CreateTodoItemRequest(
    String title,
    String description) {

}
