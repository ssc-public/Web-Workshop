package com.example.websample.app;

import java.util.function.Function;

public class QuotationFunctionMock implements Function<QuotationFunctionMock.Request, Quotation> {

    public record Request(String cryptoSymbol) {}

    @Override
    public Quotation apply(Request r) {
        return new Quotation(
                r.cryptoSymbol(), "", 25000,26000,1317774231.5192668
        );
    }
}
