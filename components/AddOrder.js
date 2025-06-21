import { useState } from "react";
import "./AddOrder.css";

function AddOrder() {
    const [order_number, setOrderNumber] = useState("");
    const [item_name, setItemName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [total_price, setTotalPrice] = useState("");
    const [status, setStatus] = useState("");

    const saveOrder = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/orders", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: item_name,
                    stock: parseInt(quantity) || 0,
                    price: parseFloat(total_price) || 0,
                    description: status
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to save order");
            }

            await response.json();
            alert("Order Saved Successfully");
            setOrderNumber("");
            setItemName("");
            setQuantity("");
            setTotalPrice("");
            setStatus("");
        } catch (error) {
            alert("Error: " + error.message);
            console.error("Save order error:", error);
        }
    }

    return (
        <div id="add-order-div" className="add-order-container">
            <h2>Add New Order</h2>
            <label>Order Number:</label>
            <input 
                type="text" 
                value={order_number} 
                onChange={(e) => setOrderNumber(e.target.value)} 
            />
            <label>Item Name:</label>
            <input 
                type="text" 
                value={item_name} 
                onChange={(e) => setItemName(e.target.value)} 
            />
            <label>Quantity:</label>
            <input 
                type="number" 
                value={quantity} 
                onChange={(e) => setQuantity(e.target.value)} 
            />
            <label>Total Price:</label>
            <input 
                type="number" 
                step="0.01" 
                value={total_price} 
                onChange={(e) => setTotalPrice(e.target.value)} 
            />
            <label>Status:</label>
            <input 
                type="text" 
                value={status} 
                onChange={(e) => setStatus(e.target.value)} 
            />
            <input 
                type="submit" 
                value="Add Order" 
                onClick={saveOrder} 
                className="submit-button" 
            />
        </div>
    )
}

export default AddOrder;