<?php

namespace App\Observers;
use App\Models\Sale;
use App\Models\Sell;


class SaleObserver
{

    public function created(Sale $sale)
    {
        // $request = request();
        // $selledProducts = [];

        // foreach ($request->all() as $key => $value) {

        //     if($request[$key]['totalCount'] != 0){
        //         $sell = Sell::create([
        //             'sale_id' => $sale->id,
        //             'shop_id' => Auth::user()->active->id,
        //             'product_id' => $request[$key]['id'],
        //             'count' => $request[$key]['totalCount'],
        //         ]);
        
        //         $selledProducts[] = Sell::with(['product_names','size'])->find($sell->id);
        //     }

        // }
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
