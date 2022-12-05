fetch(`/pizza/grafico`)
  .then((res) => {
    return res.json();
  })
  .then((grafico) => {
    console.log(grafico) 
    var arrayNomes = [];
    var arrayValores = [];
    for (let i = 0; i < grafico.length; i++) {
      arrayNomes[i] = grafico[i].nome;
      arrayValores[i] = grafico[i].vendidos;
    }
    const ctx = document.getElementById("myChart");

    new Chart(ctx, {
      type: "bar",
      data: {
        labels: arrayNomes,
        datasets: [
          {
            label: "Pizza mais vendida",
            data: arrayValores,
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  });

function apagar(id) {
  fetch(`/pizza/apagar?id=${id}`)
    .then((res) => {
      return res;
    })
    .then((res) => {
      location.reload();
    });
}
function alterarStatus(id) {
  var select = document.getElementById(id);
  var status = select.options[select.selectedIndex].value;
  fetch(`/pizza/alterarStatus?id=${id}&status=${status}`)
    .then((res) => {
      return res;
    })
    .then((res) => {
      location.reload();
    });
}
