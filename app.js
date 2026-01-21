// ============================================
// Football Compare - Main Application
// ============================================

// State Management
const state = {
    activeTab: 'players',
    selectedPlayers: [],
    selectedTeams: [],
    currentLeague: null,
    currentSeason: '2024',
    currentTeam: null,
    players: [],
    teams: [],
    standings: []
};

// DOM Elements
const elements = {};

// ============================================
// Initialization
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    cacheElements();
    checkApiKey();
    setupEventListeners();
    FootballAPI.updateApiCallsDisplay();
});

function cacheElements() {
    elements.apiModal = document.getElementById('api-modal');
    elements.apiKeyInput = document.getElementById('api-key-input');
    elements.saveApiKeyBtn = document.getElementById('save-api-key');
    elements.settingsBtn = document.getElementById('settings-btn');
    elements.loadingOverlay = document.getElementById('loading-overlay');
    elements.toastContainer = document.getElementById('toast-container');

    // Player elements
    elements.playersSection = document.getElementById('players-section');
    elements.playerLeagueSelect = document.getElementById('player-league-select');
    elements.playerSeasonSelect = document.getElementById('player-season-select');
    elements.playerTeamSelect = document.getElementById('player-team-select');
    elements.playerSearch = document.getElementById('player-search');
    elements.playerGrid = document.getElementById('player-grid');
    elements.playerCount = document.getElementById('player-count');
    elements.playerChips = document.getElementById('player-chips');
    elements.comparePlayersBtn = document.getElementById('compare-players-btn');
    elements.playerComparison = document.getElementById('player-comparison');

    // Team elements
    elements.teamsSection = document.getElementById('teams-section');
    elements.teamLeagueSelect = document.getElementById('team-league-select');
    elements.teamSeasonSelect = document.getElementById('team-season-select');
    elements.teamSearch = document.getElementById('team-search');
    elements.teamGrid = document.getElementById('team-grid');
    elements.teamCount = document.getElementById('team-count');
    elements.teamChips = document.getElementById('team-chips');
    elements.compareTeamsBtn = document.getElementById('compare-teams-btn');
    elements.teamComparison = document.getElementById('team-comparison');

    // Nav tabs
    elements.navTabs = document.querySelectorAll('.nav-tab');
}

function checkApiKey() {
    const apiKey = FootballAPI.getApiKey();
    if (apiKey) {
        hideModal();
        initializeApp();
    } else {
        showModal();
    }
}

function setupEventListeners() {
    // API Key
    elements.saveApiKeyBtn.addEventListener('click', handleSaveApiKey);
    elements.settingsBtn.addEventListener('click', showModal);
    elements.apiKeyInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSaveApiKey();
    });

    // Navigation
    elements.navTabs.forEach(tab => {
        tab.addEventListener('click', () => switchTab(tab.dataset.tab));
    });

    // Player filters
    elements.playerLeagueSelect.addEventListener('change', handlePlayerLeagueChange);
    elements.playerSeasonSelect.addEventListener('change', handlePlayerSeasonChange);
    elements.playerTeamSelect.addEventListener('change', handlePlayerTeamChange);
    elements.playerSearch.addEventListener('input', debounce(handlePlayerSearch, 300));
    elements.comparePlayersBtn.addEventListener('click', compareSelectedPlayers);

    // Team filters
    elements.teamLeagueSelect.addEventListener('change', handleTeamLeagueChange);
    elements.teamSeasonSelect.addEventListener('change', handleTeamSeasonChange);
    elements.teamSearch.addEventListener('input', debounce(handleTeamSearch, 300));
    elements.compareTeamsBtn.addEventListener('click', compareSelectedTeams);
}

// ============================================
// API Key Handling
// ============================================

async function handleSaveApiKey() {
    const key = elements.apiKeyInput.value.trim();
    if (!key) {
        showToast('Please enter an API key', 'error');
        return;
    }

    showLoading();
    try {
        const isValid = await FootballAPI.validateApiKey(key);
        if (isValid) {
            FootballAPI.setApiKey(key);
            hideModal();
            showToast('API key saved successfully', 'success');
            initializeApp();
        } else {
            showToast('Invalid API key', 'error');
        }
    } catch (error) {
        showToast('Failed to validate API key', 'error');
    } finally {
        hideLoading();
    }
}

// ============================================
// App Initialization
// ============================================

async function initializeApp() {
    try {
        // Populate league dropdowns
        const leagues = await FootballAPI.getLeagues();
        populateLeagueSelect(elements.playerLeagueSelect, leagues);
        populateLeagueSelect(elements.teamLeagueSelect, leagues);
    } catch (error) {
        showToast('Failed to initialize app', 'error');
    }
}

function populateLeagueSelect(select, leagues) {
    select.innerHTML = '<option value="">Select a league</option>';
    leagues.forEach(league => {
        const option = document.createElement('option');
        option.value = league.id;
        option.textContent = `${league.name} (${league.country})`;
        select.appendChild(option);
    });
}

// ============================================
// Tab Navigation
// ============================================

function switchTab(tab) {
    state.activeTab = tab;

    elements.navTabs.forEach(navTab => {
        navTab.classList.toggle('active', navTab.dataset.tab === tab);
    });

    elements.playersSection.classList.toggle('active', tab === 'players');
    elements.teamsSection.classList.toggle('active', tab === 'teams');
}

// ============================================
// Player Section Handlers
// ============================================

async function handlePlayerLeagueChange(e) {
    const leagueId = e.target.value;
    state.currentLeague = leagueId;

    // Reset team selection
    elements.playerTeamSelect.innerHTML = '<option value="">Select a team</option>';
    elements.playerTeamSelect.disabled = true;
    elements.playerSearch.disabled = true;
    state.players = [];
    renderPlayerGrid();

    if (!leagueId) return;

    showLoading();
    try {
        const teams = await FootballAPI.getTeams(leagueId, state.currentSeason);
        state.teams = teams;
        populateTeamSelect(elements.playerTeamSelect, teams);
        elements.playerTeamSelect.disabled = false;
    } catch (error) {
        showToast('Failed to load teams', 'error');
    } finally {
        hideLoading();
    }
}

async function handlePlayerSeasonChange(e) {
    state.currentSeason = e.target.value;
    // Reload teams if league is selected
    if (state.currentLeague) {
        await handlePlayerLeagueChange({ target: elements.playerLeagueSelect });
    }
}

async function handlePlayerTeamChange(e) {
    const teamId = e.target.value;
    state.currentTeam = teamId;

    if (!teamId) {
        state.players = [];
        elements.playerSearch.disabled = true;
        renderPlayerGrid();
        return;
    }

    showLoading();
    try {
        const { players } = await FootballAPI.getPlayers(teamId, state.currentSeason);
        state.players = players;
        elements.playerSearch.disabled = false;
        renderPlayerGrid();
    } catch (error) {
        showToast('Failed to load players', 'error');
    } finally {
        hideLoading();
    }
}

function handlePlayerSearch(e) {
    renderPlayerGrid(e.target.value);
}

function populateTeamSelect(select, teams) {
    select.innerHTML = '<option value="">Select a team</option>';
    teams.sort((a, b) => a.team.name.localeCompare(b.team.name));
    teams.forEach(item => {
        const option = document.createElement('option');
        option.value = item.team.id;
        option.textContent = item.team.name;
        select.appendChild(option);
    });
}

function renderPlayerGrid(searchTerm = '') {
    const filtered = state.players.filter(p => {
        if (!searchTerm) return true;
        const name = p.player.name.toLowerCase();
        return name.includes(searchTerm.toLowerCase());
    });

    if (filtered.length === 0) {
        elements.playerGrid.innerHTML = `
            <div class="empty-state">
                <p>${state.currentTeam ? 'No players found' : 'Select a league and team to browse players'}</p>
            </div>
        `;
        return;
    }

    elements.playerGrid.innerHTML = filtered.map(item => {
        const player = item.player;
        const stats = item.statistics[0] || {};
        const isSelected = state.selectedPlayers.some(p => p.player.id === player.id);

        return `
            <div class="entity-card ${isSelected ? 'selected' : ''}" data-player-id="${player.id}">
                <div class="entity-avatar">
                    <img src="${player.photo}" alt="${player.name}" onerror="this.src='https://media.api-sports.io/football/players/0.png'">
                </div>
                <div class="entity-info">
                    <div class="entity-name">${player.name}</div>
                    <div class="entity-meta">
                        <span>${stats.team?.name || 'Unknown'}</span>
                        <span class="badge">${stats.games?.position || 'N/A'}</span>
                    </div>
                </div>
                <div class="check-icon">
                    ${isSelected ? '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6L9 17l-5-5"></path></svg>' : ''}
                </div>
            </div>
        `;
    }).join('');

    // Add click handlers
    elements.playerGrid.querySelectorAll('.entity-card').forEach(card => {
        card.addEventListener('click', () => togglePlayerSelection(parseInt(card.dataset.playerId)));
    });
}

function togglePlayerSelection(playerId) {
    const playerData = state.players.find(p => p.player.id === playerId);
    if (!playerData) return;

    const index = state.selectedPlayers.findIndex(p => p.player.id === playerId);

    if (index > -1) {
        state.selectedPlayers.splice(index, 1);
    } else if (state.selectedPlayers.length < CONFIG.MAX_SELECTIONS) {
        state.selectedPlayers.push(playerData);
    } else {
        showToast(`Maximum ${CONFIG.MAX_SELECTIONS} players can be selected`, 'error');
        return;
    }

    updatePlayerSelectionUI();
}

function updatePlayerSelectionUI() {
    const count = state.selectedPlayers.length;
    elements.playerCount.textContent = count;
    elements.comparePlayersBtn.disabled = count < 2;

    // Update chips
    elements.playerChips.innerHTML = state.selectedPlayers.map(item => `
        <div class="chip">
            <img src="${item.player.photo}" alt="" onerror="this.src='https://media.api-sports.io/football/players/0.png'">
            ${item.player.name.split(' ').pop()}
            <button class="chip-remove" data-player-id="${item.player.id}">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M18 6L6 18M6 6l12 12"></path>
                </svg>
            </button>
        </div>
    `).join('');

    // Add remove handlers
    elements.playerChips.querySelectorAll('.chip-remove').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            togglePlayerSelection(parseInt(btn.dataset.playerId));
        });
    });

    // Re-render grid to update selection states
    renderPlayerGrid(elements.playerSearch.value);
}

async function compareSelectedPlayers() {
    if (state.selectedPlayers.length < 2) return;

    elements.playerComparison.classList.add('active');
    elements.playerComparison.innerHTML = `
        <div class="comparison-header">
            <h2>Player Comparison</h2>
            <div class="comparison-legend">
                <span class="legend-item">
                    <span class="legend-dot"></span>
                    Best in comparison
                </span>
            </div>
        </div>
        <div class="comparison-cards">
            ${state.selectedPlayers.map((item, index) => `
                <div class="comparison-card" data-index="${index}">
                    <div class="avatar">
                        <img src="${item.player.photo}" alt="${item.player.name}" onerror="this.src='https://media.api-sports.io/football/players/0.png'">
                    </div>
                    <div class="name">${item.player.name}</div>
                    <div class="team">${item.statistics[0]?.team?.name || 'Unknown'}</div>
                </div>
            `).join('')}
        </div>
        ${renderPlayerStatsComparison()}
    `;

    // Scroll to comparison
    elements.playerComparison.scrollIntoView({ behavior: 'smooth' });
}

function renderPlayerStatsComparison() {
    const categories = Object.entries(CONFIG.PLAYER_STAT_CATEGORIES);

    return categories.map(([key, category]) => `
        <div class="stats-category">
            <div class="category-header">
                <h3>${category.name}</h3>
            </div>
            ${renderStatRows(state.selectedPlayers, category.stats, 'player')}
        </div>
    `).join('');
}

// ============================================
// Team Section Handlers
// ============================================

async function handleTeamLeagueChange(e) {
    const leagueId = e.target.value;
    state.currentLeague = leagueId;

    elements.teamSearch.disabled = true;
    state.standings = [];
    renderTeamGrid();

    if (!leagueId) return;

    showLoading();
    try {
        const standings = await FootballAPI.getStandings(leagueId, state.currentSeason);
        state.standings = standings;
        elements.teamSearch.disabled = false;
        renderTeamGrid();
    } catch (error) {
        showToast('Failed to load standings', 'error');
    } finally {
        hideLoading();
    }
}

async function handleTeamSeasonChange(e) {
    state.currentSeason = e.target.value;
    if (state.currentLeague) {
        await handleTeamLeagueChange({ target: elements.teamLeagueSelect });
    }
}

function handleTeamSearch(e) {
    renderTeamGrid(e.target.value);
}

function renderTeamGrid(searchTerm = '') {
    const filtered = state.standings.filter(item => {
        if (!searchTerm) return true;
        const name = item.team.name.toLowerCase();
        return name.includes(searchTerm.toLowerCase());
    });

    if (filtered.length === 0) {
        elements.teamGrid.innerHTML = `
            <div class="empty-state">
                <p>${state.standings.length > 0 ? 'No teams found' : 'Select a league to browse teams'}</p>
            </div>
        `;
        return;
    }

    elements.teamGrid.innerHTML = filtered.map(item => {
        const isSelected = state.selectedTeams.some(t => t.team.id === item.team.id);

        return `
            <div class="entity-card ${isSelected ? 'selected' : ''}" data-team-id="${item.team.id}">
                <div class="entity-avatar">
                    <img src="${item.team.logo}" alt="${item.team.name}" onerror="this.style.display='none'">
                </div>
                <div class="entity-info">
                    <div class="entity-name">${item.team.name}</div>
                    <div class="entity-meta">
                        <span>${item.points} pts</span>
                        <span class="badge">#${item.rank}</span>
                    </div>
                </div>
                <div class="check-icon">
                    ${isSelected ? '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6L9 17l-5-5"></path></svg>' : ''}
                </div>
            </div>
        `;
    }).join('');

    // Add click handlers
    elements.teamGrid.querySelectorAll('.entity-card').forEach(card => {
        card.addEventListener('click', () => toggleTeamSelection(parseInt(card.dataset.teamId)));
    });
}

function toggleTeamSelection(teamId) {
    const teamData = state.standings.find(t => t.team.id === teamId);
    if (!teamData) return;

    const index = state.selectedTeams.findIndex(t => t.team.id === teamId);

    if (index > -1) {
        state.selectedTeams.splice(index, 1);
    } else if (state.selectedTeams.length < CONFIG.MAX_SELECTIONS) {
        state.selectedTeams.push(teamData);
    } else {
        showToast(`Maximum ${CONFIG.MAX_SELECTIONS} teams can be selected`, 'error');
        return;
    }

    updateTeamSelectionUI();
}

function updateTeamSelectionUI() {
    const count = state.selectedTeams.length;
    elements.teamCount.textContent = count;
    elements.compareTeamsBtn.disabled = count < 2;

    // Update chips
    elements.teamChips.innerHTML = state.selectedTeams.map(item => `
        <div class="chip">
            <img src="${item.team.logo}" alt="" onerror="this.style.display='none'">
            ${item.team.name}
            <button class="chip-remove" data-team-id="${item.team.id}">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M18 6L6 18M6 6l12 12"></path>
                </svg>
            </button>
        </div>
    `).join('');

    // Add remove handlers
    elements.teamChips.querySelectorAll('.chip-remove').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleTeamSelection(parseInt(btn.dataset.teamId));
        });
    });

    // Re-render grid
    renderTeamGrid(elements.teamSearch.value);
}

function compareSelectedTeams() {
    if (state.selectedTeams.length < 2) return;

    elements.teamComparison.classList.add('active');
    elements.teamComparison.innerHTML = `
        <div class="comparison-header">
            <h2>Team Comparison</h2>
            <div class="comparison-legend">
                <span class="legend-item">
                    <span class="legend-dot"></span>
                    Best in comparison
                </span>
            </div>
        </div>
        <div class="comparison-cards">
            ${state.selectedTeams.map((item, index) => `
                <div class="comparison-card" data-index="${index}">
                    <div class="avatar">
                        <img src="${item.team.logo}" alt="${item.team.name}" onerror="this.style.display='none'">
                    </div>
                    <div class="name">${item.team.name}</div>
                    <div class="team">#${item.rank} • ${item.points} pts</div>
                </div>
            `).join('')}
        </div>
        ${renderTeamStatsComparison()}
    `;

    // Scroll to comparison
    elements.teamComparison.scrollIntoView({ behavior: 'smooth' });
}

function renderTeamStatsComparison() {
    const categories = Object.entries(CONFIG.TEAM_STAT_CATEGORIES);

    return categories.map(([key, category]) => `
        <div class="stats-category">
            <div class="category-header">
                <h3>${category.name}</h3>
            </div>
            ${renderStatRows(state.selectedTeams, category.stats, 'team')}
        </div>
    `).join('');
}

// ============================================
// Stats Rendering
// ============================================

function renderStatRows(entities, stats, type) {
    return Object.entries(stats).map(([statKey, statMeta]) => {
        const values = entities.map(e => getNestedValue(e, statKey, type));
        const validValues = values.filter(v => v !== null && v !== undefined && !isNaN(v));

        if (validValues.length === 0) return '';

        const bestValue = findBestValue(validValues, statMeta.higherIsBetter);
        const maxValue = Math.max(...validValues.map(v => Math.abs(v)));

        return `
            <div class="stat-row">
                <div class="stat-label">
                    ${statMeta.label}
                    <span class="stat-description">${statMeta.description}</span>
                </div>
                <div class="stat-bars">
                    ${entities.map((entity, index) => {
                        const value = getNestedValue(entity, statKey, type);
                        if (value === null || value === undefined) {
                            return `
                                <div class="stat-bar-container">
                                    <div class="stat-bar-header">
                                        <span class="stat-bar-name">${getEntityName(entity, type)}</span>
                                        <span class="stat-bar-value">N/A</span>
                                    </div>
                                    <div class="stat-bar-track">
                                        <div class="stat-bar-fill" data-index="${index}" style="width: 0%"></div>
                                    </div>
                                </div>
                            `;
                        }

                        const isBest = value === bestValue && entities.length > 1;
                        const percentage = maxValue > 0 ? (Math.abs(value) / maxValue) * 100 : 0;
                        const displayValue = formatValue(value, statMeta.format);

                        return `
                            <div class="stat-bar-container">
                                <div class="stat-bar-header">
                                    <span class="stat-bar-name">${getEntityName(entity, type)}</span>
                                    <span class="stat-bar-value ${isBest ? 'is-best' : ''}">${displayValue}</span>
                                </div>
                                <div class="stat-bar-track">
                                    <div class="stat-bar-fill ${isBest ? 'is-best' : ''}" data-index="${index}" style="width: ${percentage}%"></div>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    }).join('');
}

function getNestedValue(obj, path, type) {
    if (type === 'player') {
        const stats = obj.statistics[0] || {};
        const parts = path.split('.');
        let value = stats;
        for (const part of parts) {
            value = value?.[part];
        }
        return value;
    } else {
        // Team standings data
        const parts = path.split('.');
        let value = obj;
        for (const part of parts) {
            value = value?.[part];
        }
        return value;
    }
}

function getEntityName(entity, type) {
    if (type === 'player') {
        return entity.player.name.split(' ').pop();
    }
    return entity.team.name;
}

function findBestValue(values, higherIsBetter) {
    const validValues = values.filter(v => v !== null && v !== undefined && !isNaN(v));
    if (validValues.length === 0) return null;
    return higherIsBetter ? Math.max(...validValues) : Math.min(...validValues);
}

function formatValue(value, format) {
    if (value === null || value === undefined) return 'N/A';
    if (format === 'percent') return `${value}%`;
    if (format === 'decimal') return parseFloat(value).toFixed(2);
    return value.toString();
}

// ============================================
// UI Utilities
// ============================================

function showModal() {
    elements.apiModal.classList.remove('hidden');
    elements.apiKeyInput.value = FootballAPI.getApiKey() || '';
}

function hideModal() {
    elements.apiModal.classList.add('hidden');
}

function showLoading() {
    elements.loadingOverlay.classList.remove('hidden');
}

function hideLoading() {
    elements.loadingOverlay.classList.add('hidden');
}

function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    elements.toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
