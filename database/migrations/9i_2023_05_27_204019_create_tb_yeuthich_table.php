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
        Schema::create('tb_yeuthich', function (Blueprint $table) {
            $table->string("id_nguoidung", 11)->nullable(false);
            $table->string("id_nuochoa", 11)->nullable(false);
            $table->integer("dungtich")->nullable(false);
            $table->date("ngaythem")->nullable(false)->useCurrent();
            $table->primary(['id_nguoidung', 'id_nuochoa', 'dungtich']);
            $table->foreign("id_nguoidung")->references("id_nguoidung")->on("tb_nguoidung");
            $table->foreign("id_nuochoa")->references("id_nuochoa")->on("tb_nuochoa");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_yeuthich');
    }
};
