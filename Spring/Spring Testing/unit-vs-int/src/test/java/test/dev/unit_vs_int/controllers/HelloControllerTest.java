package test.dev.unit_vs_int.controllers;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class HelloControllerTest {

    @Test
    void hello() {
        HelloController controller = new HelloController();
        String response = controller.hello("Reza");
        assertEquals("Hello Reza", response);
    }
}