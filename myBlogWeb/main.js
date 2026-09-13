// navigator li 数组
const nav = document.querySelectorAll('.banner .navigator li')
// navigator li 数组 的 ul 
const nav_button = document.querySelector('.banner .navigator .nav-button')

// 文章区域 整体1
const content = document.querySelector('.content-area')

const state = {
  section:   'home',  // home | journey | about   —— 导航栏三选一
  post:      null,    // null = 文章列表；'slug' = 某篇详情
  asideOpen: false,   // 只在窄屏有意义
}

const section = document.querySelectorAll('section')
console.log(section);

// 文章列表
const post = document.querySelectorAll('article')
const post_list = document.querySelector('.content-area .article ul')

const render = () => {
    // 渲染三个大tab 栏
    section.forEach(item => {
        item.classList.toggle('hidden',item.dataset.section !== state.section)
    })

    // 文章渲染
    post_list.classList.toggle('hidden',state.post !== null)
    // 空 -> 不显示。 非空 下面进行具体显示
    post.forEach(item => {
        item.classList.toggle('hidden',state.post !== item.dataset.post)
    })

    // tab 栏 当前活跃 active 项
    nav.forEach(item => {
        item.classList.toggle('active',item.dataset.section === state.section)
    })

    // aside 的 打开栏 -> 看是否在窄屏
}

// 给state 写入状态
function go(patch) {
    Object.assign(state,patch)
    // 每次写入都重新渲染一次
    render()
}

// 开始给每个按钮 注册时间.  ->  修改state 状态 -> 调用 render

// 给tab 栏 事件委托 每一个li
nav_button .addEventListener('click',(e) => {
    const li = e.target.closest('[data-nav]')
    // console.log(li);
    if(!li) return
    go({section: li.dataset.nav,post: null})    //同时取消文章显示  
})

// 给文章区域注册事件 -> 委托 -> state -> render
post_list.addEventListener('click',(e) => {
    const post = e.target.closest('[data-list]')
    if(!post) return
    go({post:post.dataset.list})
})

// 页面首次渲染 可以删除html 预写好的类名
render()