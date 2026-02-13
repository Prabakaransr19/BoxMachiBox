// lib/api.js

const BASE_URL = 'https://api.openf1.org/v1';

export async function fetchStandingsData() {
  try {
    // Fetch latest session to get session_key
    const sessionRes = await fetch(`${BASE_URL}/sessions?year=2024&session_type=Race`, {
      cache: 'no-store',
    });
    
    if (!sessionRes.ok) {
      throw new Error(`Failed to fetch sessions: ${sessionRes.status}`);
    }
    
    const sessions = await sessionRes.json();
    
    if (!Array.isArray(sessions) || sessions.length === 0) {
      console.warn('No sessions found, returning empty standings');
      return { drivers: [], teams: [] };
    }
    
    const lastSession = sessions[sessions.length - 1];
    const sessionKey = lastSession.session_key;

    // Fetch drivers championship
    const driversRes = await fetch(`${BASE_URL}/drivers`, {
      cache: 'no-store',
    });
    
    const driversData = await driversRes.json();
    const drivers = Array.isArray(driversData) ? driversData : [];

    // Fetch teams championship
    const teamsRes = await fetch(`${BASE_URL}/teams`, {
      cache: 'no-store',
    });
    
    const teamsData = await teamsRes.json();
    const teams = Array.isArray(teamsData) ? teamsData : [];

    return {
      drivers: drivers.map((driver, index) => ({
        position: index + 1,
        name: driver.full_name || driver.name_acronym || 'Unknown',
        team: driver.team_name || 'Unknown',
        points: driver.points || 0,
        ...driver
      })),
      teams: teams.map((team, index) => ({
        position: index + 1,
        name: team.team_name || team.name || 'Unknown',
        points: team.points || 0,
        ...team
      }))
    };
    
  } catch (error) {
    console.error('Failed to fetch standings:', error);
    // Return empty arrays to prevent forEach errors
    return {
      drivers: [],
      teams: [],
    };
  }
}

export async function fetchDriverInfo(driverId) {
  try {
    const response = await fetch(`${BASE_URL}/drivers?driver_number=${driverId}`, {
      cache: 'no-store',
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch driver: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!Array.isArray(data) || data.length === 0) {
      return null;
    }
    
    return data[0];
    
  } catch (error) {
    console.error('Failed to fetch driver info:', error);
    return null;
  }
}
