<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Sell;
use Auth;
class SellController extends Controller
{
    //get
    public function index(){
        return Sell::shop()->with(['product_names','size'])->latest()->get();
    }


    // create
    public function store(Request $request)
    {

        $selledProducts = [];

        foreach ($request->all() as $key => $value) {
            if($request[$key]['totalCount'] != 0){
                $sell = Sell::create([
                    'sale_id' => 1,
                    'shop_id' => Auth::user()->active->id,
                    'product_id' => $request[$key]['id'],
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
