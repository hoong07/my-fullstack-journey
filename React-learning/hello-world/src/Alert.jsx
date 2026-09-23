// import "./Alert.css"
import style from "./Alert.module.css"

export const Alert = ({children , type = "success"}) => {
    // 内联样式
    // return <div style={{
    //     backgroundColor: type === "succsess" ?  "#10b981" : "red",
    //     color : "black",
    //     padding : "16px" ,
    //     borderRadius : "8px" ,
    //     marginBottom: "16px" ,
    // }}>{children}</div>
    // console.log(children);
    
    return (
        <div className={`${style.alert} ${style[type]}`}>
            {children}
        </div>
    )
}