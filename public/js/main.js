host = 'http://coinche.local'
json = {title: '', teams: [], rounds:[]};
rankingCols = {ID: 0, NAME: 1, PLUS: 2, LESS: 3, DIFF: 4, VICTORIES: 5};
dataSet = [];
rankingTable = null;

$(function() {
  getJSON();
});

function getJSON() {
    $.getJSON( "public/json/game.json?v=" + Date.now(), function( data ) {
        json = data;

        // title
        var title = json.title || 'Partie';
        $('#page-title').html(title);

        displayTeam();
        displayRounds();
        displayRanking();
    });
}
function setJSON() {
    $.ajax({
        type: "POST",
        dataType : 'json',
        async: true,
        url: host + '/write.php',
        data: { data: JSON.stringify(json) },
    }).done(function () {
        $('#new_player_1').val('');
        $('#new_player_2').val('');
        getJSON();
    });
}
/**
 * TEAMS
 */
function displayTeam() {
    var teamsList = json.teams || [];
    var teamsDiv = [];

    $.each( teamsList, function( key, val ) {
        var html = '';
        html += '<div class="row">';
        html += '   <div class="col-xs-1">';
        html += '       #' + val.id;
        html += '   </div>';
        html += '   <div class="col-xs-4">';
        html += '       <input type="text" class="form-control" id="' + key + '_player1" placeholder="Joueur 1" value="' + val.p1 + '">';
        html += '   </div>';
        html += '   <div class="col-xs-4">';
        html += '       <input type="text" class="form-control" id="' + key + '_player2" placeholder="Joueur 2" value="' + val.p2 + '">';
        html += '   </div>';
        html += '   <div class="col-xs-3 align-center">';
        html += '       <button class="btn btn-primary" onClick="deleteTeam(' + key + ')">';
        html += '           Supprimer';
        html += '       </button>';
        html += '       <button class="btn btn-primary" onClick="saveTeam(' + key + ')">';
        html += '           Enregistrer';
        html += '       </button>';
        html += '   </div>';
        html += '</div>';
        teamsDiv.push( html );
    });
    $('#teams-list').html(teamsDiv.join( "" ));
}
function addTeam() {
    var p1 = $('#new_player_1').val();
    var p2 = $('#new_player_2').val();
    json.teams.push({id: json.teams.length, p1: p1, p2: p2, scores: {plus: 0, less: 0, victories: 0}});
    setJSON();
}
function deleteTeam(key) {
    json.teams.splice(key, 1);
    setJSON();
}
function saveTeam(key) {
    var p1 = $('#' + key + '_player1').val();
    var p2 = $('#' + key + '_player2').val();
    json.teams[key].p1 = p1;
    json.teams[key].p2 = p2;
    setJSON();
}
function findTeam(id) {
    var teams = json.teams;
    for (var i=0; i<teams.length; i++) {
        var team = teams[i];
        if (team.id == id) {
            return team;
        }
    }
    return null;
}
/**
 * ROUNDS
 */
function generateRounds()
{
    var teams = json.teams;
    
    var rounds = new Array();
    var r, ar_p;
    for(var i=0; i<2; i++)
    {
        ar_p = teams.slice(0);
        r = getARound(ar_p, rounds);
        rounds.push(r);
    }
    
    json.rounds = rounds;
    setJSON();
}
function getARound(_teams, _rounds)
{
    // NOTE : dans le cas d'une partie multi-joueurs,
    // un "joueur", ici représente une partie (composée de 2 joueurs)
    
    var nb = _teams.length;
    var n, t1, t2;
    var round = new Array();
    var game_ok;
    
    while (nb > 1)
    {
        game_ok = false;
        // On récupère un premier joueur
        n = Math.floor((Math.random() * nb)); 
        t1 = _teams[n];
        
        // On l'enlève des joueurs dispos
        _teams.splice(n, 1);
        nb = _teams.length;
        
        while(game_ok == false)
        {
            // On récupère un deuxième joueur
            n = Math.floor((Math.random() * nb)); 
            t2 = _teams[n];
            
            // On vérifie que cette partie n'a pas déjà eu lieu
            var b = checkIfExists(t1, t2, _rounds);
            if(b == false)
            {       
                // On l'enlève des joueurs dispos
                _teams.splice(n, 1);
                nb = _teams.length;
                
                // On ajoute la nouvelle partie, composée des deux joueurs
                round.push({
                    t1: {
                        id: t1.id,
                        score: 0
                    },
                    t2: {
                        id: t2.id,
                        score: 0
                    }
                });
                
                game_ok = true;
            }
        }
    }
    if(nb > 0)
    {
        round.push({
            t1: {
                id: _teams[0].id,
                score: 0
            }
        });
    }
    
    return round;
}
function checkIfExists(_p1, _p2, _rounds)
{   
    var r;
    for(var i=0; i<_rounds.length; i++)
    {
        r = _rounds[i];
        var g;
        for(var j=0; j<r.length; j++) {
            g = r[j];
            if(g.t1 == _p1.id && g.t2 == _p2.id) {
                return true;
            }
        }
    }
    
    return false;
}
function displayRounds() {
    for (var i=0; i<json.rounds.length; i++) {
        displayARound(i);
    }
}
function displayARound(index) {
    var roundGames = json.rounds[index] || [];
    var gamesDiv = [];
    var tabIndex = parseInt(index, 10) + 1;

    $.each( roundGames, function( key, val ) {
        var html = '';
        t1 = findTeam(val.t1.id);
        t2 = findTeam(val.t2.id);
        html += '<div class="row">';
        html += '   <div class="col-xs-6">';
        html += '       <div class="input-group">';
        html += '           <span class="input-group-addon">(#' + t1.id + ') ' + t1.p1 + ' / ' + t1.p2 + '</span>';
        html += '           <input type="text" id="round' + index + '_team' + t1.id + '" class="form-control" placeholder="score" value="' + val.t1.score + '" >';
        html += '       </div>';
        html += '   </div>';
        html += '   <div class="col-xs-6">';
        html += '       <div class="input-group">';
        html += '           <span class="input-group-addon">(#' + t2.id + ') ' + t2.p1 + ' / ' + t2.p2 + '</span>';
        html += '           <input type="text" id="round' + index + '_team' + t2.id + '" class="form-control" placeholder="score" value="' + val.t2.score + '" >';
        html += '       </div>';
        html += '   </div>';
        html += '</div>';
        gamesDiv.push( html );
    });
    html = '';
    html += '<div class="row ranking-btn">';
    html += '    <div class="col-xs-12 align-center">';
    html += '        <button onclick="scoreUpdated(' + index + ', ' + (index == roundGames.length - 1) + ')" type="button" class="btn btn-primary">Enregistrer le score</button>';
    html += '    </div>';
    html += '</div>';
    gamesDiv.push( html );
    $('#tour' + tabIndex + '-results').html(gamesDiv.join( "" ));
}
// function scoreUpdated(teamId, roundIndex, gameIndex, team, field, needUpdateLastRound) {
function scoreUpdated(roundIndex, needUpdateLastRound) {
    var round = json.rounds[roundIndex];
    for (var i in round) {
        var game = round[i];
        var t1 = game.t1;
        var t2 = game.t2;
        json.rounds[roundIndex][i].t1.score = parseInt($("#round" + roundIndex + "_team" + t1.id).val());
        json.rounds[roundIndex][i].t2.score = parseInt($("#round" + roundIndex + "_team" + t2.id).val());
    }

    setJSON();
    generateRanking();
    if (needUpdateLastRound) {
        updateLastRound();
    }
}
function updateLastRound() {
    var round = [];

    var data = dataSet.slice(0);
    var game = null;
    while (data.length > 0) {
        var bestTeam = data[0];
        var bestTeamIndex = 0;
        for (var i=1; i<data.length; i++) {
            var team = data[i];
            if ((team[rankingCols.VICTORIES] > bestTeam[rankingCols.VICTORIES]) ||
                (team[rankingCols.VICTORIES] == bestTeam[rankingCols.VICTORIES] && team[rankingCols.DIFF] > bestTeam[rankingCols.DIFF]) ||
                (team[rankingCols.VICTORIES] == bestTeam[rankingCols.VICTORIES] && team[rankingCols.DIFF] > bestTeam[rankingCols.DIFF] && team[rankingCols.PLUS] > bestTeam[rankingCols.PLUS]) ||
                (team[rankingCols.VICTORIES] == bestTeam[rankingCols.VICTORIES] && team[rankingCols.DIFF] > bestTeam[rankingCols.DIFF] && team[rankingCols.PLUS] == bestTeam[rankingCols.PLUS] && team[rankingCols.LESS] > bestTeam[rankingCols.LESS])
            ) {
                bestTeam = team;
                bestTeamIndex = i;
            }
        }
        if (game == null) {
            game = {
                t1: {
                    id: bestTeam[rankingCols.ID],
                    score: 0
                }
            }
        } else {
            game.t2 = {
                id: bestTeam[rankingCols.ID],
                score: 0
            }
            round.push(game);
            game = null;
        }
        data.splice(bestTeamIndex, 1);
    }

    if (json.rounds.length == 2) {
        json.rounds.push(round);
    } else {
        json.rounds[2] = round;
    }

    setJSON();
}
/**
 * RANKING
 */
 function generateRanking() {
    var scorePlusByTeam = {};
    var scoreLessByTeam = {};
    var victories = {};
    for (var i in json.rounds) {
        var round = json.rounds[i];
        for (var j in round) {
            var game = round[j];
            var t1 = game.t1;
            var t2 = game.t2;
            if (t1.score == 0 && t2.score == 0) continue;
            // TEAM 1
            // score of the team
            if (!scorePlusByTeam.hasOwnProperty(t1.id)) {
                scorePlusByTeam[t1.id] = 0;
            }
            scorePlusByTeam[t1.id] += parseInt(t1.score);
            // score against the team
            if (!scoreLessByTeam.hasOwnProperty(t1.id)) {
                scoreLessByTeam[t1.id] = 0;
            }
            scoreLessByTeam[t1.id] += parseInt(t2.score);
            // victories
            if (!victories.hasOwnProperty(t1.id)) {
                victories[t1.id] = 0;
            }
            // TEAM 2
            // score of the team
            if (!scorePlusByTeam.hasOwnProperty(t2.id)) {
                scorePlusByTeam[t2.id] = 0;
            }
            scorePlusByTeam[t2.id] += parseInt(t2.score);
            // score against the team
            if (!scoreLessByTeam.hasOwnProperty(t2.id)) {
                scoreLessByTeam[t2.id] = 0;
            }
            scoreLessByTeam[t2.id] += parseInt(t1.score);
            // victories
            if (!victories.hasOwnProperty(t2.id)) {
                victories[t2.id] = 0;
            }

            if (t1.score > t2.score) {
                victories[t1.id]++;
            } else if (t1.score < t2.score) {
                victories[t2.id]++;
            } else {
                victories[t1.id] += 0.5;
                victories[t2.id] += 0.5;
            }
        }
    }
    for (var i in json.teams) {
        var team = json.teams[i];
        if(scorePlusByTeam.hasOwnProperty(team.id) &&
            scoreLessByTeam.hasOwnProperty(team.id) &&
            victories.hasOwnProperty(team.id))
        json.teams[i].scores = {
            plus: scorePlusByTeam[team.id],
            less: scoreLessByTeam[team.id],
            diff: scorePlusByTeam[team.id] - scoreLessByTeam[team.id],
            victories: victories[team.id]
        }
    }
    setJSON();
    displayRanking();
}
function displayRanking() {
    var teamsList = json.teams || [];

    dataSet = [];
    $.each( teamsList, function( key, val ) {
        var row = [];
        row.push(val.id);
        row.push(val.p1 + ' / ' + val.p2);
        if (val.scores.hasOwnProperty('plus')) {
            row.push(val.scores.plus); 
        } else {
            row.push(0);
        }
        if (val.scores.hasOwnProperty('less')) {
            row.push(val.scores.less); 
        } else {
            row.push(0);
        }
        if (val.scores.hasOwnProperty('diff')) {
            row.push(val.scores.diff); 
        } else {
            row.push(0);
        }
        if (val.scores.hasOwnProperty('victories')) {
            row.push(val.scores.victories);
        } else {
            row.push(0);
        }
        dataSet.push(row);
    });

    if (rankingTable) {
        rankingTable.destroy();
    }

    rankingTable = $('#ranking-table').DataTable( {
        data: dataSet,
        retrieve: true,
        paging: false,
        columns: [
            { title: "#" },
            { title: "Équipe" },
            { title: "Plus" },
            { title: "Moins" },
            { title: "Diff." },
            { title: "Victoires" }
        ]
    } );
}