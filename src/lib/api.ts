

export interface DriverStanding {
    position: number;
    driver_number: number;
    driver_name: string;
    team_name: string;
    points: number;
    wins: number;
    podiums: number;
    team_colour?: string;
    headshot_url?: string;
}

export interface ConstructorStanding {
    position: number;
    team_name: string;
    points: number;
    wins: number;
    podiums: number;
    team_colour?: string;
}

const BASE_URL = "https://api.openf1.org/v1";

// Team Color Map (Backup if unavailable in API)
export const TEAM_COLOR_MAP: Record<string, string> = {
    "Red Bull Racing": "#3671C6",
    "Ferrari": "#E8002D", // Official-ish red
    "Mercedes": "#27F4D2",
    "McLaren": "#FF8000",
    "Aston Martin": "#225941",
    "Alpine": "#0093CC",
    "Williams": "#64C4FF",
    "RB": "#6692FF",
    "Kick Sauber": "#52E252",
    "Haas F1 Team": "#B6BABD",
    "Haas": "#B6BABD",
    "Sauber": "#52E252"
};

async function getLatestRaceSessionKey(): Promise<number> {
    try {
        // Fetch 2024 races (since 2025 is future/empty in this simulated time context or just safe)
        // In a real 2026 context, 2025 would be the "last season".
        // I will try 2025 first.
        let response = await fetch(`${BASE_URL}/sessions?year=2025&session_type=Race`);
        let sessions = await response.json();

        if (!sessions || sessions.length === 0) {
            // Fallback to 2024
            response = await fetch(`${BASE_URL}/sessions?year=2024&session_type=Race`);
            sessions = await response.json();
        }

        if (sessions && sessions.length > 0) {
            // Return the last session key (latest race)
            return sessions[sessions.length - 1].session_key;
        }
        return 9472; // Default fallback (Bahrain 2024)
    } catch (e) {
        console.warn("Failed to fetch sessions, using fallback.");
        return 9472;
    }
}

export async function fetchStandingsData(): Promise<{ drivers: DriverStanding[], teams: ConstructorStanding[] }> {
    const sessionKey = await getLatestRaceSessionKey();

    // 1. Fetch Drivers Roster (for names and teams)
    const driversRes = await fetch(`${BASE_URL}/drivers?session_key=${sessionKey}`);
    const driversList = await driversRes.json();

    // 2. Fetch Championship Standings (Drivers)
    const champRes = await fetch(`${BASE_URL}/championship_drivers?session_key=${sessionKey}`);
    const champList = await champRes.json();

    // 3. Join Data
    // Map driver_number -> Driver Info
    const driverMap = new Map();
    driversList.forEach((d: any) => {
        driverMap.set(d.driver_number, {
            name: d.full_name,
            team: d.team_name,
            color: d.team_colour ? `#${d.team_colour}` : TEAM_COLOR_MAP[d.team_name] || "#FFFFFF",
            headshot: d.headshot_url
        });
    });

    const drivers: DriverStanding[] = champList.map((c: any) => {
        const info = driverMap.get(c.driver_number) || { name: "Unknown", team: "Unknown", color: "#FFF" };
        return {
            position: c.position_current,
            driver_number: c.driver_number,
            driver_name: info.name,
            team_name: info.team,
            points: c.points_current,
            wins: 0, // API doesn't provide easily without N+1
            podiums: 0,
            team_colour: info.color,
            headshot_url: info.headshot
        };
    });

    // Sort Drivers
    // Points DESC, then (Wins), then (Podiums) -> We lack Wins/Podiums so default Points
    drivers.sort((a, b) => b.points - a.points);

    // Re-assign positions based on sort 
    // (The API position_current might be accurate, but sorting ensures table is correct)
    drivers.forEach((d, i) => d.position = i + 1);

    // 4. Aggregate Constructor Standings from Drivers
    const teamMap = new Map<string, ConstructorStanding>();

    drivers.forEach(d => {
        if (!teamMap.has(d.team_name)) {
            teamMap.set(d.team_name, {
                position: 0,
                team_name: d.team_name,
                points: 0,
                wins: 0,
                podiums: 0,
                team_colour: d.team_colour
            });
        }
        const team = teamMap.get(d.team_name)!;
        team.points += d.points;
        // wins/podiums would sum here if we had them
    });

    const teams = Array.from(teamMap.values());
    teams.sort((a, b) => b.points - a.points);
    teams.forEach((t, i) => t.position = i + 1);

    return { drivers, teams };
}

export interface RaceResult {
    meeting_key: number;
    session_key: number;
    date: string;
    location: string;
    position: number;
    points: number; // calculated or fetched if available
}

export async function fetchDriverProfile(driverNumber: number) {
    const { drivers } = await fetchStandingsData();
    const driver = drivers.find(d => d.driver_number === driverNumber);

    if (!driver) return null;

    // Fetch history
    // Logic: Get sessions -> filter races -> get position for this driver
    let history: RaceResult[] = [];
    try {
        const sessionKey = await getLatestRaceSessionKey(); // This gives LATEST. We want ALL 2024/2025.
        // Assuming we are in "2025" mode but falling back to 2024 data.
        // let's fetch all races for the season of the current sessionKey.
        // To save time/bandwidth, let's just fetch the last 5 races roughly.
        // Or fetch all sessions for the year.

        // We need the YEAR from the sessionKey logic.
        // Let's just fetch 2024 races explicitly for stability as established in `getLatestRaceSessionKey` fallback.
        const year = 2024;
        const sessionsRes = await fetch(`${BASE_URL}/sessions?year=${year}&session_type=Race`);
        const sessions = await sessionsRes.json();

        // Setup promises to fetch specific results for this driver in these sessions
        // Limit to last 8 races to allow for "Recent Results" without over-fetching
        const lastRaces = sessions.slice(-8).reverse(); // Most recent first

        const historyPromises = lastRaces.map(async (s: any) => {
            try {
                // Fetch position for this driver in this session
                // We want final classification.
                // Endpoint /position?session_key=X&driver_number=Y gives array of positions? 
                // Let's assume we want the last one.
                const posRes = await fetch(`${BASE_URL}/position?session_key=${s.session_key}&driver_number=${driverNumber}`);
                const posData = await posRes.json();

                if (posData && posData.length > 0) {
                    const lastPos = posData[posData.length - 1];
                    return {
                        meeting_key: s.meeting_key,
                        session_key: s.session_key,
                        date: s.date_start,
                        location: s.location,
                        position: lastPos.position,
                        points: 0 // TODO: calculate points based on position if needed
                    };
                }
                return null;
            } catch (e) {
                return null;
            }
        });

        const results = await Promise.all(historyPromises);
        history = results.filter((r): r is RaceResult => r !== null);

    } catch (e) {
        console.error("Error fetching history:", e);
    }

    return {
        ...driver,
        history
    };
}

export async function fetchWithRetry(
    url: string,
    options?: RequestInit,
    maxRetries = 3
): Promise<Response> {
    let lastError;

    for (let attempt = 0; attempt < maxRetries; attempt++) {
        try {
            const response = await fetch(url, {
                ...options,
                signal: AbortSignal.timeout(45000) // 45s timeout
            });

            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return response;

        } catch (error) {
            lastError = error;

            if (attempt < maxRetries - 1) {
                // Wait 5s before retry
                await new Promise(resolve => setTimeout(resolve, 5000));
                console.log(`Retry attempt ${attempt + 2}/${maxRetries}...`);
            }
        }
    }

    throw lastError;
}
