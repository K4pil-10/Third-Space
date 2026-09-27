var products =[
    {
        id:1,
        name:"T-Shirt",
        price:799,
        category: "fashion",
        image: "👕"
        
    },

    {
        id:2,
        name:"Shoes",
        price:2499,
        category:"fashion",
        image:"👟"

    },
{
id:3,
name: "Headphones",
price:"1999",
category:"electronics",
image:"🎧"
},

{
    id:4,
    name:"Smart Watch",
    price:"2999",
    category:"electronics",
    image:"⌚"
},

{
    id:5,
    name:"Chocolate",
    price:"150",
    category:"food",
    image:"🍫"
},

{
    id:6,
    name:"Burger",
    price:"250",
    category:"food",
    image:"🍔"
},

{
    id:7,
    name:"Bag",
    price:1499,
    category:"accessories",
    image:"🎒"
},

{
    id:8,
    name:"Sunglasses",
    price:999,
    category:"accessories",
    image:"🕶️"
}
    
];

var cart =[];
function showProducts(){

    var productBox = document.getElementById("products");
    var search = document.getElementById("search").value.toLowerCase();
    var category = document.getElementById("category").value
    productBox.innerHTML ="";

    for (var i=0; i<products.length; i++)
{
    var product = products[i];

    if(product.name.toLocaleLowerCase().includes(search)&&
(
    category =="all"
    ||
    product.category == category
))
{
    var newProduct = document.createElement("div");
    newProduct.className = "product";

    newProduct.innerHTML = '<div class="product-image">'
                            + product.image +
                            '</div>' +

                            '<div class="product-details">' +
                            '<h3>' + product.name + '</h3>' +
                            '<p>' + product.category + '</p>' +
                            '<p class="price">' + 'Rs. ' + product.price + '</p>' +
                            '<button class ="add-button">' + 'Add to Cart' + '</button>' +
                            '</div>'

                            productBox.appendChild(newProduct);

                            var button = newProduct.querySelector(".add-button");

                            button.addEventListener("click", function()
                        {
                            addToCart(product.id);
                        });
                    
                
            
                 }
            }
        } 

        function addToCart(id){
            var found = false;
            for (var i=0; i<cart.length; i++){
                if (cart[i].id == id){
                    cart[i].quantity++;
                    found=true;
                }
            }

            if (found == false){
                for (var i=0; i<products.length; i++){
                    if (products[i].id == id){
                        var newItem = {
                            id: products[i].id,
                            name: products[i].name,
                            price: products[i].price,
                            image: products[i].image,
                            quantity: 1
                        };
                        cart.push(newItem);
                    }
                }
            }
        
        updateCart();
        openCart();
        
        }


        function updateCart(){
            var cartBox = document.getElementById("cartItems");

            cartBox.innerHTML ="";

            var total=0;
            var number=0;

            for (var i=0; i<cart.length; i++){
                var item = cart[i];
                total=total+item.price*item.quantity;
                number=number+item.quantity;
                var cartItem = document.createElement("div");
                cartItem.className="cart-item";
                cartItem.innerHTML='<div class="cart-name">'
                + item.image + "" + item.name +
                '</div>' +
                '<div class="quantity">'
                +
                '<button class="minus">-</button>'+
                '<b>' + item.quantity + '</b>' +
                '<button class="plus">+</button>' +
                '</div> ' +
                '<button class="delete">🗑️</button>';

                cartBox.appendChild(cartItem);

                var minus = cartItem.querySelector(".minus");
                var plus = cartItem.querySelector(".plus");
                var deleteButton = cartItem.querySelector(".delete");

                minus.addEventListener(
                    "click",function(){
                        changeQuantity(item.id, -1);
                    }
                );

                plus.addEventListener(
                    "click", function(){
                        changeQuantity(item.id,1);
                    }
                );

                deleteButton.addEventListener(
                    "click", function(){
                        removeItem(item.id);
                    }
                );
            }

            document.getElementById("cartNumber").innerText = number;
            document.getElementById("totalPrice").innerText = "Rs. " + total;
        }

        function removeItem(id){

    for (var i=0; i<cart.length; i++){

        if (cart[i].id == id){

            cart.splice(i,1);

        }

    }

    updateCart();

}

        function changeQuantity(id, number){
            for (var i=0; i<cart.length;i++){
                if (cart[i].id == id){
                    cart [i].quantity = cart[i].quantity + number;
                    if (cart[i].quantity <=0){
                        cart.splice(i,1);
                    }
                }
            }

            updateCart();
        }

        function openCart(){
            document.getElementById("cart")
            .classList.add("open");

            document.getElementById("dark")
            .classList.add("show");
        }

        function closeCart(){
            document.getElementById("cart")
            .classList.remove("open");

            document.getElementById("dark")
            .classList.remove("show");
        }

        document.getElementById("cartButton")
        .addEventListener("click",openCart);

        document.getElementById("closeCart")
        .addEventListener("click",closeCart);

        document.getElementById("search")
        .addEventListener("input",showProducts);

        document.getElementById("category")
.addEventListener("change",showProducts);


        document.getElementById("checkout")
        .addEventListener("click",function(){
            if (cart.length == 0){
                alert("Your cart is empty!");
                return;
            }
            closeCart();
            document.getElementById("orderMessage")
            .classList.add("show");

            document.getElementById("dark")
            .classList.add("show");
        });

        document.getElementById("done")
        .addEventListener("click", function(){
            cart =[];
            updateCart();

            document.getElementById("orderMessage")
            .classList.remove("show");

            document.getElementById("dark")
            .classList.remove("show");
        });

        showProducts();