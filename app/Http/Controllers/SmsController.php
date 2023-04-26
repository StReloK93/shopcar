<?php

namespace App\Http\Controllers;

use App\Http\Requests\SmsRequest;
use Illuminate\Http\Request;
use Http;
use Hash;
use DB;
class SmsController extends Controller
{
    public function sendmessage(SmsRequest $request){
        $number = random_int(100000, 999999);

        $smsToken = DB::table('smstoken')->where('id',1)->first();

        $res = Http::withToken($smsToken->token)->post('notify.eskiz.uz/api/message/sms/send', [
            'mobile_phone' => $request->phone,
            'message' => 'QARZDAFTAR nomerni tasdiqlash uchun kod:'.$number,
            'from' => '4546'
        ]);


        $respone = json_decode($res);
        if($respone->status == 'error'){
            return response()->json(['errors' => 
                ['phone' => ["Telefon raqam to'gri emas"]]
            ], 422);
        }
        
        DB::table('sendsms')->insert(['phone' => $request->phone,'password' => Hash::make($number)]);

        return true;
    }

    public function confirm(Request $request){
        $phone = $request->phone;

        $prime = DB::table('sendsms')->where('phone', $phone)->orderBy('id', 'desc')->first();

        if ($prime != null && $prime = Hash::check($request->smskey, $prime->password)) {
            
            $prime = DB::table('sendsms')->where('phone',$phone)->delete();

            return true;
        }
        return false;
    }
}
