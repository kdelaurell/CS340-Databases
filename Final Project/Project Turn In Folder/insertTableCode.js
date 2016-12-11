app.get('/insertPlayers', function(req, res, next){
  var context = {};
  var post  = {First_Name: "Ryan", Last_Name: "Getzlaf", Number: 15, Position: "C", Height: "6'3", Weight: 221, Age: 31, Games_Played: 77, Goals: 13, Assists: 50, TeamId: 1};
  pool.query("INSERT INTO players SET ?", post, function(err, result){
    if(err){
      next(err);
      return;
    }
    pool.query('SELECT * FROM players', function(err, rows, fields){
      if(err){
        next(err);
        return;
      }
      context.results = rows;
      res.render('Players', context);
    });
    });
});

app.post('/insertPlayers', function(req, res, next){
  var context = {};
  pool.query("INSERT INTO players SET ?", req.body, function(err, result){
    if(err){
      next(err);
      return;
    }
    pool.query('SELECT * FROM players', function(err, rows, fields){
      if(err){
        next(err);
        return;
      }
      context.results = rows;
      res.send(rows);
      //res.render('Players', context);
    });
    });
});

app.get('/insertTeams', function(req, res, next){
  var context = {};
  var post  = {Team_Name: "Ducks", Team_City: "Anaheim", Team_State: "CA", Team_Country: "U.S.A", DivId: 1};
  pool.query("INSERT INTO teams SET ?", post, function(err, result){
    if(err){
      next(err);
      return;
    }
    pool.query('SELECT * FROM teams', function(err, rows, fields){
      if(err){
        next(err);
        return;
      }
      context.results = rows;
      res.render('Teams', context);
    });
    });
});

app.get('/insertDivisions', function(req, res, next){
  var context = {};
  var post  = {Division_Name: "Pacific", Conf_Id: 1};
  pool.query("INSERT INTO divisions SET ?", post, function(err, result){
    if(err){
      next(err);
      return;
    }
    pool.query('SELECT * FROM divisions', function(err, rows, fields){
      if(err){
        next(err);
        return;
      }
      context.results = rows;
      res.render('Divisions', context);
    });
    });
});

app.get('/insertConferences', function(req, res, next){
  var context = {};
  var post  = {Conference_Name: "Western"};
  pool.query("INSERT INTO conferences SET ?", post, function(err, result){
    if(err){
      next(err);
      return;
    }
    pool.query('SELECT * FROM conferences', function(err, rows, fields){
      if(err){
        next(err);
        return;
      }
      context.results = rows;
      res.render('Conferences', context);
    });
    });
});

app.get('/insertFormerPlayers', function(req, res, next){
  var context = {};
  var post  = {Former_Team_Id: 2, Former_Player_Id: 1};
  pool.query("INSERT INTO former_players SET ?", post, function(err, result){
    if(err){
      next(err);
      return;
    }
    pool.query('SELECT * FROM former_players', function(err, rows, fields){
      if(err){
        next(err);
        return;
      }
      context.results = rows;
      res.render('FormerPlayers', context);
    });
    });
});

app.get('/insertArena', function(req, res, next){
  var context = {};
  var post  = {Arena_Name: "Honda Center", Capacity: 17000, Avg_Attendance: 16539, Arena_City: "Anaheim", Arena_State: "CA", Arena_Country: "U.S.A.", TId: 1};
  pool.query("INSERT INTO arenas SET ?", post, function(err, result){
    if(err){
      next(err);
      return;
    }
    pool.query('SELECT * FROM arenas', function(err, rows, fields){
      if(err){
        next(err);
        return;
      }
      context.results = rows;
      res.render('Arenas', context);
    });
    });
});
