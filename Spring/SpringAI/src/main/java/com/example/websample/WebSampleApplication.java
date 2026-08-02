package com.example.websample;

import com.example.websample.configurations.ChatProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties(ChatProperties.class)
public class WebSampleApplication {

    public static void main(String[] args) {
        SpringApplication.run(WebSampleApplication.class, args);
    }

}
