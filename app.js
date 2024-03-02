/*
const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.static('test1_tr'));



app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
*/



 
const express = require('express');
const fs = require('fs');
const session = require('express-session');
const bodyParser = require('body-parser'); // Add this line
const path = require('path');
const app = express();
const port = 3000;

// Use express-session middleware for session management
app.use(session({
  secret: 'replace-this-with-a-strong-secret',
  resave: false,
  saveUninitialized: true,
}));

// Use express.json() middleware for parsing JSON requests
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true })); // Add this line


// becarefull new data

// becarefull new data block end

// Middleware to check if the user is authenticated
const authenticateMiddleware = (req, res, next) => {
  // Check if the user is stored in the session and is authenticated
  if (req.session && req.session.isAuthenticated) {
    // User is authenticated, continue to the next middleware or route handler
    next();
  } else {
    // User is not authenticated, redirect to index.html
    res.redirect('/index.html');
  }
};

// Route for handling login
app.post('/index', (req, res) => {
  const validUsername = 'admin';  // Updated username
  const validPassword = 'admin';  // Updated password

  const enteredUsername = req.body.username;
  const enteredPassword = req.body.password;

  console.log('Entered Username:', enteredUsername);
  console.log('Entered Password:', enteredPassword);

  if (enteredUsername === validUsername && enteredPassword === validPassword) {
    // Set isAuthenticated in the session
    req.session.isAuthenticated = true;
    console.log('Session state after successful login:', req.session);
    // Redirect to monitor.html upon successful login
    res.redirect('/monitor.html');

  } else {
    // Redirect to index.html for incorrect username or password
    console.log('Login failed. Redirecting to index.html.');
    res.redirect('/index.html');
  }
});

// Middleware to restrict access to monitor.html and control.html
app.use(['/monitor.html', '/control.html','/configuration.html'], authenticateMiddleware);

// Redirect to monitor.html upon successful login
app.get('/', (req, res) => {
  if (req.session.isAuthenticated) {
    // User is authenticated, redirect to monitor.html
    res.redirect('/monitor.html');
  } else {
    // User is not authenticated, serve the index.html file
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  }
});


// jan3 data-------------------------------------------------
// Route for handling logout
app.get('/logout', (req, res) => {
  // Destroy the session to log the user out
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
    }
    // Redirect to the login page after logout
    res.redirect('/index.html');
  });
});

// Middleware to restrict access to monitor.html and control.html
app.use(['/monitor.html', '/control.html','/configuration.html'], authenticateMiddleware);

// Redirect to monitor.html upon successful login
app.get('/', (req, res) => {
  if (req.session.isAuthenticated) {
    // User is authenticated, redirect to monitor.html
    res.redirect('/monitor.html');
  } else {
    // User is not authenticated, serve the index.html file
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  }
});










//========================= PROCESS OF CONFIG.JSON  ===============================================


// Handle the save button click
app.post('/save', (req, res) => {
  const newData = req.body;

  // Read the existing config.json file
  fs.readFile('config.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error reading config.json: ' + err.message);
      return;
    }

    // Parse the existing JSON data
    let configData = JSON.parse(data);

    // Update the config data with the new values
    Object.assign(configData, newData);

    // Write the updated data back to config.json
    fs.writeFile('config.json', JSON.stringify(configData, null, 2), (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error writing to config.json: ' + err.message);
        return;
      }

      console.log(`Value saved successfully`);
      res.sendStatus(200);
    });
  });
});


// Serve static files (like the HTML file) from the current directory
app.use(express.static(__dirname));

// ============================ PROCESS OF CONFIG.JSON =========================================

//MEASURED AND MANUAL JSON DATA-----------------------------------
const manualParamPath = path.join(__dirname, 'manual_param.json');
const measuredParamPath = path.join(__dirname, 'measured_param.json');
const axisParamPath = path.join(__dirname, 'axis_config.json');
const configParamPath = path.join(__dirname,'config.json');


app.get('/getManualParams', (req, res) => {
  fs.readFile(manualParamPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading the file:', err);
      res.status(500).send('Error reading data');
    } else {
      const jsonData = JSON.parse(data);
      res.json(jsonData); // Sending JSON data containing manual params
    }
  });
});


app.post('/saveParameter', (req, res) => {
  const paramName = req.body.paramName;
  const paramValue = req.body.paramValue;

  fs.readFile(manualParamPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading the file:', err);
      return res.status(500).send('Error reading data');
    } else {
      const jsonData = JSON.parse(data);
      jsonData[paramName] = parseInt(paramValue); // Update specific parameter value

      fs.writeFile(manualParamPath, JSON.stringify(jsonData, null, 2), (err) => {
        if (err) {
          console.error('Error writing to file:', err);
          return res.status(500).send('Error saving data');
        } else {
          console.log(`${paramName} value saved successfully`);
          res.sendStatus(200); // Sending success status
        }
      });
    }
  });
});

app.post('/saveAllParameters', (req, res) => {
  const newValues = req.body;

  fs.readFile(manualParamPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading the file:', err);
      return res.status(500).send('Error reading data');
    } else {
      const jsonData = JSON.parse(data);
      Object.keys(newValues).forEach(key => {
        jsonData[key] = parseInt(newValues[key]);
      });

      fs.writeFile(manualParamPath, JSON.stringify(jsonData, null, 2), (err) => {
        if (err) {
          console.error('Error writing to file:', err);
          return res.status(500).send('Error saving data');
        } else {
          console.log('All values saved successfully');
          res.sendStatus(200); // Sending success status
        }
      });
    }
  });
});


app.get('/getMeasuredParams', (req, res) => {
  fs.readFile(measuredParamPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading the file:', err);
      res.status(500).send('Error reading data');
    } else {
      const jsonData = JSON.parse(data);
      res.json(jsonData); // Sending JSON data containing measured params
    }
  });
});

app.get('/getAxisParams', (req, res) => {
  fs.readFile(axisParamPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading the file:', err);
      res.status(500).send('Error reading data');
    } else {
      const jsonData = JSON.parse(data);
      res.json(jsonData); // Sending JSON data containing measured params
    }
  });
});

app.get('/getConfigParams', (req, res) => {
  fs.readFile(configParamPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading the file:', err);
      res.status(500).send('Error reading data');
    } else {
      const jsonData = JSON.parse(data);
      res.json(jsonData); // Sending JSON data containing measured params
    }
  });
});



//MEASURED AND MANUAL JSON DATA END-------------------------------

//  chart_data
// Define a route to fetch data from data.json
app.get('/chart-data',(req,res)=> {
  //Read data from manual_param.json
  fs.readFile(path.join(__dirname,'measured_param.json'), 'utf8', (err,data)=> {
    if(err){
      console.error('error reading data.json',err);
      res.status(500).send('error reading data');
    }
    else{
      const chartData = JSON.parse(data);
      res.json(chartData);
    }
  });
});

// Serve static files from the public directory
app.use(express.static('public'));
app.use(express.static('trial2'));

//===== IP ADDRESS WORKING =========

app.use(bodyParser.json());

app.post('/updateConfig', (req, res) => {
  const configData = req.body;

  // Update the ip_config.json file
  fs.writeFileSync('ip_config.json', JSON.stringify(configData, null, 2));

  res.sendStatus(200);
});

//===== IP ADDRESS WORKING END ======





app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});


/*

// Start the server for two pc's
app.listen(port, '10.42.0.1',() => {
  console.log(`Server is running at http://10.42.0.1:${port}`);
});

*/