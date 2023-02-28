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
