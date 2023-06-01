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
        Schema::create('tb_nuochoa', function (Blueprint $table) {
            $table->string('id_nuochoa', 11)->primary()->nullable(false);
            $table->string('ten_nuochoa', 100)->nullable(false);
            $table->tinyInteger('gioitinh')->nullable(false);
            $table->string('xuatxu', 20)->nullable(false);
            $table->string('mota', 500)->nullable(false);
            $table->string('thongtinchinh', 500)->nullable(false);
            $table->string('tongquan', 500)->nullable(false);
            $table->string('huongthom', 2000)->nullable(false);
            $table->string('loai_huongthom', 500)->nullable(false);
            $table->string('thietke', 2000)->nullable(false);
            $table->string('dadanghoa', 2000)->nullable(false);
            $table->string('nhomnuochoa', 50)->nullable(false);
            $table->string('dotuoikhuyendung', 10)->nullable(false);
            $table->year('namramat')->nullable(false);
            $table->string('nongdo', 10)->nullable(false);
            $table->string('nhaphache', 50)->nullable(false);
            $table->string('doluuhuong', 50)->nullable(false);
            $table->string('phongcach', 50)->nullable(false);
            $table->string('dotoahuong', 50)->nullable(false);
            $table->string('thoidiemphuhop', 50)->nullable(false);
            $table->date('ngaybat_dauban')->nullable(false)->useCurrent();
            $table->float('danhgia')->nullable(false);
            $table->tinyInteger('status')->nullable(false);
            $table->string('id_thuonghieu', 11)->nullable(false);
            $table->integer('id_nhacungcap')->unsigned()->nullable(false);
            $table->string('id_nguoiquanly', 11)->nullable(false);
            $table->foreign('id_nguoiquanly')->references('id_nguoidung')->on('tb_nguoidung');
            $table->foreign('id_nhacungcap')->references('id_nhacungcap')->on('tb_nhacungcap');
            $table->foreign('id_thuonghieu')->references('id_thuonghieu')->on('tb_thuonghieu');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_nuochoa');
    }
};
