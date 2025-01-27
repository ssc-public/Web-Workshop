package com.example.websample.services;

import enums.CryptoSymbol;
import jakarta.annotation.Resource;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.anthropic.AnthropicChatOptions;
import org.springframework.ai.anthropic.api.AnthropicApi;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.advisor.MessageChatMemoryAdvisor;
import org.springframework.ai.chat.memory.ChatMemory;
import org.springframework.ai.chat.memory.InMemoryChatMemory;
import org.springframework.ai.chat.messages.UserMessage;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdviceService {

    @Autowired
    ChatModel chatModel;

    public String overview(CryptoSymbol cryptoSymbol) {
        UserMessage userMessage = new UserMessage(
                """
                Give me a short overview of the current %s (%s) quotation followed by a brief trend assessment.
                """.formatted(cryptoSymbol.getTitle(), cryptoSymbol.name())
        );

        var chatResponse = chatModel.call(
                new Prompt(
                        List.of(userMessage),
                        AnthropicChatOptions.builder()
                                .model("claude-2.1")
                                .temperature(0.4)
                                .build()
                )
        );
        return chatResponse.getResult().getOutput().getContent();
    }
}