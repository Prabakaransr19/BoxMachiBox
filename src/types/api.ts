// API returns { count: number, drivers: string[] }
// keeping interfaces simple for the frontend components

export interface PredictionRequest {
    driver: string;
    circuit: string;
    grid_position: number;
    recent_form: 'Excellent' | 'Good' | 'Average' | 'Poor';
    weather: 'Dry' | 'Wet' | 'Mixed';
}

export interface PredictionResponse {
    podium_probability: number;
    predicted_position: string | number;
    confidence: 'High' | 'Medium' | 'Low';
    contributing_factors: {
        factor: string;
        impact: string; // e.g. "+15%"
        icon?: string;
    }[];
}

export interface ModelInfo {
    model_type: string;
    accuracy: number;
    training_samples: number;
    version: string;
}

export interface GridPosition {
    position: number;
    driver: string;
}

export interface FullGridPredictionRequest {
    grid: GridPosition[];
    circuit: string;
    weather: 'Dry' | 'Wet' | 'Mixed';
}

export interface DriverResult {
    position: number;
    driver: string;
    starting_grid: number;
    podium_probability: number;
    confidence: 'High' | 'Medium' | 'Low';
    expected_points: number;
}

export interface FullGridPredictionResponse {
    predicted_results: DriverResult[];
    podium: string[];
    points_positions: string[];
    fastest_lap_prediction: string;
    dnf_predictions: string[];
    metadata: {
        circuit: string;
        weather: string;
        prediction_date: string;
    };
}
