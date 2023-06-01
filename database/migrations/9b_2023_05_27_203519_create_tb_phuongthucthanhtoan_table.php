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
        Schema::create('tb_phuongthucthanhtoan', function (Blueprint $table) {
            $table->integer("id_phuongthucthanhtoan")->nullable(false)->unsigned()->autoIncrement();
            $table->string("ten", 100)->nullable(false);
            $table->string("mota", 1000)->nullable(false);
            $table->string("image_link", 100)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_phuongthucthanhtoan');
    }
};
