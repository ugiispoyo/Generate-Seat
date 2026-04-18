<?php

namespace App\Services;

use InvalidArgumentException;
use RuntimeException;

class SeatGeneratorService
{
    /**
     * @return array<string>
     */
    public function generateSeats(string $aircraft): array
    {
        $config = $this->getAircraftConfig($aircraft);
        $seats = [];
        $attempts = 0;

        while (count($seats) < 3) {
            $attempts++;

            if ($attempts > 100) {
                throw new RuntimeException('Unable to generate unique seats.');
            }

            $row = random_int($config['minRow'], $config['maxRow']);
            $letter = $config['seatLetters'][array_rand($config['seatLetters'])];
            $seat = sprintf('%d%s', $row, $letter);

            if (!in_array($seat, $seats, true)) {
                $seats[] = $seat;
            }
        }

        return $seats;
    }

    /**
     * @return array{minRow:int, maxRow:int, seatLetters:array<string>}
     */
    private function getAircraftConfig(string $aircraft): array
    {
        return match ($aircraft) {
            'ATR' => [
                'minRow' => 1,
                'maxRow' => 18,
                'seatLetters' => ['A', 'C', 'D', 'F'],
            ],
            'Airbus 320', 'Boeing 737 Max' => [
                'minRow' => 1,
                'maxRow' => 32,
                'seatLetters' => ['A', 'B', 'C', 'D', 'E', 'F'],
            ],
            default => throw new InvalidArgumentException('Unsupported aircraft type.'),
        };
    }
}