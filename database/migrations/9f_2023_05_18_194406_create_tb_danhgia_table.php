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
        Schema::create('tb_danhgia', function (Blueprint $table) {
            $table->string('id_donhang', 11)->nullable(false);
            $table->string('id_nuochoa', 11)->nullable(false);
            $table->string('hoten', 100)->nullable(false);
            $table->string('dienthoai', 100)->nullable(false);
            $table->string('email', 100)->nullable();
            $table->string('noidungdanhgia', 100)->nullable(false);
            $table->tinyInteger('xephang')->nullable(false);
            $table->dateTime('ngaydanhgia')->nullable(false)->useCurrent();
            $table->primary(['id_donhang', 'id_nuochoa']);
            $table->foreign('id_donhang')->references('id_donhang')->on('tb_donhang');
            $table->foreign('id_nuochoa')->references('id_nuochoa')->on('tb_nuochoa');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_danhgia');
    }
};
