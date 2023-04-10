<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Sale;
use App\Models\Product;
use App\Models\SaleProducts;
class SaleController extends Controller
{
    //get
    public function index(){
        return Sale::shop()->with(['sells'])->latest()->get();
    }

    //show
    public function show($id){
        return Sale::with(['sells'])->find($id);
    }


    // create
    public function store(Request $request)
    {

        return Sale::create([
            'shop_id' => $request->shop_id,
            'cash' => $request->cash,
            'electron' => $request->electron,
            'debt' => $request->debt,
        ]);

    }

    // update
    public function update(Request $request, $id)
    {
        $sale = Sale::find($id);
        $sale->cash = $request->cash;
        $sale->electron = $request->electron;
        $sale->debt = $request->debt;
        $sale->save();


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

            $sale = SaleProducts::find($product['id']);
            $sale->count = (int)$sale->count - $product['totalCount'];
            $sale->save();
        }

        // $product_keys = [];
        // foreach ($listProducts as $key => $product) {
        //     $product_keys[] = $product['id'];
        // }



        // // Off
        // $offProducts = SaleProducts::where('sale_id', $id)->whereNotIn('id', $product_keys);

        // foreach ($offProducts->get() as $key => $product) {

        //     $prod = Product::find($product->product_id);

        //     if($prod){

        //         $prod->count = $prod->count + $product->count;
        //         $prod->save();

        //     }
        //     else{

        //         Product::create([
        //             'id' => $product->product_id,
        //             'shop_id' => $product->shop_id,
        //             'product_names_id' => $product->product_names_id,
        //             'size_id' => $product->size_id,
        //             'original_price' => $product->original_price,
        //             'price' => $product->price,
        //             'count' => $product->count,
        //             'created_at' => $product->created,
        //         ]);

        //     }
        // }

        // $offProducts->delete();
        // // offend



        // $onProducts = SaleProducts::where('sale_id', $id)->whereIn('id', $product_keys);

        // // 

        // foreach ($onProducts->get() as $key => $product) {
        //     $prod = Product::find($product->product_id);
        //     if($prod) {
        //         // $count = (int)$product->count - $listProducts['count'];

        //         $prod->count = $prod->count + $count;
        //         $prod->save();

        //     }
        //     else {
        //         // $count = (int)$product->count - $listProducts['count'];

        //         Product::create([
        //             'id' => $product->product_id,
        //             'shop_id' => $product->shop_id,
        //             'product_names_id' => $product->product_names_id,
        //             'size_id' => $product->size_id,
        //             'original_price' => $product->original_price,
        //             'price' => $product->price,
        //             'count' => $product->count,
        //             'created_at' => $product->created,
        //         ]);

        //     }
        // }





    }

    // delete
    public function destroy($id)
    {

    }
}
