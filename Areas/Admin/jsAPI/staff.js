function openCreateStaff() {
    $("#openCreateStaff").on("click", function () {
       
                 $("#openCreateStaff").hide();
                $(".ShowStaff").hide(100);
                $(".CreateStaff").show(200);
                $(".EditStaff").hide();

           
    })
    $(".backShowStaff").on("click", function () {
        $("#openCreateStaff").show();
        $(".ShowStaff").show(200);
        $(".CreateStaff").hide(100);
        $(".EditStaff").hide();
    })
    $("#CreateNewStaff").on("click", function () {
        let regexMail = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
        let regexPhone = new RegExp("^(0)[0-9]{9,10}$");
        if ($("#nameStaff").val() == "" || $("#phoneStaff").val() == "" || $("#emailStaff").val() == "" || $("#pwStaff").val() == "") {
            alertify.notify("Vui lòng nhập đầu đủ các trường", "error", 7);
            return false;
        }
        if (!regexMail.test($("#emailStaff").val())) {
            alertify.notify("Email không hợp lệ", "error", 7);
            $("#emailStaff").val("");
            return false;
        }
        if (!regexPhone.test($("#phoneStaff").val())) {
            alertify.notify("Số điện thoại không hợp lệ", "error", 7);
            $("#phoneStaff").val("");
            return false;
        }
        let item = {
            display_name: $("#nameStaff").val(),
            role: "user",
            phone: $("#phoneStaff").val(),
            email: $("#emailStaff").val(),
            password: $("#pwStaff").val(),
        }
        $.ajax({
            url: "/api/staffs",
            type: "POST",
            data: JSON.stringify(item),
            contentType: "application/json",
            success: function (data) {
                $("#nameStaff").val("");
                $("#phoneStaff").val(""); $("#emailStaff").val(""); $("#pwStaff").val("");
                let item2 = ` <tr data-id="${data.staff_id}">
                            <td>${data.staff_id}</td>
                             <td>${data.display_name}</td>
                            <td>user</std>
                            <td>${data.phone}</td>
                            <td>${data.email}</td>
                            <td>Not Active</td>
                            <td><a class="templatemo-link ShowEditStaff" data-id="${data.staff_id}"><i class="fa fa-pencil fa-fw"></i>Edit</a></td>
                        </tr>`;
                $(".ManageStaff").prepend(item2);
                $("#openCreateStaff").show();
                $(".ShowStaff").show(200);
                $(".CreateStaff").hide(100);
                $(".EditStaff").hide();
                openEditStaff();
            }
        })
    })
}
function openEditStaff() {
    $(".ShowEditStaff").unbind("click").on("click", function () {
        let id = $(this).data("id");
        $.ajax({
            url: `/api/staffs/${id}`,
            type: "GET",
            dataType: 'json',
            contentType: "application/json",
            success: function (data) {

                $("#idStaff").val(data.staff_id);
                $("#nameEditStaff").val(data.display_name);
                $("#phoneEditStaff").val(data.phone);
                $("#emailEditStaff").val(data.email);
              
                $("#statusStaff").find(`option[value=${data.active}]`).attr("selected", "");
                $("#openCreateStaff").hide();
                $(".ShowStaff").hide(100);
                $(".CreateStaff").hide();
                $(".EditStaff").show(200);
            }
        })
        $("#UpdateStaff").unbind("click").on("click", function () {
            let regexMail = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
            let regexPhone = new RegExp("^(0)[0-9]{9,10}$");
            if ($("#nameEditStaff").val() == "" || $("#phoneEditStaff").val() == "" || $("#emailEditStaff").val() == "") {
                alertify.notify("Vui lòng nhập đầy đủ các trường", "error", 7);
                return false;
            }
            if (!regexMail.test($("#emailEditStaff").val())) {
                alertify.notify("Email không hợp lệ", "error", 7);
                $("#emailEditStaff").val("");
                return false;
            }
            if (!regexPhone.test($("#phoneEditStaff").val())) {
                alertify.notify("Số điện thoại không hợp lệ", "error", 7);
                $("#phoneEditStaff").val("");
                return false;
            }
            let item = {
                staff_id: $("#idStaff").val(),
                role: "user",
                display_name: $("#nameEditStaff").val(),
                phone: $("#phoneEditStaff").val(),
                email: $("#emailEditStaff").val(),
                active: ($("#statusStaff").val() == "true") ? 1 : 0,
            }
            $.ajax({
                url: `/api/staffs/${id}`,
                type: "PUT",
                data: JSON.stringify(item),
                contentType: "application/json",
                success: function (data) {
                    $(".ManageStaff").find(`tr[data-id=${data.staff_id}] td:nth-child(2)`).html(data.display_name);
                    $(".ManageStaff").find(`tr[data-id=${data.staff_id}] td:nth-child(3)`).html(data.role);
                    $(".ManageStaff").find(`tr[data-id=${data.staff_id}] td:nth-child(4)`).html(data.phone);
                    $(".ManageStaff").find(`tr[data-id=${data.staff_id}] td:nth-child(5)`).html(data.email);
                    let status = (data.active == true) ? "Active" : "Not Active";
                    $(".ManageStaff").find(`tr[data-id=${data.staff_id}] td:nth-child(6)`).html(status);
                    $(".backShowStaff").click();
                }
            })
        })
    })
}


$(document).ready(function () {
    openCreateStaff();
    openEditStaff();
})