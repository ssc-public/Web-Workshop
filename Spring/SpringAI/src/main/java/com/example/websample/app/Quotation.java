package com.example.websample.app;

public record Quotation(
        String symbol,
        String name,
        double priceUSD,
        double priceYesterdayUSD,
        double volumeYesterdayUSD
) {}