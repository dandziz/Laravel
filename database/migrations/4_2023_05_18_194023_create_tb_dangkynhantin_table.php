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
        Schema::create('tb_dangkynhantin', function (Blueprint $table) {
            $table->integerIncrements('id_nguoinhan')->unsigned()->nullable(false);
            $table->string('hoten', 50)->nullable(false);
            $table->string('email', 30)->nullable(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_dangkynhantin');
    }
};
