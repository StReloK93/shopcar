<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Auth;
class Product extends Model
{
    use HasFactory;

    protected $with = [
        'size'
    ];

    protected $fillable = [
        'id',
        'shop_id',
        'product_names_id',
        'size_id',
        'original_price',
        'price',
        'count',
        'created_at',
    ];


    public function size()
    {
        return $this->belongsTo(Size::class);
    }

    public function product_names()
    {
        return $this->belongsTo(ProductNames::class)->with('products');
    }

    public function scopeShop($query) 
    { 
        return $query->where('shop_id' , Auth::user()->active_shop);
    }
}
