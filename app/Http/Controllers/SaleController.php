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

        $sale = Sale::create([
            'shop_id' => $request->shop_id,
            'cash' => $request->cash,
            'electron' => $request->electron,
            'debt' => $request->debt,
        ]);

        return Sale::with(['sells'])->find($sale->id);
    }

    // update
    public function update(Request $request, $id)
    {
        $sale = Sale::find($id);
        $sale->cash = $request->cash;
        $sale->electron = $request->electron;
        $sale->debt = $request->debt;
        $sale->updated_at = now()->timezone('Asia/Tashkent');
        $sale->save();
        
        return Sale::with(['sells'])->find($id);

    }

    // delete
    public function destroy($id)
    {
        Sale::find($id)->delete();
    }
}
