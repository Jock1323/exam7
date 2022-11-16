/* 
    /categories
    /categories/2

    [
        {
            categoryId: 1,
            categoryName: 'electronics',
            subCategories: [
                {
                    subCategoryId: 1,
                    subCategoryName: 'smart phones'
                },
                {
                    subCategoryId: 2,
                    subCategoryName: 'televisions'
                },
                {
                    subCategoryId: 3,
                    subCategoryName: 'laptops'
                }
            ]
        },
        {
            categoryId: 2,
            categoryName: 'clothes',
            subCategories: [
                {
                    subCategoryId: 4,
                    subCategoryName: 'boots'
                },
                {
                    subCategoryId: 5,
                    subCategoryName: 'shirts'
                }
            ]
        }

    ]


    /subcategories
    /subcategories/3

    [
        {
            subCategoryId: 1,
            subCategoryName: 'smart phones',
            products: [
                {
                    product_id: 1, 
                    model: 'redmi',   
                    productName: 'redmi note 6 pro', 
                    color: 'black', 
                    price: '140'
                },
                { 
                    product_id: 2, 
                    model: 'samsung', 
                    product_name: 'galaxy 7', 
                    color: 'red', 
                    price: '190' 
                },
                { 
                    product_id: 7,
                    model: 'nokia',
                    product_name: '1202 ',
                    color: 'red',
                    price: '20' 
                }
                

            ]
        }
    ]

    /products -> []

    /products?categoryId=1
    /products?subCategoryId=1
    /products?subCategoryId=1&model=samsung
    /products?model=samsung
    /products/1
https://myexam7.herokuapp.com/products/model=re





    POST
    /categories
        categoryName
    
    POST
    /subcategories
        categoryId, subCategoryName
    
    POST
    /products
        subCategoryId, productName, price, color, model
*/






// heroku --> link
// github --> link

// 16.11.2022 //  22:00

let admin = [
    { user_id: 1, username: 'salim', password: "12Aa$1oedijaoisidjao92831jsa$as" }
]

let categories = [
    { category_id: 1, category_name: 'electronics' },
    { category_id: 2, category_name: 'clothes' }
]

let subCategories = [
    { sub_category_id: 1, category_id: 1, sub_category_name: 'smart phones'},
    { sub_category_id: 2, category_id: 1, sub_category_name: 'televisions'},
    { sub_category_id: 3, category_id: 1, sub_category_name: 'laptops'},
    { sub_category_id: 4, category_id: 2, sub_category_name: 'boots'},
    { sub_category_id: 5, category_id: 2, sub_category_name: 'shirts'},
]

let products = [
    { product_id: 1, sub_category_id: 1, model: 'redmi',   product_name: 'redmi note 6 pro', color: 'black', price: '140' },
    { product_id: 2, sub_category_id: 1, model: 'samsung', product_name: 'galaxy 7', color: 'red', price: '190' },
    { product_id: 3, sub_category_id: 2, model: 'Artel',   product_name: 'Artel 48 2x', color: 'black', price: '340' },
    { product_id: 4, sub_category_id: 3, model: 'hp',      product_name: 'hp pavilon', color: 'silver', price: '640' },
    { product_id: 5, sub_category_id: 4, model: 'salamandra',product_name: 'salamandra 42 x1', color: 'black', price: '32' },
    { product_id: 6, sub_category_id: 5, model: 'polo',     product_name: 'polo xr13', color: 'white', price: '12' },
    { product_id: 7, sub_category_id: 1, model: 'nokia', product_name: '1202 ', color: 'red', price: '20' },
]

