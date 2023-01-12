<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;


class ProductController extends Controller
{

    //get
    public function index(){


    }


    // create
    public function store(Request $request)
    {
        $product = Product::create($request->all());
        return $product->fresh();
    }

    // update
    public function update(Request $request, $id)
    {
        Product::find($id);
    }

    // delete
    public function destroy($id)
    {

        Product::find($id)->delete();

    }
}
