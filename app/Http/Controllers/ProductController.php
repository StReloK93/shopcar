<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use Auth;

class ProductController extends Controller
{

    // index
    public function index()
    {
        return Product::with(['product_names','size'])->where('shop_id', Auth::user()->active->id)->latest()->get();
    }

    // create
    public function store(Request $request)
    {
        $FormData = $request->all();
        $FormData['shop_id'] = Auth::user()->active->id;
        return Product::create($FormData)->fresh();
    }

    // Show
    public function show($id)
    {
        return Product::where('shop_id',Auth::user()->active->id)->with(['product_names','size'])->find($id);
    }

    // update
    public function update(Request $request, $id)
    {
        Product::find($id)->update([
            'count' => $request->count,
            'price' => $request->price,
            'original_price' => $request->original_price
        ]);
    }

    // delete
    public function destroy($id)
    {
        Product::find($id)->delete();
    }
}
