function AjaxFindProduct() {
    $("#searchProduct").on("keyup", function () {
        let search = $(this).val();
        let idCate = $(this).data("id");
        $.ajax({
            url: `/Search/SearchProductOnInterFace?search=${search}&id=${idCate}`,
            type: "GET",
            contentType: "application/json",
            success: function (data) {

                $(".ResultSearch").html("");
                $(".ResultSearch").append(` <h2 class="sidebar-title">Products</h2>`);
                if (data.model2 != undefined) {
                    data.model2.product.forEach(item=> {
                        $(".ResultSearch").append(`<div class="thubmnail-recent">
                        <img src="../Images/${item.image}" class="recent-thumb" alt="">
                        <h2><a href="/SingleProduct?id=${item.product_id}">${item.product_name}</a></h2>
                        <div class="product-sidebar-price">
                            <ins>${item.list_price} đ</ins>
                        </div>
                    </div>`);
                    })
                }
                if (data.product != undefined) {
                    data.product.forEach(item=> {
                        $(".ResultSearch").append(`<div class="thubmnail-recent">
                        <img src="../Images/${item.image}" class="recent-thumb" alt="">
                        <h2><a href="/SingleProduct?id=${item.product_id}">${item.product_name}</a></h2>
                        <div class="product-sidebar-price">
                            <ins>${item.list_price} đ</ins>
                        </div>
                    </div>`);
                    })
                }
            }
        })

    })
    $("#searchProductOnCart").on("keyup", function () {
        let search = $(this).val();

        $.ajax({
            url: `/Search/SearchProductCart?search=${search}`,
            type: "GET",
            contentType: "application/json",
            success: function (data) {

                $(".ResultSearch").html("");
                $(".ResultSearch").append(` <h2 class="sidebar-title">Products</h2>`);
                if (data.model2 != undefined) {
                    data.model2.product.forEach(item=> {
                        $(".ResultSearch").append(`<div class="thubmnail-recent">
                        <img src="../Images/${item.image}" class="recent-thumb" alt="">
                        <h2><a href="/SingleProduct?id=${item.product_id}">${item.product_name}</a></h2>
                        <div class="product-sidebar-price">
                            <ins>${item.list_price} đ</ins>
                        </div>
                    </div>`);
                    })
                }

            }
        })

    })
}
function Buy() {
    $(".add-to-cart-link").on("click", function () {
        let id = $(this).data("id");

        $.ajax({
            url: `/Cart/Buy?id=${id}`,
            type: "GET",
            contentType: "application/json",
            success: function (data) {
                let price = 0, count = 0;
                data.cart.forEach(item=> {
                    price += item.cart.list_price * item.quantity;
                    count += item.quantity;
                })
                $(".countCart").html(`${count}`);
            }
        })
    })
}
function BuyByQuantity() {
    $(".add_to_cart_by_quantity").on("click", function () {
        let id = $(this).data("id");
        let quantity = $(".quantityProduct").val();

        $.ajax({
            url: `/Cart/BuyByQuantity?id=${id}&quantity=${quantity}`,
            type: "GET",
            contentType: "application/json",
            success: function (data) {
                let price = 0, count = 0;
                data.cart.forEach(item=> {
                    price += item.cart.list_price * item.quantity;
                    count += item.quantity;
                })
                $(".countCart").html(`${count}`);

            }
        })
    })
}
function Quantity() {
    $(".plus").on("click", function () {
        let id = $(this).data("id");
        let current = +($(`#quantity_${id}`).val());
        $(`#quantity_${id}`).val(current + 1);
        $.ajax({
            url: `/Cart/UpCountSP?id=${id}`,
            type: "GET",
            success: function (data) {
                let totaLnEW = 0; let price = 0, count = 0;
                data.cart.forEach(item=> {
                    if (item.cart.product_id == id) {
                        totaLnEW = item.cart.list_price * item.quantity;
                    }
                    price += item.cart.list_price * item.quantity;
                    count += item.quantity;
                })
                if (totaLnEW == 0) {
                    $(`.itemCart[data-id=${id}]`).remove();
                }
                $(`.itemCart[data-id=${id}]`).find("p.cart_total_price").html(`${totaLnEW} đ`);
                $(".countCart").html(`${count}`);
                $(".total_area").find("ul li:nth-child(1) span").html(`${price} đ`);
                $(".total_area ul li:nth-child(3) span").html(`${price} đ`)
            }
        })

    })
    $(".minus").on("click", function () {
        let id = $(this).data("id");
        let current = +($(`#quantity_${id}`).val());
        if (current > 1) {
            $(`#quantity_${id}`).val(current - 1);
            $.ajax({
            url: `/Cart/DownCountSP?id=${id}`,
            type: "GET",
            success: function (data) {
                let totaLnEW = 0; let price = 0, count = 0;
                data.cart.forEach(item=> {
                    if (item.cart.product_id == id) {
                        totaLnEW = item.cart.list_price * item.quantity;
                    }
                    price += item.cart.list_price * item.quantity;
                    count += item.quantity;
                })
                if (totaLnEW == 0) {
                    $(`.itemCart[data-id=${id}]`).remove();
                }
                $(`.itemCart[data-id=${id}]`).find("p.cart_total_price").html(`${totaLnEW} đ`);
                $(".countCart").html(`${count}`);
                $(".total_area").find("ul li:nth-child(1) span").html(`${price} đ`);
                $(".total_area").find("ul li:nth-child(3) span").html(`${price} đ`);

            }
        })
        }
       
    })
}
function RemoveProduct() {
    $(".removeProduct").on("click", function () {
        let id = $(this).data("id");
        $.ajax({
            url: `/Cart/Remove?id=${id}`,
            type: "GET",
            contentType: "application/json",
            success: function (data) {
                if (data.cart == null) {
                    $(".mainCart").html("");
                    $(".countCart").html(`0`);
                    $(".total_area").find("ul li:nth-child(1) span").html(`0 đ`);
                    $(".total_area").find("ul li:nth-child(3) span").html(`0 đ`);
                }
                $(`.cart_item[data-id=${id}]`).remove();
                let price = 0, count = 0;
                data.cart.forEach(item=> {
                    price += item.cart.list_price * item.quantity;
                    count += item.quantity;
                })
                $(".countCart").html(`${count}`);
                $(".total_area").find("ul li:nth-child(1) span").html(`${price} đ`);
                $(".total_area").find("ul li:nth-child(3) span").html(`${price} đ`);
                $(`.itemCart[data-id=${id}]`).remove();

            },
            error: function () {
                
            }
        })
    })
}
function loadDingNav() {
    var current = location.pathname;
    if (current == "/") {
        $(".navbar-nav li:nth-child(1)").addClass("active");
    } else {

        $(".navbar-nav li a").each(function () {
            var $this = $(this);
            if ($this.attr("href") != undefined) {
                if ($this.attr("href").indexOf(current) !== -1) {
                    $this.parent().addClass('active');
                }
            }
        })
    }
    if (current.indexOf("Category") == 1) {
        $(".navbar-nav li:nth-child(5)").addClass("active");
    }
}
function UpdateCart() {
    $("#update_cart").on("click", function () {
        let cartNew = [];
        $(".mainCart").find("tr.cart_item").each((index, item) => {
            let id = $(item).data("id");
            let element = {
                cart: {
                    product_id: id
                },
                quantity: $(`#quantity_${id}`).val()
            }
            cartNew.push(element);
        })
        $.ajax({
            url: "/Cart/Update",
            type: "PUT",
            contentType: "application/json",
            data: JSON.stringify(cartNew),
            success: function (data) {
                cartNew.forEach(item=> {
                    if (item.quantity < 1) {
                        $(`.cart_item[data-id=${item.cart.product_id}]`).remove();
                    }
                })
                let price = 0, count = 0;
                data.cart.forEach(item=> {
                    price += item.cart.list_price * item.quantity;
                    count += item.quantity;
                    $(`.product-subtotal[data-id=${item.cart.product_id}]`).find("span.amount").html(`${item.cart.list_price * item.quantity} đ`);
                })
                $(".cart-amunt").html(`${price} đ`);
                $(".product-count").html(`${count}`);
                $(".order-total").find("span.amount").html(`${price} đ`);
                $(".cart-subtotal").find("span.amount").html(`${price} đ`);
            }
        })
    })
}
function loadCategory() {
    $.ajax({
        url: `/Search/ListCategory`,
        type: "GET",
        success: function (data) {
            $(".category-products").html("");
            data.category.forEach(item=> {
                $(".category-products").append(`<div class="panel panel-default">
                            <div class="panel-heading">
                                <h4 class="panel-title"><a href="/Category?id=${item.category_id}">${item.category_name}</a></h4>
                            </div>
                        </div>`);
            })
        }
    })
}

function WriteOneComment() {
    $("#btn_comment").on("click", function () {
        let regexMail = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
        if ($("#name").val() == "" || $("#email").val() == "" || $("#message").val() == "") {
            alertify.notify("Vui lòng nhập đầy đủ cac trường.", "error", 7);
            return false;
        }
        if (!regexMail.test($("#email").val())) {
            alertify.notify("Email không hợp lệ.", "error", 7);
            $("#email").val("");
            return false;
        }
        let id = $(this).data("id");
        let item = {
            product_id: id,
            content: $("#message").val(),
            name: $("#name").val(),
            email: $("#email").val()
        }
        $.ajax({
            url: `/api/commentOfProducts`,
            type: "POST",
            data: JSON.stringify(item),
            contentType: "application/json",
            success: function (data) {
                console.log(data);
                $(".list-comment").prepend(` <li class="list-group-item ids-comment">
                                                <div class="row">
                                                    <div class="col-xs-2 col-md-1">
                                                        <img src="http://placehold.it/80" class="img-circle img-responsive" alt="" />
                                                    </div>
                                                    <div class="col-xs-10 col-md-11 css-fix-comment">
                                                        <div>
                                                            <div class="mic-info">
                                                                ${data.name} <i class ="fa fa-user"></i> &nbsp; ${new Date(data.createdAt)} <i class="fa fa-calendar-o"></i>
                                                            </div>

                                                        </div>
                                                        <div class="comment-text">
                                                            ${data.content}
                                                        </div>

                                                    </div>
                                                </div><hr />
                                            </li>`);
                $("#name").val("");
                $("#email").val(""); $("#message").val("");
            }
        })
    })
}
$(document).ready(function () {
    AjaxFindProduct();
    Buy();
    BuyByQuantity();
    Quantity();
    RemoveProduct();
    UpdateCart();
    loadDingNav();
    loadCategory();
    WriteOneComment();
})