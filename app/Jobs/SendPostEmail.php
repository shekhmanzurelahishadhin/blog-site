<?php

namespace App\Jobs;

use App\Mail\NewPostNotification;
use App\Models\Post;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class SendPostEmail implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $subscriberEmail; // change to public
    public $postId;          // change to public

    public function __construct(string $subscriberEmail, int $postId)
    {
        $this->subscriberEmail = $subscriberEmail;
        $this->postId = $postId;
    }

    public function handle()
    {
        $post = Post::find($this->postId); // Get fresh model from DB

        if ($post) {
            Mail::to($this->subscriberEmail)->send(new NewPostNotification($post));
        }
    }
}
