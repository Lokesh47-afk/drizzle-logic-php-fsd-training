<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    // GET /api/products
    public function indexs()
    {
        return response()->json(Product::all(), 200);
    }

    // POST /api/products
    public function stores(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
        ]);
            
        $product = Product::create([
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
            'stock' => $request->stock,
        ]);
        return response()->json($product, 201);
    }

    // GET /api/products/{id}
    public function shows($id)
    {
        $product = Product::find($id);
        if (!$product) return response()->json(['message' => 'Product not found'], 404);
        return response()->json($product, 200);
    }
        
    // PUT /api/products/{id}
    public function updates(Request $request, $id)
    {
        $product = Product::find($id);
        if (!$product) return response()->json(['message' => 'Product not found'], 404);
    
        $request->validate([
            'name' => 'sometimes|string|max:255',
            'description' => 'sometimes|nullable|string',
            'price' => 'sometimes|numeric|min:0',
            'stock' => 'sometimes|integer|min:0',
        ]);
        
        if ($request->has('name')) {
            $product->name = $request->name;
        }
        if ($request->has('description')) {
            $product->description = $request->description;
        }
        if ($request->has('price')) {
            $product->price = $request->price;
        }
        if ($request->has('stock')) {
            $product->stock = $request->stock;
        }
        $product->save();
        return response()->json($product, 200);
    }

    // DELETE /api/products/{id}
    public function destroys($id)
    {
        $product = Product::find($id);
        if (!$product) return response()->json(['message' => 'Product not found'], 404); 
        $product->delete();
        return response()->json(['message' => 'Product deleted successfully'], 200);
      }
}