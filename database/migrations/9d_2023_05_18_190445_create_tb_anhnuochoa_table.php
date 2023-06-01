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
        Schema::create('tb_anhnuochoa', function (Blueprint $table) {
            $table->integer('id_anh')->unsigned()->nullable(false)->autoIncrement();
            $table->string('img_link', 255)->nullable(false);
            $table->tinyInteger('anhdaidien')->nullable(false);
            $table->string('id_nuochoa', 11)->nullable(false);
            $table->foreign('id_nuochoa')->references('id_nuochoa')->on('tb_nuochoa');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_anhnuochoa');
    }
};
