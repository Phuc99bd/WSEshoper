function openCreateProduct() {

    $("#openCreateProduct").on("click", function () {

        $.ajax({
            url: "/Search/ListCategory",
            type: "GET",
            dataType: 'json',
            contentType: "application/json",
            success: function (data) {
                console.log(data);
                $("#idProduct").html("");
                data.category.forEach(item=> {
                    $("#idProduct").append(`<option value="${item.category_id}"> ${item.category_name}</option>`);
                })

            }
        })
        $(this).hide();
        $(".ShowProduct").hide(100);
        $(".CreateProduct").show(200);
        $("#productSearch").parent().hide();
    })
    $(".backShowProduct").on("click", function () {
        $("#openCreateProduct").show();
        $(".ShowProduct").show(200);
        $(".CreateProduct").hide(100);
        $(".EditProduct").hide();
        $("#productSearch").parent().show();
    })
    let fileProduct;
    $("#uploadFileProduct").on("change", function () {
        let fileData = $(this).prop("files")[0];
        let math = ["image/png", "image/jpg", "image/jpeg"];

        if ($.inArray(fileData.type, math) === -1) {
            alertify.notify("Kiểu File không hợp lệ , chỉ chấp nhận jpg & png", "error", 7);
            $(".previewProduct").attr("src", ``);
            $(this).val(null);
            return false;
        }

        let fileReader = new FileReader();
        fileReader.onload = function (element) {
            $(".previewProduct").attr("src", `${element.target.result}`);
        }
        fileReader.readAsDataURL(fileData);
        let MessageformData = new FormData();
        MessageformData.append("file", fileData);
        fileProduct = MessageformData;
    })
    $("#CreateNewProduct").on("click", function () {
        let urlImage = "";
        checkInfoInput();
    })
    function checkInfoInput() {
        if ($("#nameProduct").val() == "" || $("#quantityProduct").val() == "" || $("#priceProduct").val() == "") {
            alertify.notify("Please Enter fill.", "error", 7);
            return false;
        }
        var regex = /[0-9]|\./;
        if (!regex.test($("#quantityProduct").val()) || !regex.test($("#priceProduct").val())) {
            alertify.notify("Số lượng và giá chỉ cho phép nhập số.", "error", 7);
            return false;
        }
        if ($("#uploadFileProduct").val() == "") {
            alertify.notify("Please select Image.", "error", 7);
            return false;
        }
        $.ajax({
            url: "/Search/UploadFile",
            type: "POST",
            cache: false,
            contentType: false,
            processData: false,
            data: fileProduct,
            success: function (data) {
                urlImage = data.filename;
                let formatHtml = $("#exampleCreate").find("div.fr-view").html().replace(/"/g, `'`);
                let item = {
                    product_name: $("#nameProduct").val(),
                    category_id: $("#idProduct").val(),
                    quantity: $("#quantityProduct").val(),
                    list_price: $("#priceProduct").val(),
                    status: 1,
                    image: urlImage,
                    Description: formatHtml
                }

                let nameCategory = $("#idProduct").find(`option[value=${item.category_id}]`).html();
                $.ajax({
                    url: "/api/products",
                    type: "POST",
                    data: JSON.stringify(item),
                    contentType: "application/json",
                    success: function (data) {
                        let status = (data.status == true) ? "Active" : "Not Active";
                        let item = `<tr data-id="${data.product_id}">
                            <td>${data.product_id}</td>
                            <td>${data.product_name}</td>
                            <td>${nameCategory}</td>
                            <td>${data.quantity}</td>
                            <td>${data.list_price}</td>
                            <td><img src="/images/${data.image}" width="50" height="50" /></td>
                            <td>${status}</td>

                            <td><a class ="templatemo-link ShowEditProduct" data-id="${data.product_id}"><i class ="fa fa-pencil fa-fw"></i>Edit</a></td>
                         </tr>`;
                        $(".ManageProduct").prepend(item);
                        $("#openCreateProduct").show();
                        $(".ShowProduct").show(200);
                        $(".CreateProduct").hide(100);
                        reset();
                        openEditProduct();
                    }
                })
            }
        })
    }
}
function openEditProduct() {
    let urlCurrent;
    $("a.ShowEditProduct").unbind("click").on("click", function () {
        let id = $(this).data("id");

        $.ajax({
            url: `/api/products/${id}`,
            type: "GET",
            dataType: 'json',
            contentType: "application/json",
            success: function (info) {
                console.log(info);
                $.ajax({
                    url: "/Search/ListCategory",
                    type: "GET",
                    success: function (data) {
                        console.log(data);
                        $("#idEditProduct").html("");
                        data.category.forEach(item=> {
                            console.log(item.category_id);
                            let select = (item.category_id == info.category_id) ? "selected" : "";
                            $("#idEditProduct").append(`<option value="${item.category_id}" ${select}> ${item.category_name}</option>`);
                        })
                    }
                })

                $("#idEdProduct").val(info.product_id);
                $("#nameEditProduct").val(info.product_name);
                $("#quantityEditProduct").val(info.quantity);
                $("#priceEditProduct").val(info.list_price);
                $("#statusProduct").find(`option[value=${info.status}]`).attr("selected", "");
                $(".previewEditProduct").attr("src", `/images/${info.image}`);
                urlCurrent = info.image;
                $("#openCreateProduct").hide();
                $(".ShowProduct").hide(100);
                $(".CreateProduct").hide();
                $(".EditProduct").show(200);
                $("#productSearch").parent().hide();
                let format = (info.Description).replace(/"/g, `"`);
                $("#exampleEdit").find("div.fr-view").html("");
                $("#exampleEdit").find("div.fr-view").html(format);
            },
            error: function (data) {

            }

        })

    })
    let fileProduct;
    $("#uploadFileEditProduct").on("change", function () {
        let fileData = $(this).prop("files")[0];
        let math = ["image/png", "image/jpg", "image/jpeg"];

        if ($.inArray(fileData.type, math) === -1) {
            alertify.notify("Kiểu File không hợp lệ , chỉ chấp nhận jpg & png", "error", 7);
            $(this).val(null);
            return false;
        }

        let fileReader = new FileReader();
        fileReader.onload = function (element) {
            $(".previewEditProduct").attr("src", `${element.target.result}`);
        }
        fileReader.readAsDataURL(fileData);
        let MessageformData = new FormData();
        MessageformData.append("file", fileData);
        fileProduct = MessageformData;
    })
    $("#UpdateProduct").unbind("click").on("click", function () {
        let divId = $("#idEdProduct").val();
        checkInfo(divId);

    })
    function checkInfo(divId) {
        if ($("#nameEditProduct").val() == "" || $("#quantityEditProduct").val() == "" || $("#priceEditProduct").val() == "") {
            alertify.notify("Please Enter fill.", "error", 7);
            return false;
        }
        var regex = /[0-9]|\./;
        if (!regex.test($("#quantityEditProduct").val()) || !regex.test($("#priceEditProduct").val())) {
            alertify.notify("Số lượng và giá chỉ cho phép nhập số.", "error", 7);
            return false;
        }
        let item;
        if ($("#uploadFileEditProduct").val() == "") {
            let formatHtml = $("#exampleEdit").find("div.fr-view").html().replace(/"/g, `'`);

            item = {
                product_id: $("#idEdProduct").val(),
                product_name: $("#nameEditProduct").val(),
                category_id: $("#idEditProduct").val(),
                quantity: $("#quantityEditProduct").val(),
                list_price: $("#priceEditProduct").val(),
                status: ($("#statusProduct").val() == "true") ? 1 : 0,
                image: urlCurrent,
                Description: formatHtml
            }

            $.ajax({
                url: `/api/products/${divId}`,
                type: "PUT",
                data: JSON.stringify(item),
                contentType: "application/json",
                success: function (data) {

                    $(".ManageProduct").find(`tr[data-id=${data.product.product_id}] td:nth-child(2)`).html(data.product.product_name);
                    $(".ManageProduct").find(`tr[data-id=${data.product.product_id}] td:nth-child(3)`).html(data.category.category_name);
                    $(".ManageProduct").find(`tr[data-id=${data.product.product_id}] td:nth-child(4)`).html(data.product.quantity);
                    $(".ManageProduct").find(`tr[data-id=${data.product.product_id}] td:nth-child(5)`).html(data.product.list_price);
                    $(".ManageProduct").find(`tr[data-id=${data.product.product_id}] td:nth-child(6) img`).attr("src", `/images/${data.product.image}`);

                    let status = (data.product.status == true) ? "Active" : "Not Active";
                    $(".ManageProduct").find(`tr[data-id=${data.product.product_id}] td:nth-child(7)`).html(status);
                    $("#openCreateProduct").show();
                    $(".ShowProduct").show(200);
                    $(".CreateProduct").hide();
                    $(".EditProduct").hide(100);
                    $("#productSearch").parent().show();
                }

            })
        } else {
            let urlImage = "";
            $.ajax({
                url: "/Search/UploadFile",
                type: "POST",
                cache: false,
                contentType: false,
                processData: false,
                data: fileProduct,
                success: function (data) {
                    urlImage = data;
                    let formatHtml = $("#exampleEdit").find("div.fr-view").html().replace(`"`, `'`);
                    item = {
                        product_id: $("#idEdProduct").val(),
                        product_name: $("#nameEditProduct").val(),
                        category_id: $("#idEditProduct").val(),
                        quantity: $("#quantityEditProduct").val(),
                        list_price: $("#priceEditProduct").val(),
                        status: ($("#statusProduct").val() == "true") ? 1 : 0,
                        image: urlImage,
                        Description: formatHtml
                    }
                    $.ajax({
                        url: `/api/products/${divId}`,
                        type: "PUT",
                        data: JSON.stringify(item),
                        contentType: "application/json",
                        success: function (data) {
                            $(".ManageProduct").find(`tr[data-id=${data.product.product_id}] td:nth-child(2)`).html(data.product.product_name);
                            $(".ManageProduct").find(`tr[data-id=${data.product.product_id}] td:nth-child(3)`).html(data.category.category_name);
                            $(".ManageProduct").find(`tr[data-id=${data.product.product_id}] td:nth-child(4)`).html(data.product.quantity);
                            $(".ManageProduct").find(`tr[data-id=${data.product.product_id}] td:nth-child(5)`).html(data.product.list_price);
                            $(".ManageProduct").find(`tr[data-id=${data.product.product_id}] td:nth-child(6) img`).attr("src", `/images/${data.product.image}`);

                            let status = (data.product.status == true) ? "Active" : "Not Active";
                            $(".ManageProduct").find(`tr[data-id=${data.product.product_id}] td:nth-child(7)`).html(status);
                            $("#openCreateProduct").show();
                            $(".ShowProduct").show(200);
                            $(".CreateProduct").hide();
                            $(".EditProduct").hide(100);
                            $("#productSearch").parent().show();
                        }

                    })
                }
            });
        }
    }
}

function SearchProductAjax() {
    $("#productSearch").on("keyup", function () {
        let search = $(this).val();

        $.ajax({
            url: `/Search/SearchProducts?search=${search}`,
            type: "GET",
            contentType: "application/json",
            success: function (data) {

                $(".ManageProduct").html("");
                let i = 0;
                data.product.forEach(item=> {
                    if (i == 7) {
                        return;
                    }
                    i++;
                    let status = (item.product.status == true) ? "Active" : "Not Active";
                    $(".ManageProduct").append(`<tr data-id="${item.product.product_id}">
                            <td>${item.product.product_id}</td>
                            <td>${item.product.product_name}</td>
                            <td>${item.category.category_name}</td>
                            <td>${item.product.quantity}</td>
                            <td>${item.product.list_price}</td>
                            <td><img src="/images/${item.product.image}" width="50" height="50" /></td>
                            <td>${status}</td>
                            <td><a class="templatemo-link ShowEditProduct" data-id="${item.product.product_id}"><i class="fa fa-pencil fa-fw"></i>Edit</a></td>
                        </tr>`);
                })
                $(".pagination").html("");
                $(".pagination").append(`<li class="active"><a>1</a></li>`);
                if (data.pages > 1) {
                    for (let i = 2; i <= data.pages; i++) {
                        $(".pagination").append(`<li><a href="/Admin/ManageProduct?page=${i}&pageSize=7&search=${data.search}">${i}</a> </li>`);
                    }
                    $(".pagination").append(`<li class="PagedList-skipToNext"> <a href="/Admin/ManageProduct?page=2&pageSize=7&search=${data.search}" rel="next">»</a> </li>`);
                }
                openEditProduct();
            }
        })
    })
}

function reset() {
    $("#nameProduct").val("")
    $("#quantityProduct").val("")
    $("#priceProduct").val("")
    $("#uploadFileProduct").val("")
    $("#exampleCreate").find("div.fr-view").html("");
    $(".previewProduct").attr("src", ``);
}

$(document).ready(function () {
    new FroalaEditor('#exampleCreate')
    new FroalaEditor('#exampleEdit')
    openEditProduct();
    openCreateProduct();
    SearchProductAjax();
})