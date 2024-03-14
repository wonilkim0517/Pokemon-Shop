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
            password: "admin",
            user_name: "관리자",
            nickname: "admin",
            email: "admin@admin.com",
            address: "삼육대 3길",
            phone_num: "010-3333-3333"
        }
    ],
    productData: [
        {
            id: 101,
            product_name: "포켓몬센터 한 송이 꽃병 MIMOSA e POKÉMON 피카츄",
            stock: 50,
            price: 10000,
            content: "피카츄 꽃꽂이",
            image: "main-img/pokemon_one_flower_01.png"
        },
        {
            id: 102,
            product_name: "포켓몬센터 한 송이 꽃병 Fleur de Coquelicot 이브이",
            stock: 50,
            price: 20000,
            content: "이브이 꽃꽂이",
            image: "main-img/pokemon_flower_Eevee_01.png"
        },
        {
            id: 103,
            product_name: "포켓몬센터 한 송이 꽃병 Baby Blue Eyes 팽도리",
            stock: 50,
            price: 30000,
            content: "팽도리 꽃꽂이",
            image: "main-img/pokemon_flower_piplup_01.png"
        },
        {
            id: 104,
            product_name: "포켓몬센터 보들보들 봉제인형 메타몽",
            stock: 50,
            price: 40000,
            content: "메타몽 인형",
            image: "main-img/pokemon_d_metamon_01.png"
        },
        {
            id: 105,
            product_name: "포켓몬스터 MOFUGUTTO BIG 봉제인형 마자용",
            stock: 50,
            price: 50000,
            content: "마자용 인형",
            image: "main-img/pokemon_d_majayong_01.png"
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
            user_id: 5,
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


