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
        Schema::create('tb_thuonghieu', function (Blueprint $table) {
            $table->string("id_thuonghieu", 11)->nullable(false)->primary();
            $table->string("ten_thuonghieu", 100)->nullable(false);
            $table->tinyInteger("status")->nullable(false)->default(0);
            $table->string("id_nguoidung", 11)->nullable(false);
            $table->foreign("id_nguoidung")->references("id_nguoidung")->on("tb_nguoidung");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_thuonghieu');
    }
};
