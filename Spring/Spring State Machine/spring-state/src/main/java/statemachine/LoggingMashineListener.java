package statemachine;

import org.slf4j.Logger;
import org.springframework.messaging.Message;
import org.springframework.statemachine.StateContext;
import org.springframework.statemachine.StateMachine;
import org.springframework.statemachine.listener.StateMachineListener;
import org.springframework.statemachine.state.State;
import org.springframework.statemachine.transition.Transition;

import static statemachine.LoggingUtils.getStateInfo;

public class LoggingMashineListener implements StateMachineListener<BookStates, BookEvents> {
    private static final Logger LOGGER = LoggingUtils.LOGGER;

    @Override
    public void stateChanged(State<BookStates, BookEvents> from, State<BookStates, BookEvents> to) {
        LOGGER.info("State changed from {} to {}", getStateInfo(from), getStateInfo(to));
    }

    @Override
    public void stateEntered(State<BookStates, BookEvents> state) {
        LOGGER.info("Entered state {}", getStateInfo(state));
    }

    @Override
    public void stateExited(State<BookStates, BookEvents> state) {
        LOGGER.info("Exited state {}", getStateInfo(state));
    }

    @Override
    public void eventNotAccepted(Message<BookEvents> event) {
        LOGGER.error("Event not accepted: {}", event.getPayload());
    }

    @Override
    public void transition(Transition<BookStates, BookEvents> transition) {
        // Too much logging spoils the code =)
    }

    @Override
    public void transitionStarted(Transition<BookStates, BookEvents> transition) {
        // Too much logging spoils the code =)
    }

    @Override
    public void transitionEnded(Transition<BookStates, BookEvents> transition) {
        // Too much logging spoils the code =)
    }

    @Override
    public void stateMachineStarted(StateMachine<BookStates, BookEvents> stateMachine) {
        LOGGER.info("Machine started: {}", stateMachine);
    }

    @Override
    public void stateMachineStopped(StateMachine<BookStates, BookEvents> stateMachine) {
        LOGGER.info("Machine stopped: {}", stateMachine);
    }

    @Override
    public void stateMachineError(StateMachine<BookStates, BookEvents> stateMachine, Exception exception) {
        LOGGER.error("Machine error: {}", stateMachine);
    }

    @Override
    public void extendedStateChanged(Object key, Object value) {
        LOGGER.info("Extended state changed: [{}: {}]", key, value);
    }

    @Override
    public void stateContext(StateContext<BookStates, BookEvents> stateContext) {
        // Too much logging spoils the code =)
    }
}
