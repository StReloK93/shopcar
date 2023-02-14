<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Auth;
class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'shop_id',
        'name',
        'category_id',
    ];

    public function childrenCategories()
    {
        return $this->hasMany(Category::class)->with('childrenCategories');
    }

    public function scopeShop($query) 
    { 
        return $query->where('shop_id' , Auth::user()->active->id); 
    }
}
