package com.example.demo.Service;
import com.example.demo.Model.BankAccount;
import com.example.demo.Repository.BankAccountRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

@Service
public class BankAccountService {
    private final BankAccountRepository bankAccountRepository;
    public BankAccountService(BankAccountRepository bankAccountRepository) {
        this.bankAccountRepository = bankAccountRepository;
    }
    public BankAccount createAccount(String owner, Double initialBalance) {
        BankAccount account = BankAccount.builder()
                .owner(owner)
                .balance(initialBalance)
                .build();
        return bankAccountRepository.save(account);
    }
    public BankAccount getAccount(Long accountId) {
        return bankAccountRepository.findById(accountId)
                .orElseThrow(() -> new RuntimeException("حساب یافت نشد"));
    }
    public BankAccount deposit(Long accountId, Double amount) {
        BankAccount account = getAccount(accountId);
        account.setBalance(account.getBalance() + amount);
        return bankAccountRepository.save(account);
    }
    public BankAccount withdraw(Long accountId, Double amount) {
        BankAccount account = getAccount(accountId);
        if (account.getBalance() < amount) {
            throw new RuntimeException("موجودی کافی نیست");
        }
        account.setBalance(account.getBalance() - amount);
        return bankAccountRepository.save(account);
    }
    @Transactional(isolation = Isolation.SERIALIZABLE)
    public void transfer(Long fromAccountId, Long toAccountId, Double amount) {
        deposit(toAccountId, amount);
        withdraw(fromAccountId, amount);
    }
}
