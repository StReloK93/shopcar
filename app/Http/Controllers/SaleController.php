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


    // create
    public function store(Request $request)
    {

        return Sale::create([
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
