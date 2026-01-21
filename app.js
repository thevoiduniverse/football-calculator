// ============================================
// VERSUS - Football Comparison App
// Main Application Logic
// ============================================

// State Management
const state = {
    activeTab: 'players',
    selectedPlayers: [],
    selectedTeams: [],
    maxSelections: 4
};

// DOM Elements
const elements = {
    // Navigation
    navTabs: document.querySelectorAll('.nav-tab'),

    // Player Section
    playersSection: document.getElementById('players-section'),
    playerGrid: document.getElementById('player-grid'),
    playerSearch: document.getElementById('player-search'),
    playerCount: document.getElementById('player-count'),
    playerComparisonCards: document.getElementById('player-comparison-cards'),
    playerStatsComparison: document.getElementById('player-stats-comparison'),
    playerArena: document.getElementById('player-arena'),

    // Team Section
    teamsSection: document.getElementById('teams-section'),
    teamGrid: document.getElementById('team-grid'),
    teamSearch: document.getElementById('team-search'),
    teamCount: document.getElementById('team-count'),
    teamComparisonCards: document.getElementById('team-comparison-cards'),
    teamStatsComparison: document.getElementById('team-stats-comparison'),
    teamArena: document.getElementById('team-arena')
};

// ============================================
// Initialization
// ============================================

function init() {
    renderPlayerGrid(PLAYERS);
    renderTeamGrid(TEAMS);
    setupEventListeners();
}

function setupEventListeners() {
    // Tab Navigation
    elements.navTabs.forEach(tab => {
        tab.addEventListener('click', () => switchTab(tab.dataset.tab));
    });

    // Search
    elements.playerSearch.addEventListener('input', (e) => {
        const filtered = filterEntities(PLAYERS, e.target.value);
        renderPlayerGrid(filtered);
    });

    elements.teamSearch.addEventListener('input', (e) => {
        const filtered = filterEntities(TEAMS, e.target.value);
        renderTeamGrid(filtered);
    });
}

// ============================================
// Tab Navigation
// ============================================

function switchTab(tab) {
    state.activeTab = tab;

    // Update nav tabs
    elements.navTabs.forEach(navTab => {
        navTab.classList.toggle('active', navTab.dataset.tab === tab);
    });

    // Update sections
    elements.playersSection.classList.toggle('active', tab === 'players');
    elements.teamsSection.classList.toggle('active', tab === 'teams');
}

// ============================================
// Entity Rendering
// ============================================

function renderPlayerGrid(players) {
    elements.playerGrid.innerHTML = players.map(player => {
        const isSelected = state.selectedPlayers.some(p => p.id === player.id);
        return `
            <div class="entity-card ${isSelected ? 'selected' : ''}"
                 data-id="${player.id}"
                 onclick="togglePlayer(${player.id})">
                <div class="entity-avatar">${player.emoji}</div>
                <div class="entity-info">
                    <div class="entity-name">${player.name}</div>
                    <div class="entity-meta">
                        <span>${player.team}</span>
                        <span class="position">${player.position}</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function renderTeamGrid(teams) {
    elements.teamGrid.innerHTML = teams.map(team => {
        const isSelected = state.selectedTeams.some(t => t.id === team.id);
        return `
            <div class="entity-card ${isSelected ? 'selected' : ''}"
                 data-id="${team.id}"
                 onclick="toggleTeam(${team.id})">
                <div class="entity-avatar">${team.emoji}</div>
                <div class="entity-info">
                    <div class="entity-name">${team.name}</div>
                    <div class="entity-meta">
                        <span>${team.league}</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// ============================================
// Selection Logic
// ============================================

function togglePlayer(id) {
    const player = PLAYERS.find(p => p.id === id);
    const index = state.selectedPlayers.findIndex(p => p.id === id);

    if (index > -1) {
        state.selectedPlayers.splice(index, 1);
    } else if (state.selectedPlayers.length < state.maxSelections) {
        state.selectedPlayers.push(player);
    }

    updatePlayerUI();
}

function toggleTeam(id) {
    const team = TEAMS.find(t => t.id === id);
    const index = state.selectedTeams.findIndex(t => t.id === id);

    if (index > -1) {
        state.selectedTeams.splice(index, 1);
    } else if (state.selectedTeams.length < state.maxSelections) {
        state.selectedTeams.push(team);
    }

    updateTeamUI();
}

function removePlayer(id) {
    state.selectedPlayers = state.selectedPlayers.filter(p => p.id !== id);
    updatePlayerUI();
}

function removeTeam(id) {
    state.selectedTeams = state.selectedTeams.filter(t => t.id !== id);
    updateTeamUI();
}

// ============================================
// UI Updates
// ============================================

function updatePlayerUI() {
    // Update count
    elements.playerCount.textContent = state.selectedPlayers.length;

    // Re-render grid to update selection states
    const searchTerm = elements.playerSearch.value;
    const filtered = searchTerm ? filterEntities(PLAYERS, searchTerm) : PLAYERS;
    renderPlayerGrid(filtered);

    // Update comparison cards
    renderPlayerComparisonCards();

    // Update stats comparison
    if (state.selectedPlayers.length >= 2) {
        renderPlayerStatsComparison();
        elements.playerStatsComparison.classList.add('active');
    } else {
        elements.playerStatsComparison.classList.remove('active');
        elements.playerStatsComparison.innerHTML = '';
    }
}

function updateTeamUI() {
    // Update count
    elements.teamCount.textContent = state.selectedTeams.length;

    // Re-render grid to update selection states
    const searchTerm = elements.teamSearch.value;
    const filtered = searchTerm ? filterEntities(TEAMS, searchTerm) : TEAMS;
    renderTeamGrid(filtered);

    // Update comparison cards
    renderTeamComparisonCards();

    // Update stats comparison
    if (state.selectedTeams.length >= 2) {
        renderTeamStatsComparison();
        elements.teamStatsComparison.classList.add('active');
    } else {
        elements.teamStatsComparison.classList.remove('active');
        elements.teamStatsComparison.innerHTML = '';
    }
}

// ============================================
// Comparison Cards
// ============================================

function renderPlayerComparisonCards() {
    if (state.selectedPlayers.length === 0) {
        elements.playerComparisonCards.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">👆</div>
                <p>Select 2-4 players above to start comparing</p>
            </div>
        `;
        return;
    }

    elements.playerComparisonCards.innerHTML = state.selectedPlayers.map((player, index) => `
        <div class="comparison-card" data-index="${index}">
            <button class="remove-btn" onclick="removePlayer(${player.id})" title="Remove">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M18 6L6 18M6 6l12 12"></path>
                </svg>
            </button>
            <div class="card-avatar">${player.emoji}</div>
            <div class="card-name">${player.name}</div>
            <div class="card-team">${player.team}</div>
            <span class="card-position">${player.position}</span>
        </div>
    `).join('');
}

function renderTeamComparisonCards() {
    if (state.selectedTeams.length === 0) {
        elements.teamComparisonCards.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">👆</div>
                <p>Select 2-4 teams above to start comparing</p>
            </div>
        `;
        return;
    }

    elements.teamComparisonCards.innerHTML = state.selectedTeams.map((team, index) => `
        <div class="comparison-card" data-index="${index}">
            <button class="remove-btn" onclick="removeTeam(${team.id})" title="Remove">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M18 6L6 18M6 6l12 12"></path>
                </svg>
            </button>
            <div class="card-avatar">${team.emoji}</div>
            <div class="card-name">${team.name}</div>
            <div class="card-team">${team.league}</div>
            <span class="card-position">${team.country}</span>
        </div>
    `).join('');
}

// ============================================
// Stats Comparison
// ============================================

function renderPlayerStatsComparison() {
    const categories = Object.entries(PLAYER_STAT_CATEGORIES);

    elements.playerStatsComparison.innerHTML = categories.map(([key, category]) => `
        <div class="stats-category">
            <div class="category-header">
                <div class="category-icon">${category.icon}</div>
                <h3>${category.name}</h3>
            </div>
            ${renderStatRows(state.selectedPlayers, category.stats)}
        </div>
    `).join('');
}

function renderTeamStatsComparison() {
    const categories = Object.entries(TEAM_STAT_CATEGORIES);

    elements.teamStatsComparison.innerHTML = categories.map(([key, category]) => `
        <div class="stats-category">
            <div class="category-header">
                <div class="category-icon">${category.icon}</div>
                <h3>${category.name}</h3>
            </div>
            ${renderStatRows(state.selectedTeams, category.stats)}
        </div>
    `).join('');
}

function renderStatRows(entities, stats) {
    return Object.entries(stats).map(([statKey, statMeta]) => {
        const values = entities.map(e => e.stats[statKey]);
        const bestValue = findBestValue(values, statMeta.higherIsBetter);
        const maxValue = Math.max(...values);

        return `
            <div class="stat-row">
                <div class="stat-label">
                    ${statMeta.label}
                    <span class="stat-description">${statMeta.description}</span>
                </div>
                <div class="stat-bars">
                    ${entities.map((entity, index) => {
                        const value = entity.stats[statKey];
                        const isBest = value === bestValue && entities.length > 1;
                        const percentage = maxValue > 0 ? (value / maxValue) * 100 : 0;
                        const displayValue = formatValue(value, statMeta.format);

                        return `
                            <div class="stat-bar-container">
                                <div class="stat-bar-header">
                                    <span class="stat-bar-name">${entity.name.split(' ').pop()}</span>
                                    <span class="stat-bar-value ${isBest ? 'is-best' : ''}">${displayValue}</span>
                                </div>
                                <div class="stat-bar-track">
                                    <div class="stat-bar-fill ${isBest ? 'is-best' : ''}"
                                         data-index="${index}"
                                         style="width: ${percentage}%"></div>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    }).join('');
}

// ============================================
// Utility Functions
// ============================================

function filterEntities(entities, searchTerm) {
    const term = searchTerm.toLowerCase();
    return entities.filter(entity =>
        entity.name.toLowerCase().includes(term) ||
        (entity.team && entity.team.toLowerCase().includes(term)) ||
        (entity.league && entity.league.toLowerCase().includes(term)) ||
        (entity.position && entity.position.toLowerCase().includes(term)) ||
        (entity.nationality && entity.nationality.toLowerCase().includes(term))
    );
}

function findBestValue(values, higherIsBetter) {
    if (higherIsBetter) {
        return Math.max(...values);
    }
    return Math.min(...values);
}

function formatValue(value, format) {
    if (format === 'percent') {
        return `${value.toFixed(1)}%`;
    }
    if (format === 'decimal') {
        return value.toFixed(2);
    }
    return value.toString();
}

function resetComparison() {
    state.selectedPlayers = [];
    state.selectedTeams = [];
    updatePlayerUI();
    updateTeamUI();

    // Clear search inputs
    elements.playerSearch.value = '';
    elements.teamSearch.value = '';

    // Re-render grids
    renderPlayerGrid(PLAYERS);
    renderTeamGrid(TEAMS);
}

// ============================================
// Initialize App
// ============================================

document.addEventListener('DOMContentLoaded', init);
