# Spring AI و Structured Output Converter

## اعضای گروه
**سبا شامخی - زهرا علیپور - کمیل یحیی زاده**

## بیان مسئله
با پیشرفت فناوری‌های هوش مصنوعی و به‌ویژه مدل‌های زبانی بزرگ (LLMs)، نیاز به تبدیل خروجی‌های متنی به داده‌های ساختارمند به‌طور فزاینده‌ای احساس می‌شود. این تبدیل برای برنامه‌های کاربردی مختلف، از جمله تجزیه و تحلیل داده‌ها، تولید محتوا و اتوماسیون فرآیندها ضروری است. خروجی‌های متنی معمولاً غیرساختارمند هستند و نمی‌توان به راحتی از آن‌ها در سیستم‌های اطلاعاتی استفاده کرد. **Spring AI** با ویژگی‌هایی مانند **Structured Output Converter** به توسعه‌دهندگان کمک می‌کند تا این چالش را حل کنند.

## معرفی Spring AI
Spring AI یک فریم‌ورک مدرن است که به توسعه‌دهندگان این امکان را می‌دهد تا از قابلیت‌های مدل‌های زبانی بزرگ بهره‌برداری کنند. این ابزار به‌ویژه برای برنامه‌نویسان جاوا طراحی شده و امکاناتی برای تعامل با مدل‌های هوش مصنوعی فراهم می‌کند. یکی از ویژگی‌های کلیدی آن، **Structured Output Converter** است که خروجی‌های تولید شده توسط مدل‌ها را به فرمت‌های ساختارمند مانند **JSON، XML یا YAML** تبدیل می‌کند.

## ویژگی‌ها و مزایای Structured Output Converter
- **تبدیل مستقیم خروجی‌ها:** این ابزار امکان تبدیل خروجی متن آزاد به اشیاء جاوا را فراهم می‌آورد.
- **پشتیبانی از فرمت‌های مختلف:** قابلیت تولید خروجی در فرمت‌هایی مانند JSON، XML و YAML.
- **سازگاری با سایر ماژول‌های Spring:** این ابزار به راحتی با دیگر اجزای Spring Boot یکپارچه می‌شود.
- **بهبود قابلیت اطمینان داده‌ها:** تبدیل خروجی‌های مدل زبانی بزرگ به داده‌های قابل پردازش، که قابلیت استفاده در سیستم‌های اطلاعاتی را افزایش می‌دهد.

## نحوه عملکرد Structured Output Converter
### معماری کلی
Structured Output Converter بخشی از کتابخانه **Spring AI** است که به صورت زیر عمل می‌کند:
1. تعریف قالب مورد نظر توسط توسعه‌دهنده.
2. نگاشت متن تولید شده توسط مدل زبانی بزرگ به قالب مشخص.
3. تولید خروجی به صورت داده ساختارمند.

## مثال‌های عملی
### مثال ۱: تولید لیست فیلم‌های یک بازیگر
#### ۱. تعریف کلاس داده
```java
record ActorsFilms(String actor, List<String> movies) {}
```

#### ۲. پیاده‌سازی منطق تبدیل
```java
@Bean
public BeanOutputConverter<ActorsFilms> actorsFilmsConverter() {
    return new BeanOutputConverter<>(ActorsFilms.class);
}
```

#### ۳. فراخوانی مدل و تبدیل خروجی
```java
@Autowired
private ChatModel chatModel;

@Autowired
private BeanOutputConverter<ActorsFilms> actorsFilmsConverter;

public ActorsFilms getFilmography(String actorName) {
    String format = actorsFilmsConverter.getFormat();
    String template = """
        Generate a list of 5 movies for the actor {actor}.
        {format}
        """;

    Generation generation = chatModel.call(
        new PromptTemplate(template, Map.of("actor", actorName, "format", format)).create()
    ).getResult();

    return actorsFilmsConverter.convert(generation.getOutput().getContent());
}
```

#### ۴. اجرای برنامه و نمونه خروجی
```json
{
  "actor": "Tom Hanks",
  "movies": [
    "Forrest Gump",
    "Cast Away",
    "Saving Private Ryan",
    "The Green Mile",
    "Toy Story"
  ]
}
```

### مثال ۲: تجزیه و تحلیل نظرات مشتریان
#### ۱. تعریف کلاس داده برای نظرات
```java
record CustomerReview(String review, String sentiment) {}
```

#### ۲. پیاده‌سازی منطق تجزیه و تحلیل نظرات
```java
@Bean
public BeanOutputConverter<CustomerReview> customerReviewConverter() {
    return new BeanOutputConverter<>(CustomerReview.class);
}
```

#### ۳. فراخوانی مدل برای تجزیه و تحلیل نظرات
```java
public List<CustomerReview> analyzeReviews(List<String> reviews) {
    List<CustomerReview> results = new ArrayList<>();
    
    for (String review : reviews) {
        String format = customerReviewConverter.getFormat();
        String template = """
            Analyze the sentiment of the following review: {review}.
            {format}
            """;

        Generation generation = chatModel.call(
            new PromptTemplate(template, Map.of("review", review, "format", format)).create()
        ).getResult();

        results.add(customerReviewConverter.convert(generation.getOutput().getContent()));
    }
    return results;
}
```

## مبدل‌های خروجی ساختاریافته موجود
Spring AI چندین نوع **Structured Output Converter** را ارائه می‌دهد:
- **BeanOutputConverter**: تبدیل خروجی مدل به کلاس جاوا مشخص‌شده.
- **MapOutputConverter**: تبدیل خروجی مدل به `Map<String, Object>`.
- **ListOutputConverter**: تبدیل خروجی مدل به `List<String>`.

### استفاده از Map Output Converter
```java
Map<String, Object> result = ChatClient.create(chatModel).prompt()
    .user(u -> u.text("Provide me a List of {subject}")
                .param("subject", "an array of numbers from 1 to 9 under the key name 'numbers'"))
    .call()
    .entity(new ParameterizedTypeReference<Map<String, Object>>() {});
```

## مدل‌های AI پشتیبانی‌شده
مدل‌های هوش مصنوعی که تست شده‌اند و از خروجی‌های ساختاریافته **List، Map و Bean** پشتیبانی می‌کنند:
| Model | Integration Tests / Samples |
|--------|--------------------------------|
| **OpenAI** | OpenAiChatModelIT |
| **Anthropic Claude 3** | AnthropicChatModelIT.java |
| **Azure OpenAI** | AzureOpenAiChatModelIT.java |
| **Mistral AI** | MistralAiChatModelIT.java |
| **Ollama** | OllamaChatModelIT.java |
| **Vertex AI Gemini** | VertexAiGeminiChatModelIT.java |

## نتیجه‌گیری
Spring AI و ابزار **Structured Output Converter** یکی از راهکارهای قدرتمند برای مدیریت خروجی مدل‌های زبانی بزرگ هستند. این ابزار نه تنها فرآیند تبدیل داده‌ها را ساده‌تر می‌کند، بلکه امکان یکپارچگی آسان با سایر اجزای برنامه را نیز فراهم می‌آورد. با استفاده از این ابزار، توسعه‌دهندگان می‌توانند داده‌هایی قابل اعتماد و ساختارمند تولید کنند که در برنامه‌های مختلف قابل استفاده باشند.

## منابع
- [Spring AI Documentation - Structured Output Converter](https://spring.io/projects/spring-ai)
- [Baeldung - Introduction to Spring Boot](https://www.baeldung.com/spring-boot)
- [Spring Framework Documentation](https://docs.spring.io/spring-framework/docs/current/reference/html/)

