function openEditDetails() {
    let fileImage = new FormData();
    let id;
    $(".btn-edit-details").on("click", function () {
        id = $(this).data("details");
        fileImage.append("id", id);
        $.ajax({
            url: `/api/actionDetails/${id}`,
            type: "GET",
            success: function (data) {
                $("#image1-preview").attr("src", `/ImageOperation/${data.image1}`);
                $("#image2-preview").attr("src", `/ImageOperation/${data.image2}`);
                $("#image3-preview").attr("src", `/ImageOperation/${data.image3}`);
                $(".active-show").hide();
                $(".edit-details").show(100);
                $("#content1").find("div.fr-view").html("");
                $("#content2").find("div.fr-view").html("");
                $("#content3").find("div.fr-view").html("");
                $("#content1").find("div.fr-view").html((data.content1).replace(/'/g, `"`));
                $("#content2").find("div.fr-view").html((data.content2).replace(/'/g, `"`));
                $("#content3").find("div.fr-view").html((data.content3).replace(/'/g, `"`));
            }
        })
    })
    $("#image1-details").on("change", function () {
        let fileData = $(this).prop("files")[0];
        let math = ["image/png", "image/jpg", "image/jpeg"];

        if ($.inArray(fileData.type, math) === -1) {
            alertify.notify("Kiểu File không hợp lệ , chỉ chấp nhận jpg & png", "error", 7);
       
            $(this).val(null);
            return false;
        }

        let fileReader = new FileReader();
        fileReader.onload = function (element) {
            $("#image1-preview").attr("src", `${element.target.result}`);
        }
        fileReader.readAsDataURL(fileData);
        let imageFormData = new FormData();
        imageFormData.append("file", fileData);
        if (fileImage != undefined) {
            fileImage.delete("file");
            fileImage.append("file", fileData);
        } else {
            fileImage = imageFormData;
        }
    })
    $("#image2-details").on("change", function () {
        let fileData = $(this).prop("files")[0];
        let math = ["image/png", "image/jpg", "image/jpeg"];

        if ($.inArray(fileData.type, math) === -1) {
            alertify.notify("Kiểu File không hợp lệ , chỉ chấp nhận jpg & png", "error", 7);
        
            $(this).val(null);
            return false;
        }

        let fileReader = new FileReader();
        fileReader.onload = function (element) {
            $("#image2-preview").attr("src", `${element.target.result}`);
        }
        fileReader.readAsDataURL(fileData);
        let imageFormData = new FormData();
        imageFormData.append("file2", fileData);
        if (fileImage != undefined) {
            fileImage.delete("file2");
            fileImage.append("file2", fileData);
        } else {
            fileImage = imageFormData;
        }
    })
    $("#image3-details").on("change", function () {
        let fileData = $(this).prop("files")[0];
        let math = ["image/png", "image/jpg", "image/jpeg"];

        if ($.inArray(fileData.type, math) === -1) {
            alertify.notify("Kiểu File không hợp lệ , chỉ chấp nhận jpg & png", "error", 7);

            $(this).val(null);
            return false;
        }

        let fileReader = new FileReader();
        fileReader.onload = function (element) {
            $("#image3-preview").attr("src", `${element.target.result}`);
        }
        fileReader.readAsDataURL(fileData);
        let imageFormData = new FormData();
        imageFormData.append("file3", fileData);
        if (fileImage != undefined) {
            fileImage.delete("file3");
            fileImage.append("file3", fileData);
        } else {
            fileImage = imageFormData;
        }
    })
    $("#btn-editInfo-details").on("click", function () {
        for(var pair of fileImage.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }
            $.ajax({
                url: `/JsonResult/EditActionDetails`,
                type: "POST",
                cache: false,
                contentType: false,
                processData: false,
                data: fileImage,
                success: function (data) {
                    fileImage =new FormData();
                    $("#image1-details").val("");
                    $("#image2-details").val("");
                    $("#image3-details").val("");
                },
                error: function(data){
                    
            }
            })
            let content1 = $("#content1").find("div.fr-view").html().replace(/"/g, `'`);
            let content2 = $("#content2").find("div.fr-view").html().replace(/"/g, `'`);
            let content3 = $("#content3").find("div.fr-view").html().replace(/"/g, `'`);
            let item = {
                detail_id: id,
                content1: content1,
                content2: content2,
                content3: content3
            };
            $.ajax({
                url: `/api/actionDetails/${id}`,
                type: "PUT",
                data: JSON.stringify(item),
                contentType: "application/json",
                success: function (data) {
                    alertify.notify("Update Thành công!", "success", 7);
                    $("#btn-back-details").click();
                    $("html, body").animate({ scrollTop: 0 }, "slow");
                },
                error: function () {
                    alertify.notify("Dữ liệu text đã vượt tối đa", "success", 7);
                }
            })
        })
        $("#btn-back-details").on("click", function () {
            $(".active-show").show(100);
            $(".edit-details").hide();
            $("html, body").animate({ scrollTop: 0 }, "slow");

        })
        $(".btn-deleteIMG").on("click", function () {
            let idimg = $(this).data("id");

            $.ajax({
                url: `/JsonResult/DeleteImage?detail=${id}&image=${idimg}`,
                type: "GET",
                success: function (data) {
                    $(`#image${idimg}-preview`).attr("src", "");
                }
            })
        })
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
function searchAction() {
    $("#input-search-actionDetails").on("keyup", function () {
        let search = $(this).val();
        $.ajax({
            url: `/JsonSearch/SearchActionDetails?search=${search}`,
            type: "GET",
            success: function (data) {
                $(".body-list-actionDetails").html("");
                data.action.forEach(action=> {
                    let idDetail;
                    data.actionDetail.forEach(actiondetail=> {
                        if (actiondetail.action_id == action.action_id) {
                            idDetail = actiondetail.detail_id;
                        }
                    })
                    $(".body-list-actionDetails").append(`<tr data-action="${action.action_id}">
                                        <td>${idDetail}</td>
                                        <td>${action.action_name}</td>
                                        <td>${configDateSearch(action.createdAt)}</td>
                                        <td>${configDateTimeSearch(action.timeStart)}</td>
                                        <td>${configDateTimeSearch(action.timeEnd)}</td>
                                        <td><a href="javascript:void(0)" data-details="${idDetail}" class="btn-edit-details">Edit</a></td>
                                        <td><a href="/ActionDetail?id=${idDetail}" data-details="${idDetail}" class ="btn-review-action">Review</a></td>
                                    </tr>`);
                });
                $(".pagination").html("");
                $(".pagination").append(`<li class="active"><a>1</a></li>`);
                if (data.pages > 1) {
                    for (let i = 2; i <= data.pages; i++) {
                        $(".pagination").append(`<li><a href="/Admin/Main/ManageActionDetails?page=${i}&pageSize=7&search=${data.search}">${i}</a> </li>`);
                    }

                    $(".pagination").append(`<li class="PagedList-skipToNext"> <a href="/Admin/Main/ManageActionDetails?page=2&pageSize=7&search=${data.search}" rel="next">»</a> </li>`);
                }
                openEditDetails();
            }
        })
    })
}

function OpenListAttend() {
    $(".btn-review-list").on("click",function() {
        let id = $(this).data("action");
        console.log(id);
        $.ajax({
            url: `/JsonResult/getListAttend?id=${id}`,
            type: "GET",
            success: function (data) {
                $("#exampleModalScrollable").find("div.modal-body").html("");
                let item = "";
                data.list.forEach(student=> {
                    let nameStudent = data.student.filter(x=> x.MSSV ==  student.MSSV);
                  
                    item += `<li><p><span>Mã số Sinh viên: ${student.MSSV}</span><span>Họ và tên: ${nameStudent[0].username}</span></p> </li>`;
                    $("#exampleModalScrollable").find("div.modal-body").html(`<ul class="btn-fixCss">${item}</ul>`);
                    $("#exampleModalScrollable").modal("show");
                });
            }
        });
    })
}

$(document).ready(function () {
    openEditDetails();
    new FroalaEditor('#content2')
    new FroalaEditor("#content1");
    new FroalaEditor("#content3");
    searchAction();
    OpenListAttend();
})