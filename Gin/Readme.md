# فریمورک gin

در این مقاله قرار است به معرفی فریمورک
gin
بپردازیم.
gin
یک فریمورک وب توسعه یافته در زبان golang است.
این فریمورک یک
Martini-like api
است با سرعت و کارایی حدود ۴۰ برابر بهتر!
دلیل این برتری، استفاده از httprouter است.
درصورتی که به کارایی، سرعت و بازدهی بالا نیاز دارید،‌استفاده از gin به شما توصیه می‌شود.
کلیدی‌ترین ویژگی‌های قابل اشاره این فریمورک شامل موارد زیر است:

* Zero allocation router
* Fast
* Middleware support
* Crash-free
* JSON validation
* Routes grouping
* Error management
* Rendering built-in
* Extendable

در این مقاله ما با بررسی مثال‌هایی با نحوه استفاده از این فریمورک آشنا خواهیم شد.

## نصب و راه‌اندازی

### نصب

در ابتدا با اجرای خط زیر gin را نصب کنید:

```bash
go get -u github.com/gin-gonic/gin
```

### راه‌اندازی

سپس برنامه‌ی زیر را در فایلی ذخیره کنید و آن را اجرا کنید:

```go
package main

import (
  "net/http"
  "github.com/gin-gonic/gin"
)

func main() {
  r := gin.Default()
  r.GET("/ping", func(c *gin.Context) {
    c.JSON(http.StatusOK, gin.H{
      "message": "pong",
    })
  })
  r.Run() // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}
```

با اجرای کد فوق، برنامه شما روی پورت 8080
listen
می‌کند و در پاسخ ریکوئست‌های get
یک جیسون با فیلد message که مقدار pong
دارد می‌فرستد.
به طور دقیق‌تر، r یک روتر است که توسط gin ساخته می‌شود و شما می‌توانید بگویید به ازای مسیرهای مختلف چه کاری انجام شود.
روتر ساخته شده، روتری‌است که از middlewareهای
دیفالت gin استفاده می‌کند.
در ادامه با ساختن  روترها بدون استفاده از این middlewareها
نیز آشنا می‌شویم.

## Basics

### Using GET, POST, PUT, PATCH, DELETE and OPTIONS

```go
func main() {
  // Creates a gin router with default middleware:
  // logger and recovery (crash-free) middleware
  router := gin.Default()

  router.GET("/someGet", getting)
  router.POST("/somePost", posting)
  router.PUT("/somePut", putting)
  router.DELETE("/someDelete", deleting)
  router.PATCH("/somePatch", patching)
  router.HEAD("/someHead", head)
  router.OPTIONS("/someOptions", options)

  // By default it serves on :8080 unless a
  // PORT environment variable was defined.
  router.Run()
  // router.Run(":3000") for a hard coded port
}
```

همانطور که مشخص است یک روتر ساخته شده و به ازای درخواست‌های مختلف هندلرها تخصیص داده شده‌اند.
هندلرها یک ورودی از جنس پوینتر به gin.Context می‌گیرند؛ این ورودی شامل اطلاعات مربوط به ریکوئست شامل
headers, request data, attachments, response render methods
و ... است.
به طور دقیق‌تر این استراکت شامل موارد زیر است:

```go
type Context struct {
  Request *http.Request
  Writer  ResponseWriter

  Params Params

  // Keys is a key/value pair exclusively for the context of each request.
  Keys map[string]any

  // Errors is a list of errors attached to all the handlers/middlewares who used this context.
  Errors errorMsgs

  // Accepted defines a list of manually accepted formats for content negotiation.
  Accepted []string
  // contains filtered or unexported fields
}
```

### Parameters in path

حالات مختلفی برای ارسال پارامتر در path وجود دارد:

```go
func main() {
  router := gin.Default()

  // This handler will match /user/john but will not match /user/ or /user
  router.GET("/user/:name", func(c *gin.Context) {
    name := c.Param("name")
    c.String(http.StatusOK, "Hello %s", name)
  })

  // However, this one will match /user/john/ and also /user/john/send
  // If no other routers match /user/john, it will redirect to /user/john/
  router.GET("/user/:name/*action", func(c *gin.Context) {
    name := c.Param("name")
    action := c.Param("action")
    message := name + " is " + action
    c.String(http.StatusOK, message)
  })

  // For each matched request Context will hold the route definition
  router.POST("/user/:name/*action", func(c *gin.Context) {
    b := c.FullPath() == "/user/:name/*action" // true
    c.String(http.StatusOK, "%t", b)
  })

  // This handler will add a new router for /user/groups.
  // Exact routes are resolved before param routes, regardless of the order they were defined.
  // Routes starting with /user/groups are never interpreted as /user/:name/... routes
  router.GET("/user/groups", func(c *gin.Context) {
    c.String(http.StatusOK, "The available groups are [...]")
  })

  router.Run(":8080")
}
```

### Querystring parameters

دسترسی و استفاده از کوئری پارامترها در این فریمورک به صورت زیر است:

```go
func main() {
  router := gin.Default()

  // Query string parameters are parsed using the existing underlying request object.
  // The request responds to an url matching:  /welcome?firstname=Jane&lastname=Doe
  router.GET("/welcome", func(c *gin.Context) {
    firstname := c.DefaultQuery("firstname", "Guest") // firstname default value is Guest
    lastname := c.Query("lastname") // shortcut for c.Request.URL.Query().Get("lastname")

    c.String(http.StatusOK, "Hello %s %s", firstname, lastname)
  })
  router.Run(":8080")
}
```

### Grouping Routes

برای دسته بندی مسیرها و تمیز‌تر شدن کد، می‌توان از قابلیت گروه‌بندی استفاده کرد:

```go
func main() {
  router := gin.Default()

  // Simple group: v1
  v1 := router.Group("/v1")
  {
    v1.POST("/login", loginEndpoint)
    v1.POST("/submit", submitEndpoint)
    v1.POST("/read", readEndpoint)
  }

  // Simple group: v2
  v2 := router.Group("/v2")
  {
    v2.POST("/login", loginEndpoint)
    v2.POST("/submit", submitEndpoint)
    v2.POST("/read", readEndpoint)
  }

  router.Run(":8080")
}
```

### File Upload

```go
package main

import (
  "net/http"
  "path/filepath"

  "github.com/gin-gonic/gin"
)

func main() {
  router := gin.Default()
  // Set a lower memory limit for multipart forms (default is 32 MiB)
  router.MaxMultipartMemory = 2 << 23 // 8 MiB
  router.POST("/upload", func(c *gin.Context) {
    file, err := c.FormFile("file")
    if err != nil {
      c.String(http.StatusBadRequest, "get form err: %s", err.Error())
      return
    }
    filename := filepath.Base(file.Filename)
    if err := c.SaveUploadedFile(file, filename); err != nil {
      c.String(http.StatusBadRequest, "upload file err: %s", err.Error())
      return
    }
    c.String(http.StatusOK, "File %s uploaded successfully.", file.Filename)
  })
  router.Run(":8080")
}
```

در این مثال ما در ابتدا یک router تعریف می‌کنیم و سپس یک endpoint برای post تعریف می‌کنیم در آدرس
`/upload`.
در خطی که
`MaxMultipartMemory`
را ست می‌کنیم عملا مموری مورد استفاده برای بافر کردن فایل را مشخص می‌کنیم. هر چه قدر که این عدد بیشتر باشد مصرف مموری برنامه
در زمان آپلود بیشتر است. کمتر کردن این عدد به معنای محدود کردن حجم فایل نیست. بلکه صرفا به معنای استفاده از بافر کمتر در پشت صحنه است. هر چه قدر که بافر کمتر باشد، سرعت آپلود کند تر می‌شود.
در تابع post، در ابتدا از دستور
`FromFile`
استفاده می‌کنیم تا بتوانیم فایل را از ریکوئست پارس کنیم. سپس چک می‌کنیم که آیا مشکلی در گرفتن فایل وجود دارد یا خیر
(مثلا ممکن است که فیلد فایل خالی باشد).
سپس در صورتی که همه چی اوکی بود، به کمک
`filepath.Base`
اسم فایل را پیدا می‌کنیم.
دلیل استفاده از این تابع این است که کاربر می‌تواند اسم فایل را مسیر
relative
بگذارد. به عنوان مثال اسم فایل می‌تواند
`/tmp/hello.txt`
باشد. در صورتی که از
`filepath.Base`
استفاده نکنیم فایل ما دقیقا در همین مسیر نوشته می‌شود. اما در صورت استفاده از
`filepath.Base`
اسم فایل برابر
`hello.txt`
می‌شود. در نهایت به کمک تابع
`SaveUploadedFile`
فایل را در مسیر مشخص شده ذخیره می‌کنیم.

### Middlewares

Middlewareها
توابعی هستند که قبل از اجرای تابع اصلی
endpoint
اجرا می‌شوند. این توابع می‌توانند که به عنوان مثال قبل از صدا کردن تابع اصلی، کاربر را حراز هویت کنند و user id کاربر را به تابع بعدی خود پاس دهند. Middlwareها قابلیت
chain
شدن دارند. بدین منظور که می‌توان چندین تابع را پشت سر هم صدا کرد و از نتیجه‌ی آنها در تابع بعدی استفاده کرد.

```go
var userTokens = make(map[string]int)

func Benchmark() gin.HandlerFunc {
  return func(c *gin.Context) {
    t := time.Now()
    c.Next() // This will manually call the next function in middleware chain
    latency := time.Since(t)
    log.Print(latency)
  }
}

func Auth() gin.HandlerFunc {
  return func(c *gin.Context) {
    userID, exists := userTokens[c.Request.Header.Get("Token")]
    if !exists {
      c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "empty auth"}) // This will terminate the request
      return
    }
    c.Set("user_id", userID)
    // Reaching the end of function will automatically call the next function in chain unless Abort is called
  }
}

func main() {
  r := gin.Default()
  r.Use(Benchmark(), Auth())

  r.GET("/test", func(c *gin.Context) {
    userID := c.MustGet("user_id").(int)
    log.Println(userID)
  })

  r.Run(":8080")
}
```

در ابتدا یک
middleware
تعریف کرده‌ایم به اسم
`Benchmark`.
در این میان‌افزار می‌خواهیم که زمان هر درخواست را ثبت کنیم. برای این کار در ابتدا زمان فعلی سیستم‌عامل را می‌گیریم و سپس با اجرای
`c.Next()`
دستور بعدی در
middlwareها
را اجرا می‌کنیم.
middleware بعدی که اجرا می‌شود
`Auth`
است. در این middleware
ما مقدار هدر
`Token`
را در مپ
`userTokens`
جست و جو می‌کند. در صورتی که هیچ کلیدی با این توکن مچ نشد (به عبارتی توکن معتبر نبود) مقدار
`exists`
برابر
false
می‌شود و وارد
if
می‌شویم. در اینجا ما با استفاده از تابع
`AbortWithStatusJSON`
علاوه بر اینکه یک جسون به کاربر بر می‌گردانیم،
کاری می‌کنیم که هیچ کدام از توابع بعدی در
middleware chain
اجرا نشود. به عنوان مثال اینجا تابعی که جلوی
endpoint
نوشته بودیم به صورت کلی اجرا نمی‌شود.
در غیر این صورت مقدار
`userID`
را در
reuqest context
ذخیره می‌کنیم. در انتهای تابع نیز به صورت خودکار به تابع بعدی در
middleware chain
می‌رویم. این تابع که تابع انتهایی ما است، تابعی است که جلوی endpoint نوشته بودیم. در این تابع ما صرفا مقدار
`user_id` را که در middleware `Auth`
در
context
ذخیره کرده بودیم را بر می‌گرداند. نوع متغیر برگشته شده
`interface{}`
است. پس نیاز است که آنرا به
int cast
کنیم. در نهایت نیز این متغیر را چاپ می‌کنیم. بعد از تمام شدن این تابع و
middleware chain،
تابع
`Benchmark`
کار خود را بعد از تابع
`c.Next()`
ادامه می‌دهد که باعث می‌شود که زمان گذشته برای انجام درخواست چاپ شود.
