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
        Schema::create('tb_diachi', function (Blueprint $table) {
            $table->integerIncrements('id_diachi')->unsigned()->nullable(false);
            $table->string('hoten', 50)->nullable(false);
            $table->string('dienthoai', 15)->nullable(false);
            $table->string('congty', 100)->nullable(false);
            $table->string('diachi', 200)->nullable(false);
            $table->string('quocgia', 30)->nullable(false);
            $table->string('tinhthanh', 50)->nullable();
            $table->string('quanhuyen', 50)->nullable();
            $table->string('phuongxa', 50)->nullable();
            $table->string('mazip', 10)->nullable(false);
            $table->tinyInteger('macdinh')->nullable(false);
            $table->string('id_nguoidung', 11)->nullable(false);
            $table->foreign('id_nguoidung')->references('id_nguoidung')->on('tb_nguoidung');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_diachi');
    }
};
