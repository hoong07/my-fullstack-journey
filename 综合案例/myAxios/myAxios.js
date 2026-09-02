function myAxios(config) {
    //返回promise对象
    return new Promise((resolve,reject) => {
        const xhr = new XMLHttpRequest()
        //发起XHR请求，默认方法为GET
        xhr.open(config.method || 'GET',config.url)
        xhr.addEventListener('loadend',() => {
            //判断 响应 成功或者失败
            if (xhr.status >= 200 && xhr.status <= 300) {
                resolve(JSON.parse(xhr.response))
            }
            else {
                reject(new Error(xhr.response))
            }
        })
        xhr.send() //发送请求
    }) 
}

myAxios({
    url :'http://hmajax.itheima.net/api/province'
}).then(result => {
    console.log(result);
    document.querySelector('.my-p').innerHTML = result.list.join('<br>')
}).catch(error => {
    console.log(error);
    document.querySelector('.my-p').innerHTML = error.message
})