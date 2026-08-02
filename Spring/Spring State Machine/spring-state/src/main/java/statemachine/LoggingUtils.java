package statemachine;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.statemachine.state.State;
import org.springframework.statemachine.transition.Transition;

public class LoggingUtils {
    public static final Logger LOGGER = LoggerFactory.getLogger("STATE MACHINE");

    public static String getStateInfo(State<BookStates, BookEvents> state) {
        return state != null ? state.getId().name() : "EMPTY STATE";
    }

    public static String getTransitionInfo(Transition<BookStates, BookEvents> t) {
        return String.format("[%s: %s]",
                t.getSource() != null ? t.getSource().getId() : "EMPTY",
                t.getTarget() != null ? t.getTarget().getId() : "EMPTY"
        );
    }
}
