<?php

namespace App\Observers;
use App\Models\Sale;
use App\Models\SaleProducts;
use Auth;
use Carbon\Carbon;
class SaleObserver
{

    public function created(Sale $sale)
    {

        $request = request()->all();
        foreach ($request['listProducts'] as $key => $product) {

            if($product['totalCount'] != 0){
                $sell = SaleProducts::create([
                    'shop_id' => Auth::user()->active->id,
                    'sale_id' => $sale->id,
                    'size_id' =>  $product['size_id'],
                    'product_names_id' =>  $product['product_names_id'],
                    'product_id' => $product['id'],
                    'original_price' => $product['original_price'],
                    'price' => $product['price'],
                    'selled_price' => $product['selled_price'],
                    'count' => $product['totalCount'],
                    'created' => Carbon::parse($product['created_at'])->timezone('Asia/Tashkent'),
                ]);
            }

        }
    }

    /**
     * Handle the Sell "updated" event.
     *
     * @param  \App\Models\Sell  $sell
     * @return void
     */
    public function updated(Sale $sell)
    {
        //
    }

    /**
     * Handle the Sell "deleted" event.
     *
     * @param  \App\Models\Sell  $sell
     * @return void
     */
    public function deleted(Sale $sell)
    {
        //
    }

    /**
     * Handle the Sell "restored" event.
     *
     * @param  \App\Models\Sell  $sell
     * @return void
     */
    public function restored(Sale $sell)
    {
        //
    }

    /**
     * Handle the Sell "force deleted" event.
     *
     * @param  \App\Models\Sell  $sell
     * @return void
     */
    public function forceDeleted(Sale $sell)
    {
        //
    }
}
