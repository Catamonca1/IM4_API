let url = 'https://412326-4.web.fhgr.ch/php/unload.php';
let data;

async function fetchData(url) {
    try {
        let response = await fetch(url);
        let data = await response.json();
        return data; 
    }
    catch (error) {
        console.log(error);
    }
}

async function init(){
    let response = await fetch(url);
    data = await response.json();
    console.log(data);

}

init();








const floatStand = document.querySelector('#floatStand');

new Chart(floatStand, {
  type: 'line',
  data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});