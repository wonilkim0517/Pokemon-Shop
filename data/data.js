const data = {
    userData: [
        {
            id: 1,
            password: "111",
            user_name: "홍길동",
            nickname: "hkd",
            email: "hkd@abc.com",
            address: "삼육대 1길",
            phone_num: "010-1111-1111"
        },
        {
            id: 2,
            password: "222",
            user_name: "김철수",
            nickname: "kcs",
            email: "kcs@abc.com",
            address: "삼육대 2길",
            phone_num: "010-2222-2222"
        },
        {
            id: 3,
            password: "333",
            user_name: "박영희",
            nickname: "pyh",
            email: "pyh@abc.com",
            address: "삼육대 3길",
            phone_num: "010-3333-3333"
        }
    ],
    productData: [
        {
            id: 101,
            product_name: "포켓몬 꽃",
            stock: 50,
            price: 10000,
            content: "설명1",
            image: "main-img/pokemon_one_flower_01.png"
        },
        {
            id: 102,
            product_name: "포켓몬 땅",
            stock: 50,
            price: 20000,
            content: "설명2",
            image: "main-img/pokemon_earth_digda.png"
        },
        {
            id: 103,
            product_name: "포켓몬 물",
            stock: 50,
            price: 30000,
            content: "",
            image: "main-img/pokemon_water_kkobugi.png"
        }
    ],
    orderDetailData: [
        {
            id: 1,
            order_id: 1,
            product_id: 101,
            orderDetail_quantity: 0
        }
    ],
    orderData: [
        {
            id: 1,
            user_id: 0,
            amount: 0,
            total_price: 0,
            status: 0,
            date: "2024-03-10"
        }
    ],
    cartData: [
        {
            id: 1,
            user_id: 2,
            product_id: 101,
            cart_quantity: 0,
            is_ordered: 0
        }
    ]
};


let userData = data.userData;
let productData = data.productData;
let orderDetailData = data.orderDetailData;
let orderData = data.orderData;
let cartData = data.cartData;


