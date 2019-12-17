function ActiveOrder() {
    $(".btn-active-order").unbind("click").on("click", function () {
        console.log("aa");
        let idOrder = $(this).data("order");
        $(this).remove();

        $.ajax({
            url: `/api/orders/${idOrder}`,
            type: "PUT",
            contentType: "application/json",
            success: function (data) {
                $(`tr[data-order=${idOrder}]`).find("td:nth-child(8)").append(`Đang vận chuyển`);
            }
        })
    })
}

function ViewDetail() {
    $(".viewInfoDetail").unbind("click").on("click", function () {
        let idOrder = $(this).data("order");
        let nameCustomer = $(`tr[data-order=${idOrder}]`).find("td:nth-child(1)").html() + " " + $(`tr[data-order=${idOrder}]`).find("td:nth-child(2)").html();
        $.ajax({
            url: ` /api/order_items/${idOrder}`,
            type: "GET",
            success: function (data) {
                console.log(data);
                $("#detailOrder_title").html(`Đơn hàng #${idOrder}`);
                let item = "";
            
                data.forEach(i=> {
                    item += `<tr><td> ${i.item.item_id}</td> <td>${i.product.product_name} </td><td> ${i.item.quantity}</td><td> ${i.item.list_price}</td><td> ${i.item.list_price * i.item.quantity}</td></tr>`
                });
                $(".list_item").html(item);
                $("#detailOrder").modal("show");
            }
        })
    })
}

function SearchOrderAjax() {
    $("#orderSearch").on("keyup", function () {
        let search = $(this).val();

        $.ajax({
            url: `/Search/SearchOrder?search=${search}`,
            type: "GET",
            contentType: "application/json",
            success: function (data) {
                console.log(data);
                $(".ManageOrder").html("");
                let i = 0;
                data.order.forEach(item=> {
                    if (i == 7) {
                        return;
                    }
                    let status = (!item.order_status) ? `<td><a class="btn-active-order" data-order="${item.order_id}">Kich hoạt</a></td>` : `  <td>Đang vận chuyển</td>`;
                    let date = (item.order_date).slice(6, item.order_date.length - 2);

                    let orderDate = new Date((+date));
                    console.log(orderDate);
                    let date2 = (item.shipped_date).slice(6, item.shipped_date.length - 2);
                    let shipDate = new Date((+date2));
                    let order = orderDate.getDay() + "/" + orderDate.getMonth() + "/" + orderDate.getYear();
                    let ship = shipDate.getDay() + "/" + shipDate.getMonth() + "/" + shipDate.getYear();
                    $(".ManageOrder").append(` <tr data-order="${item.order_id}">

                            <td>${item.first_name}</td>
                            <td>${item.last_name}</td>
                            <td>${item.phone}</td>
                            <td>${item.email}</td>
                            <td>${item.street}</td>
                            <td>${order}</td>
                            <td>${ship}</td>
                            ${status}
                            <td><a class="viewInfoDetail" data-order="${item.order_id}">Chi tiết</a></td>
                        </tr>`);
                    i++;
                })
                $(".pagination").html("");
                $(".pagination").append(`<li class="active"><a>1</a></li>`);
                if (data.pages > 1) {
                    for (let i = 2; i <= data.pages; i++) {
                        $(".pagination").append(`<li><a href="/Admin/ManageOrder?page=${i}&pageSize=7&search=${data.search}">${i}</a> </li>`);
                    }
                    $(".pagination").append(`<li class="PagedList-skipToNext"> <a href="/Admin/ManageOrder?page=2&pageSize=7&search=${data.search}" rel="next">»</a> </li>`);
                }
                ActiveOrder();
                ViewDetail();
            }
        })
    })
}
$(document).ready(function () {
    ActiveOrder();
    ViewDetail();
    SearchOrderAjax();
})