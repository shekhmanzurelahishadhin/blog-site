<?php

namespace App\Http\Controllers;

use App\Models\ContactMessage;
use Illuminate\Http\Request;

class ContactMessageController extends Controller
{
    public function index() {
        $categories = ContactMessage::latest()->get();
        return response()->json([
            'message' => 'Contact Message list fetched.',
            'data' => $categories,
        ], 200);
    }

    public function destroy(ContactMessage $contactMessage) {
        $contactMessage->delete();

        return response()->json([
            'message' => 'Message deleted successfully.'
        ], 200);
    }
}
