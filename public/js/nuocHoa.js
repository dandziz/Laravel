function formatStringPrice(money){
    money_str = money.toString().split("").reverse().join("");
    len = Math.round(money_str.length/3);
    str_ = "";
    if(len < 0){
        return money_str;
    }else{
        for(let i = 0; i <= len; i++){
            if(i < len){
                str_ += money_str.substring(i*3, i*3+3)+".";
            }else{
                str_ += money_str.substring(i*3, i*3+3);
            }
        }
    }
    str_final = str_.split("").reverse().join("")+"đ";
    return str_final.charAt(0) === "." ? str_final.substring(1) : str_final;
}
var id_nuochoa_old = "";
$(document).on('click', '.xemThongTin', function() {
    var id_nuochoa = this.value;
    if($(".btn-addGioHang").length)
        $(".btn-addGioHang").removeClass("btn-addGioHang").addClass("btn-addGioHang-"+id_nuochoa);
    if($(".btn-addGioHang-"+id_nuochoa_old).length)
        $(".btn-addGioHang-"+id_nuochoa_old).removeClass("btn-addGioHang-"+id_nuochoa_old).addClass("btn-addGioHang-"+id_nuochoa);
    id_nuochoa_old = this.value;
    $("#soluong").val(1);
    $("#helpSoLuong").text("");
    if(id_nuochoa!=""){
        var form_datas = new FormData();
        form_datas.append('id_nuochoa',id_nuochoa);
        var thongTin;
        var anh;
        var gia;
        $.ajaxSetup({
            headers: { "cache-control": "no-cache" }
        });
        function getThongTinNuocHoa(callback) {
            $.ajax({
                url: 'index.php?controller=NuocHoa&action=getThongTinNuocHoa&random=' + new Date().getTime(),
                dataType: 'json',
                cache: false,
                contentType: false,
                processData: false,
                data: form_datas,
                type: 'post',
                success: function(tt) {
                    callback(tt.data[0]);
                }
            })
        }
        function getAnhNuocHoa(callback) {
            $.ajax({
                url: 'index.php?controller=NuocHoa&action=getAnhNuocHoa&random=' + new Date().getTime(),
                dataType: 'json',
                cache: false,
                contentType: false,
                processData: false,
                data: form_datas,
                type: 'post',
                success: function(image) {
                    callback(image.data);
                }
            })
        }
        function getGiaNuocHoa(callback){
            $.ajax({
                url: 'index.php?controller=NuocHoa&action=getGiaNuocHoa&random=' + new Date().getTime(),
                dataType: 'json',
                cache: false,
                contentType: false,
                processData: false,
                data: form_datas,
                type: 'post',
                success: function(price) {
                    callback(price.data);
                }
            })
        }
        getAnhNuocHoa(function(anh){
            getGiaNuocHoa(function(gia){
                getThongTinNuocHoa(function(thongTin){
                    $(".noticed").css("display","none");
                    //Bắt đầu ảnh chính
                    var id_nuochoa = thongTin.id_nuochoa;
                    var ten_nuochoa = thongTin.ten_nuochoa;
                    var gt = thongTin.gioitinh;
                    var xuatxu = thongTin.xuatxu;
                    var img_link = anh[0].img_link;
                    $("#btn-addGioHang").val(id_nuochoa+"#"+ten_nuochoa+"#"+gt+"#"+xuatxu+"#"+img_link);
                    $(".img-main").html("");
                    for(let i = 0; i < anh.length; i++){
                        if(i == 0){
                            $(".img-main").append(`<div class="carousel-item active" data-slide-number="${i}">
                                                        <img src="${anh[i].img_link}" class="d-block w-100 h-100" alt="..." data-remote="https://source.unsplash.com/Pn6iimgM-wo/" data-type="image" data-toggle="lightbox" data-gallery="example-gallery">
                                                    </div>`);
                        }else{
                            $(".img-main").append(`<div class="carousel-item" data-slide-number="${i}">
                                                        <img src="${anh[i].img_link}" class="d-block w-100 h-100" alt="..." data-remote="https://source.unsplash.com/tXqVe7oO-go/" data-type="image" data-toggle="lightbox" data-gallery="example-gallery">
                                                    </div>`);
                        }
                    }
                    $(".img-thumb-one").html("");
                    for(let i = 0; i < 6; i++){
                        if(i == 0){
                            $(".img-thumb-one").append(`<div id="carousel-selector-${i}" class="thumb col-4 col-sm-2 px-1 py-2 selected" data-target="#myCarousel" data-slide-to="${i}">
                                                        <img src="${anh[i].img_link}" class="img-fluid" alt="...">
                                                    </div>`);
                        }else{
                            $(".img-thumb-one").append(`<div id="carousel-selector-${i}" class="thumb col-4 col-sm-2 px-1 py-2" data-target="#myCarousel" data-slide-to="${i}">
                                                        <img src="${anh[i].img_link}" class="img-fluid" alt="...">
                                                    </div>`);
                        }
                    }

                    $(".img-thumb-two").html("");
                    for(let i = 6; i < anh.length; i++){
                        $(".img-thumb-two").append(`<div id="carousel-selector-${i}" class="thumb col-4 col-sm-2 px-1 py-2" data-target="#myCarousel" data-slide-to="${i}">
                                                    <img src="${anh[i].img_link}" class="img-fluid" alt="...">
                                                </div>`);
                    }

                    var lost = 12 - anh.length;
                    for(let i = 0; i < lost; i++){
                        $(".img-thumb-two").append(`<div class="col-2 px-1 py-2"></div>`);
                    }
                    var gia_ban = gia.map(function(item){
                        return item.gia_ban.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
                    })
                    var soluong = gia.map(function(item){
                        return parseInt(item.soluong);
                    })                                
                    var tong_soluong = gia.reduce(function(tong,item){
                        return tong+=parseInt(item.soluong)
                    }, 0)
                    var flags = ['','', ''];
                    var check = false;
                    var check_2 = false;
                    var vi_tri = 0;
                    var chiet = -1;
                    for(let i = 0; i < gia.length; i++){
                        if(gia[i].soluong == 0 && check == false){
                            flags[i] = 'checked';
                            vi_tri = i;
                            check = true;
                            break;
                        }
                    }
                    $('.ten_nuochoa').text(thongTin.ten_nuochoa);
                    var tinh_trang = 'Còn hàng';
                    if(tong_soluong == 3){
                        tinh_trang = 'Hết hàng';
                        $('.tinhtrang').text(tinh_trang).addClass("text-danger");
                    }else{
                        $('.tinhtrang').text(tinh_trang).addClass("text-success");
                    }
                    $('.ten_thuonghieu').text(thongTin.ten_thuonghieu);
                    $('.loaisanpham').text("Nước hoa "+thongTin.gioitinh.toLowerCase());
                    $('.gia_ban').text(gia_ban[vi_tri]);
                    $('.mota').text(thongTin.mota);
                    //Giới tính
                    $("#swatch-0-nam").val(thongTin.gioitinh);
                    $(".gioitinh").html("");
                    $(".gioitinh").text(thongTin.gioitinh);
                    if(tong_soluong == 3){
                        $("#swatch-0-nam").attr('disabled', true).attr('checked', false);
                        $(".gioitinh").append('<img src="images/ticket/soldout.png" alt="" class="w-100 h-100" style="position: absolute; left: 0; top: 0;">');
                    }else{
                        $("#swatch-0-nam").attr('disabled', false).attr('checked', true);
                    }

                    //Xuất xứ
                    $("#swatch-1-anh").val(thongTin.xuatxu);
                    $(".xuatxu").html("");
                    $(".xuatxu").text(thongTin.xuatxu);
                    if(tong_soluong == 3){
                        $("#swatch-1-anh").attr('disabled', true).attr('checked', false);
                        $(".xuatxu").append('<img src="images/ticket/soldout.png" alt="" class="w-100 h-100" style="position: absolute; left: 0; top: 0;">');
                    }else{
                        $("#swatch-1-anh").attr('disabled', false).attr('checked', true);
                    }

                    $("#swatch-2-chiet-10ml").prop('checked', false);
                    $("#swatch-2-chiet-20ml").prop('checked', false);
                    $("#swatch-2-fullbox-100ml").prop('checked', false);
                    //10ml
                    $("#swatch-2-chiet-10ml").val(gia[0].dungtich+"_"+gia[0].gia_ban);
                    $(".chiet-10ml").html("");
                    $(".chiet-10ml").attr("title", gia_ban[0]);
                    $(".chiet-10ml").text("CHIẾT 10ML");
                    if(soluong[0] == 1){
                        $("#swatch-2-chiet-10ml").prop('disabled', true).prop('checked', false);
                        $(".chiet-10ml").append('<img src="images/ticket/soldout.png" alt="" class="w-100 h-100" style="position: absolute; left: 0; top: 0;">');
                    }else{
                        chiet = 0;
                        $("#swatch-2-chiet-10ml").prop('disabled', false).prop('checked', true);
                        check_2 = true;
                    }

                    //20ml
                    $("#swatch-2-chiet-20ml").val(gia[1].dungtich+"_"+gia[1].gia_ban);
                    $(".chiet-20ml").html("");
                    $(".chiet-20ml").attr("title", gia_ban[1]);
                    $(".chiet-20ml").text("CHIẾT 20ML");
                    if(soluong[1] == 1){
                        $("#swatch-2-chiet-20ml").prop('disabled', true).prop('checked', false);
                        $(".chiet-20ml").append('<img src="images/ticket/soldout.png" alt="" class="w-100 h-100" style="position: absolute; left: 0; top: 0;">');
                    }else{
                        $("#swatch-2-chiet-20ml").prop('disabled', false);
                        if(check_2==false){
                            chiet = 1;
                            $("#swatch-2-chiet-20ml").prop('checked', true);
                            check_2 = true;
                        }else{
                            $("#swatch-2-chiet-20ml").prop('checked', false);
                        }
                    }

                    //100ml
                    $("#swatch-2-fullbox-100ml").val(gia[2].dungtich+"_"+gia[2].gia_ban);
                    $(".chiet-100ml").html("");
                    $(".chiet-100ml").attr("title", gia_ban[2]);
                    $(".chiet-100ml").text("FULLBOX 100ML");
                    if(soluong[2] == 1){
                        $("#swatch-2-fullbox-100ml").prop('disabled', true).prop('checked', false);
                        $(".chiet-100ml").append('<img src="images/ticket/soldout.png" alt="" class="w-100 h-100" style="position: absolute; left: 0; top: 0;">');
                    }else{
                        $("#swatch-2-fullbox-100ml").prop('disabled', false);
                        if(check_2==false){
                            chiet = 2;
                            $("#swatch-2-fullbox-100ml").prop('checked', true);
                            check_2 = true;
                        }else{
                            $("#swatch-2-fullbox-100ml").prop('checked', false);
                        }
                    }

                    if(tong_soluong == 3){
                        $(".gioHang").css("display","none");
                        $(".hethang").css("display","block");
                    }else{
                        $(".gioHang").css("display","block");
                        $(".hethang").css("display","none");
                        $("#swatch-2-chiet-10ml").click(function() {
                            $(".price-information").text(gia_ban[0]);
                            chiet = 0;
                            $("#soluong").val(1);
                        })
                        $("#swatch-2-chiet-20ml").click(function() {
                            $(".price-information").text(gia_ban[1]);
                            chiet = 1;
                            $("#soluong").val(1);
                        })
                        $("#swatch-2-fullbox-100ml").click(function() {
                            $(".price-information").text(gia_ban[2]);
                            chiet = 2;
                            $("#soluong").val(1);
                        })
                        $("#btn-addSoLuong").click(function() {
                            if (parseInt($("#soluong").val()) < 20 && soluong[chiet] == 0) {
                                $("#soluong").val(parseInt($("#soluong").val()) + 1);
                            }
                        })
                        $("#btn-reduceSoLuong").click(function() {
                            if (parseInt($("#soluong").val()) > 1 && soluong[chiet] == 0) {
                                $("#soluong").val(parseInt($("#soluong").val()) - 1);
                            }
                        })
                        $("#soluong").on("input", function(){
                            if(parseInt($(this).val()) > 0 && parseInt($(this).val()) <= 20){
                                $("#helpSoLuong").text("Số lượng sản phẩm hợp lệ").css("color", "green");
                            }else{
                                $("#helpSoLuong").text("Số lượng sản phẩm chưa hợp lệ (Tối đa 20 sản phẩm)").css("color", "red");
                                if($("#soluong").val() == ""){
                                    $("#soluong").val(1);
                                    $("#helpSoLuong").text("Số lượng sản phẩm hợp lệ").css("color", "green");
                                }
                            }
                        })
                    }
                })
            })
        })
    }
})

$("#btn-addGioHang").click(function(){
    var val = this.value.split("#");
    var dungtichValue = $('input[name=dungtich]:checked').val().split("_");
    var id_nuochoa = val[0];
    var ten_nuochoa = val[1];
    var gt = val[2];
    var xuatxu = val[3];
    var img_link = val[4];
    console.log(id_nuochoa+"\n"+ten_nuochoa+"\n"+gt
    +"\n"+xuatxu+"\n"+img_link+"\n"+dungtichValue[0]+"\n"+dungtichValue[1]+"\n"+parseInt($("#soluong").val()));
    if (parseInt($("#soluong").val()) > 0 && parseInt($("#soluong").val()) <= 20 && $("#soluong").val() != "") {
        if (document.cookie.indexOf("myCart") != -1) {
            var now = new Date();
            var sp = {
                'id_nuochoa': id_nuochoa,
                'ten_nuochoa': ten_nuochoa,
                'gioitinh': gt,
                'xuatxu': xuatxu,
                'dungtich': dungtichValue[0],
                'dongia': dungtichValue[1],
                'soluong': parseInt($("#soluong").val()),
                'img_link': img_link,
                'time': now,
            }
            var myArrayCookie = document.cookie.replace(/(?:(?:^|.*;\s*)myCart\s*\=\s*([^;]*).*$)|^.*$/, "$1");
            var myArray = JSON.parse(myArrayCookie);
            console.log(myArray);
            var check = false;
            var checkSL = false;
            $(".noticed").css("display","block");
            $("#helpSoLuong").text("Số lượng sản phẩm hợp lệ").css("color", "green");
            $(".noticedGioHang").text("Thêm vào giỏ hàng thành công!").css("color", "green");
            $("#imgNoticedGioHang").attr("src", "images/ticket/check.png");
            myArray.forEach(function (item) {
                if (item.id_nuochoa == sp.id_nuochoa && item.ten_nuochoa == sp.ten_nuochoa &&
                    item.gioitinh == sp.gioitinh && item.xuatxu == sp.xuatxu && item.dungtich == sp.dungtich
                    && item.dongia == sp.dongia && check == false) {
                    if (parseInt(item.soluong) <= 20 - parseInt(sp.soluong)) {
                        item.soluong = parseInt(item.soluong) + parseInt(sp.soluong);
                        check = true;
                    } else {
                        checkSL = true;
                        $(".noticed").css("display","block");
                        $("#helpSoLuong").text("Số lượng sản phẩm chưa hợp lệ (Tối đa 20 sản phẩm)").css("color", "red");
                        $("#imgNoticedGioHang").attr("src", "images/ticket/169779.png");
                        $(".noticedGioHang").text("Thêm vào giỏ hàng chưa thành công do số lượng sản phẩm chưa hợp lệ!").css("color", "red");
                    }
                }
            })
            if (check == false && checkSL == false) {
                myArray.push(sp);
                check = true;
            }
            var myArrayJSON = JSON.stringify(myArray);
            document.cookie = "myCart=" + myArrayJSON;
            tongSanPham = myArray.reduce((tong, arr) => tong + arr.soluong, 0);
            $(".numberOfCart").text(tongSanPham);
            $("#soluong").val(1);
            console.log(sp);
        } else {
            var now = new Date();
            var sp = [{
                'id_nuochoa': id_nuochoa,
                'ten_nuochoa': ten_nuochoa,
                'gioitinh': gt,
                'xuatxu': xuatxu,
                'dungtich': dungtichValue[0],
                'dongia': dungtichValue[1],
                'soluong': parseInt($("#soluong").val()),
                'img_link': img_link,
                'time': now,
            }]
            var myArrayJSON = JSON.stringify(sp);
            document.cookie = "myCart=" + myArrayJSON;
            tongSanPham = sp.reduce((tong, arr) => tong + arr.soluong, 0);
            $(".numberOfCart").text(tongSanPham);
            $("#soluong").val(1);
            $(".noticed").css("display","block");
            $("#helpSoLuong").text("Số lượng sản phẩm hợp lệ").css("color", "green");
            $(".noticedGioHang").text("Thêm vào giỏ hàng thành công!").css("color", "green");
            $("#imgNoticedGioHang").attr("src", "images/ticket/check.png");
            console.log(sp);
        }
    } else {
        $(".noticed").css("display","block");
        $("#helpSoLuong").text("Số lượng sản phẩm chưa hợp lệ (Tối đa 20 sản phẩm)").css("color", "red");
        $("#imgNoticedGioHang").attr("src", "images/ticket/169779.png");
        $(".noticedGioHang").text("Thêm vào giỏ hàng chưa thành công do số lượng sản phẩm chưa hợp lệ!").css("color", "red");
    }
})

$(document).on('click', '.addYeuThich', function() {
    var id_nuochoa = $(this).val();
    var dungtich = 10;
    if ($('input[type="radio"].dungtich').length > 0) {
        var selectedValue = $('input[type="radio"].dungtich:checked').val();
        if(selectedValue !== undefined){
            dungtich = selectedValue.split("_")[0];
        }
    }
    if(id_nuochoa!=""){
        let form_datas = new FormData();
        form_datas.append('id_nuochoa',id_nuochoa);
        form_datas.append('dungtich',dungtich);
        $.ajax({
            url: 'index.php?controller=KhachHang&action=themSanPhamYeuThich',
            dataType: 'text',
            cache: false,
            contentType: false,
            processData: false,
            data: form_datas,
            type: 'post',
            success: function(res) {
                var data = res;
                if(data == 0){
                    $("#imgNoticedYeuThich").attr("src", "images/ticket/169779.png");
                    $(".noticedYeuThich").text("Thêm vào sản phẩm yêu thích không thành công!").css("color", "red");
                }else if(data == 1){
                    $(".noticedYeuThich").text("Thêm vào sản phẩm yêu thích thành công!").css("color", "white");
                    $("#imgNoticedYeuThich").attr("src", "images/ticket/check.png");
                }else{
                    $("#imgNoticedYeuThich").attr("src", "images/ticket/169779.png");
                    $(".noticedYeuThich").text("Sản phẩm đã có trong danh sách yêu thích!").css("color", "red");
                }
            }
        });
        return false;
    }
})