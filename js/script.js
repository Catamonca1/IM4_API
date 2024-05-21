let url = 'https://412326-4.web.fhgr.ch/php/unload.php';
let data;

const containerRiverLow = document.getElementById('container_riverlow');
const containerRiverHigh = document.getElementById('container_riverhigh');

let lastDate = 0;


const floatStand = document.querySelector('#floatStand');
const chart = new Chart(floatStand, {
    type: 'bar',
    data: {
        labels: [], // Initially empty, to be filled with dates
        datasets: [
            {
                label: 'River discharge Max.',
                data: [], // Initially empty, to be filled with data
                borderWidth: 1,
                borderColor: 'rgba(0,0,0,1)',
                backgroundColor: 'rgba(241, 145, 118, 1)'
            },
            {
                label: 'River discharge Min.',
                data: [], // Initially empty, to be filled with data
                borderWidth: 1,
                borderColor: 'rgba(0,0,0,1)',
                backgroundColor: 'rgba(79, 109, 244, 1)'
            }
        ]
    },
    options: {
        indexAxis: 'y',
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    color: 'rgba(241, 145, 118, 1)',
                    font: {
                        size: 20,
                        family: 'Montserrat',
                    }
                }
            },
            x: {
                
                ticks: {
                    color: 'rgba(241, 145, 118, 1)',
                    font: {
                        size: 20,
                        family: 'Montserrat',
                    }
                }
            }
        },
        
        plugins: {
            legend: {
                labels: {
                    color: 'black',
                    font: {
                        size: 20,
                        family: 'Montserrat',
                    }
                }
            }
        }
    }
});


async function init() {
    let response = await fetch(url);
    data = await response.json();
    console.log(data);

    updateChartData();
}


function getDateRanges() {
    const today = new Date();
    const ranges = [];

    for (let i = 0; i < 4; i++) {
        const endDate = new Date(today);
        endDate.setDate(today.getDate() - (i * 7));
        const startDate = new Date(endDate);
        startDate.setDate(endDate.getDate() - 7);
        ranges.push([startDate, endDate]);
    }

    return ranges;
}


function updateChartData() {
    const weekSelector = document.getElementById('weekSelector').value;
    const dateRanges = getDateRanges();
    const selectedRange = dateRanges[parseInt(weekSelector.replace('week', '')) - 1];

    const filteredData = filterDataByDateRange(data, selectedRange[0], selectedRange[1]);
    const dates = Object.keys(filteredData);

    const maxData = [];
    const minData = [];
    dates.forEach(date => {
        lastDate = filteredData[date][0]['river_discharge_max'];
        if (filteredData[date] && filteredData[date].length > 0) {
            maxData.push(filteredData[date][0]['river_discharge_max']);
            minData.push(filteredData[date][0]['river_discharge_min']);
        } else {
            maxData.push(0);
            minData.push(0);
        }
    });

    
   // console.log(lastDate);

    if (lastDate < 30) {
        containerRiverLow.style.display = 'flex';
        containerRiverHigh.style.display = 'none';
        button1.style.backgroundColor = '#7FCEFF';
        button2.style.backgroundColor = '#0147A6';
    } else {
        containerRiverLow.style.display = 'none';
        containerRiverHigh.style.display = 'flex';
        button2.style.backgroundColor = '#7FCEFF';
        button1.style.backgroundColor = '#0147A6';
    }

    chart.data.labels = dates;
    chart.data.datasets[0].data = maxData;
    chart.data.datasets[1].data = minData;
    chart.update();
}

function filterDataByDateRange(data, start, end) {
    const filteredData = {};
    const startDate = new Date(start);
    const endDate = new Date(end);

    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const entries = data[key].filter(entry => {
                const date = new Date(entry.timestamp);
                return date >= startDate && date <= endDate;
            });
            if (entries.length > 0) {
                filteredData[key] = entries;
            }
        }
    }

    return filteredData;
}

init();

function showContainer(containerId) {
    var containers = document.querySelectorAll('.container');
    containers.forEach(function(container) {
      if (container.id === containerId) {
        container.style.display = 'block';
      } else {
        container.style.display = 'none';
      }
    });
  }function showContainer(containerId) {
    var containers = document.querySelectorAll('.container');
    containers.forEach(function(container) {
      if (container.id === containerId) {
        container.style.display = 'block';
      } else {
        container.style.display = 'none';
      }
    });
  }


//this function updates the date and the week

function updateWeek() {
    var currentDate = new Date();
    var currentWeek = getWeekNumber(currentDate);

    // Log to console for debugging
    console.log("Updating week");
    console.log("Current Week: ", currentWeek);

    // Kalenderwoche des Jahres in das entsprechende HTML-Element einfügen
    document.getElementById('currentWeek').textContent = currentWeek;
}

// Funktion zur Berechnung der Kalenderwoche des Jahres
function getWeekNumber(date) {
    var januaryFirst = new Date(date.getFullYear(), 0, 1); // Erster Januar des aktuellen Jahres
    var daysOffset = (januaryFirst.getDay() > 0 ? januaryFirst.getDay() - 1 : 6); // Tage, um zum ersten Montag des Jahres zu gelangen
    var firstMonday = new Date(januaryFirst.getTime() + daysOffset * 24 * 60 * 60 * 1000); // Erster Montag des Jahres
    var daysDifference = (date.getTime() - firstMonday.getTime()) / (24 * 60 * 60 * 1000); // Differenz in Tagen zwischen dem aktuellen Datum und dem ersten Montag des Jahres
    var weekNumber = Math.ceil((daysDifference + 1) / 7); // Kalenderwoche des Jahres
    return weekNumber;
}

// Die Funktion updateWeek initial aufrufen
updateWeek();

// Die Funktion updateWeek jede Woche aufrufen (alle 7 Tage)
setInterval(updateWeek, 7 * 24 * 60 * 60 * 1000);



function showContainer(containerId) {
    

    // Hide both sections initially
    containerRiverLow.style.display = 'none';
    containerRiverHigh.style.display = 'none';

    // Show the selected container
    document.getElementById(containerId).style.display = 'flex';
}