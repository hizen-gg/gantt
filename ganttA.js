// Modifier la fonction getAvailableHeight pour qu'elle retourne une hauteur fixe
function getAvailableHeight() {
  return window.innerHeight - 150; // Hauteur fixe en soustrayant l'espace pour le menu et les contrôles
}

function generateProjects(year) {
  const projects = [];
  const projectNames = Array.from({ length: 10 }, (_, i) => `Project ${String.fromCharCode(65 + i)}`); // A à J

  // Couleurs standards
  const colors = {
    dev: "#50B3FF", // Bleu
    ql: "#FF7E7E", // Rouge
    qc: "#64E0D1", // Turquoise
    uat: "#FFA500", // Orange
    preprod: "#4B0082", // Indigo
    prod: "#9F7FFF", // Violet
  };

  projectNames.forEach((projectName, index) => {
    // Calcul des dates de début et fin pour chaque projet
    const monthStart = (index * 1.5) % 12; // Répartit les projets sur l'année
    const devDuration = 30 + Math.floor(Math.random() * 15); // 30-45 jours
    const startDate = Date.UTC(year, monthStart, 1 + Math.floor(Math.random() * 15));

    // Développement
    projects.push({
      name: projectName,
      y: index,
      start: startDate,
      end: Date.UTC(year, monthStart, devDuration),
      color: colors.dev,
      dataLabels: { enabled: true, format: "Développement" },
    });

    // QL
    const qlStart = Date.UTC(year, monthStart, devDuration);
    const qlDuration = 7;
    projects.push({
      name: projectName,
      y: index,
      start: qlStart,
      end: Date.UTC(year, monthStart, devDuration + qlDuration),
      color: colors.ql,
      dataLabels: { enabled: true, format: "QL" },
    });

    // QC
    const qcStart = Date.UTC(year, monthStart, devDuration + qlDuration);
    const qcDuration = 7;
    projects.push({
      name: projectName,
      y: index,
      start: qcStart,
      end: Date.UTC(year, monthStart, devDuration + qlDuration + qcDuration),
      color: colors.qc,
      dataLabels: { enabled: true, format: "QC" },
    });

    // Jalons
    const milestoneDate = devDuration + qlDuration + qcDuration;

    // // UAT
    // projects.push({
    //   name: projectName,
    //   y: index,
    //   start: Date.UTC(year, monthStart, milestoneDate - 2),
    //   milestone: true,
    //   color: colors.uat,
    //   dataLabels: { enabled: true, format: "UAT" },
    // });

    // // PREPROD
    // projects.push({
    //   name: projectName,
    //   y: index,
    //   start: Date.UTC(year, monthStart, milestoneDate - 1),
    //   milestone: true,
    //   color: colors.preprod,
    //   dataLabels: { enabled: true, format: "PREPROD" },
    // });

    // // PROD
    // projects.push({
    //   name: projectName,
    //   y: index,
    //   start: Date.UTC(year, monthStart, milestoneDate),
    //   milestone: true,
    //   color: colors.prod,
    //   dataLabels: { enabled: true, format: "PROD" },
    // });
  });

  return projects;
}

function initGanttA(year) {
  const startDate = Date.UTC(year, 0, 1);
  const endDate = Date.UTC(year, 11, 31);

  // Utilisation de la fonction de génération
  const data = generateProjects(year);

  Highcharts.ganttChart("container", {
    chart: {
      height: 1200,
      plotBackgroundColor: "rgba(128,128,128,0.02)",
      plotBorderColor: "rgba(128,128,128,0.1)",
      plotBorderWidth: 1,
      scrollablePlotArea: {
        minHeight: 1500,
        opacity: 1,
      },
      animation: false,
      style: {
        fontFamily: "Arial, sans-serif",
      },
    },
    title: {
      text: "Diagramme de Gantt A",
    },

    scrollbar: {
      enabled: true,
      showFull: true,
      barBackgroundColor: "#f1f1f1",
      barBorderRadius: 7,
      barBorderWidth: 0,
      buttonBackgroundColor: "#f1f1f1",
      buttonBorderWidth: 0,
      buttonArrowColor: "#333333",
      buttonBorderRadius: 7,
      rifleColor: "#333333",
      trackBackgroundColor: "#f1f1f1",
      trackBorderWidth: 1,
      trackBorderColor: "#e6e6e6",
      trackBorderRadius: 7,
    },

    xAxis: [
      {
        // Axe pour les semaines (en bas)
        grid: {
          enabled: true,
          borderColor: "#e6e6e6",
          borderWidth: 1,
        },
        labels: {
          format: "S{value:%W}",
          style: { fontSize: "10px" },
        },
        tickInterval: 7 * 24 * 3600 * 1000,
        min: startDate,
        max: endDate,
      },
      {
        // Axe pour les mois (au milieu)
        grid: {
          enabled: true,
          borderColor: "#e6e6e6",
          borderWidth: 1,
        },
        labels: {
          format: "{value:%B}",
          style: {
            fontSize: "12px",
            fontWeight: "bold",
          },
        },
        tickInterval: 30.5 * 24 * 3600 * 1000,
      },
      {
        // Axe pour l'année (en haut)
        grid: {
          enabled: true,
          borderColor: "#e6e6e6",
          borderWidth: 1,
        },
        labels: {
          format: "{value:%Y}",
          style: {
            fontSize: "14px",
            fontWeight: "bold",
          },
        },
        tickInterval: 365 * 24 * 3600 * 1000,
      },
    ],
    yAxis: {
      type: "category",
      categories: [
        "Project A",
        "Project B",
        "Project C",
        "Project D",
        "Project E",
        "Project F",
        "Project G",
        "Project H",
        "Project I",
        "Project J",
      ],
      labels: {
        enabled: true,
        style: {
          fontSize: "12px",
        },
      },
      staticScale: 50,
      min: 0,
      max: 9,
      gridLineWidth: 1,
    },
    plotOptions: {
      series: {
        dataLabels: {
          enabled: true,
          align: "center",
          verticalAlign: "middle",
          style: {
            fontSize: "12px",
            fontWeight: "bold",
            color: "white",
            textOutline: "none",
          },
        },
        states: {
          hover: {
            brightness: 0.1,
          },
        },
      },
      gantt: {
        grouping: false,
        pointPadding: 0.1,
        borderRadius: 3,
        pointWidth: 35,
        connectors: {
          lineWidth: 2,
          radius: 5,
        },
      },
    },
    series: [
      {
        name: "Projets",
        data: data.map((task) => ({
          ...task,
          owner: task.milestone ? "Équipe " + task.name.split(" ")[1] : "Équipe Projet",
          url: "https://projet-" + task.name.toLowerCase().replace(" ", "") + ".com",
        })),
      },
    ],
    tooltip: {
      useHTML: true,
      headerFormat: '<div style="text-align:center;font-weight:bold;font-size:13px">{point.name}</div>',
      pointFormat:
        '<div style="text-align:center;padding:8px;background-color:{point.color};color:white;border-radius:3px;margin:3px">' +
        "<b>{point.dataLabels.format}</b><br/>" +
        "Début: {point.start:%d/%m/%Y}<br/>" +
        "Fin: {point.end:%d/%m/%Y}<br/>" +
        "Équipe: {point.owner}<br/>" +
        "URL: {point.url}" +
        "</div>",
      style: {
        fontSize: "12px",
      },
      padding: 5,
      distance: 15,
      shadow: false,
    },
  });
}
