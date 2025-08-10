@component('mail::message')
    # {{ $post->title }}

    {!! \Illuminate\Support\Str::limit($post->description, 200) !!}

    @component('mail::button', ['url' => url("/posts/{$post->id}")])
        Read the full post
    @endcomponent

    Thanks,<br>
    {{ config('app.name') }}
@endcomponent
