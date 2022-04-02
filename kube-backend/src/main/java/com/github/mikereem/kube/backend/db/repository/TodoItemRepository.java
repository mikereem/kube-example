package com.github.mikereem.kube.backend.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.github.mikereem.kube.backend.db.model.TodoItem;

public interface TodoItemRepository extends JpaRepository<TodoItem, Long> {
}
