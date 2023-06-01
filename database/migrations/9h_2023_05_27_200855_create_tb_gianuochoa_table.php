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
        Schema::create('tb_gianuochoa', function (Blueprint $table) {
            $table->string("id_nuochoa", 11)->nullable(false);
            $table->integer("dungtich")->nullable(false);
            $table->tinyInteger("soluong")->nullable(false)->default(0);
            $table->integer("gia_nhap")->nullable(false);
            $table->integer("gia_ban")->nullable(false);
            $table->primary(['id_nuochoa', 'dungtich']);
            $table->foreign("id_nuochoa")->references("id_nuochoa")->on("tb_nuochoa");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_gianuochoa');
    }
};
