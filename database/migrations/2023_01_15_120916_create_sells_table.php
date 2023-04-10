<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sale_products', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('shop_id');
            $table->bigInteger('sale_id');
            $table->bigInteger('size_id');
            $table->bigInteger('product_names_id');
            $table->bigInteger('product_id');
            $table->double('original_price', 10, 3);
            $table->double('price', 10, 3);
            $table->double('selled_price', 10, 3);
            $table->double('count', 10, 3)->default(1);
            $table->timestamp('created');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sale_products');
    }
};
