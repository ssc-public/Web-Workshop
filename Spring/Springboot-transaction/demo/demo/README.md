# Spring Boot transaction sample

This sample shows a small bank account API with a transactional transfer method. The code uses Spring Boot 3.4.2, Spring Data JPA, MySQL Connector/J and Lombok.

## What this teaches

- `@Transactional` on a service method
- `Isolation.SERIALIZABLE` for the transfer operation
- Simple JPA entity and repository wiring
- Request parameter based controller endpoints

## Configuration

Create a MySQL database named `example`, or change the database name in `src/main/resources/application.properties`.

The sample reads database credentials from environment variables:

```properties
DB_USERNAME=root
DB_PASSWORD=password
```

The fallback values are local demo values. Do not use them for a real database.

## Manual run

From this folder:

```bash
mvn spring-boot:run
```

The app listens on port `3000`.

## Endpoints

Create an account:

```bash
curl -X POST "http://localhost:3000/bank/create?owner=Ali&initialBalance=1000"
```

Read an account:

```bash
curl "http://localhost:3000/bank/1"
```

Deposit:

```bash
curl -X POST "http://localhost:3000/bank/1/deposit?amount=200"
```

Withdraw:

```bash
curl -X POST "http://localhost:3000/bank/1/withdraw?amount=100"
```

Transfer:

```bash
curl -X POST "http://localhost:3000/bank/transfer?fromAccountId=1&toAccountId=2&amount=50"
```

## Notes for learners

The `transfer` method calls `deposit` and `withdraw` inside one transaction. If `withdraw` throws a runtime exception because the source account has too little balance, Spring rolls back the transaction.
