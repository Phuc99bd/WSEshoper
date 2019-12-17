function openCreate() {
   
    $("#btn-new-staff").on("click", function () {
        let regexMail = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
        if ($("#ip-username").val() == "" || $("#ip-email").val() == "" || $("#ip-password").val() == "" || $("#ip-repeatpassword").val() == "") {
            alertify.notify("Vui lòng nhập đầy đủ các trường!", "error", 7);
            return false;
        }
        if (!regexMail.test($("#ip-email").val())) {
            alertify.notify("Email không hợp lệ!", "error", 7);
            $("#ip-email").val("");
            return false;
        }
        if ($("#ip-password").val() != $("#ip-repeatpassword").val()) {
            alertify.notify("Nhập lại mật khẩu chưa chính xác!", "error", 7);
            $("#ip-repeatpassword").val("");
        }
        let item = {
            email: $("#ip-email").val(),
            password: $("#ip-password").val(),
            role: "user",
            username: $("#ip-username").val()
        }
        $.ajax({
            url: `/api/admins`,
            type: "POST",
            data: JSON.stringify(item),
            contentType: "application/json",
            success: function (data) {
                if (data.error != null) {
                    alertify.notify("Email đã tồn tại!", "error", 7);
                    $("#ip-email").val("");
                } else {
                    let div = `<tr class="odd gradeX" data-id="${data.id}">

                                        <td>${data.username}</td>
                                <td><a href="mailto:@${data.email}">${data.email}</a></td>
                                       <td><a href="javascript:void(0)" data-id="${data.id}" class ="btn-edit-staff">Edit</a>
                                        </td>
                                        <td><a href="javascript:void(0)" data-id="${data.id}" class ="btn-delete-staff">Delete</a></td>
                                    </tr>`;
                    $("#ip-email").val("")
                    $("#ip-password").val("")
                    $("#ip-username").val("")
                    $(".body-list-staff").prepend(div);
                    $(".active-show").show(100);
                    $(".create-staff").hide();
                    $(".edit-staff").hide();
                    DeleteStaff();
                    openEditStaff();
                }
            }
        })
    })
   
}
function DeleteStaff() {
    $(".btn-back-staff").on("click", function () {
        $(".active-show").show(100);
        $(".create-staff").hide();
        $(".edit-staff").hide();
    })
    $(".btn-delete-staff").unbind("click").on("click", function () {
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
                    url: `/api/admins/${id}`,
                    type: "DELETE",
                    success: function (data) {
                        
                        $(".body-list-staff").find(`tr[data-id=${id}]`).remove();
                    }
                })
            }
        })
    })
}

function openEditStaff() {
    $("#btn-create-staff").unbind("click").on("click", function () {
        $(".active-show").hide();
        $(".create-staff").show(100);
    })
    $(".btn-edit-staff").unbind("click").on("click", function () {
        let id = $(this).data("id");
        $.ajax({
            url: `/JsonResult/getStaff/${id}`,
            type: "GET",
            success: function (data) {
                $("#ip-edit-staff").val(data.id);
                $("#ip-edit-email").val(data.email);
                $("#ip-edit-username").val(data.username);
                $(".active-show").hide();
                $(".create-staff").hide();
                $(".edit-staff").show(100);
            }
        })
    })
    $("#btn-editInfo-staff").unbind("click").on("click", function () {
        let regexMail = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
        if ($("#ip-edit-email").val() == "" || $("#ip-edit-username").val() == "") {
            alertify.notify("Vui lòng nhập đầy đủ các trường!", "error", 7);

            return false;
        }
        if (!regexMail.test($("#ip-edit-email").val())) {

            alertify.notify("Email không hợp lệ!", "error", 7);
            $("#ip-edit-email").val("");
            return false;
        }
        let item = {
            id: $("#ip-edit-staff").val(),
            email: $("#ip-edit-email").val(),
            username: $("#ip-edit-username").val(),
            role: "",
            password: ""
        }

        let id=  $("#ip-edit-staff").val();
        $.ajax({
            url: `/api/admins/${id}`,
            type: "PUT",
            data: JSON.stringify(item),
            contentType: "application/json",
            success: function (data) {
                if (data.error !=null) {
                    alertify.notify("Email đã tồn tại!", "error", 7);
                    $("#ip-edit-email").val("");
                    return false;
                } else {

                    $(".body-list-staff").find(`tr[data-id=${data.id}] td:nth-child(1)`).html(data.username);
                    $(".body-list-staff").find(`tr[data-id=${data.id}] td:nth-child(2)`).html(`<a href="${data.email}">${data.email}</a>`);
                    $(".active-show").show(100);
                    $(".create-staff").hide();
                    $(".edit-staff").hide();
                }
            }
        })
    })
}
function searchStaff() {
    $("#input-search-staff").on("keyup", function () {
        let search = $(this).val();
        $.ajax({
            url: `/JsonSearch/SearchStaff?search=${search}`,
            type: "GET",
            success: function (data) {
                $(".body-list-staff").html("");
                data.staff.forEach(staff=> {
                   
                    $(".body-list-staff").append(` <tr class="odd gradeX" data-id="${staff.id}">

                                        <td>${staff.username}</td>
                                        <td><a href="mailto:${staff.email}">${staff.email}</a></td>
                                       <td><a href="javascript:void(0)" data-id="${staff.id}" class ="btn-edit-staff">Edit</a>
                                        </td>
                                        <td><a href="javascript:void(0)" data-id="${staff.id}" class ="btn-delete-staff">Delete</a></td>
                                    </tr>`);
                });
                    $(".pagination").html("");
                    $(".pagination").append(`<li class="active"><a>1</a></li>`);
                    if (data.pages > 1) {
                        for (let i = 2; i <= data.pages; i++) {
                            $(".pagination").append(`<li><a href="/Admin/Main/ManageStaff?page=${i}&pageSize=7&search=${data.search}">${i}</a> </li>`);
                        }
                        $(".pagination").append(`<li class="PagedList-skipToNext"> <a href="/Admin/Main/ManageStaff?page=2&pageSize=7&search=${data.search}" rel="next">»</a> </li>`);
                        DeleteStaff();
                        openEditStaff();
                    }
                }
           
        })
    })
}

$(document).ready(function () {
    openCreate();
    DeleteStaff();
    openEditStaff();
    searchStaff();
})