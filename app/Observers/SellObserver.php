<?php

namespace App\Observers;

use App\Models\Sell;
use App\Models\Product;


class SellObserver
{
    /**
     * Handle the Sell "created" event.
     *
     * @param  \App\Models\Sell  $sell
     * @return void
     */
    public function created(Sell $sell)
    {

        $product = Product::find($sell->product_id);

        $product->decrement('count', $sell->count);

        if((int)$product->count == 0){
            $product->delete();
        }
    }

    /**
     * Handle the Sell "updated" event.
     *
     * @param  \App\Models\Sell  $sell
     * @return void
     */
    public function updated(Sell $sell)
    {
        //
    }

    /**
     * Handle the Sell "deleted" event.
     *
     * @param  \App\Models\Sell  $sell
     * @return void
     */
    public function deleted(Sell $sell)
    {
        //
    }

    /**
     * Handle the Sell "restored" event.
     *
     * @param  \App\Models\Sell  $sell
     * @return void
     */
    public function restored(Sell $sell)
    {
        //
    }

    /**
     * Handle the Sell "force deleted" event.
     *
     * @param  \App\Models\Sell  $sell
     * @return void
     */
    public function forceDeleted(Sell $sell)
    {
        //
    }
}
