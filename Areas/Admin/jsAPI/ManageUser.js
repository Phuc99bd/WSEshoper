function DeleteUser() {
    $(".DeleteCustomer").on("click",function(){
        let id = $(this).data("id");
        Swal.fire({
            title: `Bạn có chắc chắn xóa không?`,
            text: `You won't be able to revert!`,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                $.ajax({
                    url: `/api/customers/${id}`,
                    type: 'DELETE',
                    dataType: 'json',
                    success: function (data) {
                        if (data) {
                            $(".ManageUser").find(`tr[data-id=${id}]`).remove();
                        }
                    }
                })
            }
        })
    })
}
function ViewCreate() {
    $("#openCreateCategory").unbind("click").on("click", function () {
        $(this).hide();
        $(".ShowCategory").hide();
        $(".CreateCategory").show(200);
        $(".EditCategory").hide();
    })
    $(".backShow").unbind("click").on("click", function () {
        $("#openCreateCategory").show();
        $(".ShowCategory").show(100);
        $(".CreateCategory").hide();
        $(".EditCategory").hide();
    })
    $("#CreateNewCate").on("click", function () {
  
        let category = { category_name: $("#nameCate").val() };
        if ($("#nameCate").val() == "") {
            alertify.notify("Please Enter Name Category.", "error", 7);
            $("#nameCate").focus();
            return false;
        }
        $.ajax({
            url: "/api/categories",
            type: "POST",
            data: JSON.stringify(category),
            contentType: "application/json",
            success: function (data) {
                let item = ` <tr data-id="${data.category_id}">
                            <td>${data.category_id}</td>
                            <td>${data.category_name}</td>
                            <td><a class ="templatemo-link ShowCategory" data-id="${data.category_id}"><i class ="fa fa-pencil fa-fw"></i>Edit</a></td>
                            <td><a class ="templatemo-link DeleteCategory" data-id="${data.category_id}">Delete</a></td>
                        </tr>`;
                $(".ManageCategory").prepend(item);
                $("#openCreateCategory").show();
                $(".ShowCategory").show(100);
                $(".CreateCategory").hide();
                $("#nameCate").val("");
                EditCategory();
                DeleteCategory();
            }
        })
    })
}

function EditCategory() {
    $(".ShowCategory").unbind("click").on("click",function(){
        let id = $(this).data("id");
        $.ajax({
            url: `/api/categories/${id}`,
            type: "GET",
            contentType: "application/json",
            success: function (data) {
                $("#idCate").val(data.category_id);
                $("#nameCateUpdate").val(data.category_name);
                $(".UpdateCate").attr('data-id', `${data.category_id}`);
                $("#openCreateCategory").hide();
                $(".ShowCategory").hide();
                $(".EditCategory").show(200);
            }
        })
    })
    $(".UpdateCate").unbind("click").on("click", function () {
        let id = $("#idCate").val();
        let item = { category_id: id  ,  category_name: $("#nameCateUpdate").val() };
        if ($("#nameCateUpdate").val() == "") {
            alertify.notify("Please Enter Name Category.", "error", 7);
            $("#nameCateUpdate").focus();
            return false;
        }
        $.ajax({
            url: `/api/categories/${id}`,
            type: "PUT",
            data: JSON.stringify(item),
            contentType: "application/json",
            success: function (data) {
                console.log(data);
                $(`.ShowCategory tr[data-id=${data.category_id}]`).find(`td:nth-child(2)`).html(data.category_name);
                $("#openCreateCategory").show();
                $(".ShowCategory").show(100);
                $(".CreateCategory").hide();
                $(".EditCategory").hide();
            }
        })
    })

}
function DeleteCategory() {
    $(".DeleteCategory").on("click", function () {
        let id = $(this).data("id");
        Swal.fire({
            title: `Bạn có chắc chắn xóa không?`,
            text: `You won't be able to revert!`,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                $.ajax({
                    url: `/api/categories/${id}`,
                    type: 'DELETE',
                    dataType: 'json',
                    success: function (data) {
                        if (data) {
                            $(".ManageCategory").find(`tr[data-id=${id}]`).remove();
                        }
                    }
                })
            }
        })
    })
}
function SearchCustomerAjax() {
    $("#customerSearch").on("keyup", function () {
        let search = $(this).val();
       
        $.ajax({
            url: `/Search/SearchUsers?search=${search}`,
            type: "GET",
            contentType: "application/json",
            success: function (data) {
            
                $(".ManageUser").html("");
                let i = 0;
                data.customer.forEach(item=> {
                    if (i == 7) {
                        return;
                    }
                    if (item.phone == null ) {
                        item.phone = "";
                    } if (item.street == null) {
                        item.street = "";
                    } if (item.city == null) {
                        item.city = "";
                    }
                    i++;
                    $(".ManageUser").append(`<tr data-id="${item.customer_id}">
                            <td>${item.customer_id}</td>
                            <td>${item.first_name}</td>
                            <td>${item.last_name}</td>
                            <td>${item.phone}</td>
                            <td>${item.email}</td>
                            <td>${item.street}</td>
                            <td>${item.typeLogin}</td>
                            <td>${item.city}</td>
                            <td><a class="templatemo-link DeleteCustomer" data-id="${item.customer_id}">Delete</a></td>
                        </tr>`);
                })
                $(".pagination").html("");
                $(".pagination").append(`<li class="active"><a>1</a></li>`);
                if (data.pages > 1) {
                    for (let i = 2; i <= data.pages; i++) {
                        $(".pagination").append(`<li><a href="/Admin/Main/Customer?page=${i}&pageSize=7&search=${data.search}"> </li>`);
                    }
                    $(".pagination").append(`<li class="PagedList-skipToNext"> <a href="/Admin/Main/Customer?page=2&pageSize=7&search=${data.search}"" </li>`);
                }
                DeleteUser();
            }
        })
    })
}
$(document).ready(function () {
   
    DeleteUser();
    ViewCreate();
    DeleteCategory();
    EditCategory();
    SearchCustomerAjax();
})