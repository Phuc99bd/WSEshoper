function importExcel() {
    let fileExcel;
    $("#importExcel").on("change", function () {
        let fileData = $(this).prop("files")[0];
        let math = ["xlsx"];
        //if ($.inArray(fileData.type, math) === -1) {
        //    $(this).val("");
        //    alertify.notify("Kiểu File không hợp lệ , chỉ chấp nhận .xlsx", "error", 7);
        //    return false;
        //}
        let fileReader = new FileReader();
        fileReader.onload = function (element) {
           
        }
        fileReader.readAsDataURL(fileData);
        let filees = new FormData();
        filees.append("file", fileData);
        fileExcel = filees;
    });
    $("#insert-excel").on("click", function () {
        if (fileExcel == null) {
            alertify.notify("Vui lòng chọn file cần import", "error", 7);
            return false;
        }
        
        $.ajax({
            url: `/JsonResult/importExcel`,
            type: "POST",
            cache: false,
            contentType: false,
            processData: false,
            data: fileExcel,
            success: function (data) {
               
            }
        })
        location.reload();
    })
}
$(document).ready(function () {
    importExcel();

})