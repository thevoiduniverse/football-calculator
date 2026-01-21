// ============================================
// Football Compare - API Module
// Handles all API-Football requests
// ============================================

const FootballAPI = {
    // Get API key from storage
    getApiKey() {
        return localStorage.getItem(CONFIG.STORAGE_KEYS.API_KEY);
    },

    // Save API key to storage
    setApiKey(key) {
        localStorage.setItem(CONFIG.STORAGE_KEYS.API_KEY, key);
    },

    // Track API calls
    getApiCallCount() {
        const today = new Date().toDateString();
        const storedDate = localStorage.getItem(CONFIG.STORAGE_KEYS.API_CALLS_DATE);

        if (storedDate !== today) {
            // Reset counter for new day
            localStorage.setItem(CONFIG.STORAGE_KEYS.API_CALLS_DATE, today);
            localStorage.setItem(CONFIG.STORAGE_KEYS.API_CALLS, '0');
            return 0;
        }

        return parseInt(localStorage.getItem(CONFIG.STORAGE_KEYS.API_CALLS) || '0');
    },

    incrementApiCalls() {
        const count = this.getApiCallCount() + 1;
        localStorage.setItem(CONFIG.STORAGE_KEYS.API_CALLS, count.toString());
        this.updateApiCallsDisplay();
        return count;
    },

    updateApiCallsDisplay() {
        const el = document.getElementById('api-calls');
        if (el) {
            el.textContent = this.getApiCallCount();
        }
    },

    // Cache management
    getCache(key) {
        try {
            const cache = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.CACHE) || '{}');
            const item = cache[key];
            if (item && Date.now() - item.timestamp < CONFIG.CACHE_DURATION) {
                return item.data;
            }
        } catch (e) {
            console.error('Cache read error:', e);
        }
        return null;
    },

    setCache(key, data) {
        try {
            const cache = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.CACHE) || '{}');
            cache[key] = { data, timestamp: Date.now() };
            localStorage.setItem(CONFIG.STORAGE_KEYS.CACHE, JSON.stringify(cache));
        } catch (e) {
            console.error('Cache write error:', e);
        }
    },

    // Make API request
    async request(endpoint, params = {}) {
        const apiKey = this.getApiKey();
        if (!apiKey) {
            throw new Error('API key not configured');
        }

        // Build query string
        const queryString = new URLSearchParams(params).toString();
        const url = `${CONFIG.API_BASE_URL}${endpoint}${queryString ? '?' + queryString : ''}`;

        // Check cache first
        const cacheKey = url;
        const cached = this.getCache(cacheKey);
        if (cached) {
            return cached;
        }

        // Make request
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'x-rapidapi-host': 'v3.football.api-sports.io',
                'x-rapidapi-key': apiKey
            }
        });

        if (!response.ok) {
            if (response.status === 401) {
                throw new Error('Invalid API key');
            }
            if (response.status === 429) {
                throw new Error('API rate limit exceeded. Try again tomorrow.');
            }
            throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        this.incrementApiCalls();

        // Cache successful response
        if (data.response) {
            this.setCache(cacheKey, data);
        }

        return data;
    },

    // Validate API key
    async validateApiKey(key) {
        const response = await fetch(`${CONFIG.API_BASE_URL}/status`, {
            method: 'GET',
            headers: {
                'x-rapidapi-host': 'v3.football.api-sports.io',
                'x-rapidapi-key': key
            }
        });

        if (!response.ok) {
            return false;
        }

        const data = await response.json();
        return data.response && data.response.account;
    },

    // Get available leagues
    async getLeagues() {
        // Return popular leagues from config (no API call needed)
        return CONFIG.POPULAR_LEAGUES;
    },

    // Get teams for a league
    async getTeams(leagueId, season) {
        const data = await this.request('/teams', { league: leagueId, season });
        return data.response || [];
    },

    // Get team standings
    async getStandings(leagueId, season) {
        const data = await this.request('/standings', { league: leagueId, season });
        if (data.response && data.response[0] && data.response[0].league) {
            return data.response[0].league.standings[0] || [];
        }
        return [];
    },

    // Get team statistics
    async getTeamStatistics(teamId, leagueId, season) {
        const data = await this.request('/teams/statistics', {
            team: teamId,
            league: leagueId,
            season
        });
        return data.response || null;
    },

    // Get players for a team
    async getPlayers(teamId, season, page = 1) {
        const data = await this.request('/players', {
            team: teamId,
            season,
            page
        });
        return {
            players: data.response || [],
            paging: data.paging || { current: 1, total: 1 }
        };
    },

    // Get player statistics
    async getPlayerStatistics(playerId, season) {
        const data = await this.request('/players', {
            id: playerId,
            season
        });
        return data.response && data.response[0] ? data.response[0] : null;
    },

    // Search players by name
    async searchPlayers(name, leagueId, season) {
        const data = await this.request('/players', {
            search: name,
            league: leagueId,
            season
        });
        return data.response || [];
    },

    // Get top scorers for a league
    async getTopScorers(leagueId, season) {
        const data = await this.request('/players/topscorers', {
            league: leagueId,
            season
        });
        return data.response || [];
    },

    // Get top assists for a league
    async getTopAssists(leagueId, season) {
        const data = await this.request('/players/topassists', {
            league: leagueId,
            season
        });
        return data.response || [];
    }
};
