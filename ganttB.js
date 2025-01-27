const day = 24 * 36e5;
const today = Math.floor(Date.now() / day) * day;

// Données des projets
const projects = [
  {
    name: "Design Project",
    data: [
      {
        name: "Design Project",
        id: "design_project",
        owner: "John Doe",
      },
      {
        name: "Research & Planning",
        id: "research",
        parent: "design_project",
        start: today - 2 * day,
        end: today + 6 * day,
        completed: {
          amount: 0.8,
        },
        owner: "Alice Smith",
      },
      {
        name: "Design Review",
        id: "review",
        dependency: "research",
        parent: "design_project",
        start: today + 6 * day,
        end: today + 8 * day,
        owner: "Bob Johnson",
      },
      {
        name: "Design Approval",
        id: "approval",
        dependency: "review",
        parent: "design_project",
        start: today + 9.5 * day,
        milestone: true,
        owner: "John Doe",
      },
      {
        name: "Implementation",
        id: "implementation",
        dependency: "approval",
        parent: "design_project",
        owner: "David Wilson",
      },
      {
        name: "UI Development",
        id: "ui_dev",
        parent: "implementation",
        start: today + 10 * day,
        end: today + 14 * day,
        owner: "Eva Davis",
      },
      {
        name: "Testing Phase",
        dependency: "ui_dev",
        parent: "implementation",
        start: today + 14 * day,
        end: today + 17 * day,
        owner: "Charlie Brown",
      },
    ],
  },
  {
    name: "Development",
    data: [
      {
        name: "Development Project",
        id: "dev_project",
        owner: "Jane Smith",
      },
      {
        name: "Initial Development",
        id: "initial_dev",
        parent: "dev_project",
        start: today - day,
        end: today + 11 * day,
        completed: {
          amount: 0.6,
          fill: "#e80",
        },
        owner: "Frank White",
      },
      {
        name: "Beta Release",
        id: "beta",
        dependency: "initial_dev",
        parent: "dev_project",
        start: today + 12.5 * day,
        milestone: true,
        owner: "Jane Smith",
      },
      {
        name: "Final Development",
        id: "final_dev",
        dependency: "beta",
        parent: "dev_project",
        start: today + 13 * day,
        end: today + 17 * day,
        owner: "George Brown",
      },
      {
        name: "Launch",
        dependency: "final_dev",
        parent: "dev_project",
        start: today + 17.5 * day,
        milestone: true,
        owner: "Jane Smith",
      },
    ],
  },
];

function generateProjectsB(year) {
  const projects = [];
  const projectNames = Array.from({ length: 4 }, (_, i) => `Project ${String.fromCharCode(65 + i)}`); // A à D

  const colors = {
    dev: "#50B3FF", // Bleu
    ql: "#FF7E7E", // Rouge
    qc: "#64E0D1", // Turquoise
  };

  projectNames.forEach((projectName, index) => {
    // Calcul des dates pour répartir les projets sur l'année
    const quarterStart = index * 3; // Chaque projet commence à un trimestre différent
    const devDuration = 45; // 45 jours de développement
    const qlDuration = 7; // 7 jours de QL
    const qcDuration = 7; // 7 jours de QC

    // Phase Développement
    projects.push({
      name: "Développement",
      start: Date.UTC(year, quarterStart, 1),
      end: Date.UTC(year, quarterStart, devDuration),
      color: colors.dev,
      y: index,
    });

    // Phase QL
    projects.push({
      name: "QL",
      start: Date.UTC(year, quarterStart, devDuration + 1),
      end: Date.UTC(year, quarterStart, devDuration + qlDuration),
      color: colors.ql,
      y: index,
    });

    // Phase QC
    projects.push({
      name: "QC",
      start: Date.UTC(year, quarterStart, devDuration + qlDuration + 1),
      end: Date.UTC(year, quarterStart, devDuration + qlDuration + qcDuration),
      color: colors.qc,
      y: index,
    });
  });

  return projects;
}

function initGanttB(year) {
  const options = {
    chart: {
      plotBackgroundColor: "rgba(128,128,128,0.02)",
      plotBorderColor: "rgba(128,128,128,0.1)",
      plotBorderWidth: 1,
      height: 800,
    },

    plotOptions: {
      series: {
        borderRadius: "50%",
        connectors: {
          dashStyle: "ShortDot",
          lineWidth: 2,
          radius: 5,
          startMarker: {
            enabled: false,
          },
        },
        groupPadding: 0,
        dataLabels: [
          {
            enabled: true,
            align: "left",
            format: "{point.name}",
            padding: 10,
            style: {
              fontWeight: "normal",
              textOutline: "none",
            },
          },
          {
            enabled: true,
            align: "right",
            format: "{#if point.completed}{(multiply point.completed.amount 100):.0f}%{/if}",
            padding: 10,
            style: {
              fontWeight: "normal",
              textOutline: "none",
              opacity: 0.6,
            },
          },
        ],
      },
    },

    series: [
      {
        name: "Project A",
        data: [
          {
            name: "Project A",
            id: "project_a",
            owner: "Manager A",
          },
          {
            name: "Développement",
            id: "dev_a",
            parent: "project_a",
            start: today,
            end: today + 45 * day,
            completed: {
              amount: 0.6,
              fill: "#50B3FF",
            },
            color: "#50B3FF",
            owner: "Team Dev A",
          },
          {
            name: "QL",
            id: "ql_a",
            dependency: "dev_a",
            parent: "project_a",
            start: today + 45 * day,
            end: today + 52 * day,
            color: "#FF7E7E",
            owner: "Team QL A",
          },
          {
            name: "QC",
            id: "qc_a",
            dependency: "ql_a",
            parent: "project_a",
            start: today + 52 * day,
            end: today + 59 * day,
            color: "#64E0D1",
            owner: "Team QC A",
          },
        ],
      },
      {
        name: "Project B",
        data: [
          {
            name: "Project B",
            id: "project_b",
            owner: "Manager B",
          },
          {
            name: "Développement",
            id: "dev_b",
            parent: "project_b",
            start: today + 90 * day,
            end: today + 135 * day,
            completed: {
              amount: 0.4,
              fill: "#50B3FF",
            },
            color: "#50B3FF",
            owner: "Team Dev B",
          },
          {
            name: "QL",
            id: "ql_b",
            dependency: "dev_b",
            parent: "project_b",
            start: today + 135 * day,
            end: today + 142 * day,
            color: "#FF7E7E",
            owner: "Team QL B",
          },
          {
            name: "QC",
            id: "qc_b",
            dependency: "ql_b",
            parent: "project_b",
            start: today + 142 * day,
            end: today + 149 * day,
            color: "#64E0D1",
            owner: "Team QC B",
          },
        ],
      },
    ],

    title: {
      text: "Diagramme de Gantt B",
    },

    tooltip: {
      pointFormat:
        '<span style="font-weight: bold">{point.name}</span><br>' +
        "{point.start:%e %b}" +
        "{#unless point.milestone} → {point.end:%e %b}{/unless}<br>" +
        "{#if point.completed}" +
        "Completed: {multiply point.completed.amount 100}%<br>" +
        "{/if}" +
        "Owner: {#if point.owner}{point.owner}{else}unassigned{/if}",
    },

    xAxis: [
      {
        currentDateIndicator: {
          color: "#2caffe",
          dashStyle: "ShortDot",
          width: 2,
          label: {
            format: "",
          },
        },
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
      },
      {
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
    ],

    yAxis: {
      grid: {
        borderWidth: 0,
      },
      gridLineWidth: 0,
      labels: {
        style: {
          fontSize: "12px",
        },
      },
      staticScale: 30,
    },
  };

  Highcharts.ganttChart("container", options);
}
