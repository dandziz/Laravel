<?php

namespace App\Http\Controllers;

use App\Models\BaiViet;
use App\Models\NuocHoa;
use App\Http\Requests\StoreNuocHoaRequest;
use App\Http\Requests\UpdateNuocHoaRequest;
use App\Models\ThuongHieu;
use Illuminate\Support\Facades\DB;

class NuocHoaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $nuochoa = NuocHoa::query()
            ->select('id_nuochoa', 'ten_nuochoa', 'gioitinh', 'ngaybat_dauban', 'danhgia', 'tb_nuochoa.status', 'tb_nuochoa.id_thuonghieu',
                DB::raw("(SELECT img_link from tb_anhnuochoa where tb_anhnuochoa.id_nuochoa = tb_nuochoa.id_nuochoa order by id_anh ASC limit 1, 1) as img_link"),
                DB::raw("(SELECT max(gia_ban) from tb_gianuochoa where tb_gianuochoa.id_nuochoa = tb_nuochoa.id_nuochoa GROUP by tb_gianuochoa.id_nuochoa) as max_gia"),
                DB::raw("(SELECT min(gia_ban) from tb_gianuochoa where tb_gianuochoa.id_nuochoa = tb_nuochoa.id_nuochoa GROUP by tb_gianuochoa.id_nuochoa) as min_gia"),
            )
            ->where('tb_nuochoa.status', '=', 0)
            ->join("tb_nhacungcap", function ($join){
                $join->on("tb_nhacungcap.id_nhacungcap", "=", "tb_nuochoa.id_nhacungcap")->where("tb_nhacungcap.status", "=", 0);
            })
            ->join("tb_thuonghieu", function ($join){
                $join->on("tb_thuonghieu.id_thuonghieu", "=", "tb_nuochoa.id_thuonghieu")->where("tb_thuonghieu.status", "=", 0);
            })
            ->get();
        $nuocHoaNam =  $nuochoa->filter(function($item){
            return $item->gioitinh == 0;
        })->values()->toArray();
        $nuocHoaNu =  $nuochoa->filter(function($item){
            return $item->gioitinh == 1;
        })->values()->toArray();
        $nuocHoaUnisex =  $nuochoa->filter(function($item){
            return $item->gioitinh == 2;
        })->values()->toArray();
        $th = ThuongHieu::query()->select("id_thuonghieu", "ten_thuonghieu")->where("status", "=", 0)
            ->get();
        $kienthuc = BaiViet::query()->select("id_baiviet_blog", "tieude", "ngaydang", "mota", "phanloai",
            DB::raw("(SELECT img_link from tb_doanvan where tb_kienthuc_blog.id_baiviet_blog = tb_doanvan.id AND img_link IS NOT NULL ORDER BY tb_doanvan.sothutu ASC limit 0, 1) as img_link"))
            ->where("phanloai", "=", 0)
            ->orderByDesc("ngaydang")
            ->get();
        return view("NuocHoa/index", [
            'nuocHoaNam' => $nuocHoaNam,
            'nuocHoaNu' => $nuocHoaNu,
            'nuocHoaUnisex' => $nuocHoaUnisex,
            'th' => $th,
            'kienthuc' => $kienthuc,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreNuocHoaRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(NuocHoa $nuocHoa)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(NuocHoa $nuocHoa)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateNuocHoaRequest $request, NuocHoa $nuocHoa)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(NuocHoa $nuocHoa)
    {
        //
    }
}
