<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('meta');
            $table->longText('description');
            $table->text('image')->nullable();
//            $table->foreignId('category_id')->constrained()->onDelete('cascade');
            $table->boolean('active')->default(false);
            $table->datetime('published_at')->nullable();
            $table->foreignIdFor(\App\Models\User::class, 'user_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
