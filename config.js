// ============================================
// Football Compare - Configuration
// ============================================

const CONFIG = {
    // API-Football Configuration
    API_BASE_URL: 'https://v3.football.api-sports.io',

    // Default API Key (for public use)
    DEFAULT_API_KEY: 'd0cd54a26ebecc0fcb9825095925da6b',

    // LocalStorage Keys
    STORAGE_KEYS: {
        API_KEY: 'football_compare_api_key',
        API_CALLS: 'football_compare_api_calls',
        API_CALLS_DATE: 'football_compare_api_calls_date',
        CACHE: 'football_compare_cache'
    },

    // Cache duration in milliseconds (1 hour)
    CACHE_DURATION: 60 * 60 * 1000,

    // Maximum selections
    MAX_SELECTIONS: 4,

    // Popular leagues (free tier accessible)
    POPULAR_LEAGUES: [
        { id: 39, name: 'Premier League', country: 'England' },
        { id: 140, name: 'La Liga', country: 'Spain' },
        { id: 135, name: 'Serie A', country: 'Italy' },
        { id: 78, name: 'Bundesliga', country: 'Germany' },
        { id: 61, name: 'Ligue 1', country: 'France' },
        { id: 94, name: 'Primeira Liga', country: 'Portugal' },
        { id: 88, name: 'Eredivisie', country: 'Netherlands' },
        { id: 144, name: 'Jupiler Pro League', country: 'Belgium' },
        { id: 2, name: 'UEFA Champions League', country: 'World' },
        { id: 3, name: 'UEFA Europa League', country: 'World' },
        { id: 848, name: 'UEFA Conference League', country: 'World' },
        { id: 1, name: 'World Cup', country: 'World' }
    ],

    // Player stat categories for comparison
    PLAYER_STAT_CATEGORIES: {
        games: {
            name: 'Appearances',
            stats: {
                'games.appearences': { label: 'Matches Played', description: 'Total appearances', higherIsBetter: true },
                'games.minutes': { label: 'Minutes', description: 'Total minutes played', higherIsBetter: true },
                'games.lineups': { label: 'Starting XI', description: 'Started in lineup', higherIsBetter: true },
                'games.rating': { label: 'Avg Rating', description: 'Average match rating', higherIsBetter: true, format: 'decimal' }
            }
        },
        goals: {
            name: 'Goals & Assists',
            stats: {
                'goals.total': { label: 'Goals', description: 'Total goals scored', higherIsBetter: true },
                'goals.assists': { label: 'Assists', description: 'Total assists', higherIsBetter: true },
                'goals.conceded': { label: 'Goals Conceded', description: 'For goalkeepers', higherIsBetter: false },
                'goals.saves': { label: 'Saves', description: 'For goalkeepers', higherIsBetter: true }
            }
        },
        shots: {
            name: 'Shooting',
            stats: {
                'shots.total': { label: 'Total Shots', description: 'All shots taken', higherIsBetter: true },
                'shots.on': { label: 'On Target', description: 'Shots on target', higherIsBetter: true }
            }
        },
        passes: {
            name: 'Passing',
            stats: {
                'passes.total': { label: 'Total Passes', description: 'Passes attempted', higherIsBetter: true },
                'passes.key': { label: 'Key Passes', description: 'Passes leading to shots', higherIsBetter: true },
                'passes.accuracy': { label: 'Pass Accuracy', description: 'Successful pass %', higherIsBetter: true, format: 'percent' }
            }
        },
        tackles: {
            name: 'Defending',
            stats: {
                'tackles.total': { label: 'Tackles', description: 'Total tackles', higherIsBetter: true },
                'tackles.blocks': { label: 'Blocks', description: 'Shots blocked', higherIsBetter: true },
                'tackles.interceptions': { label: 'Interceptions', description: 'Passes intercepted', higherIsBetter: true }
            }
        },
        duels: {
            name: 'Duels',
            stats: {
                'duels.total': { label: 'Total Duels', description: 'All duels contested', higherIsBetter: true },
                'duels.won': { label: 'Duels Won', description: 'Duels won', higherIsBetter: true }
            }
        },
        dribbles: {
            name: 'Dribbling',
            stats: {
                'dribbles.attempts': { label: 'Dribble Attempts', description: 'Dribbles attempted', higherIsBetter: true },
                'dribbles.success': { label: 'Successful Dribbles', description: 'Dribbles completed', higherIsBetter: true }
            }
        },
        fouls: {
            name: 'Discipline',
            stats: {
                'fouls.committed': { label: 'Fouls Committed', description: 'Fouls made', higherIsBetter: false },
                'fouls.drawn': { label: 'Fouls Won', description: 'Fouls drawn', higherIsBetter: true },
                'cards.yellow': { label: 'Yellow Cards', description: 'Bookings', higherIsBetter: false },
                'cards.red': { label: 'Red Cards', description: 'Sent off', higherIsBetter: false }
            }
        }
    },

    // Team stat categories for comparison
    TEAM_STAT_CATEGORIES: {
        form: {
            name: 'League Position',
            stats: {
                'rank': { label: 'Position', description: 'League standing', higherIsBetter: false },
                'points': { label: 'Points', description: 'Total points', higherIsBetter: true },
                'goalsDiff': { label: 'Goal Difference', description: 'Goals for minus against', higherIsBetter: true }
            }
        },
        matches: {
            name: 'Matches',
            stats: {
                'all.played': { label: 'Played', description: 'Matches played', higherIsBetter: true },
                'all.win': { label: 'Wins', description: 'Total wins', higherIsBetter: true },
                'all.draw': { label: 'Draws', description: 'Total draws', higherIsBetter: true },
                'all.lose': { label: 'Losses', description: 'Total losses', higherIsBetter: false }
            }
        },
        goals: {
            name: 'Goals',
            stats: {
                'all.goals.for': { label: 'Goals Scored', description: 'Total goals for', higherIsBetter: true },
                'all.goals.against': { label: 'Goals Conceded', description: 'Total goals against', higherIsBetter: false }
            }
        },
        home: {
            name: 'Home Form',
            stats: {
                'home.win': { label: 'Home Wins', description: 'Wins at home', higherIsBetter: true },
                'home.draw': { label: 'Home Draws', description: 'Draws at home', higherIsBetter: true },
                'home.lose': { label: 'Home Losses', description: 'Losses at home', higherIsBetter: false },
                'home.goals.for': { label: 'Home Goals', description: 'Goals scored at home', higherIsBetter: true }
            }
        },
        away: {
            name: 'Away Form',
            stats: {
                'away.win': { label: 'Away Wins', description: 'Wins away', higherIsBetter: true },
                'away.draw': { label: 'Away Draws', description: 'Draws away', higherIsBetter: true },
                'away.lose': { label: 'Away Losses', description: 'Losses away', higherIsBetter: false },
                'away.goals.for': { label: 'Away Goals', description: 'Goals scored away', higherIsBetter: true }
            }
        }
    }
};
