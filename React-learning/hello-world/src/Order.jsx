export const Order = ({name , price , onOrder}) => {
    return (
        <div>
            <span>{name} - {price}</span>
            <button onClick={() => onOrder(name , price)}>Order</button>
        </div>
    )
}