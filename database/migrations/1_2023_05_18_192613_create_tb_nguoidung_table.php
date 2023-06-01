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
        Schema::create('tb_nguoidung', function (Blueprint $table) {
            $table->string('id_nguoidung', 11)->primary()->nullable(false);
            $table->string('hoten', 50)->nullable(false);
            $table->string('email', 30)->nullable(false);
            $table->string('dienthoai', 15)->nullable(false);
            $table->string('matkhau', 255)->nullable(false);
            $table->tinyInteger('trangthai')->nullable(false);
            $table->string('link_xacthucemail', 255)->nullable();
            $table->timestamp('thoigian_xacthuc')->nullable();
            $table->tinyInteger('capbac')->nullable(false);
            $table->string('mota', 30)->nullable(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_nguoidung');
    }
};
