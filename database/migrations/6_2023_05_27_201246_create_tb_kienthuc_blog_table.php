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
        Schema::create('tb_kienthuc_blog', function (Blueprint $table) {
            $table->integer("id_baiviet_blog")->nullable(false)->unsigned()->autoIncrement();
            $table->string("tieude", 200)->nullable(false);
            $table->date("ngaydang")->nullable(false)->useCurrent();
            $table->string("mota", 1000)->nullable(false);
            $table->bigInteger("soluongnguoixem")->nullable(false)->default(0);
            $table->tinyInteger("phanloai")->nullable(false);
            $table->string("id_nguoidung", 11)->nullable();
            $table->foreign("id_nguoidung")->references("id_nguoidung")->on("tb_nguoidung");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_kienthuc_blog');
    }
};
