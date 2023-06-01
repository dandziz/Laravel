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
        Schema::create('tb_donhang', function (Blueprint $table) {
            $table->string('id_donhang', 11)->primary()->nullable(false);
            $table->string('email', 30)->nullable();
            $table->string('hoten', 50)->nullable(false);
            $table->string('sodienthoai', 15)->nullable(false);
            $table->string('diachi', 200)->nullable(false);
            $table->string('tinhthanh', 50)->nullable(false);
            $table->string('quanhuyen', 50)->nullable(false);
            $table->string('phuongxa', 50)->nullable(false);
            $table->string('ghichu', 1000)->nullable(false);
            $table->integer('id_phuongthucthanhtoan')->nullable(false)->unsigned();
            $table->integer('phivanchuyen')->nullable(false)->default(0);
            $table->tinyInteger('trangthaidonhang')->nullable(false)->default(0);
            $table->tinyInteger('trangthaithanhtoan')->nullable(false)->default(0);
            $table->tinyInteger('trangthaivanchuyen')->nullable(false)->default(0);
            $table->dateTime('ngaydathang')->nullable(false)->useCurrent();
            $table->dateTime('ngayhoantat')->nullable();
            $table->dateTime('ngayhuy')->nullable();
            $table->bigInteger('khuyenmai')->nullable(false);
            $table->bigInteger('tongtien')->nullable(false);
            $table->tinyInteger('diachikhac')->nullable(false)->default(0);
            $table->string('hoten_khac', 50)->nullable();
            $table->string('sodienthoai_khac', 15)->nullable();
            $table->string('diachi_khac', 200)->nullable();
            $table->string('tinhthanh_khac', 50)->nullable();
            $table->string('quanhuyen_khac', 50)->nullable();
            $table->string('phuongxa_khac', 50)->nullable();
            $table->string('ghichu_khac', 1000)->nullable();
            $table->string('id_khachhang', 11)->nullable();
            $table->string('id_nguoiquanly', 11)->nullable();
            $table->tinyInteger('thongbao')->nullable(false)->default(0);
            $table->foreign('id_khachhang')->references('id_nguoidung')->on('tb_nguoidung');
            $table->foreign('id_nguoiquanly')->references('id_nguoidung')->on('tb_nguoidung');
            $table->foreign('id_phuongthucthanhtoan')->references('id_phuongthucthanhtoan')->on('tb_phuongthucthanhtoan');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_donhang');
    }
};
