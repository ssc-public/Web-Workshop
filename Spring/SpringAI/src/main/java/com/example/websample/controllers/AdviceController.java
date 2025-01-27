package com.example.websample.controllers;

import com.example.websample.services.AdviceService;
import enums.CryptoSymbol;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AdviceController {
    @Autowired
    private final AdviceService adviceService;

    @GetMapping("/advice/overview/{cryptoSymbol}")
    public ResponseEntity<String> generate(
            @PathVariable CryptoSymbol cryptoSymbol
    ) {
        return ResponseEntity.ok(adviceService.overview(cryptoSymbol));
    }
}