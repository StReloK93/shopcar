<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Auth;

class SaleProducts extends Model
{
    use HasFactory;

    protected $with = [
        'size',
        'product_names',
    ];

    protected $fillable = [
        'shop_id',
        'sale_id',
        'size_id',
        'product_names_id',
        'product_id',
        'price',
        'selled_price',
        'count'
    ];


    public function size()
    {
        return $this->belongsTo(Size::class);
    }

    public function product_names()
    {
        return $this->belongsTo(ProductNames::class);
    }

    public function scopeShop($query) 
    { 
        return $query->where('shop_id' , Auth::user()->active_shop); 
    }
}
