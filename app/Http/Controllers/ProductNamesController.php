<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProductNames;
class ProductNamesController extends Controller
{
    // create
    public function store(Request $request)
    {
        return ProductNames::create([
            'name' => $request->name,
            'category_id' => $request->category_id,
            'size_names_id' => $request->size_names_id,
        ]);

        // return Size::create([
            
        //     'name' => 'size',
        // ])->fresh();
    }

    // update
    public function update(Request $request, $id)
    {

        Size::find($id)->update(['name' => $request->name]);

    }

    // delete
    public function destroy($id)
    {
        Size::destroy($id);
    }
}
