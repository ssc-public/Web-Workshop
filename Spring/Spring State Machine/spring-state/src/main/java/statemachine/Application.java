package statemachine;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.statemachine.StateMachine;
import org.springframework.statemachine.config.EnableStateMachine;

@SpringBootApplication
@EnableStateMachine
public class Application implements CommandLineRunner {
    private static Logger logger = LoggingUtils.LOGGER;

    private final StateMachine<BookStates, BookEvents> stateMachine;

    @Autowired
    public Application(StateMachine<BookStates, BookEvents> stateMachine) {
        this.stateMachine = stateMachine;
    }

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @Override
    public void run(String... args) {
        boolean returnAccepted = stateMachine.sendEvent(BookEvents.RETURN);
        logger.info("return accepted: " + returnAccepted);
        boolean borrowAccepted = stateMachine.sendEvent(BookEvents.BORROW);
        logger.info("borrow accepted: " + borrowAccepted);
        returnAccepted = stateMachine.sendEvent(BookEvents.RETURN);
        logger.info("return accepted: " + returnAccepted);
    }
}
