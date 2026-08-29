# My goal and road

## 说明：

这个仓库一方面用于记录我的全栈学习路程，看得到的记录也是对自己的一种激励，一方面也是对自己的熟悉终端、git等工具的练习吧，也希望能通过自己的分享和记录，让一些和我在大一的时候一样迷茫的同学开始确定自己的路线，以及开始自己的学习计划💪

## 目标：

我希望在明年暑假结束之前完成全栈的学习，甚至完成agent开发，以及项目实践，`路漫漫兮修远兮，吾将上下而求索`

## 下面是我的规划线路图:

```mermaid
graph TD
    Start([🌱 起点：大一下末，只学了c语言和数据结构]) --> M0

    M0[📘 00-学习方法论<br/>Git/终端/VSCode/费曼/源码阅读/做日报周报、每天1-2道leetcode的习惯]
    M0 --> M1[⭐️ 01-前端基础<br/>HTML,CSS,JavaScript]
    M0 --> M2[🟨 02-深入JavaScript/Ts<br/>从新语法到 V8]

    M1 --> M3[🎨 03-响应式个人博客]
    M2 --> M3

    M3 --> Decision{🔀 学完 02 章后<br/>分方向深入}
    Decision -->|前端方向| M4[⚛️ 04-React<br/>手写 mini-react]
    Decision -->|后端方向| M5[🔧 05-后端<br/>node/express/Hono/next]
    Decision -->|AI 方向| M7[🤖 07-AI 基础<br/>Prompt + RAG + 从零写 GPT]

    M4 --> M6[🗄️ 06-数据库与工程化]
    M5 --> M6
    M7 --> M6

    M6 --> M8[🚀 08-AI Agent<br/>LangGraph + MCP + mini-sdk]
    M7 --> M8

    M8 --> M9[🎓 09-毕业项目<br/>独立 SaaS / AI 产品]
    M4 --> M9
    M5 --> M9

    M9 --> End([🏆 上线产品 + 第一个付费用户/实习 + 找工作])

    style Start fill:#e1f5e1
    style End fill:#ffd700
    style Decision fill:#ffe4b5
    style M9 fill:#ffcccc
```

因为我还是在校大学生，学校还是在开设计算机基础课比如：计算机组成原理、计算机网络等，所以我的计划不会安排这些课内已经有的内容。

## 当前进度：

- [x] 学习方法论+习惯养成
- [x] Git、终端、vscode、github使用学习
- [x] 前端基础(HTML,CSS,JavaScript基础语法)
- [ ] 深入js，js进阶语法，ajax交互
- [ ] 完成第一个tip：做出自己的响应式个人博客
- [ ] ts，以及浏览器渲染引擎
- [ ] 前端：react框架
- [ ] 后端：node,ts + 框架
- [ ] ai 基础学习：prompt，rag，从零写GPT
- [ ] 数据库+工程化
- [ ] 项目+1 传统全栈 or 完全前端
- [ ] 学习agent:LangGraph,MCP,mini-sdk手搓agtnt
- [ ] 项目+1 agent相关全栈
- [ ] 实习