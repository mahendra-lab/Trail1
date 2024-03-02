// CHART5 , CHART6 AND WAVECHART START ===========================

var optionswave = {
          series: [{
          name: 'RF LEVEL',
          data: [31, 40, 28, 51, 42, 109, 100]
        }, {
          name: 'series2',
          data: [11, 32, 45, 32, 34, 52, 41]
        }],
          chart: {
          height: 252,
          type: 'area'
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'straight'
        },
        xaxis: {
          type: 'datetime',
          categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
        },
        tooltip: {
          x: {
            format: 'dd/MM/yy HH:mm'
          },
        },
        };

        var chartwave = new ApexCharts(document.querySelector("#chartwave"), optionswave);
        chartwave.render();
      
      var options5 = {
          series: [76, 67],
          chart: {
          height: 220,
          type: 'radialBar',
        },
        plotOptions: {
          radialBar: {
              offsetX: 40,
            offsetY: 0,
            startAngle: 0,
            endAngle: 270,
            hollow: {
              margin: 5,
              size: '30%',
              background: 'transparent',
              image: undefined,
               
            },
            dataLabels: {
              name: {
                show: false,
              },
              value: {
                show: false,
              }
            }
          }
        },
        colors: ['#1ab7ea', '#0084ff'],
        labels: ['BUC', 'PS Temp'],
        legend: {
          show: true,
          floating: true,
          fontSize: '15px',
          position: 'left',
          offsetX: 0,
          offsetY: 0,
          labels: {
            useSeriesColors: true,
          },
          markers: {
            size: 0
          },
          formatter: function(seriesName, opts) {
            return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
          },
          itemMargin: {
            vertical: 3
          }
        },
        responsive: [{
          breakpoint: 480,
          options: {
            legend: {
                show: false
            }
          }
        }]
        };

        var chart5 = new ApexCharts(document.querySelector("#chart5"), options5);
        chart5.render();


 var options6 = {
          series: [44, 55, 67],
          chart: {
          height: 220,
          type: 'radialBar',
        },
        plotOptions: {
          radialBar: {
            dataLabels: {
              name: {
                fontSize: '22px',
              },
              value: {
                fontSize: '16px',
              },
              total: {
                show: true,
                label: 'Total',
                formatter: function (w) {
                  // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
              //    return 249
                }
              }
            }
          }
        },
        labels: ['Apples', 'Oranges', 'Bananas'],
        };

        var chart6 = new ApexCharts(document.querySelector("#chart6"), options6);
        chart6.render();
      
      
      
    
// CHART5 , CHART6 AND WAVECHART END ===========================

var monitor_azimuth;
var monitor_elevation;
var monitor_polarization;
var monitor_cross_level;
var externalValue ;
var externalValue2;


var monitor_buc_status;
var monitor_10_mhz_status;
var monitor_fwd_power_status;
var monitor_digital_attn_status;
var monitor_ps_temp_status;
var monitor_buc_temp_status;


var monitor_latitudevalue_status;
var monitor_longitudevalue_status;
var monitor_mode_status;
var monitor_btr1_status;
var monitor_btr2_status;
var monitor_drives_status;
var monitor_buc2_status;
var monitor_mru_status;


document.addEventListener('DOMContentLoaded', function () {
  // Function to fetch data and process it
  function fetchDataAndProcess() {
      fetch('/getMeasuredParams')
          .then(response => {
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              return response.json();
          })
          .then(data => {
              if (Object.keys(data).length === 0) {
                  // Handle empty JSON response
                  console.error('Empty JSON response');
                  return;
              }

              console.log(data);

              // Extracting values from the data object
              monitor_azimuth = data.Azimuth;
              monitor_elevation = data.Elevation;
              monitor_polarization = data.Polarization;
              monitor_cross_level = data.cross_level;

              externalValue = monitor_polarization;
              externalValue2 = monitor_cross_level;

              // Extracting values for the second set of data
              monitor_buc_status = data.bucstatus;
              monitor_10_mhz_status = data.mhz_ref;
              monitor_fwd_power_status = data.fwd_power;
              monitor_digital_attn_status = data.digital_attn;
              monitor_ps_temp_status = data.pstemp;
              monitor_buc_temp_status = data.buctemp;

              // Extracting values for other status variables
              monitor_latitudevalue_status = data.latitudevalue;
              monitor_longitudevalue_status = data.longitudevalue;
              monitor_mode_status = data.mode_value;
              monitor_btr1_status = data.btr_status_value;
              monitor_btr2_status = data.btr_value;
              monitor_drives_status = data.drives_value;
              monitor_buc2_status = data.buc_value;
              monitor_mru_status = data.mru_value;

              // Logging values
              console.log("value azimuth:", monitor_azimuth);
              console.log("value elevation:", monitor_elevation);
              console.log("value polarization:", externalValue);
              console.log("value crosslevel:", monitor_cross_level);

              // Updating charts and other components
              updateChart1();
              updateChart2();
              updateChart3();
              updateChart4();

              card_status();
              progressbar1();
          })
          .catch(error => {
              console.error('Error fetching data:', error);
          });
  }

  // Initial call when the HTML file starts running
  fetchDataAndProcess();

  // Set interval to call the function every 100 milliseconds
  setInterval(fetchDataAndProcess, 300);

  // Logging the value outside of the fetch function
  console.log("value23:", monitor_azimuth);

  // Create the charts initially
  createChart1();
  createChart2();
  createChart3();
  createChart4();
});



var chart1;
var chart2;
var chart3;
var chart4;
var chartColor;

function createChart1() {
    var options = {
        series: [0], // Initial data, will be updated later
        chart: {
            height: 220,
            type: 'radialBar',
            toolbar: {
                show: false
            }
        },
        plotOptions: {
          radialBar: {
            startAngle: 0,
            endAngle: 360,
            hollow: {
              margin: 0,
              size: '70%',
              background: '#fff',
              image: undefined,
              imageOffsetX: 0,
              imageOffsetY: 0,
              position: 'front',
              dropShadow: {
                enabled: true,
                top: 3,
                left: 0,
                blur: 4,
                opacity: 0.24
              }
            },
            track: {
              background: '#fff',
              strokeWidth: '67%',
              margin: 0, // margin is in pixels
              dropShadow: {
                enabled: false,
                top: -3,
                left: 0,
                blur: 4,
                opacity: 0.35
              }
            },
            dataLabels: {
              show: true,
              name: {
                offsetY: -10,
                show: true,
                color: '#888',
                fontSize: '17px'
              },
              value: {
                formatter: function (val) {
                  var formattedValue = (val * 360 / 100).toFixed(2);
                  return formattedValue.endsWith('.00') ? formattedValue.split('.')[0] : formattedValue;
              },
                color: '#111',
                fontSize: '36px',
                show: true,
              }
            }
          }
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            type: 'horizontal',
            shadeIntensity: 0.5,
            gradientToColors: ['#ABE5A1'],
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100]
          }
        },
        stroke: {
          lineCap: 'round'
        },
        labels: ['Azimuth'],
      };
      
    chart1 = new ApexCharts(document.querySelector("#chart1"), options);
    chart1.render();
}

function updateChart1() {
  if (chart1) {
      var normalizedValue = monitor_azimuth * 100 / 360;
      chart1.updateSeries([normalizedValue]);
  }
}


function createChart2() {
  var options2 = {
      series: [0], // Initial data, will be updated later
      chart: {
          height: 220,
          type: 'radialBar',
          toolbar: {
              show: false
          }
      },
      plotOptions: {
        radialBar: {
          startAngle: 0,
          endAngle: 360,
          hollow: {
            margin: 0,
            size: '70%',
            background: '#fff',
            image: undefined,
            imageOffsetX: 0,
            imageOffsetY: 0,
            position: 'front',
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24
            }
          },
          track: {
            background: '#fff',
            strokeWidth: '67%',
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: false,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.35
            }
          },
          dataLabels: {
            show: true,
            name: {
              offsetY: -10,
              show: true,
              color: '#888',
              fontSize: '17px'
            },
            value: {
              formatter: function (val) {
                var formattedValue = (val * 360 / 100).toFixed(2);
                return formattedValue.endsWith('.00') ? formattedValue.split('.')[0] : formattedValue;
            },
              color: '#111',
              fontSize: '36px',
              show: true,
            }
          }
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          type: 'horizontal',
          shadeIntensity: 0.5,
          gradientToColors: ['#ABE5A1'],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100]
        }
      },
      stroke: {
        lineCap: 'round'
      },
      labels: ['elevation'],
    };
    
    chart2 = new ApexCharts(document.querySelector("#chart2"), options2);
    chart2.render();
}

function updateChart2() {
  if (chart2) {
      var normalizedValue = monitor_elevation * 100 / 360;
      chart2.updateSeries([normalizedValue]);
  }
}

function createChart3() {
  var gradientColors = externalValue >= 0 ? ['#4CAF50'] : ['#FF6262'];

  var options3 = {
      series: [Math.abs(externalValue) * 100 / 180],
      chart: {
          height: 220,
          type: 'radialBar',
          toolbar: {
              show: false
          }
      },
      plotOptions: {
          radialBar: {
              startAngle: 0,
              endAngle: 180,
              hollow: {
                  margin: 0,
                  size: '70%',
                  background: '#fff',
                  image: undefined,
                  imageOffsetX: 0,
                  imageOffsetY: 0,
                  position: 'front',
                  dropShadow: {
                      enabled: true,
                      top: 3,
                      left: 0,
                      blur: 4,
                      opacity: 0.24
                  }
              },
              track: {
                  background: '#fff',
                  strokeWidth: '67%',
                  margin: 0,
                  dropShadow: {
                      enabled: false,
                      top: -3,
                      left: 0,
                      blur: 4,
                      opacity: 0.35
                  }
              },
              dataLabels: {
                  show: true,
                  name: {
                      offsetY: -10,
                      show: true,
                      color: '#888',
                      fontSize: '17px'
                  },
                  value: {
                      formatter: function (val) {
                        const formattedValue = parseFloat((val * 180 / 100).toFixed(2)).toString();
                        return (externalValue >= 0 ? ' ' : '-') + formattedValue;
                    },
                      color: '#111',
                      fontSize: '36px',
                      show: true,
                  }
              }
          }
      },
      fill: {
          type: 'gradient',
          gradient: {
              shade: 'dark',
              type: 'horizontal',
              shadeIntensity: 0.5,
              gradientToColors: gradientColors,
              inverseColors: false,
              opacityFrom: 1,
              opacityTo: 1,
              stops: [0, 100]
          }
      },
      stroke: {
          lineCap: 'round'
      },
      labels: ['polarization'],
  };

  chart3 = new ApexCharts(document.querySelector("#chart3"), options3);
  chart3.render();
}

function updateChart3() {
  if (chart3) {
      var normalizedValue = Math.abs(externalValue) * 100 / 180;
      var gradientColors = externalValue >= 0 ? ['#4CAF50'] : ['#FF6262'];
      chart3.updateOptions({
          fill: {
              gradient: {
                  gradientToColors: gradientColors
              }
          }
      });
      chart3.updateSeries([normalizedValue]);
  }
}


//=================================

function createChart4() {
  var gradientColors = externalValue2 >= 0 ? ['#4CAF50'] : ['#FF6262'];

  var options4 = {
      series: [Math.abs(externalValue2) * 100 / 180],
      chart: {
          height: 220,
          type: 'radialBar',
          toolbar: {
              show: false
          }
      },
      plotOptions: {
          radialBar: {
              startAngle: 0,
              endAngle: 180,
              hollow: {
                  margin: 0,
                  size: '70%',
                  background: '#fff',
                  image: undefined,
                  imageOffsetX: 0,
                  imageOffsetY: 0,
                  position: 'front',
                  dropShadow: {
                      enabled: true,
                      top: 3,
                      left: 0,
                      blur: 4,
                      opacity: 0.24
                  }
              },
              track: {
                  background: '#fff',
                  strokeWidth: '67%',
                  margin: 0,
                  dropShadow: {
                      enabled: false,
                      top: -3,
                      left: 0,
                      blur: 4,
                      opacity: 0.35
                  }
              },
              dataLabels: {
                  show: true,
                  name: {
                      offsetY: -10,
                      show: true,
                      color: '#888',
                      fontSize: '17px'
                  },
                  value: {
                      formatter: function (val) {
                        const formattedValue = parseFloat((val * 180 / 100).toFixed(2)).toString();
                        return (externalValue2 >= 0 ? ' ' : '-') + formattedValue;
                    },
                      color: '#111',
                      fontSize: '36px',
                      show: true,
                  }
              }
          }
      },
      fill: {
          type: 'gradient',
          gradient: {
              shade: 'dark',
              type: 'horizontal',
              shadeIntensity: 0.5,
              gradientToColors: gradientColors,
              inverseColors: false,
              opacityFrom: 1,
              opacityTo: 1,
              stops: [0, 100]
          }
      },
      stroke: {
          lineCap: 'round'
      },
      labels: ['cross-level'],
  };

  chart4 = new ApexCharts(document.querySelector("#chart4"), options4);
  chart4.render();
}

function updateChart4() {
  if (chart4) {
      var normalizedValue = Math.abs(externalValue2) * 100 / 180;
      var gradientColors = externalValue2 >= 0 ? ['#4CAF50'] : ['#FF6262'];
      chart4.updateOptions({
          fill: {
              gradient: {
                  gradientToColors: gradientColors
              }
          }
      });
      chart4.updateSeries([normalizedValue]);
  }
};

//================================= CHART TRIAL END==================

function card_status()
{

let bucstatuselement = document.getElementById("m_bucstatus");
let mhz_ref_element = document.getElementById("m_10_mhz_ref");
//let fwd_power_element = document.getElementById("m_fwd_power");
let m_digital_attn_element = document.getElementById("m_digital_attn");

// projects
//let m_ps_temp_progressbar_text_element = document.getElementById('ps_temp_progressbar_text');
let m_buc_temp_progressbar_text_element = document.getElementById('buc_temp_progressbar_text');


let latitude_text_element = document.getElementById('latitude_text');
let mode_text_element = document.getElementById('mode_text');
let btr2_text_element = document.getElementById('btr2_text');
let buc_text_element = document.getElementById('buc_text');

let longitude_text_element = document.getElementById('longitude_text');
let btr_status_text_element = document.getElementById('btr_status_text');
let drives_text_element = document.getElementById('drives_text');
let mru_text_element = document.getElementById('mru_text');


// Update the text based on the bucstatuselement
if (monitor_buc_status === 0) {
  bucstatuselement.textContent = "Mute";
} else {
  bucstatuselement.textContent = "Unmute";
}

if (monitor_10_mhz_status === 0) {
  mhz_ref_element.textContent = "Internal";

} else {
  mhz_ref_element.textContent = "External";
}

m_digital_attn_element.textContent = monitor_digital_attn_status;


latitude_text_element.textContent = monitor_latitudevalue_status;

if (monitor_mode_status === 0) {
  mode_text_element.textContent = "AUTO";
} else {
  mode_text_element.textContent = "MANUAL";
}

if (monitor_btr2_status === 0) {
  btr2_text_element.textContent = "HEALTHY";
} else {
  btr2_text_element.textContent = "NOT HEALTHY";
}


if (monitor_buc2_status === 0) {
  buc_text_element.textContent = "HEALTHY";
} else {
  buc_text_element.textContent = "NOT HEALTHY";
}


 longitude_text_element.textContent =  monitor_longitudevalue_status;


if (monitor_btr1_status === 0) {
  btr_status_text_element.textContent = "LOCKED";
} else {
  btr_status_text_element.textContent = "NOT LOCKED";
}


if (monitor_drives_status === 0) {
  drives_text_element.textContent = "HEALTHY";
} else {
  drives_text_element.textContent = "NOT HEALTHY";
}


if (monitor_mru_status === 0) {
  mru_text_element.textContent = "HEALTHY";
} else {
  mru_text_element.textContent = "NOT HEALTHY";
}

}


function progressbar1()
{
  let fwd_power_element = document.getElementById("m_fwd_power");
  fwd_power_element.textContent = monitor_fwd_power_status;
  let variable1 = monitor_fwd_power_status;

  const newValue = Math.min(Math.max(variable1, 0), 100);

  // Update the aria-valuenow attribute
  document.getElementById('fwd_progressbar').setAttribute('aria-valuenow', newValue);

  // Update the width of the progress bar
  document.getElementById('fwd_progressbar').style.width = newValue + '%';


  let m_ps_temp_progressbar_text_element = document.getElementById('ps_temp_progressbar_text');
  m_ps_temp_progressbar_text_element.textContent = monitor_ps_temp_status;
  let variable2 = monitor_ps_temp_status;

  const newValue2 = Math.min(Math.max(variable2, 0), 100);

  // Update the aria-valuenow attribute
  document.getElementById('ps_temp_progressBar').setAttribute('aria-valuenow', newValue2);

  // Update the width of the progress bar
  document.getElementById('ps_temp_progressBar').style.width = newValue2 + '%';


  let m_buc_temp_progressbar_text_element = document.getElementById('buc_temp_progressbar_text');
  m_buc_temp_progressbar_text_element.textContent = monitor_buc_temp_status;
  let variable3 = monitor_buc_temp_status;

  const newValue3 = Math.min(Math.max(variable3, 0), 100);

  // Update the aria-valuenow attribute
  document.getElementById('buc_temp_progressBar').setAttribute('aria-valuenow', newValue3);

  // Update the width of the progress bar
  document.getElementById('buc_temp_progressBar').style.width = newValue3 + '%';




  //document.getElementById('progressPercentage').innerText = newValue2 + '%';

  // Update the displayed percentage
  document.getElementById('progressPercentage').innerText = newValue + '%';

  
}
