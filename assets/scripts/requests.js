let sort = 'desc';
let category = null;
const getProducts = () => {
    let API_URL = null;
    if(!category) {
        API_URL = `https://fakestoreapi.com/products?sort=${sort}`;
    } else {
        API_URL = `https://fakestoreapi.com/products/category/${category}`;
    }
    fetch(API_URL)
        .then(res => res.json())
        .then(json => displayProducts(json));
}

const getCategories = () => {
    fetch('https://fakestoreapi.com/products/categories')
        .then(res => res.json())
        .then(json => displayCategories(json))
}

$(document).ready(function () {
    getProducts();
    getCategories();
    updateCartCount();
    displayCartItems();
});

const displayCartItems = () => {
    const products = JSON.parse(localStorage.getItem('products'));
    $(".cart-products").empty();
    if(products.length > 0) {
        products.map((product) => {
            let productHTML = `
                <div class="cart-product-item">
                    <div class="left-side">
                        <img src="${product.image}" width="50" alt="">
                        <p>${product.title}</p>
                    </div>
                    <div class="cart-price">
                        <span>$ ${product.price}</span>
                    </div>
                    <button class="delete-cart-item" data-id="${product.id}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                        </svg>
                  </button>
                </div>
            `;
            $(".cart-products").append(productHTML);
        })
    }else {
        $(".cart-products").append("<p class='empty-text'>Your cart is empty</p>");
    }

}

$(document).on('click','.delete-cart-item', function() {
    let id = $(this).attr('data-id');
    let products = JSON.parse(localStorage.getItem("products"));
    const updatedProducts = products.filter((item)=>item.id !== id);
    localStorage.setItem('products',JSON.stringify(updatedProducts));
    updateCartCount();
    displayCartItems();


})

const updateCartCount = () => {
    $(".cart-count").empty();
    const cartProducts = JSON.parse(localStorage.getItem('products'));
    $(".cart-count").html(cartProducts.length);
}

const productList = document.getElementById('product-list');
const categoriesList = document.getElementById("filter-categories");
const displayCategories = (categories) => {

    categories.map((category) => {
        let categoryHTML = `
             <div class="sub-category" data-value="${category}">
                <div class="sub-category-heading">
                    <div class="d-flex align-items-center" style="gap: 12px">
                    <span>${category}</span>
                    </div>
                </div>
            </div>
        `;

        $(categoriesList).append(categoryHTML)
    })

}
const displayProducts = (products) => {
    $(productList).empty();
    products.map((product) => {
        let productHTML = `
        <div class="col-12 col-md-6 col-lg-4">
            <div id="product-details">
                <div class="product-par">
                    <img src="${product.image}" alt="">
                    <div class="product-desc">
                    <p id="product-name">${product.title}</p>
                    <div class="add-to-cart">
                        <div id="product-price">$ ${product.price}</div>
                        <button class="cart_btn" data-title="${product.title}" data-price="${product.price}" data-image="${product.image}" data-id="${product.id}">
                            <svg width="24" height="15" viewBox="0 0 24 15" fill="none" xmlns="http://www.w3.org/2000/svg"><mask id="mask0_3226_87354" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="9" y="0" width="15" height="15"><rect x="9" width="15" height="15" fill="#C4C4C4"></rect></mask><path d="M20.4178 2.57196H19.6137L19.5983 2.48297C19.3537 1.06737 18.022 0 16.5006 0C14.9793 0 13.6475 1.06737 13.4031 2.48297L13.3876 2.57196H12.5829C11.7974 2.57261 11.0442 2.88439 10.4879 3.43913C9.93163 3.99387 9.61756 4.74641 9.61438 5.53219L9.5 10.5815C9.50173 11.7532 9.96785 12.8763 10.7961 13.7046C11.6244 14.5329 12.7472 14.9988 13.9183 15H19.0818C20.2548 14.9983 21.3792 14.5306 22.2077 13.6998C23.0362 12.869 23.501 11.7431 23.5 10.5695L23.3858 5.53907C23.3838 4.75238 23.0704 3.99852 22.5141 3.44246C21.9579 2.8864 21.2041 2.5734 20.4178 2.57196ZM14.6853 2.42833C14.9391 1.72283 15.6856 1.23021 16.5006 1.23021C17.3157 1.23021 18.0621 1.72283 18.3157 2.42833L18.3675 2.57196H14.6334L14.6853 2.42833ZM19.0823 13.7693H13.9189C13.0748 13.7696 12.265 13.4349 11.6672 12.8387C11.0694 12.2424 10.7324 11.4333 10.7301 10.5888L10.8446 5.53938C10.8457 5.07871 11.0292 4.63726 11.3551 4.31173C11.6809 3.98621 12.1224 3.80316 12.5829 3.8027H20.4172C20.8795 3.80449 21.3221 3.98961 21.6481 4.31744C21.9741 4.64528 22.1569 5.08908 22.1563 5.55152L22.2704 10.5767C22.27 11.4228 21.9341 12.2341 21.3364 12.8326C20.7387 13.4312 19.928 13.768 19.0823 13.7693Z" fill="white"></path><path d="M14.593 5.57604V5.55598C14.5928 5.39821 14.53 5.24696 14.4185 5.1354C14.307 5.02385 14.1558 4.96111 13.9981 4.96094H13.9581C13.8004 4.96114 13.6492 5.0239 13.5377 5.13544C13.4262 5.24699 13.3635 5.39823 13.3633 5.55598V6.01296C13.3633 7.63971 14.7712 8.96322 16.5017 8.96322C18.2323 8.96322 19.64 7.6396 19.64 6.01263V5.55598C19.6398 5.39823 19.577 5.24699 19.4655 5.13544C19.354 5.0239 19.2029 4.96114 19.0452 4.96094H19.0052C18.8475 4.96111 18.6963 5.02385 18.5848 5.1354C18.4732 5.24696 18.4105 5.39821 18.4103 5.55598V6.01296C18.4103 6.96117 17.5541 7.73268 16.5017 7.73268C15.4493 7.73268 14.5931 6.96105 14.5931 6.01263V5.57604H14.593Z" fill="white"></path><path d="M4.15196 8.27144V8.15354H6.33929C6.42563 8.15471 6.51135 8.13866 6.59146 8.10634C6.67157 8.07402 6.74447 8.02606 6.80594 7.96526C6.86741 7.90446 6.91622 7.83202 6.94953 7.75215C6.98285 7.67228 7 7.58657 7 7.5C7 7.41343 6.98285 7.32772 6.94953 7.24785C6.91622 7.16798 6.86741 7.09553 6.80594 7.03472C6.74447 6.97392 6.67157 6.92597 6.59146 6.89365C6.51135 6.86132 6.42563 6.84528 6.33929 6.84644H4.15196V4.6536C4.15196 4.48025 4.08328 4.31401 3.96101 4.19144C3.83874 4.06886 3.67291 4 3.5 4C3.32709 4 3.16126 4.06886 3.039 4.19144C2.91673 4.31401 2.84804 4.48025 2.84804 4.6536V6.84644H0.66072C0.574374 6.84528 0.488658 6.86132 0.408549 6.89365C0.32844 6.92597 0.255531 6.97392 0.194061 7.03472C0.132591 7.09553 0.0837867 7.16798 0.0504729 7.24785C0.0171591 7.32772 0 7.41343 0 7.5C0 7.58657 0.0171591 7.67228 0.0504729 7.75215C0.0837867 7.83202 0.132591 7.90446 0.194061 7.96526C0.255531 8.02606 0.32844 8.07402 0.408549 8.10634C0.488658 8.13866 0.574374 8.15471 0.66072 8.15354H2.84804V10.3464C2.84804 10.5197 2.91673 10.686 3.039 10.8086C3.16126 10.9311 3.32709 11 3.5 11C3.67291 11 3.83874 10.9311 3.96101 10.8086C4.08328 10.686 4.15196 10.5197 4.15196 10.3464V8.27144Z" fill="white"></path></svg>
                        </button>
                    </div>
                    </div>             
                </div>
            </div>
        </div>
`
        $(productList).append(productHTML)
    });
};

$(".sort").change(function() {
    sort = $(this).val();
    category = null;
    getProducts();
})

$(document).on('click','.sub-category', function() {
    let value = $(this).attr('data-value');
    category = value;
    getProducts();
})

$(document).on('click','.cart_btn', function () {
    let id = $(this).attr('data-id');
    let title = $(this).attr('data-title');
    let image = $(this).attr('data-image');
    let price = $(this).attr('data-price');
    let product = {id, title, image, price};

    let productsFromLocalStorage = localStorage.getItem('products');
    let productsArr = [];

    if(!productsFromLocalStorage) {
        productsArr.push(product);
        localStorage.setItem('products',JSON.stringify(productsArr));
    } else {
        let parsedProducts = JSON.parse(productsFromLocalStorage);
        console.log(productsFromLocalStorage)
        parsedProducts.push(product);
        localStorage.setItem('products',JSON.stringify(parsedProducts));
    }
    updateCartCount();
    displayCartItems();
})

