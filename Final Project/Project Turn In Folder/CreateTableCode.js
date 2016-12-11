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

app.get('/newTeamTable',function(req, res, next){
  var context = {};
  var sqlQuery = "CREATE TABLE teams (" +
    "Team_Id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,"+
    "Team_Name VARCHAR(255) NOT NULL," +
    "Team_City VARCHAR(255) NOT NULL," +
    "Team_State VARCHAR(255) NOT NULL," +
    "Team_Country VARCHAR(255) NOT NULL," +
    "DivId INT NOT NULL," +
    "CONSTRAINT DivId FOREIGN KEY (`DivId`) REFERENCES `divisions` ( `Division_Id` )," +
    "CONSTRAINT Team_Name UNIQUE KEY (`Team_Name`)" +
    ")ENGINE=InnoDB DEFAULT CHARSET=utf8";
  pool.query(sqlQuery, function(err){
    if(err){
      console.log(err);
      next(err);
      return;
    }
    res.send("success");
  });
});

app.get('/newArenaTable',function(req, res, next){
  var context = {};
  var sqlQuery = "CREATE TABLE arenas (" +
    "Arena_Id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,"+
    "Arena_Name VARCHAR(255) NOT NULL," +
    "Capacity INT NOT NULL," +
    "Avg_Attendance INT NOT NULL," +
    "Arena_City VARCHAR(255) NOT NULL," +
    "Arena_State VARCHAR(255) NOT NULL," +
    "Arena_Country VARCHAR(255) NOT NULL," +
    "TId INT NOT NULL," +
    "CONSTRAINT TId FOREIGN KEY (`TId`) REFERENCES `teams` ( `Team_Id` )," +
    "CONSTRAINT Arena_Name UNIQUE KEY (`Arena_Name`)" +
    ")ENGINE=InnoDB DEFAULT CHARSET=utf8";
  pool.query(sqlQuery, function(err){
    if(err){
      console.log(err);
      next(err);
      return;
    }
    res.send("success");
  });
});

app.get('/newDivTable',function(req, res, next){
  var context = {};
  var sqlQuery = "CREATE TABLE divisions (" +
    "Division_Id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,"+
    "Division_Name VARCHAR(255) NOT NULL," +
    "Conf_Id INT NOT NULL," +
    "CONSTRAINT Conf_Id FOREIGN KEY (`Conf_Id`) REFERENCES `conferences` ( `Conference_Id` )," +
    "CONSTRAINT Division_Name UNIQUE KEY (`Division_Name`)" +
    ")ENGINE=InnoDB DEFAULT CHARSET=utf8";
  pool.query(sqlQuery, function(err){
    if(err){
      console.log(err);
      next(err);
      return;
    }
    res.send("success");
  });
});

app.get('/newConfTable',function(req, res, next){
  var context = {};
  var sqlQuery = "CREATE TABLE conferences (" +
    "Conference_Id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,"+
    "Conference_Name VARCHAR(255) NOT NULL," +
    "CONSTRAINT Conference_Id UNIQUE KEY (`Conference_Id`)," +
    "CONSTRAINT Conference_Name UNIQUE KEY (`Conference_Name`)" +
    ")ENGINE=InnoDB DEFAULT CHARSET=utf8";
  pool.query(sqlQuery, function(err){
    if(err){
      console.log(err);
      next(err);
      return;
    }
    res.send("success");
  });
});

app.get('/newPlayerTable',function(req, res, next){
  var context = {};
  var sqlQuery = "CREATE TABLE players("+
  "Player_Id INT PRIMARY KEY AUTO_INCREMENT,"+
  "First_Name VARCHAR(255) NOT NULL,"+
  "Last_Name VARCHAR(255) NOT NULL,"+
  "Number INT,"+
  "Position VARCHAR(255),"+
  "Height VARCHAR(255) NOT NULL,"+
  "Weight INT NOT NULL,"+
  "Age INT NOT NULL,"+
  "Games_Played INT NOT NULL,"+
  "Goals INT NOT NULL,"+
  "Assists INT NOT NULL,"+
  "TeamId INT NULL," +
  "CONSTRAINT TeamId FOREIGN KEY (`TeamId`) REFERENCES `teams` ( `Team_Id` )" +
  ")ENGINE=InnoDB DEFAULT CHARSET=utf8";

  pool.query(sqlQuery, function(err){
    if(err){
      console.log(err);
      next(err);
      return;
    }
    res.send("success");
  });
});

app.get('/newFormerPlayerTable',function(req, res, next){
  var context = {};
  var sqlQuery = "CREATE TABLE former_players (" +
    "Former_Team_Id INT NOT NULL,"+
    "Former_Player_Id INT NOT NULL,"+
    "PRIMARY KEY (`Former_Team_Id`, `Former_Player_Id`),"+
    /*"KEY `Former_Team_Id` (`Former_Team_Id`)," +
    "KEY `Former_Player_Id` (`Former_Player_Id`),"+*/
    "CONSTRAINT Former_Team_Id FOREIGN KEY (`Former_Team_Id`) REFERENCES `teams` ( `Team_Id` ),"+
    "CONSTRAINT Former_Player_Id FOREIGN KEY (`Former_Player_Id`) REFERENCES `players` ( `Player_Id` )"+
    ")ENGINE=InnoDB DEFAULT CHARSET=utf8";
  pool.query(sqlQuery, function(err){
    if(err){
      console.log(err);
      next(err);
      return;
    }
    res.send("success");
  });
});

app.get('/DeleteTeamTable',function(req, res, next){
  var context = {};
  var sqlQuery = "DROP TABLE IF EXISTS teams";
  pool.query(sqlQuery, function(err){
    if(err){
      console.log(err);
      next(err);
      return;
    }
    res.send("success");
  });
});

app.get('/DeletePlayerTable',function(req, res, next){
  var context = {};
  var sqlQuery = "DROP TABLE IF EXISTS players";
  pool.query(sqlQuery, function(err){
    if(err){
      console.log(err);
      next(err);
      return;
    }
    res.send("success");
  });
});

app.get('/DeleteArenaTable',function(req, res, next){
  var context = {};
  var sqlQuery = "DROP TABLE IF EXISTS arenas";
  pool.query(sqlQuery, function(err){
    if(err){
      console.log(err);
      next(err);
      return;
    }
    res.send("success");
  });
});

app.get('/DeleteFPTable',function(req, res, next){
  var context = {};
  var sqlQuery = "DROP TABLE IF EXISTS former_players";
  pool.query(sqlQuery, function(err){
    if(err){
      console.log(err);
      next(err);
      return;
    }
    res.send("success");
  });
});

app.get('/DeleteDivTable',function(req, res, next){
  var context = {};
  var sqlQuery = "DROP TABLE IF EXISTS divisions";
  pool.query(sqlQuery, function(err){
    if(err){
      console.log(err);
      next(err);
      return;
    }
    res.send("success");
  });
});

app.get('/DeleteConfTable',function(req, res, next){
  var context = {};
  var sqlQuery = "DROP TABLE IF EXISTS conferences";
  pool.query(sqlQuery, function(err){
    if(err){
      console.log(err);
      next(err);
      return;
    }
    res.send("success");
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
  res.render('500');
});


app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
