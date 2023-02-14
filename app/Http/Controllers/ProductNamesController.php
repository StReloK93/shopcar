<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProductNames;
use App\Models\Product;
use Auth;
class ProductNamesController extends Controller
{
    //get
    public function index(){
        return ProductNames::shop()
                ->with(['products','category','size_names'])
                ->withSum('sells', 'count')
                ->latest()->get();
    }


    // create
    public function store(Request $request)
    {

        $productNames = ProductNames::create([
            'name' => $request->name,
            'category_id' => $request->category_id,
            'size_names_id' => $request->size_names_id,
            'shop_id' => Auth::user()->active->id,
        ]);

        return ProductNames::with(['products','category','size_names'])
                ->withSum('sells', 'count')
                ->find($productNames->id);
    }

    // update
    public function update(Request $request, $id)
    {

        ProductNames::shop()->find($id)->update([
            'name' => $request->name,
            'category_id' => $request->category_id,
        ]);

    }

    // delete
    public function destroy(Request $request, $id)
    {

        if($request->sells_sum_count == 0){
            ProductNames::find($id)->delete();
        }

        Product::where('product_names_id', $id)->delete();
    }
}
