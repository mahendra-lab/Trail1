
// script.js

function saveParameterValue(paramName, paramValue) {
    fetch('/saveParameter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ paramName, paramValue }),
    })
    .then(response => {
      if (response.ok) {
        console.log(`${paramName} value saved successfully`);
      } else {
        console.error(`Error saving ${paramName} value`);
      }
    })
    .catch(error => console.error('Error:', error));
  }


  document.getElementById('azimuth_save_button').addEventListener('click', () => {
    const azimuthValue = document.getElementById('azimuth_current_value').value;
    saveParameterValue('Azimuth', azimuthValue);
  });


  document.getElementById('elevation_save_button').addEventListener('click', () => {
    const elevationValue = document.getElementById('elevation_current_value').value;
    saveParameterValue('Elevation', elevationValue);
  });
  
  document.getElementById('polarization_save_button').addEventListener('click', () => {
    const polarizationValue = document.getElementById('polarization_current_value').value;
    saveParameterValue('Polarization', polarizationValue);
  });
  
  document.getElementById('cross_level__save_button').addEventListener('click', () => {
    const crossLevelValue = document.getElementById('cross_level_current_value').value;
    saveParameterValue('cross_level', crossLevelValue);
  });
  

  // script.js

function saveAllValues() {
    const azimuthValue = document.getElementById('azimuth_current_value').value;
   /* console.log(" saveallvalues",azimuthValue); */
    const elevationValue = document.getElementById('elevation_current_value').value;
    const polarizationValue = document.getElementById('polarization_current_value').value;
    const crossLevelValue = document.getElementById('cross_level_current_value').value;
  
    const valuesToSave = {
      Azimuth: azimuthValue,
      Elevation: elevationValue,
      Polarization: polarizationValue,
      cross_level: crossLevelValue

    };
  
    fetch('/saveAllParameters', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(valuesToSave),
    })
    .then(response => {
      if (response.ok) {
        console.log('All values saved successfully');
    /*    console.log("values saved",valuesToSave); */
      } else {
        console.error('Error saving values');
      }
    })
    .catch(error => console.error('Error:', error));
  }
  
  document.getElementById('save_all_button').addEventListener('click', () => {
    saveAllValues();
  });

  
  function displayManualParams() {
    fetch('/getManualParams')
        .then(response => response.json())
        .then(data => {
            document.getElementById('azimuth_set_value').textContent = data.Azimuth || 'N/A';
            document.getElementById('elevation_set_value').textContent = data.Elevation || 'N/A';
            document.getElementById('polarization_set_value').textContent = data.Polarization || 'N/A';
            document.getElementById('cross_level_set_value').textContent = data.cross_level || 'N/A';
        })
        .catch(error => console.error('Error:', error));
}

// Call the function to display the values when the page loads
displayManualParams();
// Fetch data every 100 milliseconds
setInterval(displayManualParams, 300);


 // script.js

 function displayMeasuredParams() {
  fetch('/getMeasuredParams')
      .then(response => response.json())
      .then(data => {
          document.getElementById('azimuth_measured_value').textContent = data.Azimuth || 'N/A';
          document.getElementById('elevation_measured_value').textContent = data.Elevation || 'N/A';
          document.getElementById('polarization_measured_value').textContent = data.Polarization || 'N/A';
          document.getElementById('cross_level_measured_value').textContent = data.cross_level || 'N/A';
      })
      .catch(error => console.error('Error:', error));
}

function displayMeasuredParams_form() {
  fetch('/getMeasuredParams')
      .then(response => response.json())
      .then(data => {
          // Update measured parameter values in number fields
          document.getElementById('aztimuth_current_value').value = data.Azimuth || '';
          document.getElementById('elevation_current_value').value = data.Elevation || '';
          document.getElementById('polarization_current_value').value = data.Polarization || '';
          document.getElementById('cross_level_current_value').value = data.cross_level || '';
      })
      .catch(error => console.error('Error:', error));
}

// Call the functions to display the values when the page loads
displayMeasuredParams();
window.addEventListener('load', displayMeasuredParams_form);

// Fetch data every 100 milliseconds
setInterval(displayMeasuredParams, 300);
setInterval(displayMeasuredParams_form, 300);





  // CHECK WARNING AND LIMIT

function checkAzimuthRange(input) {
  var value = input.value;
  var warningDiv = document.getElementById('azimuth_warning');

  if (value < 0 || value > 360) {
    
    warningDiv.textContent = 'Value must be between 0 and 360';
   
  
  } else {
    warningDiv.textContent = '';
  }
}

function validateNumber_azimuth(input) {
  // Get the input value
  let inputValue = input.value;

  // Convert the input value to a number
  let numericValue = parseFloat(inputValue);

  // Check if the numeric value is below 0
  if (numericValue < 0) {
      // If below 0, set the input value to 0
      input.value = 0;
  }

  // Check if the numeric value is above 360
  if (numericValue > 360) {
      // If above 360, set the input value to 360
      input.value = 360;
  }
}



function checkElevationRange(input) {
  var value = input.value;
  var warningDiv = document.getElementById('elevation_warning');

  if (value < 0 || value > 89) {
    warningDiv.textContent = 'Value must be between 0 and 89';
    input.value= 0;
  } else {
    warningDiv.textContent = '';
  }
}

function checkPolarizationRange(input) {
    var value = input.value;
    var warningDiv = document.getElementById('polarization_warning');

    if (value < -90 || value > 90) {
      warningDiv.textContent = 'Value must be between -90 and 90';
      input.value=0;
    } else {
      warningDiv.textContent = '';
    }
  }

  function checkCrossLevelRange(input) {
    var value = input.value;
    var warningDiv = document.getElementById('cross_level_warning');

    if (value < -10 || value > 10) {
      warningDiv.textContent = 'Value must be between -10 and 10';
      input.value=0;
    } else {
      warningDiv.textContent = '';
    }
  }
