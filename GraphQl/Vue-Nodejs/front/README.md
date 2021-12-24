# پیاده‌سازی GraphQl با vue js
<p align="center" width="100%">
<img width="795" alt="Screen Shot 1400-10-03 at 19 43 04" src="https://user-images.githubusercontent.com/59199865/147364109-6df4c013-5f17-47b5-bb6b-203ba760d0a9.png">
</p>

## نصب و راه‌اندازی
1. If you haven't install Vue CLI. Run following command. You can also visit [this page](https://cli.vuejs.org/guide/installation.html)
```
npm install -g @vue/cli
```
2. create a new directory and navigate to it.
3. create vue app 
```
vue create your-app-name
```
4. we use bootstrap for easier and much more beatiful template. install bootstrap with CDN add following code to head tag in `your-app-name/public/index.html` 
```
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
```
&nbsp; &nbsp; &nbsp; and add following code at the bottom of body tag
```
<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
```
5. we will install Apollo automatically. First run the following command
```
vue add apollo
```
6. create an Apollo instance, install Apollo client into vue, add Apollo Provider and add it to your app in `your-app-name/src/main.js` as explianed in video, now you use Apollo in all your child components
7. for using Apollo in our app, Apollo has object that it used to trigger it in components
8. we make query to fetch our data in `your-app-name/src/components/HellowWorld.vue` and we show our fetched data
9. we also add mutution so we sent our mutution with following code and other description about mutation has ben explained in video
```
this.$apollo.mutate()
```
