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
            // console.log(result)
            document.querySelector(".header .location").innerHTML = result.data.area
            document.querySelector(".header .left").innerHTML = 
            `<span class="time">${result.data.dateShort}</span>
            <span class="clandar">农历</span>
            <span class="day">${result.data.dateLunar}</span>`

            document.querySelector(".banner .tempreture").innerHTML = result.data.temperature + `°`
            document.querySelector(".banner .other .pollution").innerHTML = result.data.psPm25 + result.data.psPm25Level
            document.querySelector(".banner .other .condition").innerHTML = `<img src=${result.data.weatherImg} alt=""> ${result.data.weather}`
            document.querySelector(".banner .cloud").value = result.data.windDirection
            document.querySelector(".banner .class").value = result.data.windPower

            document.querySelector(".today").innerHTML = 
            `<ul>
                <li>今天：${result.data.todayWeather.weather}</li>
                <li>紫外线 ${result.data.todayWeather.ultraviolet}</li>
                <li>湿度 ${result.data.todayWeather.humidity}</li>
                <li>日出 ${result.data.todayWeather.sunriseTime}</li>
                <li>日落 ${result.data.todayWeather.sunsetTime}</li>
            </ul>`

            const forecast = result.data.dayForecast.map(item => {
                return `<ul>
                    <li>${item.dateFormat}</li>
                    <li><img src=${item.weatherImg} alt=""></li>
                    <li>${item.weather}</li>
                    <li>${item.dateFormat}: ${item.weather}-${item.temNight}-${item.temDay}°C</li>
                    <li>${item.windDirection} &lt;${item.windPower}</li>
                </ul>`
            })
            const forecastStr = forecast.join("")
            document.querySelector(".contianner .forecast").innerHTML = forecastStr
        }).catch(error => {
            console.dir(error)
        })
    }

    getWeather(110100)

    // <img src=${result.data.weatherImg}

    // 搜索框
    document.querySelector(".header .right input").addEventListener("input",(e) =>{
        // console.log(e.target.value)
        const res = document.querySelector(".search-result")
        res.style.display = 'block'
        myAxios({
            url: "http://hmajax.itheima.net/api/weather/city",
            params:{
                city:e.target.value
            }
        }).then(result => {
            // console.log(result);
            const searchResStr = result.data.map(item => {
                return `
                <li value=${item.code} data-name = ${item.name}>${item.name}</li>
                `
            }).join("")
            res.innerHTML = searchResStr
        })
    })
    document.querySelector(".header .right ul").addEventListener("click",(e) => {
        if(e.target.tagName == 'LI') {
            document.querySelector(".header .right .location").innerHTML = e.target.dataset.name
            getWeather(e.target.value)
        }
        // console.log(e.target.tagName);
        
    })
    