<?php

namespace Tests\Feature\Feature;

use App\Models\Voucher;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class VoucherApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_check_endpoint_returns_false_when_flight_has_no_voucher(): void
    {
        $response = $this->postJson('/api/check', [
            'flightNumber' => 'GA102',
            'date' => '2025-07-12',
        ]);

        $response
            ->assertOk()
            ->assertJson([
                'exists' => false,
            ]);
    }

    public function test_generate_endpoint_creates_voucher_and_returns_three_seats(): void
    {
        $response = $this->postJson('/api/generate', [
            'name' => 'Sarah',
            'id' => '98123',
            'flightNumber' => 'ID102',
            'date' => '2025-07-12',
            'aircraft' => 'Airbus 320',
        ]);

        $response
            ->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonCount(3, 'seats');

        $seats = $response->json('seats');
        $this->assertCount(3, array_unique($seats));

        $this->assertDatabaseHas('vouchers', [
            'flight_number' => 'ID102',
            'flight_date' => '2025-07-12',
            'aircraft_type' => 'Airbus 320',
        ]);
    }

    public function test_generate_endpoint_rejects_duplicate_flight_date_combination(): void
    {
        Voucher::query()->create([
            'crew_name' => 'Sarah',
            'crew_id' => '98123',
            'flight_number' => 'ID102',
            'flight_date' => '2025-07-12',
            'aircraft_type' => 'Airbus 320',
            'seat1' => '3B',
            'seat2' => '7C',
            'seat3' => '14D',
        ]);

        $response = $this->postJson('/api/generate', [
            'name' => 'Another',
            'id' => '11111',
            'flightNumber' => 'ID102',
            'date' => '2025-07-12',
            'aircraft' => 'Airbus 320',
        ]);

        $response
            ->assertStatus(409)
            ->assertJson([
                'success' => false,
                'message' => 'Vouchers already generated for this flight and date',
            ]);
    }

    public function test_generate_endpoint_returns_validation_errors_for_invalid_payload(): void
    {
        $response = $this->postJson('/api/generate', [
            'name' => '',
            'id' => '',
            'flightNumber' => 'GA102',
            'date' => '12-07-2025',
            'aircraft' => 'ATR-72',
        ]);

        $response
            ->assertStatus(422)
            ->assertJsonValidationErrors(['name', 'id', 'date', 'aircraft']);
    }
}
