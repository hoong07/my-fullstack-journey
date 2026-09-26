
// import { createContext, useContext } from 'react';
import { useState } from 'react';
import './App.css';
import { useEffect } from 'react';

// 1.context 使用 跨层传递
                /* ------------------------------------*/
// const MsgContext = createContext()
// function A () {
//   return (
//     <div>
//       this is A component
//       <B />
//     </div>
//   )
// };

// function B () {
//   const msg = useContext(MsgContext)
//   return (
//     <div>
//       this is B conponent,{msg}
//     </div>
//   )
// }
// function App() {
//   const msg = 'this is message'
//   return (
//     <div>
//       <MsgContext.Provider value={msg}>
//         this is A
//         <A />
//       </MsgContext.Provider>
//     </div>    
//   )
// }

                        /* ------------------------------------*/
                        // 2.useEffect 使用
// import { useEffect } from 'react';
// const URL = 'http://geek.itheima.net/v1_0/channels'

// function App() {
//   const [list,setList] =  useState([])

//   useEffect(() => {
//     //额外操作 获取频道列表
//     async function getList() {
//       const res = await fetch(URL)
//       const list = await res.json()
//       console.log(list);
//       setList(list.data.channels)
//     }
//     getList()
//   },[])
//   return (
//     <div>
//       this is app
//       <ul>
//         {list.map(item => <li key={item.id}>{item.name}</li>)}
//       </ul>
//     </div>    
//   )
// }
              /* ------------------------------------*/
              // 3.useEffect 依赖项不同的区别
// function App() {
//   const [count,setCount] = useState(0)
//   // 1.依赖项 空： 初始 + 组件更新 执行一次
//   // useEffect(()=> {
//   //   console.log('函数执行');
     
//   // })
//   // 2.传入 空数组 : 初始 执行一次
//   // useEffect(()=> {
//   //   console.log('函数执行');
     
//   // },[])
//   // 3.传入 特定依赖项 初始 + 依赖变化时 执行
//   useEffect(()=> {
//     console.log('函数执行');
     
//   },[count])
//   return (
//     <div>
//       this is app
//       <button onClick={() => {setCount(count + 1)}}>+{count}</button>
//     </div>    
//   )
// }

          /* ------------------------------------*/
          // 4.useEffect 自动清楚副作用 
// function Son ({count}) {
//   useEffect(()=>{
//     // 副作用操作逻辑
//     let timeIntervalId = setInterval(() => {
//       console.log(1);
      
//     },1000)

//     return () => {
//       // 自动 清楚副作用逻辑
//       clearInterval(timeIntervalId)
//     }
//   },[])
//   return <div>this is a son,{count}</div>
//   // return <div>this is a son</div>
// }

// function App() {
//   // 模拟组件删除
//   const [show,setShow] = useState(true)
//   const [count,setCount] = useState(0)
//   return (
//     <div>
//       {show && <Son count={count} />}
//       <button onClick={() => {setShow(false)}}>unstall Son</button>
//       <button onClick={() => {
//         setCount(count + 1)
//         setShow(true)
//       }}>重新渲染Son</button>
//     </div>    
//   )
// }
                      /* ------------------------------------*/
                      // 5.自定义 Hook 函数

// function useToggle () {
//   const [value , setValue] = useState(true)

//   const toggle = () => setValue(!value)

//   return {
//     value,
//     toggle,
//   }
// }

// function App() {

//   // const [value , setValue] = useState(true)
//   // // 不使用自定义 hook -> 和当前组件耦合在一起 -> 不方便复用
//   // const toggle = () => {
//   //   setValue(!value)
//   // }

//   const {value,toggle} = useToggle()
//   return (
//     <div>
//       {value && <div>this is div</div>}
//       <button onClick={toggle}>toggle</button>
//     </div>    
//   )
// }

                            /*-------------------- */
                        // 6.Redux 使用
  function App () {
    return (
      <div>
        this is app
      </div>
    )
  }
export default App
