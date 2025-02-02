<div dir="rtl">

# مقدمه‌ای بر Spring AI (نوشتن چت‌بات برای تکمیل متن)


<p align=center>

![Spring AI](https://docs.spring.io/spring-ai/reference/_/img/spring-logo.svg)

</p>

<p align=center>
علی مقدسی، مائده حیدری، علیرضا میرشفیعیان
</p>


## مقدمه


در دنیای امروز که هوش مصنوعی نقش پررنگی در توسعه نرم‌افزار پیدا کرده است، Spring AI به عنوان یک کتابخانه قدرتمند، امکان استفاده از قابلیت‌های هوش مصنوعی را در برنامه‌های کاربردی فراهم می‌کند. در این پژوهش، به بررسی Spring AI و چگونگی استفاده از آن برای پیاده‌سازی یک چت‌بات می‌پردازیم.

## Chat Model API در Spring AI

### معرفی Chat Model API

با استفاده از Chat Model API، برنامه‌نویسان می‌توانند قابلیت‌های گفتگوی هوشمند را در برنامه‌های خود پیاده‌سازی کنند. این API با بهره‌گیری از مدل‌های پیشرفته زبانی مانند GPT، امکان ایجاد پاسخ‌های طبیعی به ورودی‌های کاربران را فراهم می‌کند.

### نحوه عملکرد

فرآیند کار به این صورت است که برنامه یک درخواست را به مدل هوش مصنوعی ارسال می‌کند. مدل با استفاده از دانش خود، پاسخی مناسب تولید می‌کند که می‌تواند برای نمایش به کاربر یا پردازش‌های بیشتر مورد استفاده قرار گیرد.

### ویژگی‌های اصلی

- رابط کاربری ساده و قابل انتقال
- امکان استفاده از مدل‌های مختلف با کمترین تغییر در کد
- هماهنگی کامل با معماری Spring
- مدیریت یکپارچه ارتباط با مدل‌های هوش مصنوعی

### ساختار API

#### رابط ChatModel

<div dir="ltr">

```java
public interface ChatModel extends Model<Prompt, ChatResponse> {
    default String call(String message) {...}
    @Override
    ChatResponse call(Prompt prompt);
}
```
</div>

#### رابط StreamingChatModel

<div dir="ltr">

```java
public interface StreamingChatModel extends StreamingModel<Prompt, ChatResponse> {
    default Flux<String> stream(String message) {...}
    @Override
    Flux<ChatResponse> stream(Prompt prompt);
}
```
</div>

#### استریم کردن پاسخ‌ها

Spring AI امکان دریافت پاسخ‌ها به صورت جریانی (Stream) را فراهم می‌کند که برای کاربردهایی مانند نمایش تدریجی پاسخ‌ها مناسب است. این قابلیت از طریق رابط StreamingChatModel پیاده‌سازی می‌شود.

### اجزای اصلی

#### Prompt

Prompt به عنوان ورودی سیستم عمل می‌کند و شامل موارد زیر است:

- مجموعه پیام‌ها
- تنظیمات اختیاری برای مدل

#### Message

Message ساختاری است که شامل:

- متن اصلی درخواست
- اطلاعات تکمیلی
- نوع پیام

![اجزای مرتبط با پیام](https://docs.spring.io/spring-ai/reference/_images/spring-ai-message-api.jpg)

### تنظیمات (ChatOptions)

از طریق ChatOptions می‌توان پارامترهای مختلف را تنظیم کرد:

- انتخاب مدل مورد نظر
- تنظیم پارامترهای کنترلی
- تعیین محدودیت‌های خروجی

![تنظیمات چت](https://docs.spring.io/spring-ai/reference/_images/chat-options-flow.jpg)

### چرخه کار

1. راه‌اندازی اولیه با تنظیمات پایه
2. تنظیم پارامترها در زمان اجرا
3. ترکیب تنظیمات مختلف
4. پردازش داده‌های ورودی
5. تولید خروجی استاندارد

### ساختار پاسخ (ChatResponse)

ChatResponse نتیجه پردازش مدل را در خود نگه می‌دارد:

<div dir="ltr">

```java
public class ChatResponse implements ModelResponse<Generation> {
    private final ChatResponseMetadata chatResponseMetadata;
    private final List<Generation> generations;

    @Override
    public ChatResponseMetadata getMetadata() {...}

    @Override
    public List<Generation> getResults() {...}
}
```

</div>

این ساختار شامل:

- لیستی از پاسخ‌های تولید شده
- اطلاعات تکمیلی در مورد پاسخ

### کلاس Generation

این کلاس وظیفه نگهداری پاسخ نهایی و اطلاعات مرتبط را بر عهده دارد:

<div dir="ltr">

```java
public class Generation implements ModelResult<AssistantMessage> {
    private final AssistantMessage assistantMessage;
    private ChatGenerationMetadata chatGenerationMetadata;

    @Override
    public AssistantMessage getOutput() {...}

    @Override
    public ChatGenerationMetadata getMetadata() {...}
}
```
</div>

## پیاده‌سازی‌های موجود

![Spring AI Chat Model API](https://docs.spring.io/spring-ai/reference/_images/spring-ai-chat-completions-clients.jpg)

Spring AI امکان استفاده از سرویس‌های مختلف هوش مصنوعی را فراهم می‌کند. برخی از مهم‌ترین آنها عبارتند از:

1. **OpenAI Chat**

   - قابلیت استریمینگ
   - پشتیبانی از چند رسانه‌ای
   - امکان فراخوانی توابع

2. **Microsoft Azure OpenAI**

   - استریمینگ
   - فراخوانی توابع

3. **Google Vertex AI Gemini**
   - پشتیبانی کامل از قابلیت‌های پیشرفته
   - چند رسانه‌ای
   - استریمینگ

![Spring AI Chat Model API](https://docs.spring.io/spring-ai/reference/_images/spring-ai-chat-api.jpg)

و سایر سرویس‌های معتبر مانند Anthropic، Mistral AI و Amazon Bedrock.

## پیاده‌سازی با OpenAI Chat

![Spring AI Chat Model API](https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/OpenAI_Logo.svg/1280px-OpenAI_Logo.svg.png)

برای استفاده از OpenAI در پروژه، مراحل زیر را باید طی کرد:

### نیازمندی‌های اولیه

1. ساخت حساب کاربری در OpenAI
2. دریافت کلید API
3. تنظیم متغیر محیطی:
    <div dir="ltr">

   ```shell
   export SPRING_AI_OPENAI_API_KEY=<API_KEY>
   ```
    </div>

### آماده‌سازی پروژه

در فایل `pom.xml` پروژه باید وابستگی زیر را اضافه کنیم:

<div dir="ltr">

```xml
<dependency>
    <groupId>org.springframework.ai</groupId>
    <artifactId>spring-ai-openai-spring-boot-starter</artifactId>
</dependency>
```
</div>

### تنظیمات زمان اجرا

برای تنظیم پارامترهای مدل می‌توان از کد زیر استفاده کرد:

<div dir="ltr">

```java
ChatResponse response = chatModel.call(
    new Prompt(
        "your text",
        OpenAiChatOptions.builder()
            .model("gpt-4-o")
            .temperature(0.4)
        .build()
    ));
```
</div>

## راهنمای عملی پیاده‌سازی چت‌بات تکمیل متن

### مراحل پیاده‌سازی

1. **آماده‌سازی محیط توسعه**

   - ایجاد پروژه Spring Boot
   - افزودن وابستگی‌های مورد نیاز
   - تنظیم کلید API

2. **طراحی ساختار برنامه**

   - تعریف نحوه دریافت متن ناتمام
   - طراحی فرمت پاسخ
   - تنظیم پارامترهای مدل

3. **پیکربندی مدل**

<div dir="ltr">

   ```java
   OpenAiChatOptions options = OpenAiChatOptions.builder()
       .temperature(0.7)    // set creativity level
       .maxTokens(200)      // set response length
       .model("gpt-4")      // select model
       .build();
   ```

</div>

4. **پیاده‌سازی سرویس**

<div dir="ltr">

   ```java
   @Service
   public class TextCompletionService {
       private final ChatModel chatModel;

       public TextCompletionService(ChatModel chatModel) {
           this.chatModel = chatModel;
       }

       public String completeText(String incompleteText) {
           Prompt prompt = new Prompt(
               "please complete the text below:\n" + incompleteText,
               options
           );

           ChatResponse response = chatModel.call(prompt);
           return response.getResult().getOutput().getContent();
       }
   }
   ```
   
   </div>

### نکات مهم در پیاده‌سازی

- انتخاب دقیق پارامترهای مدل
- مدیریت خطاها
- بهینه‌سازی عملکرد
- پیاده‌سازی سیستم نظارت و گزارش‌گیری
- تست کامل عملکرد

### مزایای استفاده از Spring AI

- انعطاف‌پذیری در تغییر مدل‌ها
- یکپارچگی با اکوسیستم Spring
- پشتیبانی از پردازش همزمان
- قابلیت توسعه آسان

### توصیه‌های کاربردی

1. استفاده از سیستم مدیریت خطای مناسب
2. طراحی دقیق درخواست‌ها برای دریافت بهترین نتیجه
3. استفاده از قابلیت استریمینگ برای متن‌های طولانی
4. پیاده‌سازی سیستم ثبت وقایع
5. نوشتن تست‌های جامع

## نتیجه‌گیری

**Spring AI Chat Model API** یک راهکار قوی و انعطاف‌پذیر برای افزودن قابلیت‌های چت مبتنی بر هوش مصنوعی به برنامه‌های کاربردی است. این API با ساده‌سازی تعامل با مدل‌های مختلف، به توسعه‌دهندگان اجازه می‌دهد که روی ساختن تجربه‌های گفتگویی جذاب تمرکز کنند.

برای اطلاعات بیشتر، به **[مستندات رسمی Spring AI](https://docs.spring.io/spring-ai/reference/api/chatmodel.html)** مراجعه کنید.

## منابع

- [Chat Model API :: مستندات Spring AI](https://docs.spring.io/spring-ai/reference/api/chatmodel.html)
- [Chat Client API :: مستندات Spring AI](https://docs.spring.io/spring-ai/reference/api/chatclient.html)
- [OpenAI Chat :: مستندات Spring AI](https://docs.spring.io/spring-ai/reference/api/chat/openai-chat.html)
- [مقایسه مدل‌های چت :: مستندات Spring AI](https://docs.spring.io/spring-ai/reference/api/chat/comparison.html)

</div>
