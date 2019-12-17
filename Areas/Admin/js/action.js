function configDate() {
    let date = new Date();
    //let dateEnd = date.setYear(date.getYear() + 1);
    let dd = (date.getDate() < 10) ? `0${date.getDate()}` : date.getDate();
    let month = (date.getMonth() + 1 < 10) ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    $("#ip-start").attr("value", `${date.getFullYear()}-${month}-${dd}`);
    $("#ip-start").attr("min", `${date.getFullYear()}-${month}-${dd}`);
    $("#ip-start").attr("max", `${date.getFullYear() + 1}-${month}-${dd}`);
    $("#ip-end").attr("value", `${date.getFullYear()}-${month}-${dd + 1}`);
    $("#ip-end").attr("min", `${date.getFullYear()}-${month}-${dd}`);
    $("#ip-end").attr("max", `${date.getFullYear() + 1}-${month}-${dd}`);
}
function configEditDate(date) {
    let date2 = new Date(date);
    let dd = (date2.getDate() < 10) ? `0${date2.getDate()}` : date2.getDate();
    let month = (date2.getMonth()+1 < 10) ? `0${date2.getMonth()+1}` : date2.getMonth()+1;
    return `${date2.getFullYear()}-${month}-${dd}`;
}
function configDateSearch(string) {
    let date = +(string.slice(6, string.length - 2));
    let item = new Date(date);
    let month = ((item.getMonth() + 1) < 10) ? `0${item.getMonth() + 1}` : `${item.getMonth() + 1}`;
    let check = ((item.getHours()) < 12) ? "AM" : "PM";
    return `${item.getDate()}/${month}/${item.getFullYear()} ${item.getHours()}:${item.getMinutes()}:${item.getSeconds()} ${check}`;
}
function configDateTimeSearch(string) {
    let date = +(string.slice(6, string.length - 2));
    let item = new Date(date);
    let month = ((item.getMonth() + 1) < 10) ? `0${item.getMonth() + 1}` : `${item.getMonth() + 1}`;
    return `${item.getDate()}/${month}/${item.getFullYear()} 12:00:00 AM`;
}
function configDateS(date) {
    let item = new Date(date);
    let month = ((item.getMonth() + 1) < 10) ? `0${item.getMonth() + 1}` : `${item.getMonth() + 1}`;
    let check = ((item.getHours()) < 12) ? "AM" : "PM";
    return `${item.getDate()}/${month}/${item.getFullYear()} ${item.getHours()}:${item.getMinutes()}:${item.getSeconds()} ${check}`;
}
function configDateTime(date) {
    let item = new Date(date);
    let month = ((item.getMonth() + 1) < 10) ? `0${item.getMonth() + 1}` : `${item.getMonth() + 1}`;
    return `${item.getDate()}/${month}/${item.getFullYear()} 12:00:00 AM`;
}
function openCreate() {
    $("#btn-create-action").on("click", function () {
        $(".active-show").hide();
        $(".create-action").show(100);
    })
    $("#btn-new-action").unbind("click").on("click", function () {
        if ($("#ip-nameAction").val() == "") {
            alertify.notify("Tên hoạt động không được bỏ trống!", "error", 7);
            return false;
        }
        if (new Date($("#ip-start").val()) < new Date($("#ip-end").val()) == false) {
            alertify.notify("Ngày kết thúc không được nhỏ hơn ngày bắt đầu!", "error", 7);
            return false;
        }
        let item = {
            action_name: $("#ip-nameAction").val(),
            createdAt: null,
            timeStart: $("#ip-start").val(),
            timeEnd: $("#ip-end").val()
        };
       
        $.ajax({
            url: "/api/actions",
            type: "POST",
            data: JSON.stringify(item),
            contentType: "application/json",
            success: function (data) {
               
                let div = `<tr class="odd gradeX" data-action="${data.action_id}">
                                        <td>#${data.action_id}</td>
                                        <td>${data.action_name}</td>
                                        <td>${configDateS(data.createdAt)}</td>
                                        <td>${configDateTime(data.timeStart)}</td>
                                        <td>${configDateTime(data.timeEnd)}</td>
                                        <td><a href="javascript:void(0)" class="btn-edit-action" data-action="${data.action_id}">Edit</a></td>
                                        <td><a href="javascript:void(0)" class="btn-delete-action" data-action="${data.action_id}">Delete</a></td>
                                    </tr>`;
                $(".body-list-action").prepend(div);
                $(".active-show").show(100);
                $(".create-action").hide();
                DeleteAction();
                openEditAction();
                $("#ip-nameAction").val("");
            }
        })
    })
    $(".btn-back-action").on("click", function () {
        $(".active-show").show(100);
        $(".create-action").hide();
        $(".edit-action").hide();
    })
}
function DeleteAction() {
    $(".btn-delete-action").unbind("click").on("click", function () {
        let id = $(this).data("action");
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
                    url: `/api/actions/${id}`,
                    type: "DELETE",
                    success: function (data) {
                        $(".body-list-action").find(`tr[data-action=${data.action_id}]`).remove();
                    }
                })
            
            }
       })
    })
}
function openEditAction() {
    $(".btn-edit-action").unbind("click").on("click", function () {
        let id = $(this).data("action");
        $.ajax({
            url: `/api/actions/${id}`,
            type: "GET",
            success: function (data) {
                
                $("#ip-idAction").val(data.action_id);
                $("#ip-edit-nameAction").val(data.action_name);
                $("#ip-edit-start").val(configEditDate(data.timeStart));
                $("#ip-edit-end").val(configEditDate(data.timeEnd));
                $(".active-show").hide();
                $(".edit-action").show(100);
            }
        })
    })
    $("#btn-editInfo-action").on("click", function () {
        if ($("#ip-edit-nameAction").val() == "") {
            alertify.notify("Tên hoạt động không được bỏ trống!", "error", 7);
            return false;
        }
        if (new Date($("#ip-edit-start").val()) < new Date($("#ip-edit-end").val()) == false) {
            alertify.notify("Ngày kết thúc không được nhỏ hơn ngày bắt đầu!", "error", 7);
            return false;
        }
        let item = {
            action_id: $("#ip-idAction").val(),
            action_name: $("#ip-edit-nameAction").val(),
            createdAt: null,
            timeStart: $("#ip-edit-start").val(),
            timeEnd: $("#ip-edit-end").val()
        }
        $.ajax({
            url: `/api/actions/${item.action_id}`,
            type: "PUT",
            data: JSON.stringify(item),
            contentType: "application/json",
            success: function (data) {
                $(".body-list-action").find(`tr[data-action=${data.action_id}] td:nth-child(2)`).html(data.action_name);
                $(".body-list-action").find(`tr[data-action=${data.action_id}] td:nth-child(4)`).html(configDateTime(data.timeStart));
                $(".body-list-action").find(`tr[data-action=${data.action_id}] td:nth-child(5)`).html(configDateTime(data.timeEnd));
                $(".edit-action").hide();
                $(".active-show").show(100);
            }
        })
    })
}
function searchActionByName() {
  
    $("#input-search-action").on("keyup", function () {
        let search = $(this).val();
        $.ajax({
            url: `/JsonSearch/SearchAction?search=${search}`,
            type: "GET",
            success: function (data) {
                $(".body-list-action").html("");
                data.action.forEach(action=> {
                 
                  
                    $(".body-list-action").append(`<tr class="odd gradeX" data-action="${action.action_id}">
                                        <td>#${action.action_id}</td>
                                        <td>${action.action_name}</td>
                                        <td>${configDateSearch(action.createdAt)}</td>
                                        <td>${configDateTimeSearch(action.timeStart)}</td>
                                        <td>${configDateTimeSearch(action.timeEnd)}</td>
                                        <td><a href="javascript:void(0)" class ="btn-edit-action" data-action="${action.action_id}">Edit</a></td>
                                        <td><a href="javascript:void(0)" class ="btn-delete-action" data-action="${action.action_id}">Delete</a></td>
                                    </tr>`);
                });
                $(".pagination").html("");
                $(".pagination").append(`<li class="active"><a>1</a></li>`);
                if (data.pages > 1) {
                    for (let i = 2; i <= data.pages; i++) {
                        $(".pagination").append(`<li><a href="/Admin/Main/ManageAction?page=${i}&pageSize=7&search=${data.search}">${i}</a> </li>`);
                    }

                    $(".pagination").append(`<li class="PagedList-skipToNext"> <a href="/Admin/Main/ManageAction?page=2&pageSize=7&search=${data.search}" rel="next">»</a> </li>`);
                }
                openEditAction();
                DeleteAction();
            }
        })
    })
}
$(document).ready(function () {
    searchActionByName();
    configDate();
    openCreate();
    openEditAction();
    DeleteAction();
   
})