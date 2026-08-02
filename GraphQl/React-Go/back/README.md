# Simple back-end with gqlgen & GrapghQl

![gqlgen](https://99designs-blog.imgix.net/blog/wp-content/uploads/2018/11/gqlgen-logo-e1541099402167.png?auto=format&q=60&fit=max&w=930)

### how to run

<p dir="rtl" style="position:right;">
ساخت دیتابیس mySQL با docker

```
docker run -p 3306:3306 --name mysql -e MYSQL_ROOT_PASSWORD=dbpass -e MYSQL_DATABASE=hackernews -d mysql:latest

docker exec -it mysql bash
mysql -u root -p
CREATE DATABASE hackernews;
```

<p dir="rtl" style="position:right;">
اجرای کد

```
go run server.go
```

<p dir="rtl" style="position:right;">
لذت!

>http://localhost:8080
