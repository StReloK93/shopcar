<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProductNames;
class ProductNamesController extends Controller
{
    //get
    public function index(){
        return ProductNames::where('user_id', 1)->with('products')->get();
    }


    // create
    public function store(Request $request)
    {
        return ProductNames::create([
            'name' => $request->name,
            'category_id' => $request->category_id,
            'size_names_id' => $request->size_names_id,
            'user_id' => 1,
        ]);

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
