// 1、验证码倒计时部分：
const code = document.querySelector('.code')
code.addEventListener('click',function(){
    let i = 6,flag = true
    code.innerHTML = `0${--i}秒后重新获取`
    if(flag){
        let timeId = setInterval(function(){
        flag = false
        i--
        code.innerHTML = `0${i}秒后重新获取`
        if(i === 0){
            flag = true
            clearInterval(timeId)
            code.innerHTML = `发送短信验证码`
        }
    },1000)
    }
})

// 2、用户名验证:
const username = document.querySelector('[name=username]')
username.addEventListener('change',verifyName)
function verifyName() {
    const reg = /^[a-zA-Z0-9-_]{6,10}$/
    if(!reg.test(username.value)){
        username.nextElementSibling.innerText = '输入不合法，请输入6～10位'
        return false
    }

    // 合法：
    username.nextElementSibling.innerText = ''
    return true
}

// 3、手机号验证：
const phone = document.querySelector('[name=phone]')
phone.addEventListener('change',verifyPhone)
function verifyPhone() {
    const reg = /^1(3\d|4[5-9]|5[0-35-9]|6[567]||7[0-8]|8\d|9[0-35-9])\d{8}$/
    if(!reg.test(phone.value)){
        phone.nextElementSibling.innerText = '请输入正确的手机号'
        return false
    }

    // 合法：
    phone.nextElementSibling.innerText = ''
    return true
}

// 4、验证码验证:
const vcode = document.querySelector('[name=code]')
vcode.addEventListener('change',verifyCode)
function verifyCode() {
    const reg = /^\d{6}$/
    if(!reg.test(vcode.value)){
        vcode.nextElementSibling.innerText = '请输入正确的验证码'
        return false
    }

    // 合法：
    vcode.nextElementSibling.innerText = ''
    return true
}

// 5、密码验证：
const password = document.querySelector('[name=password]')
password.addEventListener('change',verifyPwd)
function verifyPwd() {
    const reg = /^[a-zA-Z-_\d]{6,20}$/
    if(!reg.test(password.value)){
        password.nextElementSibling.innerText = '请输入正确格式的密码'
        return false
    }

    // 合法：
    password.nextElementSibling.innerText = ''
    return true
}

// 6、密码再次验证：
const confirm = document.querySelector('[name=confirm]')
confirm.addEventListener('change',verifyCfm)
function verifyCfm() {
    if(confirm.value !== password.value){
        confirm.nextElementSibling.innerText = '两次密码不一致'
        return false
    }

    // 合法：
    confirm.nextElementSibling.innerText = ''
    return true
}

// 7、同意模块：
const queren = document.querySelector(".icon-queren")
queren.addEventListener('click',function(){
    this.classList.toggle('icon-queren2')
})

//8、提交模块
const form = document.querySelector('form')
form.addEventListener('submit',function(e){
    if(!queren.classList.contains('icon-queren2')){
        alert("请勾选同意协议")
        e.preventDefault()
    }
    //依次判断上面的input任何一个没通过，阻止
    // if(!verifyName()||!verifyPhone()||!verifyCode()||!verifyPwd()||verifyCmf())
    //     e.preventDefault()
    // 逻辑或会短路效应，前面阻止，后面都不会继续验证
    if(!verifyName())
        e.preventDefault()
    if(!verifyPhone())
        e.preventDefault()
    if(!verifyCode())
        e.preventDefault()
    if(!verifyPwd())
        e.preventDefault()
    if(!verifyCfm())
        e.preventDefault()
})