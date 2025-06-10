import { useState } from "react";
import { Link } from "react-router-dom";
import "./AddProduct.css";

function AddProduct() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");

    const saveProduct = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/products", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: name,
                    description: description,
                    price: parseFloat(price) || 0,
                    stock: parseInt(stock) || 0
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to save product");
            }

            await response.json();
            alert("Product Saved Successfully");

            // Clear form
            setName("");
            setDescription("");
            setPrice("");
            setStock("");
        } catch (error) {
            alert("Error: " + error.message);
            console.error("Save product error:", error);
        }
    }

    return (
        <div className="add-product-container">
            <h2>Add New Product</h2>
            <Link to="/home">Back to Home</Link>
            <br /><br />
            <label>Product Name:</label>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <label>Description:</label>
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <label>Price:</label>
            <input
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            <label>Stock:</label>
            <input
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
            />
            <input
                type="submit"
                value="Add Product"
                onClick={saveProduct}
                className="submit-button"
            />
        </div>
    );
}

export default AddProduct;
