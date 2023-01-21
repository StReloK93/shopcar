<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\Size;
use App\Models\SizeName;
class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {

        Category::insert([
            [
                'shop_id' => 1,
                'name'=>'Брюки',
                'category_id' => null
            ],
            [
                'shop_id' => 1,
                'name'=>'Обувы',
                'category_id' => null
            ],
            [
                'shop_id' => 1,
                'name'=>'Туфли',
                'category_id' => 2
            ],
            [
                'shop_id' => 1,
                'name'=>'Крассовки',
                'category_id' => 2
            ],
            [
                'shop_id' => 1,
                'name'=>'Джинсы',
                'category_id' => 1
            ],
            [
                'shop_id' => 1,
                'name'=>'Классика',
                'category_id' => 1
            ],
        ]);


        SizeName::insert([
            [
                'shop_id' => null,
                'name'=>'Quantity',
            ],
            [
                'shop_id' => null,
                'name'=>'Units',
            ],
            [
                'shop_id' => 1,
                'name'=>'Standart',
            ],
            [
                'shop_id' => 1,
                'name'=>'Russian',
            ],
        ]);

        Size::insert([
            [
                'size_name_id' => 1,
                'name'=>'qty',
            ],
        ]);


        Size::insert([
            [
                'size_name_id' => 2,
                'name'=>'m',
            ],
            [
                'size_name_id' => 2,
                'name'=>'g',
            ],
            [
                'size_name_id' => 2,
                'name'=>'t',
            ],
            [
                'size_name_id' => 2,
                'name'=>'L',
            ],
        ]);


        Size::insert([
            [
                'size_name_id' => 3,
                'name'=>'S',
            ],
            [
                'size_name_id' => 3,
                'name'=>'M',
            ],
            [
                'size_name_id' => 3,
                'name'=>'L',
            ],
            [
                'size_name_id' => 3,
                'name'=>'XL',
            ],
            [
                'size_name_id' => 3,
                'name'=>'2XL',
            ],
            [
                'size_name_id' => 3,
                'name'=>'3XL',
            ]
        ]);


        Size::insert([
            [
                'size_name_id' => 4,
                'name'=> '40',
            ],
            [
                'size_name_id' => 4,
                'name'=>'42',
            ],
            [
                'size_name_id' => 4,
                'name'=>'44',
            ],
            [
                'size_name_id' => 4,
                'name'=>'46',
            ],
            [
                'size_name_id' => 4,
                'name'=>'48',
            ],
            [
                'size_name_id' => 4,
                'name'=>'50',
            ],
            [
                'size_name_id' => 4,
                'name'=>'52',
            ],
            [
                'size_name_id' => 4,
                'name'=>'54',
            ],
            [
                'size_name_id' => 4,
                'name'=>'56',
            ],
        ]);

        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
