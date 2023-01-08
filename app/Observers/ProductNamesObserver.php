<?php

namespace App\Observers;

use App\Models\ProductNames;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductNamesObserver
{
    /**
     * Handle the ProductNames "created" event.
     *
     * @param  \App\Models\ProductNames  $productNames
     * @return void
     */
    public function created(ProductNames $productNames)
    {

        $request = request();
        $array = [];
        foreach ($request->sizes as $key => $size) {

            if($size['count'] != 0){
                $array[] = [
                    'product_names_id' => $productNames->id,
                    'size_id' => $size['id'],
                    'original_price' => $request->original_price,
                    'price' => $request->price,
                    'count' => $size['count'],
                    'created_at' => now(),
                ];
            }

        }

        //
        Product::insert($array);
    }

    /**
     * Handle the ProductNames "updated" event.
     *
     * @param  \App\Models\ProductNames  $productNames
     * @return void
     */
    public function updated(ProductNames $productNames)
    {
        //
    }

    /**
     * Handle the ProductNames "deleted" event.
     *
     * @param  \App\Models\ProductNames  $productNames
     * @return void
     */
    public function deleted(ProductNames $productNames)
    {
        //
    }

    /**
     * Handle the ProductNames "restored" event.
     *
     * @param  \App\Models\ProductNames  $productNames
     * @return void
     */
    public function restored(ProductNames $productNames)
    {
        //
    }

    /**
     * Handle the ProductNames "force deleted" event.
     *
     * @param  \App\Models\ProductNames  $productNames
     * @return void
     */
    public function forceDeleted(ProductNames $productNames)
    {
        //
    }
}
