<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Sell;
class SellController extends Controller
{
    //get
    public function index(){
        return Sell::where('shop_id', 1)->with(['product_names','size'])->latest()->get();
    }


    // create
    public function store(Request $request)
    {

        $selledProducts = [];

        foreach ($request->all() as $key => $value) {
            if($request[$key]['totalCount'] != 0){
                $sell = Sell::create([
                    'shop_id' => 1,
                    'product_names_id' => $request[$key]['product_names_id'],
                    'product_id' => $request[$key]['id'],
                    'size_id' => $request[$key]['size_id'],
                    'original_price' => $request[$key]['original_price'],
                    'price' => $request[$key]['price'],
                    'sold_price' => $request[$key]['sold_price'],
                    'count' => $request[$key]['totalCount'],
                ]);
        
                $selledProducts[] = Sell::with(['product_names','size'])->find($sell->id);
            }
        }

        

        return $selledProducts;
    }

    // update
    public function update(Request $request, $id)
    {

        ProductNames::find($id)->update([
            'name' => $request->name,
            'category_id' => $request->category_id,
        ]);

    }

    // delete
    public function destroy($id)
    {

        ProductNames::find($id)->delete();

    }
}
