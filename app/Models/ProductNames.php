<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Auth;

class ProductNames extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_id',
        'shop_id',
        'size_names_id',
        'name',
    ];


    public function products()
    {
        return $this->hasMany(Product::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function size_names()
    {
        return $this->belongsTo(SizeName::class);
    }

    public function sells()
    {
        return $this->hasMany(Sell::class);
    }

    public function scopeShop($query) 
    { 
        return $query->where('shop_id' , Auth::user()->active->id); 
    }
}

// Hayitov Husniddin