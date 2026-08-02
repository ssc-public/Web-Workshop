# ماشین حالت در Spring Boot
نگارنده: آرمان بابائی (98110349)
## صورت مسئله
مسئله‌ای که قرار است با استفاده از ماشین‌های حالت در Spring Boot حل شود، به مدیریت پیچیدگی و بهبود خوانایی و نگهداری کد در پروژه‌های نرم‌افزاری مربوط می‌شود. در بسیاری از پروژه‌ها، با افزایش تعداد شرایط و تصمیم‌گیری‌ها در منطق برنامه، کدها به مرور زمان به شکلی بسیار پیچیده و نامرتب در می‌آیند که به اصطلاح "کد اسپگتی" نامیده می‌شود. [1] این ساختار پیچیده باعث می‌شود فهم، دیباگ و توسعه‌ی بیشتر برنامه بسیار مشکل شود. استفاده از ماشین‌های حالت به ما این امکان را می‌دهد که وضعیت‌های مختلف برنامه را به صورت مجزا تعریف کرده و انتقال بین این وضعیت‌ها را بر اساس تریگرها یا رویدادها مدیریت کنیم. [2]

ماشین‌های حالت با استفاده از مدل‌های تعریف شده برای وضعیت‌ها و انتقال‌ها، به برنامه‌نویسان اجازه می‌دهند که منطق برنامه را به صورت جداگانه و مستقل از هم مدیریت کنند. این روش نه تنها به کاهش پیچیدگی کمک می‌کند بلکه به نگهداری و بهبود کد نیز کمک شایانی می‌کند. به عنوان مثال، در یک سیستم مدیریت سفارشات، می‌توان وضعیت‌های مختلف سفارش مانند "ثبت شده"، "پردازش شده"، "ارسال شده" و "تحویل داده شده" را تعریف کرد و انتقال بین این وضعیت‌ها را با استفاده از تریگرهای مختلفی مانند پرداخت موفق یا ارسال کالا مدیریت نمود. این کار باعث می‌شود که هر وضعیت و انتقال به صورت دقیق و مشخص تعریف شود و از ایجاد شرایط پیچیده و درهم تنیده جلوگیری شود.

به طور خلاصه، استفاده از ماشین‌های حالت در Spring Boot زمانی مناسب است که پروژه دارای منطق پیچیده‌ای باشد که می‌تواند به وضعیت‌های مختلف تقسیم شود. همچنین، در مواردی که برنامه به صورت همزمان و با رویدادهای متعدد در حال اجرا است و این مسئله باعث بروز مشکلات همزمانی می‌شود، ماشین‌های حالت می‌توانند این مشکلات را با مدیریت دقیق وضعیت‌ها و انتقال‌ها برطرف کنند. به کمک ماشین‌های حالت، می‌توان از کدهای پیچیده و درهم‌تنیده جلوگیری کرده و منطق برنامه را به صورت دقیق، قابل فهم و قابل نگهداری پیاده‌سازی کرد. [3]

## معرفی ابزار
ماشین حالت یک مدل محاسباتی است که بر اساس مجموعه‌ای محدود از وضعیت‌ها کار می‌کند. بر اساس تعریف ویکی‌پدیا [4]، این مدل شامل وضعیت‌های مشخص و قوانین معینی برای انتقال بین این وضعیت‌ها است. در واقع، نمی‌توان از هر وضعیت به وضعیت دیگری منتقل شد؛ بلکه باید از قوانین و روال‌های مشخصی پیروی کرد. انتقال بین وضعیت‌ها محدود به این قوانین است و به همین دلیل ماشین حالت به سازماندهی و مدیریت منطق پیچیده برنامه کمک می‌کند.

در فریمورک Spring، کتابخانه‌ای به نام Spring State Machine وجود دارد که به پیاده‌سازی این مفهوم کمک می‌کند. این کتابخانه به توسعه‌دهندگان اجازه می‌دهد تا به سادگی منطق ماشین حالت را در برنامه‌های خود پیاده‌سازی کنند. Spring State Machine به عنوان یک ابزار قدرتمند، توسعه منطق ماشین حالت را برای کسانی که از فریمورک Spring استفاده می‌کنند، ساده‌تر و کارآمدتر می‌سازد. این ابزار نه تنها به مدیریت وضعیت‌ها و انتقال‌ها کمک می‌کند، بلکه باعث می‌شود که کدها خواناتر و نگهداری آن‌ها آسان‌تر شود.

با استفاده از Spring State Machine، توسعه‌دهندگان می‌توانند به راحتی وضعیت‌های مختلف برنامه را تعریف کرده و قوانین انتقال بین این وضعیت‌ها را پیاده‌سازی کنند. این ابزار از تریگرها، رویدادها و تایمرها برای مدیریت انتقال بین وضعیت‌ها استفاده می‌کند و به این ترتیب امکان پیاده‌سازی منطق پیچیده برنامه به صورت منظم و قابل فهم را فراهم می‌کند. Spring State Machine با استفاده از این رویکرد به بهبود کیفیت و نگهداری کدهای پروژه کمک شایانی می‌کند. [5]

## مثال کاربردی
در این قسمت مثالی که در [5] مطرح شده را دنبال می‌کنیم تا با نجوه‌ی کار ماشین حالت در Spring Boot آشنا شویم. کدهای نوشته شده در این قسمت برگرفته از [6] هستند و در همین پوشه هم آورده شده‌اند.

برای استفاده عملی از ماشین حالت، باید آن را در کلاس برنامه فعال کرد:
```java
@SpringBootApplication
@EnableStateMachine
public class Application implements CommandLineRunner {
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
        stateMachine.start();
        stateMachine.sendEvent(BookEvents.RETURN);
        stateMachine.sendEvent(BookEvents.BORROW);
        stateMachine.stop();
    }
}
```

هنگامی که از `@EnableStateMachine` استفاده می‌شود، به طور خودکار یک ماشین حالت پیش‌فرض هنگام شروع برنامه ایجاد می‌شود. بنابراین می‌توان آن را به کلاس Application تزریق کرد. به طور پیش‌فرض، این bean با نام `stateMachine` شناخته می‌شود، اما می‌توان نام دیگری به آن داد. همچنین به کلاس‌هایی برای رویدادها و حالت‌ها نیاز داریم. بیایید مثال ساده‌ای را بر اساس یک کتابخانه قرار دهیم. می‌دانیم که کتاب‌های کتابخانه می‌توانند قرض گرفته شوند یا برگردانده شوند، یا شاید آسیب دیده و در تعمیر باشند (بنابراین غیرقابل قرض دادن). بنابراین، این دقیقاً چیزی است که ما در مدل قرار می‌دهیم.
```java
public enum BookStates {
    AVAILABLE,
    BORROWED,
    IN_REPAIR
}
public enum BookEvents {
    BORROW,
    RETURN,
    START_REPAIR,
    END_REPAIR
}
```

سپس، ماشین حالت باید با این تراکنش‌ها و حالت‌ها پیکربندی شود:
```java
    @Override
    public void configure(StateMachineStateConfigurer<BookStates, BookEvents> states) throws Exception {
       states.withStates()
               .initial(BookStates.AVAILABLE)
               .states(EnumSet.allOf(BookStates.class));
    }

    @Override
    public void configure(StateMachineTransitionConfigurer<BookStates, BookEvents> transitions) throws Exception {
        transitions
                .withExternal()
                .source(BookStates.AVAILABLE)
                .target(BookStates.BORROWED)
                .event(BookEvents.BORROW)
                .and()
                .withExternal()
                .source(BookStates.BORROWED)
                .target(BookStates.AVAILABLE)
                .event(BookEvents.RETURN)
                .and()
                .withExternal()
                .source(BookStates.AVAILABLE)
                .target(BookStates.IN_REPAIR)
                .event(BookEvents.START_REPAIR)
                .and()
                .withExternal()
                .source(BookStates.IN_REPAIR)
                .target(BookStates.AVAILABLE)
                .event(BookEvents.END_REPAIR);
    }
```

و در نهایت، باید اجازه دهیم ماشین حالت به صورت خودکار شروع به کار کند (به طور پیش‌فرض این کار را نمی‌کند).
```java
    @Override
    public void configure(StateMachineConfigurationConfigurer<BookStates, BookEvents> config) throws Exception {
        config.withConfiguration()
                .autoStartup(true);
    }
```

اکنون می‌توانیم از آن در برنامه استفاده کنیم و ببینیم چه اتفاقی می‌افتد!
```java
    @Override
    public void run(String... args) {
        boolean returnAccepted = stateMachine.sendEvent(BookEvents.RETURN);
        logger.info("return accepted: " + returnAccepted);
        boolean borrowAccepted = stateMachine.sendEvent(BookEvents.BORROW);
        logger.info("borrow accepted: " + borrowAccepted);
    }
```

وقتی برنامه را اجرا می‌کنیم، موارد زیر را در لاگ‌ها می‌بینیم:
```
2018-07-07 13:46:05.096 INFO 37417 --- [ main] STATE MACHINE : return accepted: false
2018-07-07 13:46:05.098 INFO 37417 --- [ main] STATE MACHINE : borrow accepted: true
```

 عمداً ابتدا `RETURN` را صدا زدیم تا ببینیم که شکست خواهد خورد. با این حال، بدون هیچ استثنائی شکست می‌خورد: عمل فقط پذیرفته نشده و ماشین در حالت `AVAILABLE` باقی ماند، که این امکان را فراهم کرد که `BORROW` دوباره اجرا شود. بنابراین، اگر دو فراخوانی را جابجا کنیم، چه اتفاقی می‌افتد؟
```
2018-07-07 13:49:46.218 INFO 37496 --- [ main] STATE MACHINE : borrow accepted: true
2018-07-07 13:49:46.218 INFO 37496 --- [ main] STATE MACHINE : return accepted: true
```

که به این معنی است که تعامل صحیح پذیرفته می‌شود. اما، اگر بخواهیم دید بیشتری در مورد اتفاقاتی که می‌افتد داشته باشیم، چه باید کرد؟ یک راه، پیکربندی هندلرها برای تغییرات حالت ما است:
```java
    @Override
    public void configure(StateMachineStateConfigurer<BookStates, BookEvents> states) throws Exception {
        states.withStates().initial(BookStates.AVAILABLE)
                .state(BookStates.AVAILABLE, entryAction(), exitAction())
                .state(BookStates.BORROWED, entryAction(), exitAction())
                .state(BookStates.IN_REPAIR, entryAction(), exitAction());
    }

    @Bean
    public Action<BookStates, BookEvents> entryAction() {
        return ctx -> LOGGER.info("Entry action {} to get from {} to {}",
                ctx.getEvent(),
                getStateInfo(ctx.getSource()),
                getStateInfo(ctx.getTarget()));
    }

    @Bean
    public Action<BookStates, BookEvents> exitAction() {
        return ctx -> LOGGER.info("Exit action {} to get from {} to {}",
                ctx.getEvent(),
                getStateInfo(ctx.getSource()),
                getStateInfo(ctx.getTarget()));
    }
```

```
2018-07-07 13:53:59.940 INFO 37579 --- [ main] STATE MACHINE : Entry action null to get from EMPTY STATE to AVAILABLE
2018-07-07 13:54:00.051 INFO 37579 --- [ main] STATE MACHINE : return accepted: false
2018-07-07 13:54:00.052 INFO 37579 --- [ main] STATE MACHINE : Exit action BORROW to get from AVAILABLE to BORROWED
2018-07-07 13:54:00.052 INFO 37579 --- [ main] STATE MACHINE : Entry action BORROW to get from AVAILABLE to BORROWED
2018-07-07 13:54:00.053 INFO 37579 --- [ main] STATE MACHINE : borrow accepted: true
2018-07-07 13:54:00.053 INFO 37579 --- [ main] STATE MACHINE : Exit action RETURN to get from BORROWED to AVAILABLE
2018-07-07 13:54:00.053 INFO 37579 --- [ main] STATE MACHINE : Entry action RETURN to get from BORROWED to AVAILABLE
2018-07-07 13:54:00.053 INFO 37579 --- [ main] STATE MACHINE : return accepted: true
```

راه دیگر، تعریف یک listener کامل است:
```java
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
```

و listener را به ماشین پیکربندی شده متصل کنید. اکنون می‌توانیم شنوندگان ورود و خروج خود را حذف کنیم و پیکربندی حالت‌ها به نسخه اول ما بازگردد (به بالا مراجعه کنید).
```java
    @Override
    public void configure(StateMachineConfigurationConfigurer<BookStates, BookEvents> config) throws Exception {
        config.withConfiguration()
                .autoStartup(true)
                .listener(new LoggingMashineListener())
        ;
    }
```

به این ترتیب، دید بیشتری از آنچه در حال رخ دادن است خواهید داشت:
```
2018-07-07 13:59:22.714 INFO 37684 --- [ main] STATE MACHINE : Entered state AVAILABLE
2018-07-07 13:59:22.716 INFO 37684 --- [ main] STATE MACHINE : State changed from EMPTY STATE to AVAILABLE
2018-07-07 13:59:22.717 INFO 37684 --- [ main] STATE MACHINE : Machine started: IN_REPAIR AVAILABLE BORROWED / AVAILABLE / uuid=815f744e-8c5c-4ab1-88d1-b5223199bc4e / id=null
2018-07-07 13:59:22.835 ERROR 37684 --- [ main] STATE MACHINE : Event not accepted: RETURN
2018-07-07 13:59:22.836 INFO 37684 --- [ main] STATE MACHINE : return accepted: false
2018-07-07 13:59:22.837 INFO 37684 --- [ main] STATE MACHINE : Exited state AVAILABLE
2018-07-07 13:59:22.838 INFO 37684 --- [ main] STATE MACHINE : Entered state BORROWED
2018-07-07 13:59:22.838 INFO 37684 --- [ main] STATE MACHINE : State changed from AVAILABLE to BORROWED
2018-07-07 13:59:22.839 INFO 37684 --- [ main] STATE MACHINE : borrow accepted: true
2018-07-07 13:59:22.839 INFO 37684 --- [ main] STATE MACHINE : Exited state BORROWED
2018-07-07 13:59:22.839 INFO 37684 --- [ main] STATE MACHINE : Entered state AVAILABLE
2018-07-07 13:59:22.839 INFO 37684 --- [ main] STATE MACHINE : State changed from BORROWED to AVAILABLE
2018-07-07 13:59:22.839 INFO 37684 --- [ main] STATE MACHINE : return accepted: true
```

## مراجع
[1] https://en.wikipedia.org/wiki/Spaghetti_code

[2] https://docs.spring.io/spring-statemachine/docs/current/reference/
#background

[3] https://docs.spring.io/spring-statemachine/docs/current/reference/#usage-scenarios

[4] https://en.wikipedia.org/wiki/Finite-state_machine

[5] https://codeburst.io/spring-state-machine-what-is-it-and-do-you-need-it-e894c78f5d84

