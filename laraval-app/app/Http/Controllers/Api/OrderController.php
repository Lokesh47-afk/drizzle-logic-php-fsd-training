<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Order;

class OrderController extends Controller
{
    // GET /api/orders
    public function indexs()
    {
        return response()->json(Order::all(), 200);
    }

    // POST /api/orders
    public function stores(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
        ]);
            
        $order = Order::create([
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
            'stock' => $request->stock,
        ]);
        return response()->json($order, 201);
    }

    // GET /api/order/{id}
    public function shows($id)
    {
        $order = Orser::find($id);
        if (!$order) return response()->json(['message' => 'order not found'], 404);
        return response()->json($order, 200);
    }
        
    // PUT /api/order/{id}
    public function updates(Request $request, $id)
    {
        $order = Order::find($id);
        if (!$order) return response()->json(['message' => 'Order not found'], 404);
    
        $request->validate([
            'name' => 'sometimes|string|max:255',
            'description' => 'sometimes|nullable|string',
            'price' => 'sometimes|numeric|min:0',
            'stock' => 'sometimes|integer|min:0',
        ]);
        
        if ($request->has('name')) {
            $order->name = $request->name;
        }
        if ($request->has('description')) {
            $order->description = $request->description;
        }
        if ($request->has('price')) {
            $order->price = $request->price;
        }
        if ($request->has('stock')) {
            $order->stock = $request->stock;
        }
        $order->save();
        return response()->json($order, 200);
    }

    // DELETE /api/orders/{id}
    public function destroys($id)
    {
        $order = Order::find($id);
        if (!$order) return response()->json(['message' => 'Order not found'], 404); 
        $order->delete();
        return response()->json(['message' => 'Order deleted successfully'], 200);
      }
}