{
    typeOfProduct: [
        'Futbolka',
        'bryuk',
        'oyoq kiyim',
        'shapka',
        'kurtka',
        'remen',
    ]
    sizes: {
        shoesEU: [39,40,41,42,43,44,45]
        shoesAsia: [240,245,250,255,260,265,270]
        clothesEU: ['S', 'M' , 'L' , 'XL' , '2XL' , '3XL']
        clothesAsia: ['45', '47' , '49' , '51' , '53' , '55']
    }


    input: [
        this.typeOfProduct,
        [names, sizes, count]
    ]

    output: [
        
    ]

    users: [
        admin,
        Seller
    ]
}

{
    [
        SotilganTovarlar,
        [//bugungi savdo
            naxt,
            qarz
        ]

    ],

    [
        //Foyda
        Kunlik,
        Oylik,
        Yillik,

    ],

    // admin
    {
        Magazinlar: ['Birinchi', 'Ikkinchi'],
    }
}

