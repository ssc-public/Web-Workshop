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
# Basics
## اجرا کردن gin
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
با اجرای کد فوق، برنامه شما روی پورت ۸۰۸۰ 
listen
می‌کند و در پاسخ ریکوئست‌های get 
یک جیسون با فیلد message که مقدار pong 
دارد می‌فرستد.
به طور دقیق‌تر، r یک روتر است که توسط gin ساخته می‌شود و شما می‌توانید بگویید به ازای مسیرهای مختلف چه کاری انجام شود.
روتر ساخته شده، روتری‌است که از middlewareهای 
دیفالت gin استفاده می‌کند.
در ادامه با ساختن  روترها بدون استفاده از این middlewareها
نیز آشنا می‌شویم.
## Using GET, POST, PUT, PATCH, DELETE and OPTIONS
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

## Parameters in path
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
## Querystring parameters
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

## Grouping Routes
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