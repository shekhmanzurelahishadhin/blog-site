<?php

namespace App\Http\Controllers;

use App\Models\ContactMessage;
use App\Models\Subscribe;
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

    public function subscriberList()
    {
        $subscribes = Subscribe::latest()->get();
        return response()->json([
            'message' => 'Subscribe list fetched.',
            'data' => $subscribes,
        ], 200);
    }

    public function subscriberDestroy(Subscribe $subscribe)
    {
        $subscribe->delete();

        return response()->json([
            'message' => 'Subscriber deleted successfully.'
        ], 200);
    }
}
