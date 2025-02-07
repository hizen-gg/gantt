// Modifier la fonction getAvailableHeight pour qu'elle retourne une hauteur fixe
function getAvailableHeight() {
  return window.innerHeight - 150; // Hauteur fixe en soustrayant l'espace pour le menu et les contrôles
}

function generateProjects(year) {
  const projects = [];
  const projectNames = Array.from({ length: 10 }, (_, i) => `Project ${String.fromCharCode(65 + i)}`);

  const phases = [
    { name: "Développement", color: "#50B3FF" },
    { name: "QL", color: "#FF7E7E" },
    { name: "QC", color: "#64E0D1" },
  ];

  projectNames.forEach((projectName, index) => {
    const monthStart = (index * 1.5) % 12;
    const devDuration = 30 + Math.floor(Math.random() * 15);
    const startDate = Date.UTC(year, monthStart, 1 + Math.floor(Math.random() * 15));

    // Développement
    projects.push({
      name: projectName,
      y: index,
      start: startDate,
      end: Date.UTC(year, monthStart, devDuration),
      color: phases[0].color,
      phase: phases[0].name,
    });

    // QL
    const qlStart = Date.UTC(year, monthStart, devDuration);
    const qlDuration = 7;
    projects.push({
      name: projectName,
      y: index,
      start: qlStart,
      end: Date.UTC(year, monthStart, devDuration + qlDuration),
      color: phases[1].color,
      phase: phases[1].name,
    });

    // QC
    const qcStart = Date.UTC(year, monthStart, devDuration + qlDuration);
    const qcDuration = 7;
    projects.push({
      name: projectName,
      y: index,
      start: qcStart,
      end: Date.UTC(year, monthStart, devDuration + qlDuration + qcDuration),
      color: phases[2].color,
      phase: phases[2].name,
    });
  });

  return projects;
}

function initGanttA(year) {
  const startDate = Date.UTC(year, 0, 1);
  const endDate = Date.UTC(year, 11, 31);
  const data = generateProjects(year);

  Highcharts.setOptions({
    lang: {
      months: [
        "Janvier",
        "Février",
        "Mars",
        "Avril",
        "Mai",
        "Juin",
        "Juillet",
        "Août",
        "Septembre",
        "Octobre",
        "Novembre",
        "Décembre",
      ],
      weekdays: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
      rangeSelectorFrom: "Du",
      rangeSelectorTo: "Au",
      rangeSelectorZoom: "Période",
    },
  });

  Highcharts.ganttChart("container", {
    chart: {
      height: 800,
      style: {
        fontFamily: "Arial, sans-serif",
      },
      marginBottom: 100,
      spacingBottom: 50,
    },

    title: {
      text: "Diagramme de Gantt A",
    },

    yAxis: {
      type: "category",
      categories: [
        "Projet A",
        "Projet B",
        "Projet C",
        "Projet D",
        "Projet E",
        "Projet F",
        "Projet G",
        "Projet H",
        "Projet I",
        "Projet J",
      ],
      labels: {
        style: { fontSize: "12px" },
        useHTML: true,
        formatter: function () {
          const projectName = this.value;
          const projectId = projectName.split(" ")[1].toLowerCase();
          return `<a href="https://projet-${projectId}.com" target="_blank" style="color: #333; text-decoration: none; cursor: pointer;">${projectName}</a>`;
        },
      },
      uniqueNames: true,
    },

    scrollbar: {
      enabled: true,
    },

    rangeSelector: {
      enabled: true,
      selected: 0,
      inputEnabled: true,
      buttonTheme: {
        width: 60,
      },
      buttons: [
        {
          type: "month",
          count: 1,
          text: "1 mois",
        },
        {
          type: "month",
          count: 3,
          text: "3 mois",
        },
        {
          type: "month",
          count: 6,
          text: "6 mois",
        },
        {
          type: "all",
          text: "Tout",
        },
      ],
      inputDateFormat: "%d/%m/%Y",
      inputEditDateFormat: "%d/%m/%Y",
      inputDateParser: function (value) {
        value = value.split("/");
        return Date.UTC(parseInt(value[2]), parseInt(value[1]) - 1, parseInt(value[0]));
      },
      inputBoxWidth: 120,
      inputStyle: {
        color: "#333",
        fontWeight: "normal",
      },
      labelStyle: {
        color: "#666",
        fontWeight: "normal",
      },
    },

    // Ajout de la barre temporelle en bas
    navigator: {
      enabled: true,
      liveRedraw: true,
      series: {
        type: "line",
        lineWidth: 0,
        marker: {
          enabled: false,
        },
      },
      yAxis: {
        min: 0,
        max: 9,
        reversed: true,
        categories: [],
        labels: {
          enabled: false,
        },
      },
      height: 30,
      margin: 25,
      maskFill: "rgba(102,133,194,0.15)",
      maskInside: false,
      outlineWidth: 0,
      xAxis: {
        labels: {
          enabled: false,
        },
      },
      handles: {
        backgroundColor: "#f1f1f1",
        borderColor: "#999",
      },
      verticalAlign: "bottom",
      margin: 0,
    },

    // Ajout d'un deuxième axe X pour les mois
    xAxis: [
      {
        min: startDate,
        max: endDate,
        labels: {
          formatter: function () {
            if (this.axis.tickPositions.indexOf(this.value) === -1) return;
            const weekNum = Highcharts.dateFormat("%V", this.value);
            return `S${weekNum}`;
          },
          style: { fontSize: "10px" },
        },
        tickInterval: 7 * 24 * 3600 * 1000, // Une semaine
      },
      {
        min: startDate,
        max: endDate,
        grid: {
          enabled: true,
        },
        labels: {
          format: "{value:%B}",
          style: {
            fontSize: "12px",
            fontWeight: "bold",
          },
        },
        tickInterval: 30.5 * 24 * 3600 * 1000, // Un mois
      },
    ],

    // Ajout de la légende
    legend: {
      enabled: true,
      align: "center",
      verticalAlign: "bottom",
      layout: "horizontal",
      itemStyle: {
        fontSize: "12px",
      },
      symbolHeight: 12,
      symbolWidth: 12,
      symbolRadius: 6,
    },

    plotOptions: {
      series: {
        dataLabels: {
          enabled: false,
        },
        showInLegend: true,
      },
      gantt: {
        pointPadding: 0.1,
        borderRadius: 3,
        pointWidth: 35,
      },
    },

    series: [
      {
        name: "Développement",
        data: data.filter((task) => task.phase === "Développement"),
        color: "#50B3FF",
      },
      {
        name: "QL",
        data: data.filter((task) => task.phase === "QL"),
        color: "#FF7E7E",
      },
      {
        name: "QC",
        data: data.filter((task) => task.phase === "QC"),
        color: "#64E0D1",
      },
    ],

    tooltip: {
      useHTML: true,
      headerFormat: '<div style="text-align:center;font-weight:bold;font-size:13px">{point.name}</div>',
      pointFormat:
        '<div style="text-align:center;padding:8px;background-color:{point.color};color:white;border-radius:3px;margin:3px">' +
        "<b>{point.phase}</b><br/>" +
        "Début: {point.start:%d/%m/%Y}<br/>" +
        "Fin: {point.end:%d/%m/%Y}<br/>" +
        "Équipe: Équipe {point.name}" +
        "</div>",
    },

    lang: {
      rangeSelectorFrom: "Du",
      rangeSelectorTo: "Au",
      rangeSelectorZoom: "Période",
    },
  });
}
