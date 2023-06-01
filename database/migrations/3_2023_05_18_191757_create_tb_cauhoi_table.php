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
        Schema::create('tb_cauhoi', function (Blueprint $table) {
            $table->integer('id_cauhoi')->unsigned()->nullable(false)->primary();
            $table->dateTime('thoigianhoi')->nullable(false)->default(\DB::raw('CURRENT_TIMESTAMP'));
            $table->string('hoten', 50)->nullable(false);
            $table->string('email', 50)->nullable(false);
            $table->string('noidung', 2000)->nullable(false);
            $table->string('ip_address', 30)->nullable(false);
            $table->string('traloi', 2000)->nullable();
            $table->tinyInteger('trangthai')->nullable()->default(0);
            $table->dateTime('thoigiantraloi')->nullable();
            $table->string('id_nguoidung', 11);
            $table->foreign('id_nguoidung')->references('id_nguoidung')->on('tb_nguoidung');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_cauhoi');
    }
};
