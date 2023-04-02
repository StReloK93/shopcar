<?php

namespace App\Observers;

use App\Models\SaleProducts;
use App\Models\Product;


class SaleProductsObserver
{
    /**
     * Handle the Sell "created" event.
     *
     * @param  \App\Models\Sell  $sell
     * @return void
     */
    public function created(SaleProducts $sell)
    {

        $product = Product::find($sell->product_id);

        $product->decrement('count', $sell->count);

        if($product->count == 0 || $product->count < 0){
            $product->delete();
        }
    }

    /**
     * Handle the Sell "updated" event.
     *
     * @param  \App\Models\Sell  $sell
     * @return void
     */
    public function updated(SaleProducts $sell)
    {
        //
    }

    /**
     * Handle the Sell "deleted" event.
     *
     * @param  \App\Models\Sell  $sell
     * @return void
     */
    public function deleted(SaleProducts $sell)
    {
        //
    }

    /**
     * Handle the Sell "restored" event.
     *
     * @param  \App\Models\Sell  $sell
     * @return void
     */
    public function restored(SaleProducts $sell)
    {
        //
    }

    /**
     * Handle the Sell "force deleted" event.
     *
     * @param  \App\Models\Sell  $sell
     * @return void
     */
    public function forceDeleted(SaleProducts $sell)
    {
        //
    }
}
