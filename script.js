document.addEventListener("DOMContentLoaded", function() {
    const themeButton = document.getElementById('theme-button');
    const themes = ['theme1', 'theme2', 'theme3'];
    const images = [
        ['gif1.gif', 'gif2.gif'],
        ['gifblue1.gif', 'gifblue.gif'],
        ['gifgreen.gif', 'gifgreen1.gif']
    ];
    let currentThemeIndex = 0;
    let currentImageIndex = 0;
  
    themeButton.addEventListener('click', () => {
      currentThemeIndex = (currentThemeIndex + 1) % themes.length;
      document.body.className = '';
      document.body.classList.add(themes[currentThemeIndex]);
  
      currentImageIndex = (currentImageIndex + 1) % images[currentThemeIndex].length;
      const imageElements = document.querySelectorAll('img');
      imageElements.forEach((image, index) => {
        image.src = ['images', images[currentThemeIndex][index]].join('/');
      });
    });
  });

document.addEventListener('DOMContentLoaded', function () {
    const taskList = document.getElementById('task-list');
    const newTaskInput = document.getElementById('new-task-input');
    const addTaskButton = document.getElementById('add-task-button');
    



    // Inicialización de Chart.js
    const ctx = document.getElementById('productivityChart').getContext('2d');
    let productivityChart = new Chart(ctx, {
        type: 'line', 
        data: {
            labels: ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7'], 
            datasets: [{
                label: 'Tareas Completadas',
                data: [0, 0, 0, 0, 0, 0, 0], 
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 6 
                }
            }
        }
    });

    function updateChart() {
        const completedTasks = document.querySelectorAll('.productivity-box input[type="checkbox"]:checked').length;
        const currentDay = new Date().getDay() - 1; 

        productivityChart.data.datasets[0].data[currentDay] = completedTasks;
        productivityChart.update(); 
    }

    document.querySelector('.productivity-box').addEventListener('change', updateChart);

    addTaskButton.addEventListener('click', function () {
        const taskText = newTaskInput.value.trim();
        if (taskText !== "") {
            const newTaskItem = document.createElement('li');
            newTaskItem.innerHTML = `${taskText} <input type="checkbox" class="task-checkbox">`;
            taskList.appendChild(newTaskItem);
            newTaskInput.value = "";
        }
    });

    taskList.addEventListener('change', function (e) {
        if (e.target.classList.contains('task-checkbox')) {
            e.target.parentElement.remove();
        }
    });
});
