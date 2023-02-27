<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Auth;

class Sell extends Model
{
    use HasFactory;


    protected $fillable = [
        'shop_id',
        'sale_id',
        'product_id',
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
