export const CustomButton = ({text}) => {

    const name = "Handsome";


    const handleClick = (e) => {
    console.log("click elemrnt",e.target);
    // console.log("click coordinates" , e.clientX,e.clientY);
    // console.log("Which mouse buttom?" , e.button);
    
    console.log(`Hey ${name}, you clicked ${text}`);
    
    
    // alert("Thanks for liking")
}

    return <button onClick={handleClick}>{text}</button>
    // return <button onClick={() => {alert("Thanks for liking")}}>Like</button>
}