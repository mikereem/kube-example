package com.github.mikereem.kube.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.github.mikereem.kube.backend.db.model.TodoItem;
import com.github.mikereem.kube.backend.model.CreateTodoItemRequest;
import com.github.mikereem.kube.backend.service.TodoService;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@AllArgsConstructor
@RestController
@RequestMapping("api/v1/todos")
public class TodoController {

    private TodoService todoService;

    @GetMapping
    public List<TodoItem> getTodoItems() {
        log.info("Getting all todo items");
        return todoService.getTodoItems();
    }

    @PostMapping
    public void createTodoItem(@RequestBody CreateTodoItemRequest request) {
        log.info("Creating new todo item: {}", request.title());
        todoService.createTodoItem(request.title(), request.description());
    }
}
