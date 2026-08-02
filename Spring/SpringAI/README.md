# Spring AI Structured Output Converter

<div dir="rtl" style="text-align: right">

## اعضای گروه

**سبا شامخی، زهرا علیپور، کمیل یحیی‌زاده**

## هدف

مدل‌های زبانی معمولا متن آزاد برمی‌گردانند، ولی در برنامه‌های واقعی گاهی به خروجی قابل پردازش نیاز داریم. برای نمونه، بهتر است پاسخ مدل به جای چند خط توضیح، به یک شیء جاوا، یک `Map` یا یک `List` تبدیل شود. Spring AI برای این کار API مربوط به structured output را دارد.

نسخه مبنای این متن، مستندات Spring AI 2.0.0 است.

## ایده اصلی

در Spring AI، `StructuredOutputConverter<T>` دو کار اصلی دارد:

1. قالب مورد انتظار را به prompt اضافه می‌کند.
2. متن برگشتی مدل را به نوع جاوایی مورد نظر تبدیل می‌کند.

این تبدیل تضمین صد درصدی نیست. مدل ممکن است قالب خواسته‌شده را رعایت نکند، پس برای ورودی‌های مهم باید اعتبارسنجی هم داشته باشیم.

## مبدل‌های آماده

در مستندات Spring AI 2.0.0 این مبدل‌ها معرفی شده‌اند:

- `BeanOutputConverter<T>`: خروجی JSON را به یک کلاس یا record جاوا تبدیل می‌کند.
- `MapOutputConverter`: خروجی JSON را به `Map<String, Object>` تبدیل می‌کند.
- `ListOutputConverter`: خروجی متنی جداشده با ویرگول را به `List<String>` تبدیل می‌کند.

در مستندات رسمی برای مبدل‌های آماده از JSON، Map، List و Bean مثال آمده است. اگر در پروژه‌ای به XML یا YAML نیاز دارید، نسخه Spring AI و پشتیبانی مدل را جداگانه بررسی کنید.

## نمونه Bean

```java
import java.util.List;

import org.springframework.ai.chat.client.ChatClient;

record ActorsFilms(String actor, List<String> movies) {
}

public ActorsFilms films(ChatClient chatClient, String actor) {
    return chatClient.prompt()
            .user(u -> u.text("Generate the filmography of 5 movies for {actor}.")
                    .param("actor", actor))
            .call()
            .entity(ActorsFilms.class);
}
```

## نمونه Map

```java
import java.util.Map;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.core.ParameterizedTypeReference;

public Map<String, Object> numbers(ChatClient chatClient) {
    return chatClient.prompt()
            .user(u -> u.text("Provide a list of numbers from 1 to 9 under the key name 'numbers'."))
            .call()
            .entity(new ParameterizedTypeReference<Map<String, Object>>() {
            });
}
```

## نمونه ListOutputConverter

```java
import java.util.List;
import java.util.Map;

import org.springframework.ai.chat.model.ChatModel;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.chat.prompt.PromptTemplate;
import org.springframework.ai.converter.ListOutputConverter;
import org.springframework.core.convert.support.DefaultConversionService;

public List<String> flavors(ChatModel chatModel) {
    ListOutputConverter converter = new ListOutputConverter(new DefaultConversionService());
    String template = """
            List five ice cream flavors.
            {format}
            """;

    Prompt prompt = PromptTemplate.builder()
            .template(template)
            .variables(Map.of("format", converter.getFormat()))
            .build()
            .create();

    return converter.convert(chatModel.call(prompt).getResult().getOutput().getText());
}
```

## نکته‌های مهم

- خروجی مدل را همیشه اعتبارسنجی کنید.
- برای داده‌های حساس، تنها به درست بودن قالب پاسخ اعتماد نکنید.
- اگر مدل از native structured output پشتیبانی می‌کند، می‌توان آن را جداگانه فعال کرد، ولی پشتیبانی بین مدل‌ها یکسان نیست.

## منابع

- [Spring AI 2.0.0 Structured Output Converter](https://docs.spring.io/spring-ai/reference/api/structured-output-converter.html)

</div>
