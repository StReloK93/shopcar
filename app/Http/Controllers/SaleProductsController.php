<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SaleProducts;
use Auth;
class SaleProductsController extends Controller
{
    //get
    public function index(){
        return SaleProducts::shop()->with(['product_names','size'])->latest()->get();
    }


    // create
    public function store(Request $request)
    {


    }

    // update
    public function update(Request $request, $id)
    {

        return $request->all();

    }

    // delete
    public function destroy($id)
    {


    }
}
