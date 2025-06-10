import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Products() {
    const [products_data, setProducts] = useState([0]);
    
    const [updated_name, setUpdatedName] = useState('');
    const [updated_description, setUpdatedDescription] = useState('');
    const [updated_price, setUpdatedPrice] = useState('');
    const [updated_stock, setUpdatedStock] = useState('');

    useEffect(() => {
        fetch("http://localhost:8000/api/products")
            .then(resp => resp.json())
            .then((resp) => {
                console.log(resp);
                setProducts(resp);
            })
    }, []);

    const updateProduct = (id) => {
        fetch("http://127.0.0.1:8000/api/products/" + id, {
            method: "PUT",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "name": updated_name,
                "description": updated_description,
                "price": updated_price,
                "stock": updated_stock
            })
        }).then(
            res => res.json()
        ).then(res => {
            alert("Product Updated Successfully");
        });
    }

    const deleteProduct = (id) => {
        fetch("http://127.0.0.1:8000/api/products/" + id, {
            method: "DELETE",
        }).then(
            res => res.json()
        ).then(res => {
            alert("Product Deleted Successfully");
        });
    }

    return (
        <>
            <Link to="/home">Home</Link>
            <table id="products-table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {products_data.map((product) => (
                        <tr>
                            <td>{product.id}</td>
                            <td><input type='text' defaultValue={product.name} onChange={(e) => setUpdatedName(e.target.value)} /></td>
                            <td><input type='text' defaultValue={product.description} onChange={(e) => setUpdatedDescription(e.target.value)} /></td>
                            <td><input type='text' defaultValue={product.price} onChange={(e) => setUpdatedPrice(e.target.value)} /></td>
                            <td><input type='text' defaultValue={product.stock} onChange={(e) => setUpdatedStock(e.target.value)} /></td>
                            <td><button onClick={() => updateProduct(product.id)}>Update</button></td>
                            <td><button onClick={() => deleteProduct(product.id)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default Products;