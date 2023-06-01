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
        Schema::create('tb_doanvan', function (Blueprint $table) {
            $table->integer('id')->unsigned()->nullable(false);
            $table->string('id_doanvan', 11)->primary()->nullable(false);
            $table->tinyInteger('sothutu')->nullable(false);
            $table->string('tieude', 200)->nullable(false);
            $table->string('noidung', 2000)->nullable(false);
            $table->string('img_link', 100)->nullable();
            $table->foreign('id')->references('id_baiviet_blog')->on('tb_kienthuc_blog');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_doanvan');
    }
};
