package enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum CryptoSymbol {
    BTC("Bitcoin"), ETH("Ethereum"), SOL("Solana");

    private final String title;
}