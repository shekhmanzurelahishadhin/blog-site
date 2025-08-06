<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function userList()
    {
        $users = User::latest()->get();
        return response()->json([
            'message' => 'User list fetched.',
            'data' => $users,
        ], 200);
    }

    public function userDestroy(User $user)
    {
        if($user->role == 1){
            return response()->json([
                'message' => 'User deletion not allowed.'
            ], 403);
        }
        $user->delete();

        return response()->json([
            'message' => 'User deleted successfully.'
        ], 200);
    }

    public function makeAdmin(User $user)
    {
        if($user->role == 0){
            $user->update(['role' => 1]);

            return response()->json([
                'message' => 'Make admin successfully.',
                'data' => $user
            ], 200);
        }
        return response()->json([
            'message' => 'Make admin not allowed.'
        ], 403);
    }
}
