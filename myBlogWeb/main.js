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
  currentIndex :0   //当前歌曲 曲数
}

const section = document.querySelectorAll('section')

// aside 侧边栏
const aside = document.querySelector('.main .aside')
// 移动端 顶部小头像:
const headButton = document.querySelector('.banner .header img')
// 音乐盒
const audio = document.querySelector('#bgMusic')
const bgmButton = document.querySelector('.musicPlayer .controls .stop')
const lastSong = document.querySelector('.musicPlayer .controls .last-song')
const nextSong = document.querySelector('.musicPlayer .controls .next-song')
// 音乐盒的信息
const bgmCover = document.querySelector('.musicPlayer .song-info .cover')
const bgmTitle = document.querySelector('.musicPlayer .song-info .song-detail .title')
const bgmSinger = document.querySelector('.musicPlayer .song-info .song-detail .singer')

// 音乐库 对象
const bgmInfo = [
    {src: './bgMusic/kanong.aac',name: '卡农',author: 'dylanf',imgSrc: './bgMusic/kanong.jpg'},
    {src: './bgMusic/haiguixiansheng.aac',name: '男孩别哭',author: '海龟先生',imgSrc: './bgMusic/haiguixiansheng.jpg'},
    {src: './bgMusic/unhappy.mp3',name: 'unhappy',author: 's0rrow',imgSrc: './bgMusic/unhappy.jpg'},
    {src: './bgMusic/zongyouyitian.mp3',name: '总有一天你会出现在我身边',author: '棱镜乐队',imgSrc: './bgMusic/zongyouyitian.jpg'}
]


// 文章列表
const post = document.querySelectorAll('article')
const post_list = document.querySelector('.content-area .article ul')
// 文章返回按钮
const postButton = document.querySelector('.post-back')

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
        item.classList.toggle('active',item.dataset.nav === state.section)
    })

    // aside 的 打开栏 -> 看是否在窄屏
    aside.classList.toggle('open',state.asideOpen)

    // 根据post 是否不为null 来判断是否显示postButton
    postButton.classList.toggle('hidden',!state.post)

}

// 音乐盒 上下首切换播放
function bgmChange(index) {
    bgmCover.style.backgroundImage = `url(${bgmInfo[index].imgSrc})`
    
    bgmTitle.innerHTML = bgmInfo[index].name
    bgmSinger.innerHTML = bgmInfo[index].author
    audio.src = bgmInfo[index].src
    audio.load()
}

// 暂停键处理:
function stopButtonChange() {
    // 根据 audio 的 属性，判断中间是 暂停 还是 开始
    const ico = audio.paused ? 'iconfont icon-bofangqi-bofang' : 'iconfont icon-bofangqi-zanting'
    bgmButton.innerHTML = `<i class="iconfont ${ico}"></i>`
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

// 移动端： 点击上面的小头像 -> 显示侧边栏
headButton.addEventListener('click',() => {
    state.asideOpen = !state.asideOpen
    render()
})

// 文章打开详细 -> 显示postback 的 button -> 点击 -> 写入 state.post = null -> 渲染
postButton.addEventListener('click',() => {
    state.post = null
    render()
})


// 音乐盒 -> 暂停 / 开始 -> 渲染
bgmButton.addEventListener('click',(e) => {
    e.stopPropagation()
    if(audio.paused) {
        audio.play()
    }else {
        audio.pause()
    }
    stopButtonChange()
})

document.querySelector('.musicPlayer').addEventListener('click',(e) => {
    if(audio.paused) {
        audio.play()
    }else {
        audio.pause()
    }
    stopButtonChange()
})

lastSong.addEventListener('click',(e) => {
    e.stopPropagation()
    const i = (state.currentIndex - 1 + bgmInfo.length) % bgmInfo.length
    go({currentIndex: i})
    bgmChange(state.currentIndex)
    audio.play()
    stopButtonChange()
})

nextSong.addEventListener('click',(e) => {
    e.stopPropagation()
    const i = (state.currentIndex + 1 + bgmInfo.length) % bgmInfo.length
    go({currentIndex: i})
    bgmChange(state.currentIndex)
    audio.play()
    stopButtonChange()
})

// 播放完自动进入下一首
audio.addEventListener('ended',() => {
    const i = (state.currentIndex + 1 + bgmInfo.length) % bgmInfo.length
    go({currentIndex: i})
    bgmChange(state.currentIndex)
    audio.play()
    stopButtonChange()
})

// 页面首次渲染 可以删除html 预写好的类名
render()
// 同时根据index 来判断是哪一首歌
bgmChange(state.currentIndex)