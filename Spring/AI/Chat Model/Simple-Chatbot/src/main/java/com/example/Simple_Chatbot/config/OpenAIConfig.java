package com.example.Simple_Chatbot.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.theokanning.openai.service.OpenAiService;

@Configuration
public class OpenAIConfig {

    @Value("${openai.api.key}")
    private String openAiApiKey;

    @Bean
    public OpenAiService openAiService() {
        return new OpenAiService(openAiApiKey);
    }
}