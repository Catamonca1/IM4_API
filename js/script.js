let url = 'https://412326-4.web.fhgr.ch/php/unload.php';
let data;

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
                beginAtZero: true
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
        if (filteredData[date] && filteredData[date].length > 0) {
            maxData.push(filteredData[date][0]['river_discharge_max']);
            minData.push(filteredData[date][0]['river_discharge_min']);
        } else {
            maxData.push(0);
            minData.push(0);
        }
    });

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


//this function updates the date and the week

function updateDateAndWeek() {
    var currentDate = new Date();
    var currentWeek = getWeekNumber(currentDate);

    // Log to console for debugging
    console.log("Updating date and week");
    console.log("Current Date: ", currentDate);
    console.log("Current Week: ", currentWeek);

    // Datum und Kalenderwoche in die entsprechenden HTML-Elemente einfügen
    document.getElementById('currentDate').textContent = formatDate(currentDate);
    document.getElementById('currentWeek').textContent = currentWeek;
}

// Funktion zur Formatierung des Datums (TT.MM.JJJJ)
function formatDate(date) {
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    return (day < 10 ? '0' : '') + day + '.' + (month < 10 ? '0' : '') + month + '.' + year;
}

// Funktion zur Berechnung der Kalenderwoche nach ISO 8601
function getWeekNumber(date) {
    var target = new Date(date.valueOf());
    var dayNr = (date.getDay() + 6) % 7;
    target.setDate(target.getDate() - dayNr + 3);
    var firstThursday = target.valueOf();
    target.setMonth(0, 1);
    if (target.getDay() !== 4) {
        target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
    }
    return 1 + Math.ceil((firstThursday - target) / 604800000);
}

// Die Funktion updateDateAndWeek initial aufrufen
updateDateAndWeek();

// Die Funktion updateDateAndWeek jede Woche aufrufen (alle 7 Tage)
setInterval(updateDateAndWeek, 7 * 24 * 60 * 60 * 1000);


