<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;


class ProductController extends Controller
{

    // index
    public function index()
    {
        return Product::with(['product_names','size'])->where('user_id', 1)->get();
    }

    // create
    public function store(Request $request)
    {
        $FormData = $request->all();
        $FormData['user_id'] = 1;
        return Product::create($FormData)->fresh();
    }

    // Show
    public function show($id)
    {
        return Product::with(['product_names','size'])->find($id);
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
