<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Sale;
class SaleController extends Controller
{
    //get
    public function index(){
        return Sale::shop()->with(['sells'])->latest()->get();
    }

    //show
    public function show($id){
        return Sale::with(['sells'])->find($id);
    }


    // create
    public function store(Request $request)
    {

        return Sale::create([
            'shop_id' => $request->shop_id,
            'cash' => $request->cash,
            'electron' => $request->electron,
            'debt' => $request->debt,
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
