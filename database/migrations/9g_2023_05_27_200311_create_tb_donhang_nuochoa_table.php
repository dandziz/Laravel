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
        Schema::create('tb_donhang_nuochoa', function (Blueprint $table) {
            $table->string("id_donhang", 11)->nullable(false);
            $table->string("id_nuochoa", 11)->nullable(false);
            $table->integer("dungtich")->nullable(false);
            $table->integer("dongia")->nullable(false);
            $table->integer("soluong")->nullable(false);
            $table->bigInteger("giamgia")->nullable(false);
            $table->bigInteger("tong")->nullable(false);
            $table->string("magiamgia", 15)->nullable();
            $table->primary(['id_donhang', 'id_nuochoa', 'dungtich']);
            $table->foreign("id_nuochoa")->references("id_nuochoa")->on("tb_nuochoa");
            $table->foreign("id_donhang")->references("id_donhang")->on("tb_donhang");
            $table->foreign("magiamgia")->references("magiamgia")->on("tb_magiamgia");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_donhang_nuochoa');
    }
};
