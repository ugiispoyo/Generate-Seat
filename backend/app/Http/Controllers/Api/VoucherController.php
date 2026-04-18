<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\CheckVoucherRequest;
use App\Http\Requests\GenerateVoucherRequest;
use App\Http\Controllers\Controller;
use App\Models\Voucher;
use App\Services\SeatGeneratorService;
use Illuminate\Database\QueryException;
use RuntimeException;

class VoucherController extends Controller
{
    public function check(CheckVoucherRequest $request)
    {
        $exists = Voucher::query()
            ->where('flight_number', $request->string('flightNumber')->toString())
            ->where('flight_date', $request->date('date')->toDateString())
            ->exists();

        return response()->json([
            'exists' => $exists,
        ]);
    }

    public function generate(GenerateVoucherRequest $request, SeatGeneratorService $seatGeneratorService)
    {
        $flightNumber = $request->string('flightNumber')->toString();
        $flightDate = $request->date('date')->toDateString();

        $exists = Voucher::query()
            ->where('flight_number', $flightNumber)
            ->where('flight_date', $flightDate)
            ->exists();

        if ($exists) {
            return response()->json([
                'success' => false,
                'message' => 'Vouchers already generated for this flight and date',
            ], 409);
        }

        try {
            $seats = $seatGeneratorService->generateSeats($request->string('aircraft')->toString());
        } catch (RuntimeException $exception) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to generate seats. Please try again.',
            ], 500);
        }

        try {
            Voucher::query()->create([
                'crew_name' => $request->string('name')->toString(),
                'crew_id' => $request->string('id')->toString(),
                'flight_number' => $flightNumber,
                'flight_date' => $flightDate,
                'aircraft_type' => $request->string('aircraft')->toString(),
                'seat1' => $seats[0],
                'seat2' => $seats[1],
                'seat3' => $seats[2],
            ]);
        } catch (QueryException $exception) {
            return response()->json([
                'success' => false,
                'message' => 'Vouchers already generated for this flight and date',
            ], 409);
        }

        return response()->json([
            'success' => true,
            'seats' => $seats,
        ]);
    }
}
