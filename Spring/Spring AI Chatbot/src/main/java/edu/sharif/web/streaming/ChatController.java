package edu.sharif.web.streaming;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;

@RestController
@CrossOrigin
public class ChatController {
	private final ChatClient chatClient;

	public ChatController(ChatClient.Builder builder) {
		this.chatClient = builder.build();
	}

	@PostMapping("/chat")
	public String chat(@RequestParam String message) {
		return chatClient.prompt()
				.user(message)
				.call()
				.content();
	}

	@GetMapping("/stream")
	public Flux<String> chatWithStream(@RequestParam String message) {
		return chatClient.prompt()
				.user(message)
				.stream()
				.content();
	}
}
