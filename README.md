# Football Compare

A clean, minimal football player and team comparison website with live data from leagues worldwide.

## Features

- **Live Data**: Real-time statistics from API-Football covering 1000+ leagues
- **Player Comparison**: Compare up to 4 players with detailed statistics
- **Team Comparison**: Compare teams with standings, goals, and form data
- **Smart Highlighting**: Best performer highlighted in green for each stat
- **Caching**: Responses cached for 1 hour to minimize API calls
- **Responsive**: Works on desktop, tablet, and mobile

## Getting Started

### 1. Get a Free API Key

1. Go to [API-Football](https://www.api-football.com/)
2. Sign up for a free account
3. Copy your API key from the dashboard

### 2. Open the App

Open `index.html` in your browser or visit the hosted version.

### 3. Enter Your API Key

When prompted, paste your API key and click "Connect".

## API Limits (Free Tier)

- **100 requests per day**
- Access to all endpoints
- Data cached locally for 1 hour

## Player Stats Available

| Category | Stats |
|----------|-------|
| Appearances | Matches, Minutes, Starting XI, Rating |
| Goals & Assists | Goals, Assists, Saves, Conceded |
| Shooting | Total Shots, On Target |
| Passing | Total Passes, Key Passes, Accuracy |
| Defending | Tackles, Blocks, Interceptions |
| Duels | Total Duels, Duels Won |
| Dribbling | Attempts, Successful |
| Discipline | Fouls, Yellow/Red Cards |

## Team Stats Available

| Category | Stats |
|----------|-------|
| League Position | Rank, Points, Goal Difference |
| Matches | Played, Wins, Draws, Losses |
| Goals | Scored, Conceded |
| Home Form | Wins, Draws, Losses, Goals |
| Away Form | Wins, Draws, Losses, Goals |

## Supported Leagues

- Premier League (England)
- La Liga (Spain)
- Serie A (Italy)
- Bundesliga (Germany)
- Ligue 1 (France)
- Primeira Liga (Portugal)
- Eredivisie (Netherlands)
- UEFA Champions League
- UEFA Europa League
- And many more...

## Tech Stack

- Pure HTML, CSS, JavaScript (no frameworks)
- [API-Football](https://www.api-football.com/) for live data
- LocalStorage for caching and API key storage

## Design

Inspired by [Google Language Explorer](https://sites.research.google/languages/) with:
- Clean, minimal aesthetic
- Light theme with blue accents
- Generous whitespace
- Clear typography hierarchy

## License

MIT
