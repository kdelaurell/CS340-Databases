var express = require('express');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');
var mySQL = require('mysql');
var path = require('path');
var pool = mySQL.createPool({
  host  : 'localhost',
  user  : 'student',
  password: 'default',
  database: 'student'
})

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

/********************************************************
*Insert Functions
*
*********************************************************/
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

app.post('/insertTeams', function(req, res, next){
  var context = {};
  pool.query("INSERT INTO teams SET ?", req.body, function(err, result){
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

app.post('/insertDivisions', function(req, res, next){
  var context = {};
  pool.query("INSERT INTO divisions SET ?", req.body, function(err, result){
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

app.post('/insertConferences', function(req, res, next){
  var context = {};
  pool.query("INSERT INTO conferences SET ?", req.body, function(err, result){
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

app.post('/insertFormerPlayers', function(req, res, next){
  var context = {};
  pool.query("INSERT INTO former_players SET ?", req.body, function(err, result){
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

app.post('/insertArena', function(req, res, next){
  var context = {};
  pool.query("INSERT INTO arenas SET ?", req.body, function(err, result){
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
/********************************************************
*Display Data Functions
*
*********************************************************/
app.get('/displayPlayersData',function(req,res,next){
  var context = {};
  pool.query('SELECT * FROM players', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.results = JSON.stringify(rows);
    res.type('json');
    res.send(context.results);
  });
});

app.get('/displayTeamsData',function(req,res,next){
  var context = {};
  pool.query('SELECT * FROM teams', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.results = JSON.stringify(rows);
    res.type('json');
    res.send(context.results);
  });
});

app.get('/displayDivisionsData',function(req,res,next){
  var context = {};
  pool.query('SELECT * FROM divisions', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.results = JSON.stringify(rows);
    res.type('json');
    res.send(context.results);
  });
});

app.get('/displayConferencesData',function(req,res,next){
  var context = {};
  pool.query('SELECT * FROM conferences', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.results = JSON.stringify(rows);
    res.type('json');
    res.send(context.results);
  });
});
/********************************************************
*Display Functions
*
*********************************************************/
app.get('/displayTeams', function(req, res, next){
  var context = {};
    pool.query('SELECT * FROM teams', function(err, rows, fields){
      if(err){
        next(err);
        return;
      }
      context.results = rows;
      res.render('Teams', context);
    });
});

app.get('/displayPlayers', function(req, res, next){
  var context = {};
    pool.query('SELECT * FROM players', function(err, rows, fields){
      if(err){
        next(err);
        return;
      }
      context.results = rows;
      res.render('Players', context);
    });
});

app.get('/displayArenas', function(req, res, next){
  var context = {};
    pool.query('SELECT * FROM arenas', function(err, rows, fields){
      if(err){
        next(err);
        return;
      }
      context.results = rows;
      res.render('Arenas', context);
    });
});

app.get('/displayDivisions', function(req, res, next){
  var context = {};
    pool.query('SELECT * FROM divisions', function(err, rows, fields){
      if(err){
        next(err);
        return;
      }
      context.results = rows;
      res.render('Divisions', context);
    });
});

app.get('/displayConferences', function(req, res, next){
  var context = {};
    pool.query('SELECT * FROM conferences', function(err, rows, fields){
      if(err){
        next(err);
        return;
      }
      context.results = rows;
      res.render('Conferences', context);
    });
});

app.get('/displayFormerPlayers', function(req, res, next){
  var context = {};
    pool.query('SELECT fp.Former_Team_Id, t.Team_Name, fp.Former_Player_Id, p.First_Name, p.Last_Name FROM former_players fp INNER JOIN teams t ON fp.Former_Team_Id = t.Team_Id INNER JOIN players p ON fp.Former_Player_Id = p.Player_Id', function(err, rows, fields){
      if(err){
        next(err);
        return;
      }
      context.results = rows;
      res.render('FormerPlayers', context);
    });
});

/********************************************************
*Update Row Functions
*
*********************************************************/
app.post('/UpdateTRow', function(req, res, next){
  var context = {};
    pool.query('UPDATE teams SET Team_Name = ?, Team_City = ?, Team_State = ?, Team_Country = ? WHERE Team_Id = ?', [req.body.Team_Name, req.body.Team_City, req.body.Team_State, req.body.Team_Country, req.body.Team_Id], function(err, rows, fields){
      if(err){
        next(err);
        return;
      }
      res.send("success");
    });
});

app.post('/UpdatePRow', function(req, res, next){
  var context = {};
    pool.query('UPDATE players SET First_Name = ?, Last_Name = ?, Number = ?, Position = ?, Height = ?, Weight = ?, Age = ?, Games_Played = ?, Goals = ?, Assists = ? WHERE Player_Id = ?', [req.body.First_Name, req.body.Last_Name, req.body.Number, req.body.Position, req.body.Height, req.body.Weight, req.body.Age, req.body.Games_Played, req.body.Goals, req.body.Assists, req.body.Player_Id], function(err, rows, fields){
      if(err){
        next(err);
        return;
      }
      res.send("success");
    });
});

app.post('/UpdateARow', function(req, res, next){
  var context = {};
    pool.query('UPDATE arenas SET Arena_Name = ?, Capacity = ?, Avg_Attendance = ?, Arena_City = ?, Arena_State = ?, Arena_Country = ? WHERE Arena_Id = ? ', [req.body.Arena_Name, req.body.Capacity, req.body.Avg_Attendance, req.body.Arena_City, req.body.Arena_State, req.body.Arena_Country, req.body.Arena_Id], function(err, rows, fields){
      if(err){
        next(err);
        return;
      }
      res.send("success");
    });
});

app.post('/UpdateDRow', function(req, res, next){
  var context = {};
    pool.query('UPDATE divisions SET Division_Name = ? WHERE Division_Id = ? ', [req.body.Division_Name, req.body.Division_Id], function(err, rows, fields){
      if(err){
        next(err);
        return;
      }
      res.send("success");
    });
});

app.post('/UpdateCRow', function(req, res, next){
  var context = {};
    pool.query('UPDATE conferences SET Conference_Name = ? WHERE Conference_id = ? ', [req.body.Conference_Name, req.body.Conference_Id], function(err, rows, fields){
      if(err){
        next(err);
        return;
      }
      context.results = rows;
      res.send("success");
    });
});


/********************************************************
*Display Insert Pages
*
*********************************************************/

app.get('/insertP', function(req, res, next){
  var context = {};
  res.render('PlayersInsert');
});

app.get('/insertT', function(req, res, next){
  var context = {};
  res.render('TeamsInsert');
});

app.get('/insertC', function(req, res, next){
  var context = {};
  res.render('ConferencesInsert');
});

app.get('/insertD', function(req, res, next){
  var context = {};
  res.render('DivisionsInsert');
});

app.get('/insertA', function(req, res, next){
  var context = {};
  res.render('ArenasInsert');
});

app.get('/insertFP', function(req, res, next){
  var context = {};
  res.render('FormerPlayersInsert');
});

app.get('/home', function(req, res, next){
  var context = {};
  res.render('Home');
});

/********************************************************
*Delete Functions
*
*********************************************************/
app.post('/deletePlayer',function(req,res,next){
  var context = {};
  pool.query('DELETE FROM players WHERE Player_Id = ?', req.body.id, function (err, result) {
  if(err){
    next(err);
    return;
  }
  console.log('deleted ' + result.affectedRows + ' rows');
  res.type('text/plain');
  res.send("success");
  });
});

app.post('/deleteTeam',function(req,res,next){
  var context = {};
  pool.query('DELETE FROM teams WHERE Team_Id = ?', req.body.id, function (err, result) {
  if(err){
    next(err);
    return;
  }
  console.log('deleted ' + result.affectedRows + ' rows');
  res.type('text/plain');
  res.send("success");
  });
});

app.post('/deleteArena',function(req,res,next){
  var context = {};
  pool.query('DELETE FROM arenas WHERE Arena_Id = ?', req.body.id, function (err, result) {
  if(err){
    next(err);
    return;
  }
  console.log('deleted ' + result.affectedRows + ' rows');
  });
  res.type('text/plain');
  res.send("success");
});

app.post('/deleteDivision',function(req,res,next){
  var context = {};
  pool.query('DELETE FROM divisions WHERE Division_Id = ?', req.body.id, function (err, result) {
  if(err){
    next(err);
    return;
  }
  console.log('deleted ' + result.affectedRows + ' rows');
  res.type('text/plain');
  res.send("success");
  });

});

app.post('/deleteConference',function(req,res,next){
  var context = {};
  pool.query('DELETE FROM conferences WHERE Conference_Id = ?', req.body.id, function (err, result) {
  if(err){
    next(err);
    return;
  }
  console.log('deleted ' + result.affectedRows + ' rows');
  res.type('text/plain');
  res.send("success");
  });
});

app.post('/deleteFormerPlayer', function(req, res, next){
  var context = {};
  pool.query('DELETE FROM former_players WHERE Former_Team_Id = ? && Former_Player_Id = ?', [req.body.Tid, req.body.Pid], function (err, result) {
  if(err){
    next(err);
    return;
  }
  console.log('deleted ' + result.affectedRows + ' rows');
  res.type('text/plain');
  res.send("success");
  });
});


app.post('/GoalsQuery', function(req, res, next){
  var context = {};
    pool.query('SELECT tb.Team_City, tb.Team_Name, tb.sum FROM (SELECT t.Team_City, t.Team_Name, SUM(p.Goals) AS sum FROM players p INNER JOIN teams t ON p.TeamId = t.Team_Id GROUP BY Team_Name) tb WHERE tb.sum > ? ORDER BY tb.sum DESC', req.body.num,function(err, rows, fields){
      if(err){
        next(err);
        return;
      }
      context.results = rows;
      res.send(context.results);
    });
});

app.get('/maxAttendance', function(req, res, next){
  var context = {};
    pool.query('SELECT t.Team_City, t.Team_Name, a.Arena_Name, MAX(a.Avg_Attendance) AS max FROM teams t INNER JOIN arenas a ON t.Team_Id = a.TId', req.body.num,function(err, rows, fields){
      if(err){
        next(err);
        return;
      }
      context.results = rows;
      res.send(context.results);
    });
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.send(err.stack);
});


app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
