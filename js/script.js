let url = 'https://412326-4.web.fhgr.ch/php/unload.php';
let data;

const floatStand = document.querySelector('#floatStand');
const chart = new Chart(floatStand, {
    type: 'bar',
    data: {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        datasets: [
            {
                label: 'River discharge Max.',
                data: [], // Initially empty, to be filled with data
                borderWidth: 1,
                borderColor: 'rgba(0,0,0,1)',
                backgroundColor: 'rgba(255, 99, 132, 1)'
            },
            {
                label: 'River discharge Min.',
                data: [], // Initially empty, to be filled with data
                borderWidth: 1,
                borderColor: 'rgba(0,0,0,1)',
                backgroundColor: 'rgba(54, 162, 235, 1)'
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


async function init(){
    let response = await fetch(url);
    data = await response.json();
    console.log(data);
    const alle_daten = extrahiereTimestamps(data);

console.log(alle_daten);
    const maxData = [];
    const minData = [];

    // Use a fixed date range for example purposes, modify as necessary for your use case
    const dates = ['2024-05-06', '2024-05-07', '2024-05-08', '2024-05-09', '2024-05-10', '2024-05-11', '2024-05-12'];

    dates.forEach(date => {
        if (data[date] && data[date].length > 0) {
            maxData.push(data[date][0]['river_discharge_max']);
            minData.push(data[date][0]['river_discharge_min']);
        } else {
            // Push zero if no data available for that date
            maxData.push(0);
            minData.push(0);
        }
    });

    chart.data.datasets[0].data = maxData;
    chart.data.datasets[1].data = minData;
    chart.update();
}

init();




function extrahiereTimestamps(daten) {
  let timestamps = [];
  for (const key in daten) {
      if (daten.hasOwnProperty(key)) {
          daten[key].forEach(eintrag => {
              timestamps.push(eintrag.timestamp);
          });
      }
  }
  return timestamps;
}



