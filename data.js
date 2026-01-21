// ============================================
// VERSUS - Football Comparison Data
// Sample data with realistic stats
// ============================================

const PLAYERS = [
    {
        id: 1,
        name: "Erling Haaland",
        team: "Manchester City",
        position: "ST",
        nationality: "Norway",
        emoji: "🇳🇴",
        stats: {
            // Basic Stats
            appearances: 35,
            goals: 36,
            assists: 8,
            minutesPlayed: 2890,
            // Advanced Attacking
            goalsPerNinety: 1.12,
            expectedGoals: 28.5,
            expectedAssists: 5.2,
            shotsPerNinety: 4.8,
            shotsOnTarget: 68,
            conversionRate: 24.5,
            // Playmaking
            keyPassesPerNinety: 0.8,
            passAccuracy: 76.2,
            chancesCreated: 28,
            // Physical & Duels
            aerialDuelsWon: 72,
            dribblesSuccessRate: 48.5,
            // Form
            formRating: 8.9,
            minutesPerGoalContribution: 66
        }
    },
    {
        id: 2,
        name: "Kylian Mbappé",
        team: "Real Madrid",
        position: "LW",
        nationality: "France",
        emoji: "🇫🇷",
        stats: {
            appearances: 34,
            goals: 27,
            assists: 10,
            minutesPlayed: 2856,
            goalsPerNinety: 0.85,
            expectedGoals: 24.8,
            expectedAssists: 8.5,
            shotsPerNinety: 4.2,
            shotsOnTarget: 58,
            conversionRate: 21.2,
            keyPassesPerNinety: 2.1,
            passAccuracy: 82.4,
            chancesCreated: 62,
            aerialDuelsWon: 35,
            dribblesSuccessRate: 58.2,
            formRating: 8.5,
            minutesPerGoalContribution: 77
        }
    },
    {
        id: 3,
        name: "Jude Bellingham",
        team: "Real Madrid",
        position: "CM",
        nationality: "England",
        emoji: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
        stats: {
            appearances: 36,
            goals: 23,
            assists: 13,
            minutesPlayed: 3024,
            goalsPerNinety: 0.68,
            expectedGoals: 15.2,
            expectedAssists: 9.8,
            shotsPerNinety: 2.8,
            shotsOnTarget: 45,
            conversionRate: 28.4,
            keyPassesPerNinety: 2.4,
            passAccuracy: 88.6,
            chancesCreated: 78,
            aerialDuelsWon: 58,
            dribblesSuccessRate: 62.5,
            formRating: 8.7,
            minutesPerGoalContribution: 84
        }
    },
    {
        id: 4,
        name: "Vinicius Jr",
        team: "Real Madrid",
        position: "LW",
        nationality: "Brazil",
        emoji: "🇧🇷",
        stats: {
            appearances: 33,
            goals: 15,
            assists: 9,
            minutesPlayed: 2640,
            goalsPerNinety: 0.51,
            expectedGoals: 12.8,
            expectedAssists: 7.2,
            shotsPerNinety: 3.2,
            shotsOnTarget: 38,
            conversionRate: 18.5,
            keyPassesPerNinety: 2.6,
            passAccuracy: 79.8,
            chancesCreated: 72,
            aerialDuelsWon: 22,
            dribblesSuccessRate: 68.4,
            formRating: 8.2,
            minutesPerGoalContribution: 110
        }
    },
    {
        id: 5,
        name: "Mohamed Salah",
        team: "Liverpool",
        position: "RW",
        nationality: "Egypt",
        emoji: "🇪🇬",
        stats: {
            appearances: 37,
            goals: 19,
            assists: 14,
            minutesPlayed: 3150,
            goalsPerNinety: 0.54,
            expectedGoals: 17.5,
            expectedAssists: 11.2,
            shotsPerNinety: 3.5,
            shotsOnTarget: 52,
            conversionRate: 19.8,
            keyPassesPerNinety: 2.8,
            passAccuracy: 81.2,
            chancesCreated: 85,
            aerialDuelsWon: 28,
            dribblesSuccessRate: 52.8,
            formRating: 8.1,
            minutesPerGoalContribution: 95
        }
    },
    {
        id: 6,
        name: "Kevin De Bruyne",
        team: "Manchester City",
        position: "CM",
        nationality: "Belgium",
        emoji: "🇧🇪",
        stats: {
            appearances: 26,
            goals: 6,
            assists: 18,
            minutesPlayed: 1980,
            goalsPerNinety: 0.27,
            expectedGoals: 5.8,
            expectedAssists: 14.5,
            shotsPerNinety: 2.1,
            shotsOnTarget: 22,
            conversionRate: 15.2,
            keyPassesPerNinety: 4.2,
            passAccuracy: 89.4,
            chancesCreated: 95,
            aerialDuelsWon: 18,
            dribblesSuccessRate: 45.2,
            formRating: 8.4,
            minutesPerGoalContribution: 83
        }
    },
    {
        id: 7,
        name: "Rodri",
        team: "Manchester City",
        position: "DM",
        nationality: "Spain",
        emoji: "🇪🇸",
        stats: {
            appearances: 34,
            goals: 8,
            assists: 9,
            minutesPlayed: 3060,
            goalsPerNinety: 0.24,
            expectedGoals: 5.2,
            expectedAssists: 6.8,
            shotsPerNinety: 1.4,
            shotsOnTarget: 18,
            conversionRate: 22.5,
            keyPassesPerNinety: 1.8,
            passAccuracy: 93.5,
            chancesCreated: 42,
            aerialDuelsWon: 65,
            dribblesSuccessRate: 72.8,
            formRating: 8.6,
            minutesPerGoalContribution: 180
        }
    },
    {
        id: 8,
        name: "Bukayo Saka",
        team: "Arsenal",
        position: "RW",
        nationality: "England",
        emoji: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
        stats: {
            appearances: 38,
            goals: 16,
            assists: 11,
            minutesPlayed: 3240,
            goalsPerNinety: 0.44,
            expectedGoals: 13.2,
            expectedAssists: 9.8,
            shotsPerNinety: 2.8,
            shotsOnTarget: 42,
            conversionRate: 20.5,
            keyPassesPerNinety: 2.5,
            passAccuracy: 82.8,
            chancesCreated: 75,
            aerialDuelsWon: 32,
            dribblesSuccessRate: 55.2,
            formRating: 8.0,
            minutesPerGoalContribution: 120
        }
    },
    {
        id: 9,
        name: "Lamine Yamal",
        team: "Barcelona",
        position: "RW",
        nationality: "Spain",
        emoji: "🇪🇸",
        stats: {
            appearances: 37,
            goals: 7,
            assists: 10,
            minutesPlayed: 2590,
            goalsPerNinety: 0.24,
            expectedGoals: 6.5,
            expectedAssists: 8.2,
            shotsPerNinety: 2.2,
            shotsOnTarget: 28,
            conversionRate: 14.8,
            keyPassesPerNinety: 2.8,
            passAccuracy: 84.5,
            chancesCreated: 68,
            aerialDuelsWon: 18,
            dribblesSuccessRate: 58.8,
            formRating: 7.9,
            minutesPerGoalContribution: 152
        }
    },
    {
        id: 10,
        name: "Phil Foden",
        team: "Manchester City",
        position: "AM",
        nationality: "England",
        emoji: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
        stats: {
            appearances: 35,
            goals: 19,
            assists: 8,
            minutesPlayed: 2625,
            goalsPerNinety: 0.65,
            expectedGoals: 14.8,
            expectedAssists: 7.5,
            shotsPerNinety: 3.2,
            shotsOnTarget: 45,
            conversionRate: 23.2,
            keyPassesPerNinety: 2.2,
            passAccuracy: 86.2,
            chancesCreated: 58,
            aerialDuelsWon: 15,
            dribblesSuccessRate: 54.5,
            formRating: 8.3,
            minutesPerGoalContribution: 97
        }
    },
    {
        id: 11,
        name: "Harry Kane",
        team: "Bayern Munich",
        position: "ST",
        nationality: "England",
        emoji: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
        stats: {
            appearances: 36,
            goals: 36,
            assists: 10,
            minutesPlayed: 3096,
            goalsPerNinety: 1.05,
            expectedGoals: 30.2,
            expectedAssists: 8.5,
            shotsPerNinety: 4.5,
            shotsOnTarget: 72,
            conversionRate: 22.8,
            keyPassesPerNinety: 1.5,
            passAccuracy: 80.5,
            chancesCreated: 45,
            aerialDuelsWon: 82,
            dribblesSuccessRate: 42.5,
            formRating: 8.8,
            minutesPerGoalContribution: 67
        }
    },
    {
        id: 12,
        name: "Florian Wirtz",
        team: "Bayer Leverkusen",
        position: "AM",
        nationality: "Germany",
        emoji: "🇩🇪",
        stats: {
            appearances: 32,
            goals: 11,
            assists: 11,
            minutesPlayed: 2560,
            goalsPerNinety: 0.39,
            expectedGoals: 9.8,
            expectedAssists: 9.5,
            shotsPerNinety: 2.4,
            shotsOnTarget: 32,
            conversionRate: 18.5,
            keyPassesPerNinety: 3.2,
            passAccuracy: 87.5,
            chancesCreated: 82,
            aerialDuelsWon: 22,
            dribblesSuccessRate: 62.2,
            formRating: 8.4,
            minutesPerGoalContribution: 116
        }
    }
];

const TEAMS = [
    {
        id: 1,
        name: "Manchester City",
        league: "Premier League",
        country: "England",
        emoji: "🔵",
        stats: {
            // Basic
            matchesPlayed: 38,
            wins: 28,
            draws: 7,
            losses: 3,
            points: 91,
            goalsFor: 96,
            goalsAgainst: 34,
            goalDifference: 62,
            // Advanced Attacking
            expectedGoalsFor: 88.5,
            shotsPerMatch: 17.2,
            shotsOnTargetPct: 38.5,
            conversionRate: 14.8,
            bigChancesCreated: 125,
            // Possession & Passing
            possessionPct: 67.5,
            passAccuracy: 91.2,
            passesPerMatch: 685,
            // Defensive
            cleanSheetPct: 47.4,
            goalsConcededPerMatch: 0.89,
            expectedGoalsAgainst: 38.2,
            tacklesPerMatch: 14.5,
            interceptionPerMatch: 12.8,
            // Set Pieces & Patterns
            setPieceGoalsPct: 22.5,
            counterAttackGoals: 12,
            // Form
            homeWinPct: 89.5,
            awayWinPct: 63.2,
            currentStreak: 8
        }
    },
    {
        id: 2,
        name: "Arsenal",
        league: "Premier League",
        country: "England",
        emoji: "🔴",
        stats: {
            matchesPlayed: 38,
            wins: 26,
            draws: 8,
            losses: 4,
            points: 86,
            goalsFor: 88,
            goalsAgainst: 29,
            goalDifference: 59,
            expectedGoalsFor: 82.5,
            shotsPerMatch: 15.8,
            shotsOnTargetPct: 36.2,
            conversionRate: 14.6,
            bigChancesCreated: 112,
            possessionPct: 61.2,
            passAccuracy: 88.5,
            passesPerMatch: 595,
            cleanSheetPct: 52.6,
            goalsConcededPerMatch: 0.76,
            expectedGoalsAgainst: 32.5,
            tacklesPerMatch: 16.2,
            interceptionPerMatch: 14.5,
            setPieceGoalsPct: 28.5,
            counterAttackGoals: 8,
            homeWinPct: 78.9,
            awayWinPct: 57.9,
            currentStreak: 5
        }
    },
    {
        id: 3,
        name: "Liverpool",
        league: "Premier League",
        country: "England",
        emoji: "🔴",
        stats: {
            matchesPlayed: 38,
            wins: 24,
            draws: 10,
            losses: 4,
            points: 82,
            goalsFor: 86,
            goalsAgainst: 41,
            goalDifference: 45,
            expectedGoalsFor: 78.2,
            shotsPerMatch: 14.5,
            shotsOnTargetPct: 35.8,
            conversionRate: 15.6,
            bigChancesCreated: 98,
            possessionPct: 58.5,
            passAccuracy: 86.2,
            passesPerMatch: 545,
            cleanSheetPct: 36.8,
            goalsConcededPerMatch: 1.08,
            expectedGoalsAgainst: 42.5,
            tacklesPerMatch: 18.5,
            interceptionPerMatch: 15.2,
            setPieceGoalsPct: 18.5,
            counterAttackGoals: 15,
            homeWinPct: 73.7,
            awayWinPct: 52.6,
            currentStreak: 4
        }
    },
    {
        id: 4,
        name: "Real Madrid",
        league: "La Liga",
        country: "Spain",
        emoji: "⚪",
        stats: {
            matchesPlayed: 38,
            wins: 29,
            draws: 6,
            losses: 3,
            points: 93,
            goalsFor: 92,
            goalsAgainst: 32,
            goalDifference: 60,
            expectedGoalsFor: 85.8,
            shotsPerMatch: 15.2,
            shotsOnTargetPct: 40.2,
            conversionRate: 15.9,
            bigChancesCreated: 108,
            possessionPct: 56.8,
            passAccuracy: 87.5,
            passesPerMatch: 525,
            cleanSheetPct: 50.0,
            goalsConcededPerMatch: 0.84,
            expectedGoalsAgainst: 35.2,
            tacklesPerMatch: 15.8,
            interceptionPerMatch: 13.5,
            setPieceGoalsPct: 20.5,
            counterAttackGoals: 18,
            homeWinPct: 84.2,
            awayWinPct: 68.4,
            currentStreak: 10
        }
    },
    {
        id: 5,
        name: "Barcelona",
        league: "La Liga",
        country: "Spain",
        emoji: "🔵🔴",
        stats: {
            matchesPlayed: 38,
            wins: 25,
            draws: 9,
            losses: 4,
            points: 84,
            goalsFor: 79,
            goalsAgainst: 44,
            goalDifference: 35,
            expectedGoalsFor: 75.2,
            shotsPerMatch: 14.8,
            shotsOnTargetPct: 34.5,
            conversionRate: 14.0,
            bigChancesCreated: 95,
            possessionPct: 64.5,
            passAccuracy: 90.2,
            passesPerMatch: 645,
            cleanSheetPct: 34.2,
            goalsConcededPerMatch: 1.16,
            expectedGoalsAgainst: 40.5,
            tacklesPerMatch: 14.2,
            interceptionPerMatch: 11.8,
            setPieceGoalsPct: 16.5,
            counterAttackGoals: 10,
            homeWinPct: 73.7,
            awayWinPct: 57.9,
            currentStreak: 3
        }
    },
    {
        id: 6,
        name: "Bayern Munich",
        league: "Bundesliga",
        country: "Germany",
        emoji: "🔴",
        stats: {
            matchesPlayed: 34,
            wins: 23,
            draws: 5,
            losses: 6,
            points: 74,
            goalsFor: 94,
            goalsAgainst: 45,
            goalDifference: 49,
            expectedGoalsFor: 88.5,
            shotsPerMatch: 18.5,
            shotsOnTargetPct: 37.8,
            conversionRate: 15.0,
            bigChancesCreated: 118,
            possessionPct: 62.8,
            passAccuracy: 89.5,
            passesPerMatch: 615,
            cleanSheetPct: 32.4,
            goalsConcededPerMatch: 1.32,
            expectedGoalsAgainst: 48.2,
            tacklesPerMatch: 15.5,
            interceptionPerMatch: 12.2,
            setPieceGoalsPct: 19.5,
            counterAttackGoals: 14,
            homeWinPct: 82.4,
            awayWinPct: 52.9,
            currentStreak: 4
        }
    },
    {
        id: 7,
        name: "Bayer Leverkusen",
        league: "Bundesliga",
        country: "Germany",
        emoji: "🔴⚫",
        stats: {
            matchesPlayed: 34,
            wins: 28,
            draws: 6,
            losses: 0,
            points: 90,
            goalsFor: 89,
            goalsAgainst: 24,
            goalDifference: 65,
            expectedGoalsFor: 78.5,
            shotsPerMatch: 14.2,
            shotsOnTargetPct: 42.5,
            conversionRate: 18.4,
            bigChancesCreated: 95,
            possessionPct: 58.5,
            passAccuracy: 87.8,
            passesPerMatch: 545,
            cleanSheetPct: 55.9,
            goalsConcededPerMatch: 0.71,
            expectedGoalsAgainst: 28.5,
            tacklesPerMatch: 17.8,
            interceptionPerMatch: 14.8,
            setPieceGoalsPct: 24.5,
            counterAttackGoals: 16,
            homeWinPct: 88.2,
            awayWinPct: 76.5,
            currentStreak: 18
        }
    },
    {
        id: 8,
        name: "Inter Milan",
        league: "Serie A",
        country: "Italy",
        emoji: "🔵⚫",
        stats: {
            matchesPlayed: 38,
            wins: 29,
            draws: 7,
            losses: 2,
            points: 94,
            goalsFor: 89,
            goalsAgainst: 22,
            goalDifference: 67,
            expectedGoalsFor: 82.5,
            shotsPerMatch: 14.8,
            shotsOnTargetPct: 38.2,
            conversionRate: 15.8,
            bigChancesCreated: 102,
            possessionPct: 55.2,
            passAccuracy: 86.8,
            passesPerMatch: 505,
            cleanSheetPct: 57.9,
            goalsConcededPerMatch: 0.58,
            expectedGoalsAgainst: 26.5,
            tacklesPerMatch: 18.2,
            interceptionPerMatch: 15.5,
            setPieceGoalsPct: 26.5,
            counterAttackGoals: 14,
            homeWinPct: 84.2,
            awayWinPct: 68.4,
            currentStreak: 7
        }
    },
    {
        id: 9,
        name: "Paris Saint-Germain",
        league: "Ligue 1",
        country: "France",
        emoji: "🔵🔴",
        stats: {
            matchesPlayed: 34,
            wins: 27,
            draws: 5,
            losses: 2,
            points: 86,
            goalsFor: 86,
            goalsAgainst: 32,
            goalDifference: 54,
            expectedGoalsFor: 80.5,
            shotsPerMatch: 16.5,
            shotsOnTargetPct: 36.8,
            conversionRate: 15.4,
            bigChancesCreated: 108,
            possessionPct: 62.5,
            passAccuracy: 89.2,
            passesPerMatch: 595,
            cleanSheetPct: 47.1,
            goalsConcededPerMatch: 0.94,
            expectedGoalsAgainst: 35.5,
            tacklesPerMatch: 14.8,
            interceptionPerMatch: 12.5,
            setPieceGoalsPct: 18.5,
            counterAttackGoals: 12,
            homeWinPct: 88.2,
            awayWinPct: 70.6,
            currentStreak: 6
        }
    },
    {
        id: 10,
        name: "Borussia Dortmund",
        league: "Bundesliga",
        country: "Germany",
        emoji: "🟡",
        stats: {
            matchesPlayed: 34,
            wins: 18,
            draws: 10,
            losses: 6,
            points: 64,
            goalsFor: 68,
            goalsAgainst: 43,
            goalDifference: 25,
            expectedGoalsFor: 62.5,
            shotsPerMatch: 13.8,
            shotsOnTargetPct: 34.2,
            conversionRate: 14.5,
            bigChancesCreated: 85,
            possessionPct: 54.8,
            passAccuracy: 85.2,
            passesPerMatch: 495,
            cleanSheetPct: 29.4,
            goalsConcededPerMatch: 1.26,
            expectedGoalsAgainst: 45.2,
            tacklesPerMatch: 16.5,
            interceptionPerMatch: 13.8,
            setPieceGoalsPct: 22.5,
            counterAttackGoals: 11,
            homeWinPct: 64.7,
            awayWinPct: 41.2,
            currentStreak: 2
        }
    }
];

// Stat definitions with metadata
const PLAYER_STAT_CATEGORIES = {
    basic: {
        name: "Basic Stats",
        icon: "📊",
        stats: {
            appearances: { label: "Appearances", description: "Total matches played", higherIsBetter: true },
            goals: { label: "Goals", description: "Total goals scored", higherIsBetter: true },
            assists: { label: "Assists", description: "Total assists", higherIsBetter: true },
            minutesPlayed: { label: "Minutes Played", description: "Total minutes on pitch", higherIsBetter: true }
        }
    },
    attacking: {
        name: "Attacking",
        icon: "⚽",
        stats: {
            goalsPerNinety: { label: "Goals per 90", description: "Goals scored per 90 minutes", higherIsBetter: true, format: "decimal" },
            expectedGoals: { label: "xG", description: "Expected Goals based on shot quality", higherIsBetter: true, format: "decimal" },
            expectedAssists: { label: "xA", description: "Expected Assists based on pass quality", higherIsBetter: true, format: "decimal" },
            conversionRate: { label: "Conversion Rate", description: "Percentage of shots converted to goals", higherIsBetter: true, format: "percent" }
        }
    },
    shooting: {
        name: "Shooting",
        icon: "🎯",
        stats: {
            shotsPerNinety: { label: "Shots per 90", description: "Shots taken per 90 minutes", higherIsBetter: true, format: "decimal" },
            shotsOnTarget: { label: "Shots on Target", description: "Total shots on target", higherIsBetter: true }
        }
    },
    playmaking: {
        name: "Playmaking",
        icon: "🎨",
        stats: {
            keyPassesPerNinety: { label: "Key Passes/90", description: "Passes leading to shots per 90", higherIsBetter: true, format: "decimal" },
            passAccuracy: { label: "Pass Accuracy", description: "Percentage of successful passes", higherIsBetter: true, format: "percent" },
            chancesCreated: { label: "Chances Created", description: "Total chances created", higherIsBetter: true }
        }
    },
    physical: {
        name: "Physical & Duels",
        icon: "💪",
        stats: {
            aerialDuelsWon: { label: "Aerial Duels Won", description: "Headers won", higherIsBetter: true },
            dribblesSuccessRate: { label: "Dribble Success", description: "Percentage of successful dribbles", higherIsBetter: true, format: "percent" }
        }
    },
    efficiency: {
        name: "Efficiency",
        icon: "⚡",
        stats: {
            formRating: { label: "Form Rating", description: "Average match rating (last 5)", higherIsBetter: true, format: "decimal" },
            minutesPerGoalContribution: { label: "Mins/G+A", description: "Minutes per goal or assist", higherIsBetter: false }
        }
    }
};

const TEAM_STAT_CATEGORIES = {
    basic: {
        name: "League Standing",
        icon: "🏆",
        stats: {
            points: { label: "Points", description: "Total league points", higherIsBetter: true },
            wins: { label: "Wins", description: "Total wins", higherIsBetter: true },
            draws: { label: "Draws", description: "Total draws", higherIsBetter: true },
            losses: { label: "Losses", description: "Total losses", higherIsBetter: false },
            goalDifference: { label: "Goal Difference", description: "Goals scored minus conceded", higherIsBetter: true }
        }
    },
    attacking: {
        name: "Attack",
        icon: "⚽",
        stats: {
            goalsFor: { label: "Goals Scored", description: "Total goals scored", higherIsBetter: true },
            expectedGoalsFor: { label: "xG For", description: "Expected goals from chances", higherIsBetter: true, format: "decimal" },
            conversionRate: { label: "Conversion Rate", description: "Shot to goal ratio", higherIsBetter: true, format: "percent" },
            bigChancesCreated: { label: "Big Chances", description: "Clear goal-scoring opportunities", higherIsBetter: true }
        }
    },
    shooting: {
        name: "Shooting",
        icon: "🎯",
        stats: {
            shotsPerMatch: { label: "Shots/Match", description: "Average shots per game", higherIsBetter: true, format: "decimal" },
            shotsOnTargetPct: { label: "Shots on Target %", description: "Accuracy of shots", higherIsBetter: true, format: "percent" }
        }
    },
    possession: {
        name: "Possession",
        icon: "🎮",
        stats: {
            possessionPct: { label: "Possession", description: "Average ball possession", higherIsBetter: true, format: "percent" },
            passAccuracy: { label: "Pass Accuracy", description: "Successful pass percentage", higherIsBetter: true, format: "percent" },
            passesPerMatch: { label: "Passes/Match", description: "Total passes per game", higherIsBetter: true }
        }
    },
    defense: {
        name: "Defense",
        icon: "🛡️",
        stats: {
            goalsAgainst: { label: "Goals Conceded", description: "Total goals against", higherIsBetter: false },
            cleanSheetPct: { label: "Clean Sheet %", description: "Matches without conceding", higherIsBetter: true, format: "percent" },
            goalsConcededPerMatch: { label: "Goals/Match", description: "Average goals conceded", higherIsBetter: false, format: "decimal" },
            expectedGoalsAgainst: { label: "xG Against", description: "Expected goals from opponent chances", higherIsBetter: false, format: "decimal" }
        }
    },
    patterns: {
        name: "Play Patterns",
        icon: "📈",
        stats: {
            setPieceGoalsPct: { label: "Set Piece Goals %", description: "Goals from set pieces", higherIsBetter: true, format: "percent" },
            counterAttackGoals: { label: "Counter Goals", description: "Goals from counters", higherIsBetter: true }
        }
    },
    form: {
        name: "Form",
        icon: "🔥",
        stats: {
            homeWinPct: { label: "Home Win %", description: "Win rate at home", higherIsBetter: true, format: "percent" },
            awayWinPct: { label: "Away Win %", description: "Win rate away", higherIsBetter: true, format: "percent" },
            currentStreak: { label: "Win Streak", description: "Current unbeaten run", higherIsBetter: true }
        }
    }
};
