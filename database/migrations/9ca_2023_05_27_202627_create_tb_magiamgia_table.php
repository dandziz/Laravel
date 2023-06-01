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
        Schema::create('tb_magiamgia', function (Blueprint $table) {
            $table->string("magiamgia", 15)->nullable(false)->primary();
            $table->date("ngaybatdau")->nullable(false);
            $table->date("hansudung")->nullable(false);
            $table->integer("soluotsudung")->nullable(false);
            $table->integer("soluotdasudung")->nullable(false);
            $table->integer("giam")->nullable(false);
            $table->string("id_nuochoa", 11)->nullable(false);
            $table->foreign("id_nuochoa")->references("id_nuochoa")->on("tb_nuochoa");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_magiamgia');
    }
};
