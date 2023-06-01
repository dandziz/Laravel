$(document).ready(function(){
    $("#diachikhac").click(function(){
        if(this.checked){
            $(".thong-tin").append(`
            <div class="col-md-12 thongTinNhanHang">
                <h5 class="">Thông tin nhận hàng</h5>
            </div>
            <div class="col-md-12 thongTinNhanHang">
                <label for="hoten" class="form-label">Họ và tên</label>
                <input type="text" class="form-control p-14-bold" name="hoten_khac" id="hoten_khac" placeholder="Họ và tên" required>
                <div class="invalid-feedback">
                    Hãy nhập tên của bạn!
                </div>
            </div>
            <div class="col-md-12 thongTinNhanHang">
                <label for="dienthoai" class="form-label">Số điện thoại</label>
                <input type="text" class="form-control p-14-bold" name="dienthoai_khac" id="dienthoai_khac" placeholder="Số điện thoại" required>
                <div class="invalid-feedback">
                    Hãy nhập số điện thoại của bạn!
                </div>
            </div>
            <div class="col-md-12 thongTinNhanHang">
                <label for="diachi" class="form-label">Địa chỉ</label>
                <input type="text" class="form-control p-14-bold" name="diachi_khac" id="diachi_khac" placeholder="Địa chỉ (VD: Số nhà - Đường/Thôn)" required>
                <div class="invalid-feedback">
                    Hãy nhập địa chỉ của bạn!
                </div>
            </div>
            <div class="col-md-12 thongTinNhanHang">
                <label for="tinhthanh" class="form-label">Tỉnh thành</label>
                <select class="form-select rounded-0 p-14-bold" id="province_khac" name="province_khac" placeholder="Tỉnh thành" required>
                    <option selected disabled value="">---</option>
                </select>
                <input type="hidden" name="tinhthanh_khac" id="tinhthanh_khac">
                <div class="invalid-feedback">
                    Hãy chọn tỉnh thành của bạn!
                </div>
            </div>
            <div class="col-md-12 thongTinNhanHang">
                <label for="quanhuyen" class="form-label">Quận huyện</label>
                <select class="form-select rounded-0 p-14-bold" id="district_khac" name="district_khac" placeholder="Quận huyện" disabled required>
                    <option selected disabled value="">---</option>
                </select>
                <input type="hidden" name="quanhuyen_khac" id="quanhuyen_khac">
                <div class="invalid-feedback">
                    Hãy chọn quận/huyện của bạn!
                </div>
            </div>
            <div class="col-md-12 thongTinNhanHang">
                <label for="phuongxa" class="form-label">Phường xã</label>
                <select class="form-select rounded-0 p-14-bold" id="ward_khac" name="ward_khac" placeholder="Phường xã" disabled required>
                    <option selected disabled value="">---</option>
                </select>
                <input type="hidden" name="phuongxa_khac" id="phuongxa_khac">
                <div class="invalid-feedback">
                    Hãy chọn phường/xã của bạn!
                </div>
            </div>
            <div class="mb-3 thongTinNhanHang">
                <textarea class="form-control rounded-0 p-14-bold" name="ghichu_khac" placeholder="Ghi chú (tùy chọn)"></textarea>
            </div>
            <script src="js/muaHang-diachikhac.js" class="thongTinNhanHang"></script>
            `);
        }else{
            $(".thongTinNhanHang").remove();
        }
    })
    var callApiDistrict_k = (api) => {
        return axios.get(api).then((response) => {
            renderData(response.data.districts, "district");
        });
    }
    var callApiWard_k = (api) => {
        return axios.get(api).then((response) => {
            renderData(response.data.wards, "ward");
        });
    }
    var renderData = (array, select) => {
        let row = '<option selected disabled value="">---</option>';
        array.forEach(element => {
            row += `<option value='${element.code}'>${element.name}</option>`
        })
        document.querySelector("#"+select).innerHTML = row;
    }
    $("#sodiachi").change(function(){
        var ind = $(this).val();
        $("#district").prop("disabled", false);
        $("#ward").prop("disabled", false);
        $('.thongTinMuaHang').each(function(index) {
            $(this).val(diachi[ind][index]);
            
        });
        function task1(ind, diachi) {
            return new Promise(function(resolve) {
                $('#province option').filter(function() {
                    return $(this).html() == diachi[ind][5];
                }).prop('selected', true);
                $("#tinhthanh").val(diachi[ind][5]);
                setTimeout(function() {
                    resolve();
                }, 400);
            });
        }
    
        function task2() {
            return new Promise(function(resolve) {
                callApiDistrict_k(host + "p/" +  $('#province').val() + "?depth=2")
                setTimeout(function() {
                    resolve();
                }, 400);
            });
        }
    
        function task3(ind, diachi) {
            return new Promise(function(resolve) {
                $('#district option').filter(function() {
                    return $(this).html() == diachi[ind][4];
                }).prop('selected', true);
                $("#quanhuyen").val(diachi[ind][4]);
                callApiWard_k(host + "d/" + $("#district").val() + "?depth=2");
                setTimeout(function() {
                    resolve();
                }, 400);
            });
        }

        function task4(ind, diachi) {
            $('#ward option').filter(function() {
                return $(this).html() == diachi[ind][3];
            }).prop('selected', true);
            $("#phuongxa").val(diachi[ind][3]);
        }
        task1(ind, diachi)
        .then(task2)
        .then(() => task3(ind, diachi))
        .then(() => task4(ind, diachi));
    })
    if (document.cookie.indexOf("myCart") != -1) {
        var myArrayCookie = document.cookie.replace(/(?:(?:^|.*;\s*)myCart\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        var myArray = JSON.parse(myArrayCookie);
        var tongtien = parseInt(myArray.reduce(function(tong, item){
            return tong + item.soluong*item.dongia;
        }, 0));
    }
    var replace_html = "";
    for (var i = 0; i < giohang.length; i++) {
        replace_html += `<div class="card-thanh-toan mb-2">
                            <div class="row">
                                <div class="col-md-2" style="position: relative;">
                                    <img src="${giohang[i].img_link}" alt="">
                                    <p class="p-12-bold so_luong">${giohang[i].soluong}</p>
                                </div>
                                <div class="col-md-6">
                                    <div>
                                        <p class="p-14-bold">${giohang[i].ten_nuochoa}</p>
                                        <p class="p-12">${giohang[i].gioitinh + " / " + giohang[i].xuatxu + " / Chiết " + giohang[i].dungtich +"ml"}</p>
                                    </div>
                                </div>
                                <div class="col-md-4 ${giohang[i].id_nuochoa + giohang[i].dungtich}">
                                    <p class="p_cost mb-0 ${giohang[i].id_nuochoa + giohang[i].dungtich + "p"}">${(parseInt(giohang[i].soluong) * parseInt(giohang[i].dongia)).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                                </div>
                            </div>
                        </div>`;
    }
    $("#btn-maGiamGia").click(function() {
        get("magiamgia", "index.php?controller=khachhang&action=getMaGiamGia", "helpMGG", 
        "Mã giảm giá hợp lệ!", "Mã giảm giá không hợp lệ hoặc đã hết lượt sử dụng!").then(function(res) {
            if(res != 0){
                var mgg = JSON.parse(res);
                if (document.cookie.indexOf("myCart") != -1) {
                    var myArrayCookie = document.cookie.replace(/(?:(?:^|.*;\s*)myCart\s*\=\s*([^;]*).*$)|^.*$/, "$1");
                    var myArray = JSON.parse(myArrayCookie);
                    var soluong_conlai = mgg[0].soluotsudung-mgg[0].soluotdasudung;
                    var sp = myArray.filter(function(item) { return item.id_nuochoa == mgg[0].id_nuochoa})
                    var tongsoluong = parseInt(sp.reduce(function(tong, item){
                        return tong + item.soluong;
                    }, 0));
                    if(mgg.length > 0){
                        if(sp.length == 0){
                            $("#helpMGG").text("Mã giảm giá hợp lệ nhưng không áp dụng cho bất cứ sản phẩm nào trong giỏ hàng!").css("color","red");;
                            $("#magiamgia").val("");
                        }
                        else{
                            var tongtien = parseInt(myArray.reduce(function(tong, item){
                                return tong + item.soluong*item.dongia;
                            }, 0));
                            $(".list-product").html(replace_html);
                            $(".giam-gia").remove();
                            $(".tong-tien").text(tongtien.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }));
                            var tongtien_giamgia = 0;
                            var n = (tongsoluong > soluong_conlai) ? soluong_conlai : tongsoluong;
                            for(var i = 0; i < sp.length && n!=0; i++){
                                for(var j = 0; j < sp[i].soluong && n!= 0; j++){
                                    console.log(tongtien_giamgia);
                                    tongtien_giamgia += parseInt(sp[i].dongia);
                                    n--;
                                }
                            }
                            var tiengiamgia = tongtien_giamgia * (parseInt(mgg[0].giam)/100);
                            console.log();
                            $(".thanh-tien").append(`
                            <div class="d-flex justify-content-between giam-gia">
                                <p class="p_cost">Giảm giá</p>
                                <p class="p_cost">${tiengiamgia.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                            </div>
                            `);
                            $(".tong-tien").text((tongtien-tiengiamgia).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }));
                            var n = (tongsoluong > soluong_conlai) ? soluong_conlai : tongsoluong;
                            var flag_ = true;
                            sp.forEach(function(item){
                                if(flag_ == true){
                                    if(n > parseInt(item.soluong)){
                                        var class_ = item.id_nuochoa+item.dungtich;
                                        tien_giam = item.soluong*item.dongia - item.soluong*item.dongia*(mgg[0].giam/100);
                                        $("."+class_).append(`<p class="p_cost mb-0">${tien_giam.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>`)
                                        $("."+class_+"p").addClass("text-decoration-line-through")
                                        n-=item.soluong;
                                    }else{
                                        var class_ = item.id_nuochoa+item.dungtich;
                                        tien_giam = item.soluong*item.dongia - n*item.dongia*(mgg[0].giam/100);
                                        $("."+class_).append(`<p class="p_cost mb-0">${tien_giam.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>`)
                                        $("."+class_+"p").addClass("text-decoration-line-through")
                                        n = 0;
                                        flag_ = false;
                                    }
                                }
                            })
                        }
                    }
                }
            }else{
                if (document.cookie.indexOf("myCart") != -1) {
                    var myArrayCookie = document.cookie.replace(/(?:(?:^|.*;\s*)myCart\s*\=\s*([^;]*).*$)|^.*$/, "$1");
                    var myArray = JSON.parse(myArrayCookie);
                    var tongtien = parseInt(myArray.reduce(function(tong, item){
                        return tong + item.soluong*item.dongia;
                    }, 0));
                }
                $("#magiamgia").val("");
                $(".list-product").html(replace_html);
                $(".giam-gia").remove();
                $(".tong-tien").text((tongtien).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }));
            }
        })
    })
    $("#magiamgia").on("input", function() {
        if($("#magiamgia").val().length > 0){
            $("#btn-maGiamGia").prop('disabled', false);
        }else{
            $(".list-product").html(replace_html);
            $("#btn-maGiamGia").prop('disabled', true);
            $(".giam-gia").remove();
            $(".tong-tien").text((tongtien).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }));
        }
    })
    function validateForm(){
        if($("#magiamgia").val() != ""){
            get("magiamgia", "index.php?controller=khachhang&action=getMaGiamGia", "helpMGG", 
            "Mã giảm giá hợp lệ!", "Mã giảm giá không hợp lệ hoặc đã hết lượt sử dụng!").then(function(res) {
                if(res != 0){
                    return true;
                }else{
                    $("#helpMGG").text("Mã giảm giá không hợp lệ hãy xem xét lại hoặc xóa đi để đi đến thanh toán!").css("color","red");;
                    return false;
                }
            })
        }else{
            return true;
        }
    }
})