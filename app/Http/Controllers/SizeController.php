<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Size;
class SizeController extends Controller
{
    public function store(Request $request)
    {
        return Size::create([
            'size_name_id' => $request->id
        ])->fresh();
    }

    public function update(Request $request, $id)
    {

    }

    public function destroy($id)
    {
        Size::destroy($id);
    }
}
