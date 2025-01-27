package com.example.websample.configurations;

import com.example.websample.app.QuotationFunctionMock;
import enums.CryptoSymbol;
import org.springframework.ai.model.function.FunctionCallback;
import org.springframework.ai.model.function.FunctionCallbackWrapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.stream.Collectors;
import java.util.stream.Stream;

@Configuration
public class BeanProvider {
    @Bean
    public FunctionCallback quotationFunction() {
        return FunctionCallbackWrapper.builder(new QuotationFunctionMock())
                .withName("CurrentQuotation")
                .withDescription("""
                Get the current quotation of the cryptocurrency by its symbol.
                Available symbols are: %s
                """.formatted(
                        Stream.of(CryptoSymbol.values()).map(CryptoSymbol::name)
                                .collect(Collectors.joining(", "))
                ))
                .build();
    }
}