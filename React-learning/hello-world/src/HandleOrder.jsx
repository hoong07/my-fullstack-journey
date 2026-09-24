import { Order } from "./Order"

export const HandleOrder = () => {
    const handleOrder = (orderName , price) => {
        alert(`you ordered: ${orderName} for ${price}`)
    }

    return (
        <div>
            <h3>order</h3>
            <Order name="Pizza" price={12} onOrder={handleOrder}></Order>
            <Order name="Burger" price={8} onOrder={handleOrder}></Order>
            <Order name="Salad"  price={6} onOrder={handleOrder}></Order>
        </div>
    )
}