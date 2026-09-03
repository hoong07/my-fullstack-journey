function myAxios(config) {
    //返回promise对象
    return new Promise((resolve,reject) => {
        const xhr = new XMLHttpRequest()

        //判断是否含有params携带查询参数
        if(config.params) {
            //使用URLSearchParams 转换，携带到url上
            const paramsObj = new URLSearchParams(config.params)
            const queryStr = paramsObj.toString()
            //查询参数添加到原url? 后面
            config.url += `?${queryStr}`
        }

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
        
        //判断是否含有data 请求体
        if(config.data) {
            // 转换数据类型程JSON字符串：
            const jsonStr = JSON.stringify(config.data)
            // 设置请求头
            xhr.setRequestHeader('Content-Type','application/json')

            xhr.send(jsonStr)
        }
        else {
            xhr.send() //发送请求
        }
    })}

    function getWeather(code) {
        myAxios({
            url: "http://hmajax.itheima.net/api/weather",
            params:{
                city: code
            }
        }).then(result => {
            console.log(result);
            
        }).catch(error => {
            console.dir(error)
        })
    }

    getWeather(110100)