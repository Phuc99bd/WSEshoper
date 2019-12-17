function OpenCreate() {
    $("#btn-create-student").on("click", function () {
        $(".active-show").hide();
        $(".create-student").show(100);
    })
    $("#btn-new-student").on("click", function () {
        let regexPhone = new RegExp("^(0)[0-9]{9,10}$");
        let regexMail = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
        var regex = /[0-9]|\./;
        if ($("#ip-MSSV-create").val() == "") {
            alertify.notify("Mã Sinh viên không được để trống.", "error", 7);
            return false;
        }
        if (!regex.test($("#ip-MSSV-create").val())) {
            alertify.notify("Mã Sinh viên chỉ cho phép nhập số.", "error", 7);
            return false;
        }
        if ($("#ip-username").val() == "") {
            alertify.notify("Tên sinh viên không được để trống.", "error", 7);
            return false;
        }
        if (!regexPhone.test($("#ip-phone").val())) {
            alertify.notify("Số điện thoại không hợp lệ!.Vui lòng nhập lại.", "error", 7);
            $("#ip-phone").val("");
            return false;
        }
        if (!regexMail.test($("#ip-email").val())) {
            alertify.notify("Email không hợp lệ!.Vui lòng nhập lại.", "error", 7);
            $("#ip-email").val("");
            return false;
        }
        let mssv = $("#ip-MSSV-create").val();
        let email = $("#ip-email").val();
        $.ajax({
            url: `/api/students?id=${mssv}&email=${email}`,
            type: "GET",
            success: function (data) {
               
                if (data.error != null) {
                    if (data.error == 0) {
                        alertify.notify("Mã số sinh viên đã tồn tại!", "error", 7);
                        $("#ip-MSSV-create").val("");
                        return false;
                    } else {
                        alertify.notify("Email đã tồn tại!", "error", 7);
                        $("#ip-email").val("");
                        return false;
                    }
                } else {


                    let item = {
                        MSSV: $("#ip-MSSV-create").val(),
                        username: $("#ip-username").val(),
                        phone: $("#ip-phone").val(),
                        email: $("#ip-email").val(),
                        ResetToken: null,
                        password: $("#ip-MSSV-create").val()
                    }
                    $.ajax({
                        url: "/api/students",
                        type: "POST",
                        data: JSON.stringify(item),
                        contentType: "application/json",
                        success: function (data) {
                            let student = ` <tr class="odd gradeX" id="ManageStudent" data-mssv="${data.MSSV}">
                                        <td>#${data.MSSV}</td>
                                        <td>${data.username}</td>
                                        <td><a href="mailto:${data.email}">${data.email}</a></td>
                                        <td>${data.phone}</td>
                                        <td>
                                            <a href="javascript:void(0)" data-mssv="${data.MSSV}" class ="btn-edit-student">Edit</a>
                                        </td>
                                        <td><a href="javascript:void(0)" data-mssv="${data.MSSV}" class ="btn-delete-student">Delete</a></td>
                                    </tr>`;
                            $("#ip-MSSV-create").val(""),
                            $("#ip-username").val(""),
                            $("#ip-phone").val(""),
                            $("#ip-email").val(""),
                            $(".body-list-student").prepend(student);
                            $(".active-show").show(100);
                            $(".create-student").hide();
                            $(".edit-student").hide();
                            openEditStudent();
                            DeleteStudent();
                        }

                    })
                }
            }     
        });
    })
    $(".btn-back-student").on("click", function () {
        $(".active-show").show(100);
        $(".create-student").hide();
        $(".edit-student").hide();
    })
   
}

function DeleteStudent() {
    $(".btn-delete-student").unbind("click").on("click", function () {
        let MSSV = $(this).data("mssv");
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
                    url: `/api/students/${MSSV}`,
                    type: "DELETE",
                    success: function (data) {
                        $(".body-list-student").find(`tr[data-mssv=${data.MSSV}]`).remove();
                
                    }
                })
            }
        })
    })
}

function openEditStudent() {
    $(".btn-edit-student").unbind("click").on("click", function () {
        let id = $(this).data("mssv");
        $.ajax({
            url: `/JsonResult/getStudent?id=${id}`,
            type: `GET`,
            success: function (data) {
                $("#ip-MSSV").val(data.MSSV);
                $("#ip-edit-username").val(data.username);
                $("#ip-edit-email").val(data.email);
                $("#ip-edit-phone").val(data.phone);
                $(".active-show").hide();
                $(".create-student").hide();
                $(".edit-student").show(100);

            }
        })
    })
    $("#btn-editInfo-student").unbind("click").on("click", function() {
        let regexPhone = new RegExp("^(0)[0-9]{9,10}$");
        let regexMail = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
        var regex = /[0-9]|\./;
        if ($("#ip-MSSV").val() == "") {
            alertify.notify("Mã Sinh viên không được để trống.", "error", 7);
            return false;
        }
        if (!regex.test($("#ip-MSSV").val())) {
            alertify.notify("Mã Sinh viên chỉ cho phép nhập số.", "error", 7);
            return false;
        }
        if ($("#ip-edit-username").val() == "") {
            alertify.notify("Tên sinh viên không được để trống.", "error", 7);
            return false;
        }
        if (!regexPhone.test($("#ip-edit-phone").val())) {
            alertify.notify("Số điện thoại không hợp lệ!.Vui lòng nhập lại.", "error", 7);
            $("#ip-edit-phone").val("");
            return false;
        }
        if (!regexMail.test($("#ip-edit-email").val())) {
            alertify.notify("Email không hợp lệ!.Vui lòng nhập lại.", "error", 7);
            $("#ip-edit-email").val("");
            return false;
        }
        let mssv = $("#ip-MSSV").val();
        let email = $("#ip-edit-email").val();
        $.ajax({
            url: `/JsonResult/checkUpdate?id=${mssv}&email=${email}`,
            type: "GET",
            success: function (data) {
                
                if (data.error != null) {
                    alertify.notify("Email đã tồn tại!", "error", 7);
                    $("#ip-edit-email").val("");
                    return false;
                } else {
                    let item = {
                        MSSV: $("#ip-MSSV").val(),
                        phone: $("#ip-edit-phone").val(),
                        email: $("#ip-edit-email").val(),
                        username: $("#ip-edit-username").val(),
                        ResetToken: null,
                        password:null
                    }
                    
                    $.ajax({
                        url: `/api/students/${mssv}`,
                        type: "PUT",
                        data: JSON.stringify(item),
                        contentType: "application/json",
                        success: function (data) {
                           
                            $(".body-list-student").find(`tr[data-mssv=${data.MSSV}] td:nth-child(2)`).html(data.username);
                            $(".body-list-student").find(`tr[data-mssv=${data.MSSV}] td:nth-child(3)`).html(`<a href="mailto:${data.email}">${data.email}</a>`);
                            $(".body-list-student").find(`tr[data-mssv=${data.MSSV}] td:nth-child(4)`).html(data.phone);
                            $(".active-show").show(100);
                            $(".create-student").hide();
                            $(".edit-student").hide();
                        }
                    })
                }
               
            }
        })
    })
}
      
function SearchStudent() {
    $("#input-search-student").on("keyup", function () {
        let search = $(this).val();
        $.ajax({
            url: `/JsonSearch/SearchStudent?search=${search}`,
            type: "GET",
            success: function (data) {
           
                $(".body-list-student").html("");
                data.student.forEach(student=> {
                    $(".body-list-student").append(` <tr class="odd gradeX" id="ManageStudent" data-mssv="${student.MSSV}">
                                        <td>#${student.MSSV}</td>
                                        <td>${student.username}</td>
                                        <td><a href="mailto:${student.email}">${student.email}</a></td>
                                        <td>${student.phone}</td>
                                        <td>
                                            <a href="javascript:void(0)" data-mssv="${student.MSSV}" class ="btn-edit-student">Edit</a>
                                        </td>
                                        <td><a href="javascript:void(0)" data-mssv="${student.MSSV}" class ="btn-delete-student">Delete</a></td>
                                    </tr>`);
                      $(".pagination").html("");
                    $(".pagination").append(`<li class="active"><a>1</a></li>`);
                    if (data.pages > 1) {    
                        for (let i = 2; i <= data.pages; i++) {
                            $(".pagination").append(`<li><a href="/Admin/Main/ManageStudent?page=${i}&pageSize=7&search=${data.search}">${i}</a> </li>`);
                        }
                        $(".pagination").append(`<li class="PagedList-skipToNext"> <a href="/Admin/Main/ManageStudent?page=2&pageSize=7&search=${data.search}" rel="next">»</a> </li>`);
                    }
                    openEditStudent();
                    DeleteStudent();
                })
            }
        })
    })
}


$(document).ready(function () {
    OpenCreate();
    DeleteStudent();
    openEditStudent();
    SearchStudent();
})