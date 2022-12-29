<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SizeName;

class SizeNameController extends Controller
{
    public function index()
    {
        return SizeName::where(['user_id' => 1])->get();
    }



    public function store()
    {
        return SizeName::create(['user_id' => 1])->fresh();
    }



    public function update(Request $request, $id)
    {
        return SizeName::find($id)->update(['name' => $request->name])->fresh();
    }



    public function destroy($id)
    {

    }
}
