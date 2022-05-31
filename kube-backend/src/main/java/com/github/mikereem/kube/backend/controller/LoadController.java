package com.github.mikereem.kube.backend.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.github.mikereem.kube.backend.model.GenerateLoadRequest;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@AllArgsConstructor
@RestController
@RequestMapping("api/v1/load")
public class LoadController {

    @PostMapping
    public void generateLoad(@RequestBody GenerateLoadRequest request) {
        for (int i = 0; i < request.threads(); i++) {
            new BusyThread(request.duration()).start();
        }
    }

    @Slf4j
    @AllArgsConstructor
    private static class BusyThread extends Thread {
        private Long duration;

        @Override
        public void run() {
            log.info("Generating load...");

            long startTime = System.currentTimeMillis();
            while (System.currentTimeMillis() - startTime < duration) {
                double x = 0.0001;
                for (int i = 0; i < 100000000; i++) {
                    x += Math.sqrt(x);
                }
            }
            log.info("Load generation ended.");
        }
    }
}
