// Configuration des données pour chaque gantt
const ganttData = {
  ganttA: [
    {
      name: "Projet A",
      id: "projet_a",
      start: Date.UTC(2024, 0, 1),
      end: Date.UTC(2024, 0, 15),
      color: "#50B3FF", // Bleu
      dataLabels: {
        enabled: true,
        format: "Marketing",
      },
    },
    {
      name: "Phase 1",
      id: "phase_1",
      start: Date.UTC(2024, 0, 16),
      end: Date.UTC(2024, 1, 15),
      color: "#FF7E7E", // Rouge clair
      dataLabels: {
        enabled: true,
        format: "Dribbble Shot",
      },
    },
    {
      name: "Phase 2",
      id: "phase_2",
      start: Date.UTC(2024, 1, 16),
      end: Date.UTC(2024, 2, 15),
      color: "#64E0D1", // Turquoise
      dataLabels: {
        enabled: true,
        format: "Astronomys",
      },
    },
    {
      name: "Phase 3",
      id: "phase_3",
      start: Date.UTC(2024, 2, 16),
      end: Date.UTC(2024, 3, 15),
      color: "#9F7FFF", // Violet
      dataLabels: {
        enabled: true,
        format: "Protocol Cash",
      },
    },
  ],

  ganttB: [
    {
      name: "Strategy",
      id: "strategy",
      start: Date.UTC(2024, 0, 1),
      end: Date.UTC(2024, 0, 10),
      completed: 0.98,
      color: "#4A89DC", // Bleu
    },
    {
      name: "Goals",
      id: "goals",
      parent: "strategy",
      start: Date.UTC(2024, 0, 1),
      end: Date.UTC(2024, 0, 6),
      completed: 1,
      color: "#4A89DC",
    },
    {
      name: "Target Audience",
      id: "target",
      parent: "strategy",
      start: Date.UTC(2024, 0, 3),
      end: Date.UTC(2024, 0, 7),
      completed: 1,
      color: "#67B2E4",
    },
    {
      name: "Terms of Reference",
      id: "terms",
      parent: "strategy",
      start: Date.UTC(2024, 0, 5),
      end: Date.UTC(2024, 0, 7),
      completed: 0.8,
      color: "#5EEAD4",
    },
    {
      name: "Design",
      id: "design",
      start: Date.UTC(2024, 0, 11),
      end: Date.UTC(2024, 0, 21),
      completed: 0.25,
      color: "#A78BFA",
    },
    {
      name: "User Experience",
      id: "ux",
      parent: "design",
      start: Date.UTC(2024, 0, 11),
      end: Date.UTC(2024, 0, 14),
      completed: 0.6,
      color: "#A78BFA",
    },
    {
      name: "User Interface",
      id: "ui",
      parent: "design",
      start: Date.UTC(2024, 0, 14),
      end: Date.UTC(2024, 0, 20),
      completed: 0.4,
      color: "#A78BFA",
    },
  ],

  ganttC: [
    {
      name: "Projet C",
      id: "projet_c",
      start: Date.UTC(2024, 2, 1),
      end: Date.UTC(2024, 4, 31),
    },
    {
      name: "Tâche C1",
      id: "tache_c1",
      parent: "projet_c",
      start: Date.UTC(2024, 2, 1),
      end: Date.UTC(2024, 2, 15),
    },
  ],
};

// Variable globale pour suivre le gantt actif
let currentGanttId = "ganttA";

// Fonction pour initialiser un gantt
function initGantt(data, year) {
  const startDate = Date.UTC(year, 0, 1);
  const endDate = Date.UTC(year, 11, 31);

  const options = {
    title: {
      text: "Diagramme de Gantt",
    },
    chart: {
      backgroundColor: "#ffffff",
      style: {
        fontFamily: "Arial, sans-serif",
      },
      height: 300, // Augmentation de la hauteur du graphique
    },
    xAxis: [
      {
        // Axe pour les semaines (en bas)
        grid: {
          enabled: true,
          borderColor: "#666",
          borderWidth: 1,
        },
        labels: {
          format: "S{value:%W}",
          style: {
            fontSize: "10px",
            color: "#666",
          },
        },
        tickInterval: 7 * 24 * 3600 * 1000,
        min: startDate,
        max: endDate,
        lineColor: "#666",
        alternateGridColor: "#f8f9fa", // Couleur de fond alternée pour les semaines
      },
      {
        // Axe pour les mois (au milieu)
        grid: {
          enabled: true,
          borderColor: "#333",
          borderWidth: 1,
        },
        labels: {
          format: "{value:%B}",
          style: {
            fontSize: "12px",
            color: "#333",
            fontWeight: "bold",
          },
        },
        tickInterval: 30.5 * 24 * 3600 * 1000,
        tickWidth: 0,
        gridLineWidth: 1,
        gridLineColor: "#333",
        gridZIndex: 4,
        min: startDate,
        max: endDate,
        alternateGridColor: "#e2e6ea", // Couleur de fond alternée pour les mois
      },
      {
        // Axe pour l'année (en haut)
        grid: {
          enabled: true,
          borderColor: "#000",
          borderWidth: 1,
        },
        labels: {
          format: "{value:%Y}",
          style: {
            fontSize: "14px",
            fontWeight: "bold",
            color: "#333",
          },
        },
        tickInterval: 365 * 24 * 3600 * 1000,
        min: startDate,
        max: endDate,
        lineColor: "#000",
      },
    ],
    grid: {
      columns: [
        {
          title: {
            text: "Projet/Tâche",
            style: {
              fontSize: "13px",
              fontWeight: "bold",
              color: "#333",
            },
          },
        },
      ],
    },
    plotOptions: {
      series: {
        animation: true,
        dataLabels: {
          enabled: true,
          align: "center",
          verticalAlign: "middle",
          style: {
            fontSize: "14px",
            fontWeight: "bold",
            color: "white",
            textOutline: "none",
          },
        },
      },
      gantt: {
        grouping: false,
        pointPadding: 0.1,
        borderRadius: 5,
        borderWidth: 0,
      },
    },
    yAxis: {
      type: "category",
      grid: {
        enabled: false,
      },
      labels: {
        enabled: false,
      },
      uniqueNames: true,
      staticScale: 150, // Augmentation de la hauteur des barres
      min: 0,
      max: 0,
    },
    series: [
      {
        name: "Projet",
        data: data,
      },
    ],
    tooltip: {
      pointFormat: "<span>Début: {point.start:%e %b %Y}</span><br/><span>Fin: {point.end:%e %b %Y}</span>",
    },
  };

  // Configuration spécifique pour le gantt B
  if (currentGanttId === "ganttB") {
    options.chart.height = 400;

    options.yAxis = {
      type: "category",
      grid: {
        enabled: true,
        borderColor: "#e6e6e6",
        borderWidth: 1,
      },
      labels: {
        style: {
          fontSize: "12px",
          color: "#333",
        },
      },
      staticScale: 30,
    };

    options.plotOptions.gantt = {
      grouping: true,
      pointPadding: 0.1,
      borderRadius: 4,
      borderWidth: 0,
      progressIndicator: {
        enabled: true,
        height: 0.4,
        styles: {
          fill: "rgba(255, 255, 255, 0.5)",
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function () {
          return Math.round(this.point.completed * 100) + "%";
        },
        align: "right",
        style: {
          fontSize: "11px",
          fontWeight: "normal",
          color: "#666",
        },
      },
    };

    // Désactiver les grilles verticales pour un look plus propre
    options.xAxis.forEach((axis) => {
      axis.gridLineWidth = 0;
      axis.lineWidth = 0;
    });

    // Ajouter un fond alterné léger pour les lignes
    options.chart.backgroundColor = "#ffffff";
    options.chart.style.fontFamily = "Arial, sans-serif";
  }

  Highcharts.ganttChart("container", options);
}

// Attendre que tous les scripts soient chargés
window.addEventListener("load", function () {
  const yearSelect = document.getElementById("yearSelect");
  let currentYear = parseInt(yearSelect.value);

  function updateGantt() {
    if (currentGanttId === "ganttA") {
      initGantt(ganttData.ganttA, currentYear);
    } else if (currentGanttId === "ganttB") {
      initGantt(ganttData.ganttB, currentYear);
    } else if (currentGanttId === "ganttC") {
      initGantt(ganttData.ganttC, currentYear);
    }
  }

  // Initialiser avec Gantt A
  updateGantt();

  // Écouteur pour le changement d'année
  yearSelect.addEventListener("change", function () {
    currentYear = parseInt(this.value);
    updateGantt();
  });

  // Écouteurs pour la navigation
  document.querySelectorAll(".nav-menu a").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelectorAll(".nav-menu a").forEach((l) => l.classList.remove("active"));
      this.classList.add("active");
      currentGanttId = this.id;
      updateGantt();
    });
  });
});
