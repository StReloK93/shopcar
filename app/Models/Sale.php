<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Auth;
class Sale extends Model
{
    use HasFactory;

    protected $fillable = [
        'shop_id',
        'cash',
        'electron',
        'debt',
    ];

    protected $with = [
        'sells'
    ];


    public function sells()
    {
        return $this->hasMany(SaleProducts::class);
    }



    public function scopeShop($query) 
    { 
        return $query->where('shop_id' , Auth::user()->active_shop); 
    }



}
