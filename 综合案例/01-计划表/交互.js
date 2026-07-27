//  一、渲染
const oldarr = [{
    No : 1,
    What : "完成算法题",
    Duration : "1小时",
    Time : "2022/2/2/1/1"
}]

const tbody = document.querySelector('tbody')
//  读取本地数据:
// localStorage.setItem('data',JSON.stringify(oldarr))

const arr = JSON.parse(localStorage.getItem('data')) || []
// console.log(arr);

// 渲染
function render(){
    const trarr = arr.map(function(ele,index){
        return `
        <tr>
            <td>${ele.No}</td>
            <td>${ele.What}</td>
            <td>${ele.Duration}</td>
            <td>${ele.Time}</td>
            <td><a href="javascript:" data-id=${index}>完成</a></td>
        </tr>
        `
    })
    // console.log(trarr);
    tbody.innerHTML = trarr.join('')
    document.querySelector('.title span').innerHTML =  arr.length 
}

render()

// 二、添加
const info = document.querySelector('.info')
const what = document.querySelector('.what')
const time = document.querySelector('.time')
info.addEventListener('submit',function(e){
    e.preventDefault()
    if(!what.value || !time.value){
        return alert("输入内容不能为空")
    }

    // 收集输入内容：
    arr.push(
        {
            No : arr.length ? arr[arr.length - 1].No + 1 : 1,
            What : what.value,
            Duration : time.value,
            Time : new Date().toLocaleString()
        }
    )
    render()
    // 重置表单
    this.reset()
    localStorage.setItem('data',JSON.stringify(arr))
})

// 三、删除操作
tbody.addEventListener('click',function(e){
    if(e.target.tagName === 'A'){
        if(confirm("真的完成了吗？")){
            arr.splice(e.target.dataset.id,1)
            localStorage.setItem('data',JSON.stringify(arr))
            render()
        }
    }
})