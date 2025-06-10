<?php

// namespace App\Http\Controllers\Api;

// use App\Http\Controllers\Controller;
// use Illuminate\Http\Request;

// class UserController extends Controller
// {
//     //
// }

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
class UserController extends Controller
{
 // GET /api/users
 public function index()
 {
    return response()->json(User::all(), 200);
 }
 // POST /api/users
 public function store(Request $request)
 {
    $request->validate([
    'username' => 'required|unique:users',
    'password' => 'required|min:6',
    ]);
    $user = User::create([
    'username' => $request->username,
    //'password' => Hash::make($request->password),
    'password' => $request->password,
    ]);
    return response()->json($user, 201);
 }
// GET /api/users/{id}
 public function show($id)
 {
    $user = User::find($id);
    if (!$user) return response()->json(['message' => 'User not found'],
    404);
    return response()->json($user, 200);
 }
 // PUT /api/users/{id}
 public function update(Request $request, $id)
 {
    $user = User::find($id);
    if (!$user) return response()->json(['message' => 'User not found'],
    404);
    $request->validate([
    'username' => 'sometimes|unique:users,username,' . $id,
    'password' => 'sometimes|min:6',
    ]);
    if ($request->has('username')) {
    $user->username = $request->username;
    }
    if ($request->has('password')) {
    // $user->password = Hash::make($request->password);
    $user->password = $request->password;
    }
    $user->save();
    return response()->json($user, 200);
 }
 // DELETE /api/users/{id}
 public function destroy($id)
 {
    $user = User::find($id);
    if (!$user) return response()->json(['message' => 'User not found'],
    404);
    $user->delete();
    return response()->json(['message' => 'User deleted successfully'],
    200);
 }
}