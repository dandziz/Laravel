<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

class BaiViet extends Model
{
    use HasFactory;
    protected  $table = "tb_kienthuc_blog";
    protected function getNgayDangAttribute($value){
        return Carbon::parse($value)->format('d-m-Y');
    }
}
