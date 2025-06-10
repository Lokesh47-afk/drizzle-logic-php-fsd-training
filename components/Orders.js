import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Orders() {
    const [orders_data, setOrders] = useState([0]);
    
    const [updated_order_number, setUpdatedOrderNumber] = useState('');
    const [updated_item_name, setUpdatedItemName] = useState('');
    const [updated_quantity, setUpdatedQuantity] = useState('');
    const [updated_total_price, setUpdatedTotalPrice] = useState('');
    const [updated_status, setUpdatedStatus] = useState('');

    useEffect(() => {
        fetch("http://localhost:8000/api/orders")
            .then(resp => resp.json())
            .then((resp) => {
                console.log(resp);
                setOrders(resp);
            })
    }, []);

    const updateOrder = (id) => {
        fetch("http://127.0.0.1:8000/api/orders/" + id, {
            method: "PUT",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "order_number": updated_order_number,
                "item_name": updated_item_name,
                "quantity": updated_quantity,
                "total_price": updated_total_price,
                "status": updated_status
            })
        }).then(
            res => res.json()
        ).then(res => {
            alert("Order Updated Successfully");
        });
    }

    const deleteOrder = (id) => {
        fetch("http://127.0.0.1:8000/api/orders/" + id, {
            method: "DELETE",
        }).then(
            res => res.json()
        ).then(res => {
            alert("Order Deleted Successfully");
        });
    }

    return (
        <>
            <Link to="/home">Home</Link>
            <div style={{ width: '100%', overflowX: 'auto' }}>
                <table id="orders-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Id</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Order Number</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Item Name</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Quantity</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Total Price</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Status</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Update</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders_data.map((order) => (
                            <tr key={order.id}>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{order.id}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                    <input 
                                        type='text' 
                                        defaultValue={order.order_number} 
                                        onChange={(e) => setUpdatedOrderNumber(e.target.value)} 
                                        style={{ width: '100%', boxSizing: 'border-box' }}
                                    />
                                </td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                    <input 
                                        type='text' 
                                        defaultValue={order.name} 
                                        onChange={(e) => setUpdatedItemName(e.target.value)} 
                                        style={{ width: '100%', boxSizing: 'border-box' }}
                                    />
                                </td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                    <input 
                                        type='text' 
                                        defaultValue={order.stock} 
                                        onChange={(e) => setUpdatedQuantity(e.target.value)} 
                                        style={{ width: '100%', boxSizing: 'border-box' }}
                                    />
                                </td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                    <input 
                                        type='text' 
                                        defaultValue={order.price} 
                                        onChange={(e) => setUpdatedTotalPrice(e.target.value)} 
                                        style={{ width: '100%', boxSizing: 'border-box' }}
                                    />
                                </td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                    <input 
                                        type='text' 
                                        defaultValue={order.description} 
                                        onChange={(e) => setUpdatedStatus(e.target.value)} 
                                        style={{ width: '100%', boxSizing: 'border-box' }}
                                    />
                                </td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                    <button onClick={() => updateOrder(order.id)}>Update</button>
                                </td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                    <button onClick={() => deleteOrder(order.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Orders;