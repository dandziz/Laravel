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
        Schema::create('tb_nhacungcap', function (Blueprint $table) {
            $table->integer("id_nhacungcap")->nullable(false)->unsigned()->autoIncrement();
            $table->string("ten_nhacungcap", 100)->nullable(false);
            $table->string("diachi", 100)->nullable(false);
            $table->string("sodienthoai", 15)->nullable(false);
            $table->string("email", 30)->nullable(false);
            $table->tinyInteger("status")->nullable(false);
            $table->string("id_nguoiquanly", 11)->nullable(false);
            $table->foreign("id_nguoiquanly")->references("id_nguoidung")->on("tb_nguoidung");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_nhacungcap');
    }
};
