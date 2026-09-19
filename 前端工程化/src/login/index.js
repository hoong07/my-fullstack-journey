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
    console.log(phone,code);
    
    console.log('注册成功');
    
})