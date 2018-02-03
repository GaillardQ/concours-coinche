<?php
  $date = new DateTime();
  $version = $date->getTimestamp();
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Test</title>

    <!-- Bootstrap -->
    <link rel="stylesheet" href="public/css/bootstrap.min.css?v=<?php echo $version; ?>" />
    <link rel="stylesheet" href="public/css/data-table.min.css?v=<?php echo $version; ?>" />
    <link rel="stylesheet" href="public/css/main.css?v=<?php echo $version; ?>" />

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body>
    <div class="container-fluid">
      <h1>test</h1>
      <h2 id="page-title"></h2>

      <ul class="nav nav-tabs nav-justified" role="tablist">
        <li class="active"><a href="#players" role="tab" data-toggle="tab">Joueurs</a></li>
        <li><a href="#tour1" role="tab" data-toggle="tab">Tour 1</a></li>
        <li><a href="#tour2" role="tab" data-toggle="tab">Tour 2</a></li>
        <li><a href="#tour3" role="tab" data-toggle="tab">Tour 3</a></li>
        <li><a href="#ranking" role="tab" data-toggle="tab">Classement</a></li>
      </ul>

      <div class="tab-content">
        <!-- players -->
        <div class="tab-pane active" id="players">
          <div class="row">
            <div class="col-xs-12">
              <div id="teams-list"></div>
            </div>
          </div>
          <hr />
          <div class="row">
            <div class="col-xs-1">
              ###
            </div>
            <div class="col-xs-4">
              <input type="text" class="form-control" id="new_player_1" placeholder="Nouveau joueur 1" value="">
            </div>
            <div class="col-xs-4">
              <input type="text" class="form-control" id="new_player_2" placeholder="Nouveau joueur 2" value="">
            </div>
            <div class="col-xs-3 align-center">
              <button class="btn btn-primary" onClick="addTeam()">
                Ajouter
              </button>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12 align-center">
              <button onclick="generateRounds()" type="button" class="btn btn-primary">Générer les tours</button>
              <div id="p-nb-error" class="alert alert-danger"></div>
            </div>
          </div>
        </div>
        <!-- tour1 -->
        <div class="tab-pane" id="tour1">
          <div id="tour1-results"></div>
        </div>
        <!-- tour2 -->
        <div class="tab-pane" id="tour2">
          <div id="tour2-results"></div>
        </div>
        <!-- tour3 -->
        <div class="tab-pane" id="tour3">
          <div id="tour3-results"></div>
        </div>
        <!-- ranking -->
        <div class="tab-pane" id="ranking">
          <table id="ranking-table" data-order='[[ 5, "desc" ],[ 4, "desc" ],[ 2, "desc" ],[ 3, "asc" ]]' class="table table-striped table-bordered"></table>
        </div>
      </div>
      <div class="row ranking-btn">
        <div class="col-xs-12 align-center">
          <button onclick="generateRanking()" type="button" class="btn btn-primary">Générer le classement</button>
        </div>
      </div>
      <div class="row ranking-btn">
        <div class="col-xs-12 align-center">
          <button onclick="updateLastRound()" type="button" class="btn btn-primary">Générer le 3ème tour</button>
        </div>
      </div>
    </div>
    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="public/js/jquery.min.js?v=<?php echo $version; ?>"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="public/js/bootstrap.min.js?v=<?php echo $version; ?>"></script>
    <script src="public/js/data-table.min.js?v=<?php echo $version; ?>"></script>
    <script src="public/js/main.js?v=<?php echo $version; ?>"></script>
  </body>
</html>

