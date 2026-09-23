export const NameList = () => {
    const names = ['Bruce' , 'Clarck' , 'Diana' , 'Bruce']

    const nameList = names.map((item,index)=> <h2 key={index}>{item}</h2>)

    return <div>{nameList}</div>
}