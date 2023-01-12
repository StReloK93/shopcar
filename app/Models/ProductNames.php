<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductNames extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_id',
        'user_id',
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
    
}

// Hayitov Husniddin