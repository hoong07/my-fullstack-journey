import {checkphone,checkcode} from '../utils/check.js'

// console.log(checkphone('13277772252'))
// console.log(checkcode('99663366'))
document.querySelector('.btn').addEventListener('click', () => {
    const phone = document.querySelector('.xtx-form [name=phone]').value
    const code = document.querySelector('.xtx-form-code [name=code]').value

    if(!checkphone(phone)) {
        console.log('手机号长度不对');
        return
    }

    if(!checkcode(code)) {
        console.log('验证码长度不对');
        return 
    }
    
    console.log('注册成功');
    
})

import './index.css'


import imgObj from '../assets/headimg.png'
const theImg = document.createElement('img')
theImg .src = imgObj
document.querySelector('.xtx-form').appendChild(theImg)


// 1 默认 webpack-dev-server 借助http 模块创建8080 默认 web服务
// 2 默认以public 文件夹 为服务器的根目录
// 3 webpack-dev-server 根据配置 打包相关代码 在内存中  以 output.path 的值作为服务器根目录 => 可以拼接访问dist目录下的内容