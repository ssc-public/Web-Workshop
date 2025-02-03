package com.example.demo.Controller;
import com.example.demo.Model.BankAccount;
import org.springframework.web.bind.annotation.*;
import com.example.demo.Service.BankAccountService;

@RestController
@RequestMapping("/bank")
public class BankAccountController {
    private final BankAccountService bankAccountService;
    public BankAccountController(BankAccountService bankAccountService) {
        this.bankAccountService = bankAccountService;
    }
    @PostMapping("/create")
    public BankAccount createAccount(@RequestParam String owner, @RequestParam Double initialBalance) {
        return bankAccountService.createAccount(owner, initialBalance);
    }
    @GetMapping("/{accountId}")
    public BankAccount getAccount(@PathVariable Long accountId) {
        return bankAccountService.getAccount(accountId);
    }
    @PostMapping("/{accountId}/deposit")
    public BankAccount deposit(@PathVariable Long accountId, @RequestParam Double amount) {
        return bankAccountService.deposit(accountId, amount);
    }
    @PostMapping("/{accountId}/withdraw")
    public BankAccount withdraw(@PathVariable Long accountId, @RequestParam Double amount) {
        return bankAccountService.withdraw(accountId, amount);
    }
    @PostMapping("/transfer")
    public String transfer(@RequestParam Long fromAccountId,
                           @RequestParam Long toAccountId,
                           @RequestParam Double amount) {
        bankAccountService.transfer(fromAccountId, toAccountId, amount);
        return "انتقال وجه با موفقیت انجام شد";
    }
}
