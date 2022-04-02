package com.github.mikereem.kube.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.github.mikereem.kube.backend.db.model.TodoItem;
import com.github.mikereem.kube.backend.db.repository.TodoItemRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class TodoService {

    private TodoItemRepository todoItemRepository;

    public List<TodoItem> getTodoItems() {
        return todoItemRepository.findAll();
    }

    @Transactional
    public void createTodoItem(String title, String description) {
        TodoItem item = TodoItem.builder()
                .title(title)
                .description(description)
                .build();
        todoItemRepository.save(item);
    }
}
