export class TideTimes {
    TideHeight?: number;
    TideTime?: string;
    TideType?: string;
}

export class Tides {
    TideInfo: TideTimes[] = [];
    HighTideOffset?: number;
    LowTideOffset?: number;
    TideDirection?: string;
    WaterTemp?: number;
}

export class Weather {
    Sunrise?: string;
    Sunset?: string;
    MoonPhase?: string;
    AirTemp: number;
    WindSpeed?: number;
    WindDirection?: string;
    Pressure?: number;
}