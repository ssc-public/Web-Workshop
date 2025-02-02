package com.example.Simple_Chatbot.controller;

import com.example.Simple_Chatbot.service.ChatbotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chatbot")
public class ChatbotController {

    private final ChatbotService chatbotService;

    @Autowired
    public ChatbotController(ChatbotService chatbotService) {
        this.chatbotService = chatbotService;
    }

    @GetMapping("/ask")
    public String ask(@RequestParam String message) {
        return chatbotService.getResponse(message);
    }
}