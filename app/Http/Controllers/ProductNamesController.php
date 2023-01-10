<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProductNames;
use App\Models\Product;

class ProductNamesController extends Controller
{
    //get
    public function index(){

        return ProductNames::where('user_id', 1)->with('products')->get();

    }


    // create
    public function store(Request $request)
    {

        $productNames = ProductNames::create([
            'name' => $request->name,
            'category_id' => $request->category_id,
            'size_names_id' => $request->size_names_id,
            'user_id' => 1,
        ]);

        $array = [];
        foreach ($request->products as $key => $size) {

            if($size['count'] != 0){
                $array[] = [
                    'product_names_id' => $productNames->id,
                    'size_id' => $size['id'],
                    'original_price' => $request->original_price,
                    'price' => $request->price,
                    'count' => $size['count'],
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }

        }
        //
        Product::insert($array);

        return ProductNames::where('id',$productNames->id)->with('products')->first();
    }

    // update
    public function update(Request $request, $id)
    {


    }

    // delete
    public function destroy($id)
    {


    }
}
