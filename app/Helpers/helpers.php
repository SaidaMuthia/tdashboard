<?php

namespace App\Functions;
/**
 * get month number in string for multiple type of input month names
 *
 * @param string $monthName
 * @return string
 */
function monthPools (string $monthName) {
    $monthLists = [
        [
            "key" => "jan, january, januari",
            "value" => "01"
        ], [
            "key" => "feb, february, februari",
            "value" => "02"
        ], [
            "key" => "mar, march, maret",
            "value" => "03"
        ], [
            "key" => "apr, april",
            "value" => "04"
        ], [
            "key" => "may, mei",
            "value" => "05"
        ], [
            "key" => "jun, juny, juni",
            "value" => "06"
        ], [
            "key" => "jul, july, juli",
            "value" => "07"
        ], [
            "key" => "agu, aug, august, agustus",
            "value" => "08"
        ], [
            "key" => "sep, september",
            "value" => "09"
        ], [
            "key" => "oct, okt, october, oktober",
            "value" => "10"
        ], [
            "key" => "nov, november",
            "value" => "11"
        ], [
            "key" => "dec, december, desember",
            "value" => "12"
        ]
    ];
    //
    $monthFilter= array_values(array_filter($monthLists, function ($ele) use ($monthName) {
        return str_contains(strtolower($ele['key']), strtolower($monthName));
    }));
    //
    return $monthFilter[0]['value'];

}
