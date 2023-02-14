<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use Auth;
class CategoryController extends Controller
{
    public function index()
    {
        return Category::whereNull('category_id')
        ->Shop()
        ->with('childrenCategories')
        ->get();
    }

    public function store(Request $request)
    {
        $category = Category::create([
            'shop_id' => Auth::user()->active->id,
            'name' => $request->name
        ]);

        return Category::with('childrenCategories')->find($category->id);
    }


    public function storeSub(Request $request)
    {

        $category = Category::create([
            'shop_id' => Auth::user()->active->id,
            'name' => $request->name,
            'category_id' => $request->id,
        ]);

        return Category::Shop()->with('childrenCategories')->find($category->id);
    }

    public function update(Request $request, $id)
    {
        Category::find($id)->update(['name' => $request->name]);
    }

    public function destroy($id)
    {
        Category::destroy($id);
    }
}
