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
                    size: 30,
                }
            },
            x: {
                
                ticks: {
                    color: 'rgba(241, 145, 118, 1)',
                }
            }
        },
        
        
        plugins: {
            legend: {
                labels: {
                    color: 'black',
                    
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
        lastDate = filteredData[date][0]['river_discharge_min'];
        if (filteredData[date] && filteredData[date].length > 0) {
            maxData.push(filteredData[date][0]['river_discharge_max']);
            minData.push(filteredData[date][0]['river_discharge_min']);
        } else {
            maxData.push(0);
            minData.push(0);
        }
    });

    
    console.log(lastDate);
    if (lastDate < 30) {
        containerRiverLow.style.display = 'flex';
        containerRiverHigh.style.display = 'none';
    } else {
        containerRiverLow.style.display = 'none';
        containerRiverHigh.style.display = 'flex';
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

    // Kalenderwoche in das entsprechende HTML-Element einfügen
    document.getElementById('currentWeek').textContent = currentWeek;
}

// Funktion zur Berechnung der Kalenderwoche innerhalb des aktuellen Monats
function getWeekNumber(date) {
    var firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    var daysIntoFirstWeek = (8 - firstDayOfMonth.getDay()) % 7;
    var daysIntoMonth = date.getDate() - 1;
    return Math.floor((daysIntoMonth + daysIntoFirstWeek) / 7) + 1;
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