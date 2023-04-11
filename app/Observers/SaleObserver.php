<?php

namespace App\Observers;
use Auth;
use Carbon\Carbon;
use App\Models\Sale;
use App\Models\SaleProducts;
use App\Models\Product;
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
        $request = request()->all();
        $listProducts = $request['listProducts'];
        foreach ($listProducts as $key => $product) {
            $prod = Product::find($product['product_id']);
            if($prod){

                $prod->count = $prod->count + $product['totalCount'];
                $prod->save();

            }
            else{

                Product::create([
                    'id' => $product['product_id'],
                    'shop_id' => $product['shop_id'],
                    'product_names_id' => $product['product_names_id'],
                    'size_id' => $product['size_id'],
                    'original_price' => $product['original_price'],
                    'price' => $product['price'],
                    'count' => $product['totalCount'],
                    'created_at' => $product['created'],
                ]);

            }

            $productsSale = SaleProducts::find($product['id']);
            $count = (int)$productsSale->count - $product['totalCount'];
            if($count == 0){
                $productsSale->delete();
            }
            else{
                $productsSale->count = $count;
                $productsSale->save();
            }
        }
        
    }

    /**
     * Handle the Sell "deleted" event.
     *
     * @param  \App\Models\Sell  $sell
     * @return void
     */
    public function deleted(Sale $sell)
    {
        SaleProducts::where('sale_id', $sell->id)->delete();
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
