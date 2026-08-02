package com.example.websample.configurations;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "application.chat")
@Setter
@Getter
public class ChatProperties {
    private String model;
    private Float temperature;
    private Integer maxTokens;
}