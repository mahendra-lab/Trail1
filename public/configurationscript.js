
//=============================== PARSING DATA TO CONFIG.JSON FILE START ==============


function saveConfig(fieldId) {
  const newValue = parseInt(document.getElementById(fieldId).value);

  // Construct the data object with the field ID and its new value
  const newData = {
    [fieldId]: newValue
  };

  // Send the data to the server for saving
  fetch('/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newData)
  })
  .then(response => {
    if (response.ok) {
      console.log(`Value saved successfully`);
    } else {
      console.error(`Failed to save value. Server returned status: ${response.status}`);
    }
  })
  .catch(error => console.error(error));
}

//=============================== PARSING DATA TO CONFIG.JSON FILE END ==========================================



function axisParams() {
  fetch('/getAxisParams')
    .then(response => response.json())
    .then(data => {
      document.getElementById('azimuth_offset_current_value').textContent = data.azimuth_offset_value || 'N/A';
      document.getElementById('azimuth_velocity_current_value').textContent = data.azimuth_velocity_value || 'N/A';
      document.getElementById('azimuth_acceleration_current_value').textContent = data.azimuth_acceleration_value || 'N/A';
      document.getElementById('azimuth_deceleration_current_value').textContent = data.azimuth_deceleration_value || 'N/A';
      document.getElementById('azimuth_zero_position_current_value').textContent = data.azimuth_zero_position_value || 'N/A';
      
      document.getElementById('elevation_offset_current_value').textContent = data.elevation_offset_value || 'N/A';
      document.getElementById('elevation_velocity_current_value').textContent = data.elevation_velocity_value || 'N/A';
      document.getElementById('elevation_acceleration_current_value').textContent = data.elevation_acceleration_value || 'N/A';
      document.getElementById('elevation_deceleration_current_value').textContent = data.elevation_deceleration_value || 'N/A';
      document.getElementById('elevation_zero_position_current_value').textContent = data.elevation_zero_position_value || 'N/A';

      document.getElementById('polarization_offset_current_value').textContent = data.polarization_offset_value || 'N/A';
      document.getElementById('polarization_velocity_current_value').textContent = data.polarization_velocity_value || 'N/A';
      document.getElementById('polarization_acceleration_current_value').textContent = data.polarization_acceleration_value || 'N/A';
      document.getElementById('polarization_deceleration_current_value').textContent = data.polarization_deceleration_value || 'N/A';
      document.getElementById('polarization_zero_position_current_value').textContent = data.polarization_zero_position_value || 'N/A';

      document.getElementById('cross_level_offset_current_value').textContent = data.cross_level_offset_value || 'N/A';
      document.getElementById('cross_level_velocity_current_value').textContent = data.cross_level_velocity_value || 'N/A';
      document.getElementById('cross_level_acceleration_current_value').textContent = data.cross_level_acceleration_value || 'N/A';
      document.getElementById('cross_level_deceleration_current_value').textContent = data.cross_level_deceleration_value || 'N/A';
      document.getElementById('cross_level_zero_position_current_value').textContent = data.cross_level_zero_position_value || 'N/A';

     
    })
    .catch(error => console.error('Error:', error));
}


function displayaxis_form() {
  fetch('/getAxisParams')
    .then(response => response.json())
    .then(data => {
      // Update measured parameter values in number fields
      document.getElementById('azimuth_offset_current_value').value = data.azimuth_offset_value || '';
      document.getElementById('azimuth_velocity_current_value').value = data.azimuth_velocity_value || '';
      document.getElementById('azimuth_acceleration_current_value').value = data.azimuth_acceleration_value || '';
      document.getElementById('azimuth_deceleration_current_value').value = data.azimuth_deceleration_value || '';
      document.getElementById('azimuth_zero_position_current_value').textContent = data.azimuth_zero_position_value || '';
   
    })
    .catch(error => console.error('Error:', error));
}


// Call to display measured params when the page loads
window.addEventListener('load', displayaxis_form);


  // Fetch data every 100 milliseconds
setInterval(axisParams, 300);
setInterval(displayaxis_form, 300);


//========================= IPADDRESS    WORKING  =================================



function validateIP() {
  var ipAddress = document.getElementById('ipAddress').value;
  var ipPattern = /^(\d{1,3}\.){3}\d{1,3}$/;

  if (ipPattern.test(ipAddress)) {
    alert('Valid IP Address');
    
    // Create a JavaScript object with the IP address
    var configData = {
      "ipAddress": ipAddress,
      "subnetMask": "255.255.255.0"
    };

    // Use Ajax to send the data to the server
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/updateConfig", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        alert('Config updated successfully');
      }
    };
    xhr.send(JSON.stringify(configData));
  } else {
    alert('Enter a proper IP Address');
  }
}

// fetching data from ip_config.json

function fetchData() {
  fetch('ip_config.json')
      .then(response => response.json())
      .then(data => {
          document.getElementById('ipAddress').value = data.ipAddress;
          document.getElementById('subnet_mask_current_value1').value = data.subnetMask;
      })
      .catch(error => console.error('Error fetching data:', error));
}

// Call the function to fetch data when the page loads
fetchData();

// Fetch data every 100 milliseconds
setInterval(fetchData, 300);




function perform_satpolarization_Operation() {
  // Add your operation code here
  // For example, let's just show an alert


  var button = document.getElementById('polarization_operation_id');
  button.textContent = 'Running';

  document.getElementById('horizontalOption').addEventListener('click', function () {
    console.warn('Horizontal option clicked!');
    button.textContent='Horizontal';
    polarization_data_value = 1;
  //  alert('Horizontal option clicked!');

    // Add 'red' class to horizontalOption and remove it from verticalOption
    this.classList.add('red');
    document.getElementById('verticalOption').classList.remove('red');
});

// Add click event listener to verticalOption
document.getElementById('verticalOption').addEventListener('click', function () {
    console.warn('Vertical option clicked!');
    button.textContent='Vertical';
    polarization_data_value = 2;
  //  alert('Vertical option clicked!');
    // Add 'red' class to verticalOption and remove it from horizontalOption
    this.classList.add('red');
    document.getElementById('horizontalOption').classList.remove('red');
});
}


function perform_rfmute_Operation()
{
  var button = document.getElementById('rfmute_operation_id');
  button.textContent = 'Running';


  document.getElementById('muteOption').addEventListener('click', function () {
    console.warn('mute option clicked!');
    button.textContent='Mute';
  //  alert('mute option clicked!');

    // Add 'red' class to horizontalOption and remove it from verticalOption
    this.classList.add('red');
    document.getElementById('unmuteOption').classList.remove('red');
});

// Add click event listener to verticalOption
document.getElementById('unmuteOption').addEventListener('click', function () {
    console.warn('unmute option clicked!');
    button.textContent='Unmute';
   // alert('unmute option clicked!');
    // Add 'red' class to verticalOption and remove it from horizontalOption
    this.classList.add('red');
    document.getElementById('muteOption').classList.remove('red');
});
}

//=================== RF MUTE AND UNMUTE OPERATION END =====================================



//=================== 10 MHZ OPERATION DATA BLOCK START =====================================

function perform_10mhz_Operation()
{
  var button = document.getElementById('10mhz_operation_id');
  button.textContent = 'Running';


  document.getElementById('internalOption').addEventListener('click', function () {
    console.warn('internal option clicked!');
    button.textContent='Internal';
  //  alert('mute option clicked!');

    // Add 'red' class to horizontalOption and remove it from verticalOption
    this.classList.add('red');
    document.getElementById('externalOption').classList.remove('red');
});

// Add click event listener to verticalOption
document.getElementById('externalOption').addEventListener('click', function () {
    console.warn('external option clicked!');
    button.textContent='External';
   // alert('unmute option clicked!');
    // Add 'red' class to verticalOption and remove it from horizontalOption
    this.classList.add('red');
    document.getElementById('internalOption').classList.remove('red');
});
}


// TESTING DROPBOX

document.addEventListener("DOMContentLoaded", function() {
  // Set initial layout
  const savedLayout = localStorage.getItem("selectedLayout1");
  const layoutSelect = document.getElementById("layout1");

   // Set initial layout
   const savedLayout2 = localStorage.getItem("selectedLayout2");
   const layoutSelect2 = document.getElementById("layout2");

   
    // Set initial layout
  const savedLayout3 = localStorage.getItem("selectedLayout3");
  const layoutSelect3 = document.getElementById("layout3");


  if (savedLayout) {
    layoutSelect.value = savedLayout;
  }else {
    // If no layout is saved, set the default value to "Dropdown"
    layoutSelect.value = "Dropdown";
  }

  if (savedLayout2) {
    layoutSelect2.value = savedLayout2;
  }else {
    // If no layout is saved, set the default value to "Dropdown"
    layoutSelect2.value = "Dropdown";
  }


  if (savedLayout3) {
    layoutSelect3.value = savedLayout3;
  }else {
    // If no layout is saved, set the default value to "Dropdown"
    layoutSelect3.value = "Dropdown";
  }


  changeLayout();
  changeLayout2();
  changeLayout3();
});



function changeLayout() {
  const layoutSelect = document.getElementById("layout");
  const selectedLayout = layoutSelect.value;

  // Save selected layout to local storage
  localStorage.setItem("selectedLayout", selectedLayout);

  

  if (selectedLayout === "horizontal") {
  //  createHorizontalTable();
    performHorizontalFunction();
  } else if (selectedLayout === "vertical") {
  //  createVerticalTable();
    performVerticalFunction();
  } else if (selectedLayout === "Dropdown") {
   
    performdropdownfunction();
  }
}


function performHorizontalFunction() {
  // Your custom function for horizontal layout
  console.log("Horizontal function performed!");
}

function performVerticalFunction() {
  // Your custom function for vertical layout
  console.log("Vertical function performed!");
}


function performdropdownfunction()
{
  console.log("dropdown function performed");

}

function changeLayout2() {
  const layoutSelect2 = document.getElementById("layout2");
  const selectedLayout2 = layoutSelect2.value;

  // Save selected layout to local storage
  localStorage.setItem("selectedLayout2", selectedLayout2);

  

  if (selectedLayout2 === "Mute") {
  //  createHorizontalTable();
    performMutefunction();
  } else if (selectedLayout2=== "Unmute") {
  //  createVerticalTable();
    performUmutefunction();
  } else if (selectedLayout2 === "Dropdown2") {
   
    performdropdown2();
  }
}



function performMutefunction() {
  // Your custom function for horizontal layout
  console.log("mute function performed!");
}

function performUmutefunction() {
  // Your custom function for vertical layout
  console.log("unmute function performed!");
}


function performdropdown2()
{
  console.log("dropdown2 function performed");

}


function changeLayout3() {
  const layoutSelect3 = document.getElementById("layout3");
  const selectedLayout3 = layoutSelect3.value;

  // Save selected layout to local storage
  localStorage.setItem("selectedLayout3", selectedLayout3);

  

  if (selectedLayout3 === "Internal") {
  //  createHorizontalTable();
    performInternalfunction();
  } else if (selectedLayout3 === "External") {
  //  createVerticalTable();
    performExternalfunction();
  } else if (selectedLayout3 === "Dropdown3") {
   
    performDropdown3function();
  }
}



function performInternalfunction() {
  // Your custom function for horizontal layout
  console.log("Internal function performed!");
}

function performExternalfunction() {
  // Your custom function for vertical layout
  console.log("External function performed!");
}


function performDropdown3function()
{
  console.log("dropdown3 function performed");

}

document.getElementById("layout").addEventListener("change", function() {
  // If the layout is changed, set the default value to "Dropdown" in local storage
  localStorage.setItem("selectedLayout", "Dropdown");
});


document.getElementById("layout2").addEventListener("change2", function() {
  // If the layout is changed, set the default value to "Dropdown" in local storage
  localStorage.setItem("selectedLayout2", "Dropdown");
});


document.getElementById("layout3").addEventListener("change3", function() {
  // If the layout is changed, set the default value to "Dropdown" in local storage
  localStorage.setItem("selectedLayout3", "Dropdown");
});