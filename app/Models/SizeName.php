<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SizeName extends Model
{
    use HasFactory;

    protected $fillable = [
        'shop_id',
        'name'
    ];


    public function sizes()
    {
        return $this->hasMany(Size::class);
    }
}
