<div dir="rtl">

# gRPC

<p align=center><img src="./images/icon.png" width="25%" height="25%"></p>

## فهرست مطالب
- [معرفی](#معرفی)
- [تاریخچه](#تاریخچه)
- [نحوه کار جی‌آر‌پی‌سی](#نحوه-کار-جی‌آرپی‌سی)
- [نحوه استفاده](#نحوه-استفاده)
- [مقایسه با REST](#مقایسه-با-REST)
- [منابع](#منابع)

## نویسندگان
- [نازنین آذریان](https://github.com/Nazhixx)
- [فاطمه عسگری](https://github.com/fatemeh-asgari)
- [پویا اسمعیلی](https://github.com/PouyaEsmaili)
- [بنیامین بیضایی](https://github.com/benyaminbeyzaie)


<br/>

## معرفی 
<p align=right style="text-align: justify;">
ابتدا پیش از آنکه به معرفی gRPC بپردازیم درباره‌ی RPC توضیحاتی خواهیم داد.
RPC یا Remote Procedure Call یک پروتکل ارتباطی نرم‌افزار است که یک برنامه می‌تواند برای درخواست سرویس از برنامه‌ای که در کامپیوتر دیگری در شبکه وجود دارد استفاده کند.
از RPC برای فراخوانی سایر فرآیندها در سیستم‌های راه دور یا remote مانند یک سیستم محلی یا local استفاده می‌شود.

فریم‌ورک gRPC یک فریم‌ورک RPC مدرن متن‌باز با کارایی بالا است که می‌تواند در هر محیطی اجرا شود. این فریم‌ورک می‌تواند سرویس‌ها را در داخل و بین مراکز داده با قابلیت پشتیبانی برای load balancing یا تعادل بار، ردیابی، بررسی سلامت و احراز هویت به طور موثر متصل کند.
</p>

</br>

## تاریخچه
<p align=right style="text-align: justify;">
فریم‌ورک gRPC، همانطور که از نامش (google Remote Procedure Call) هم پیداست، در ابتدا توسط گوگل ایجاد شد. پیش از آن گوگل برای بیش از یک دهه، از یک زیرساخت RPC همه‌منظوره به نام Stubby برای اتصال تعداد زیادی از مایکروسرویس‌‌های در حال اجرای خود در مراکز داده استفاده می‌کرد. در ماه مارس سال ۲۰۱۵ گوگل تصمیم گرفت نسخه‌ی بعدی Stubby را بسازد و آن را به صورت متن‌باز ارائه کند. نتیجه gRPC بود که در حال حاضر در بسیاری از سازمان‌ها به غیر از گوگل نیز برای موارد استفاده‌ای همچون مایکروسرویس‌ها گرفته تا last mile of computing مانند موبایل، وب و اینترنت اشیاء استفاده می‌شود.

</p>
</br>

## نحوه کار جی‌آرپی‌سی
<p align=right style="text-align: justify;">
در gRPC، یک برنامه کلاینت می‌تواند مستقیماً یک متد را روی یک برنامه سرور در یک ماشین دیگر فراخوانی کند و ایجاد برنامه‌ها و خدمات توزیع‌شده را برای شما آسان‌تر کند.
مانند بسیاری از سیستم‌‌های RPC، gRPC هم مبتنی بر ایده‌ی تعریف یک سرویس، با تعیین متدهایی که می توان از راه دور با پارامترها و انواع برگشت آنها فراخوانی کرد است.
در سمت سرور، سرور این رابط را پیاده سازی می‌کند و یک سرور gRPC را برای رسیدگی به کال‌های مشتری اجرا می کند. در سمت کلاینت، کلاینت یک stub دارد (که در برخی از زبان‌ها به آن کلاینت گفته می‌شود) که همان متدهای سرور را ارائه می‌دهد.

نکته‌ای که در اینجا وجود دارد این است که کلاینت‌ها و سرورهای gRPC می‌توانند در محیط‌های مختلفی اجرا و با یکدیگر صحبت کنند؛ از سرورهای داخل گوگل گرفته تا کامپیوتر شخصی شما. و هم‌چنین می‌تواند به هر یک زبان‌های پشتیبانی‌شده توسط gRPC نوشته شوند. بنابراین به عنوان مثال، می‌توان به راحتی یک سرور gRPC در جاوا با کلاینت‌هایی در پایتون، Go، یا Ruby ایجاد کرد.
</p>
<p align=center><img src="./images/landing.svg" width="50%"></p>

<p align=right style="text-align: justify;">
مسئله‌‌ی مهم دیگر در gRPC این است که این فریم‌ورک به صورت پیش‌فرض از Protocol Buffers استفاده می‌کند که مکانیسم متن‌باز گوگل برای سریال‌سازی داده‌های ساختاریافته می‌باشد. (هر چند می‌توان از دیتا فرمت‌های دیگری مانند JSON هم استفاده کرد.)
برای کار با Protocol Buffers ابتدا باید دیتایی که قصد سریال‌سازی آن را دارید را در یک فایل proto که یک فایل تکست ساده با پسوند proto. است ذخیره کنید.
داده‌های بافر پروتکل به صورت پیام‌هایی ساختاریافته می‌شوند که در آن هر پیام یک logical record کوچک از اطلاعات است که شامل یک سری جفت نام-مقدار به نام field است:

```protobuf
message Person {
  string name = 1;
  int32 id = 2;
  bool has_ponycopter = 3;
}
```
</p>

</br>

<p align=right style="text-align: justify;">
کافی است شما سرویس‌های gRPC را در فایل‌های proto معمولی تعریف کنید؛ با پارامترهای متد RPC و return typeهایی که به عنوان messageهای بافر پروتکل تعریف شده‌اند:

```protobuf
// The greeter service definition.
service Greeter {
  // Sends a greeting
  rpc SayHello (HelloRequest) returns (HelloReply) {}
}

// The request message containing the user's name.
message HelloRequest {
  string name = 1;
}

// The response message containing the greetings
message HelloReply {
  string message = 1;
}
```
</p>

## نحوه استفاده
<p align=right style="text-align: justify;">
همانطور که گفتیم فریم‌ورک gRPC زبان‌های بسیار زیادی را برای نوشتن سرویس‌های کلاینت و سرور پشتییانی می‌کند. ما در ادامه یک برنامه‌ی ابتدایی به زبان Go برای راه‌اندازی gRPC ارائه می‌دهیم که می‌توانید گام به گام با آن پیش بیایید. 
</p>

### پیش‌نیازها
- یک نسخه از Go که برای راهنمایی نصب آن می‌توانید از [این راهنما](https://golang.org/doc/install) استفاده کنید.
- کامپایلر Protocol Buffer که برای نصب آن می‌توانید از [این راهنما](https://grpc.io/docs/protoc-installation/) 
استفاده کنید.
- افزونه‌های Go برای Protocol Buffer
  - افزونه‌های کامپایلر protocol  برای زبان Go را با استفاده از دستورات زیر نصب کنید:
  ```
  $ go install google.golang.org/protobuf/cmd/protoc-gen-go@v1.28
  $ go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@v1.2
  ```
  - به گونه‌ای PATH خود را آپدیت کنید که کامپایلر protoc بتواند افزونه‌ها را پیدا کند:
  ```
  $ export PATH="$PATH:$(go env GOPATH)/bin"
  ```

### راه‌اندازی و استفاده
<p align=right style="text-align: justify;">
مثالی که در ادامه خواهیم گفت از مخزن grpc-go آورده شده است
آورده شده است.
برای گرفتن این کد می‌توانید آن را به کمک دستور زیر کلون کنید:

```
$ git clone -b v1.52.0 --depth 1 https://github.com/grpc/grpc-go
```
و سپس به دایرکتوری مربوطه بروید:
```
$ cd grpc-go/examples/route_guide
```
اولین گام این است که سرویس gRPC خود را تعریف کنید. سپس با استفاده از Protocol Buffers نوع متدهای response و request را تعریف کنید.

برای تعریف service، یک service با نام دلخواه داخل فایل proto. مشخص کنید:

```protobuf
service RouteGuide {
   ...
}
```

سپس باید متدهای rpc خود را داخل تعریف سرویس خود، با تعریف کردن نوع‌های request و response تعریف کنید. gRPC به شما اجازه می‌دهد چهار نوع متفاوت متد سرویس تعریف کنید که در این مقاله تنها به یک نوع آن یعنی Simple RPC اشاره شده است. جهت تمایل می‌توانید با مراجعه به [مستندات gRPC](https://grpc.io/docs/what-is-grpc/core-concepts/)
با انواع دیگر آن آشنا شوید.

در حالت Simple RPC کلاینت با استفاده از stub یک درخواست برای سرور فرستاده و مانند یک function call عادی منتظر آمدن پاسخ آن می‌ماند.
```protobuf
// Obtains the feature at a given position.
rpc GetFeature(Point) returns (Feature) {}
```

فایل proto. ما هم‌چنین شامل تعریف انواع protocol buffer messageهاست که برای تمام request و responseهایی که در متد سرویس خود داریم تعریف شده‌اند. به طور مثال:
```protobuf
message Point {
  int32 latitude = 1;
  int32 longitude = 2;
}
```

</p>
</br>
<p align=right style="text-align: justify;">
مرحله‌ی بعدی تولید interface کلاینت و سرور gRPC از روی تعریف سرویس `proto.` است 
ما برای این کار از کامپایلر پروتکل بافر یعنی `pr‍otoc` با یک افزونه‌ی به‌خصوص Go برای gRPC استفاده می‌کنیم. در مثالی که داریم، داخل دایرکتوری
`examples/route_guide` این دستور را اجرا کنید:

```
$ protoc --go_out=. --go_opt=paths=source_relative \
    --go-grpc_out=. --go-grpc_opt=paths=source_relative \
    routeguide/route_guide.proto
```

حال برای ساختن سرور مورد استفاده در مثال که سرور ‍`routeGuide` است اقدام می‌کنیم. سرور ما دارای یک نوع استراکت `routeGuideServer` است که اینترفیس ساخته‌شده‌ی `RouteGuideServer` را پیاده‌سازی می‌کند:

```go
type routeGuideServer struct {
        ...
}
...

func (s *routeGuideServer) GetFeature(ctx context.Context, point *pb.Point) (*pb.Feature, error) {
        ...
}
...
```
در مدل Simple RPC این `routeGuideServer` تمام متدهای سرویس را پیاده‌سازی می‌کند. به طور مثال متد `GetFeature` یک Point از کلاینت گرفته و اطلاعات feature آن را برمی‌گرداند که پیاده‌سازی آن به طور نمونه در زیر آورده شده است:
```go
func (s *routeGuideServer) GetFeature(ctx context.Context, point *pb.Point) (*pb.Feature, error) {
  for _, feature := range s.savedFeatures {
    if proto.Equal(feature.Location, point) {
      return feature, nil
    }
  }
  // No feature was found, return an unnamed feature
  return &pb.Feature{Location: point}, nil
}
```
زمانیکه همه‌ی متدها را پیاده‌سازی کردیم، وقت آن است که یک سرور gRPC را بالا بیاوریم به طوری که کلاینت‌ها عملا بتوانند از آن استفاده کنند. برای سرویس `RouteGuide` که داشتیم می‌توانیم به شکل زیر عمل کنیم:
```go
flag.Parse()
lis, err := net.Listen("tcp", fmt.Sprintf("localhost:%d", *port))
if err != nil {
  log.Fatalf("failed to listen: %v", err)
}
var opts []grpc.ServerOption
...
grpcServer := grpc.NewServer(opts...)
pb.RegisterRouteGuideServer(grpcServer, newServer())
grpcServer.Serve(lis)
```

مرحله‌ی بعد ساختن کلاینت است. برای فراخوانی سرویس متدها اول از همه به یک کانال gRPC نیاز داریم که با سرور ارتباط برقرار کند. برای این کار مانند زیر، آدرس سرور را به همراه پورت مربوطه به `grpc.Dial()` پاس می‌دهیم:
```go
var opts []grpc.DialOption
...
conn, err := grpc.Dial(*serverAddr, opts...)
if err != nil {
  ...
}
defer conn.Close()
```

زمانی که کانال gRPC تشکیل و برپا شد، به یک stub کلاینت نیاز داریم تا RPCها را اجرا کند. برای این کار از متد `newRouteGuideClient` که توسط پکیج `pb` که ساخته شده بود ارائه‌شده است استفاده می‌کنیم:
```go
client := pb.NewRouteGuideClient(conn)
```
حال در مرحله‌ی بعد باید سرویس متدهای خود را صدا بزنیم. در روش Simple RPC این کار مانند صدا زدن عادی یک تابع است.
```go
feature, err := client.GetFeature(context.Background(), &pb.Point{409146138, -746188906})
if err != nil {
  ...
}
```

در نهایت برای اجرا کردن سرور و کلاینت خود، می‌توان همانند کاری که ما از دایرکتوری `examples/route_guide` انجام می‌دهیم، با دستورات زیر سرور و کلاینت را اجرا کرد:

ابتدا سرور را اجرا می‌کنیم:
```
$ go run server/server.go

```

سپس در یک ترمینال دیگر کلاینت را اجرا می‌کنیم:
```
$ go run client/client.go

```
</p>

## مقایسه با REST
همانطور که می‌دانید REST APIها از APIهای بسیار معروف و پرکاربرد در حوزه‌ی مایکروسرویس‌ها و اپلیکیشن‌های آن‌ها هستند. با این حال در بعضی اوقات از gRPCها استفاده می‌شود. در ادامه به بیان چندین تفاوت میان این دو می‌پردازیم:
- فرمت‌های پیامرسانی JSON و XML توسط هر دو نوع RPC و REST APIها استفاده می‌شود. در حالی که JSON محبوب‌ترین انتخاب است، می‌تواند گاهی اوقات کند باشد. بر خلاف RPC و REST، مدل gRPC با استفاده از فرمت پیامرسانی protobuf بر مشکلات مربوط به سرعت غلبه کرده است.

- راه دیگری که gRPC سرعت را افزایش می‌دهد، استفاده از پروتکل HTTP2 است. HTTP2 نسبت به HTTP1 سریع‌تر و کارآمدتر است و تاخیر شبکه را کاهش می‌دهد.
- اتصال‌های gRPC API از اتصال‌های REST API سریع‌تر است. gRPC هنگام دریافت داده تقریبا ۷ برابر و هنگام ارسال داده تقریبا ۱۰ برابر سریع‌تر از REST است و این عمدتا به دلیل بسته‌بندی فشرده‌ی protocol bufferها و هم‌چنین استفاده از HTTP2 توسط gRPC است.
- علیرغم مزایای gRPC در سرعت انتقال پیام، این نوع اجرای API بسیار کندتر از اجرای REST API است. طبق تحقیقات پیاده‌سازی یک سرویس ساده‌ی gRPC تقریبا ۴۵ دقیقه طول می‌کشد درحالیکه پیاده‌سازی REST API تنها حدود ۱۰ دقیقه طول می‌کشد.



## منابع
https://grpc.io

https://en.wikipedia.org/wiki/GRPC

https://grpc.io/docs/what-is-grpc/introduction/

https://grpc.io/docs/languages/go/basics/

https://www.techtarget.com/searchapparchitecture/definition/Remote-Procedure-Call-RPC

https://blog.dreamfactory.com/grpc-vs-rest-how-does-grpc-compare-with-traditional-rest-apis/

</div>