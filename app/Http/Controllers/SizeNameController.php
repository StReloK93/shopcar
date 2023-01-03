<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SizeName;

class SizeNameController extends Controller
{
    public function index()
    {

        return SizeName::where(['user_id' => 1])->with('sizes')->get();
        
    }



    public function store()
    {

        $sizeName = SizeName::create(['user_id' => 1])->fresh();
        return SizeName::with('sizes')->find($sizeName->id);

    }



    public function update(Request $request, $id)
    {
        return SizeName::find($id)->update(['name' => $request->name]);
    }



    public function destroy($id)
    {
        SizeName::destroy($id);
    }
}
