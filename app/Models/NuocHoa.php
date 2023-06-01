<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

class NuocHoa extends Model
{
    use HasFactory;
    protected $table = "tb_nuochoa";
    public function getNgaybatDaubanAttribute($value)
    {
        return Carbon::parse($value)->format('d-m-Y');
    }
}
