<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Shop;
use Auth;
class ShopController extends Controller
{
    // index
    public function index()
    {
        return Shop::where('user_id', Auth::user()->id)->get();
    }

    // create
    public function store()
    {
        return Shop::create([
            'user_id' => Auth::user()->id,
            'name' => 'shop'
        ]);
    }

    // Show
    public function show($id)
    {
        return Shop::find($id);
    }

    // update
    public function update(Request $request, $id)
    {
        return Shop::where('id',$id)->update(['name' => $request->name]);
    }

    // delete
    public function destroy($id)
    {
        $user = Auth::user();
        if($user->active_shop == $id) {
            $user->active_shop = null;
            $user->save();
        }
        return Shop::destroy($id);
    }
}
