<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Size;
class SizeController extends Controller
{
    public function store(Request $request)
    {
        return Size::create([
            'size_name_id' => $request->id,
            'name' => 'size',
        ])->fresh();
    }

    public function update(Request $request, $id)
    {
        Size::find($id)->update(['name' => $request->name]);
    }

    public function destroy($id)
    {
        Size::destroy($id);
    }
}
