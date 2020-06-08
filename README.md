# fastclick

    解决移动端click时 300ms的 延迟.
    
    According to Google:
        mobile browsers will wait approximately 300ms from the time that you tap the button to fire the click event. 
        The reason for this is that the browser is waiting to see if you are actually performing a double tap.
    
    Usage:
    yarn add fastclick --save
```js
import fastclick from 'fastclick';
fastclick.attach(document.body);
```

## devServer.proxy

    如果有单独的后端开发服务器API,并且希望在同域名下发送api请求，可以使用dev-server.使用了非常强大的http-proxy-middleware包.
```js
// 如果在localhost:3000上有后端服务的话，可以这样代理：

proxy: {
  "/api": "http://localhost:3000"
}
```
     请求到 /api/users 现在会被代理到请求 http://localhost:3000/api/users。
     
## obj格式转化为url拼接字符串

```js
function param(data){
    let url = "";
    for(let key in data){
        let value = data[key] === undefined ? "" : data[key];
    }
    url += `&${key}=${decodeURIComponent(value)}`;
    return url.length > 0 ? url.substr(1) : '';
}

url += (url.indexOf("?") < 0 ? "?" : "&") + param(data);
```
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    