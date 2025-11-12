document.addEventListener("DOMContentLoaded",()=>{
  const storedTasks= JSON.parse(localStorage.getItem('tasks'))
   if(storedTasks){
    storedTasks.forEach((task) => tasks.push(task))
    updateTaskList();
    updateProgress();
   }
   setInterval(() =>{
    notifyIncompleteTasks();
   },900000)
})

let tasks=[];

const  saveTasks = () =>{
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

const addTask=()=> {
  const taskInput=document.getElementById("taskInput");
  const text=taskInput.value.trim();

   if(tasks){
     tasks.push({text:text,completed : false});
     taskInput.value="";
     updateTaskList();
     updateProgress();
     saveTasks();
     updateMessage(tasks);
     showMessage(`🆕 Task added. Total: ${tasks.length} task${tasks.length === 1 ? "" : "s"}`);
};

const toggleTaskComplete = (index) => {
   }
}
const toggleTaskComplete=(index)=>{
  tasks[index].completed=!tasks[index].completed;
  updateProgress();
  updateTaskList();
  saveTasks();
  updateMessage(tasks);
  }

  const deleteTask=(index)=>{
    tasks.splice(index,1);
    updateTaskList();
    updateProgress();
    saveTasks();
     showMessage(`🗑️ Task deleted. Remaining: ${tasks.length} task${tasks.length === 1 ? "" : "s"}`);

  }
   const editTask= (index) =>{
    const taskInput=document.getElementById("taskInput") ;
      taskInput.value=tasks[index].text;
       tasks.splice(index , 1);
       updateTaskList();
       updateProgress();
       saveTasks();
        showMessage("✏️ Task edited");
   }

   const updateProgress= () =>{
    const completeTasks= tasks.filter((task) => task.completed).length;
    const  totalTasks=tasks.length;
    const progress=(completeTasks / totalTasks) * 100;
    const  progressBar=document.getElementById("progress");
    progressBar.style.width=`${progress}%`;

    document.getElementById("numbers").innerText=`${completeTasks} / ${totalTasks}`;
     if(tasks.length && completeTasks === totalTasks){
      blast();
     }

   }
   const taskInput=document.getElementById("taskInput");
const microPhone=document.querySelector(".speak");

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported in this browser.");
    } else {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;
       
       microPhone.addEventListener("click",(e)=>{
         e.preventDefault();
        recognition.start();
       });
        recognition.onresult = function(event) {
          console.log(event.results);
          const transcript = event.results[0][0].transcript;
          taskInput.value = transcript;
         };
       recognition.onerror = function(event) {
          console.error("Speech recognition error:", event.error);
        };
      }

       function showMessage(text) {
    const bar = document.getElementById("message-bar");
    bar.textContent = text;
    bar.style.display = "block";
    bar.style.opacity = "1";

    setTimeout(() => {
        bar.style.opacity = "0";
        setTimeout(() => {
            bar.style.display = "none";
        }, 1000); 
    }, 3000);
}

function notifyIncompleteTasks() {
  if (!("Notification" in window)) return;
  if (Notification.permission !== "granted") return;

  const incompleteTasks = tasks.filter(task => !task.completed);
  if (incompleteTasks.length === 0) return;

  const taskTitles = incompleteTasks.map(t => t.text).join(" \n ");
  const maxLength = 100;
  const body = taskTitles.length > maxLength ? taskTitles.substring(0, maxLength) + "..." : taskTitles;

  new Notification("⏰ You have incomplete tasks!", {
    body: body,
    icon: "./logo.png"
  });
}

function updateMessage(tasks) {
    const completedCount = tasks.filter((task) => task.completed).length;
    const totalCount = tasks.length;

    if (completedCount === 0) return;

    if (completedCount === totalCount) {
        showMessage("🎉 Congratulations! You completed all tasks!");
    } else if (completedCount === 1) {
        showMessage("🎯 Great! You completed your first task!");
    } else {
        showMessage(`✅ You have completed ${completedCount} tasks. Keep it up!`);
    }
}
   
const updateTaskList=() =>{
  const taskList=document.querySelector(".task-list");
  taskList.innerHTML="";
   tasks.forEach((task,index) =>{
    const listItems=document.createElement("li");
    listItems.innerHTML = `
    <div class="taskItem">
      <div class="task" ${task.completed ? "completed" : ""} ">
      <input type="checkbox" class="checkbox"  ${task.completed ? "checked" : ""}/>
      <p>${task.text}</p>
      </div>
      <div class="icons">
      <i class="fa-solid fa-pen-to-square" style="color: #5609b3;" onclick="editTask(${index})"></i>
      <i class="fa-solid fa-trash" style="color: #fa0000;" onclick="deleteTask(${index})"></i>
      </div>
   </div>   
  `;
  listItems.addEventListener("change",() => toggleTaskComplete(index));
  taskList.appendChild(listItems);
   });
}

const button=document.getElementById("newTask");
  button.addEventListener("click",function(event){
      event.preventDefault();
      addTask();
  })
  const blast=() =>{
  const duration = 3 * 1000,
  animationEnd = Date.now() + duration,
  defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

const interval = setInterval(function() {
  const timeLeft = animationEnd - Date.now();

  if (timeLeft <= 0) {
    return clearInterval(interval);
  }

  const particleCount = 50 * (timeLeft / duration);

  confetti(
    Object.assign({}, defaults, {
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
    })
  );
  confetti(
    Object.assign({}, defaults, {
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
    })
  );
}, 250);
}

const sidebar = document.getElementById("sidebar");
document.getElementById("hamburger").addEventListener("click", () => {
  sidebar.style.left = "0"; 
});
document.getElementById("closeSidebar").addEventListener("click", () => {
  sidebar.style.left = "-250px";  
});

// analytics section

document.getElementById("analyticsToggle").addEventListener("click", () => {
  document.getElementById("mainTodoSection").style.display = "none";
  document.getElementById("analyticsSection").style.display = "block";
  renderConsistencyMap(); 
  renderPieChart();
  renderBarChart();
});

document.getElementById("backToTodo").addEventListener("click", () => {
  document.getElementById("analyticsSection").style.display = "none";
  document.getElementById("mainTodoSection").style.display = "block";
});
// consistency map

const map = document.getElementById("consistencyMap");
const TOTAL_DAYS = 100;

function loadConsistencyData() {
  let data = JSON.parse(localStorage.getItem("consistencyMap")) || {
    startDate: new Date().toDateString(),
    dots: 0,
    lastVisited: null
  };

  const today = new Date().toDateString();

  if (data.lastVisited !== today) {
    if (data.dots < TOTAL_DAYS) data.dots++;
    data.lastVisited = today;
    localStorage.setItem("consistencyMap", JSON.stringify(data));
  }

  return data;
}

function resetConsistencyMap() {
  localStorage.removeItem("consistencyMap");
  renderConsistencyMap();
}

function renderConsistencyMap() {
  map.innerHTML = "";
  const data = loadConsistencyData();

  for (let i = 0; i < TOTAL_DAYS; i++) {
    const box = document.createElement("div");

    if (i < data.dots - 1) box.classList.add("active");
    else if (i === data.dots - 1) box.classList.add("blinking");

    map.appendChild(box);
  }
}

document.getElementById("resetMapBtn").addEventListener("click", resetConsistencyMap);

// timers

function setupTimer(sectionId, progressId, labelId, storageKey) {
  let time = parseInt(localStorage.getItem(storageKey)) || 0;
  let interval;
  const maxTime = 3 * 60 * 60;

  const startBtn = document.querySelector(`#${sectionId} .start`);
  const pauseBtn = document.querySelector(`#${sectionId} .pause`);
  const bar = document.getElementById(progressId);
  const label = document.getElementById(labelId);

  const resetBtn = document.createElement("button");
  resetBtn.textContent = "Reset";
  resetBtn.className = "reset";
  document.getElementById(sectionId).appendChild(resetBtn);

  function updateDisplay() {
    const hrs = Math.floor(time / 3600);
    const mins = Math.floor((time % 3600) / 60);
    const secs = time % 60;
    label.textContent = `${hrs}h ${mins}m ${secs}s`;
    const percent = Math.min((time / maxTime) * 100, 100);
    bar.style.width = percent + "%";
  }

  startBtn.onclick = () => {
    if (!interval) {
      interval = setInterval(() => {
        if (time < maxTime) {
          time++;
          updateDisplay();
          localStorage.setItem(storageKey, time);
        } else {
          clearInterval(interval);
        }
      }, 1000);
    }
  };

  pauseBtn.onclick = () => {
    clearInterval(interval);
    interval = null;
  };

  resetBtn.onclick = () => {
    clearInterval(interval);
    time = 0;
    updateDisplay();
    localStorage.setItem(storageKey, time);
    interval = null;
  };

  updateDisplay();
}

function updateStreakDays() {
  const streakEl = document.getElementById("streakDays");
  let data = JSON.parse(localStorage.getItem("streak")) || {
    count: 1,
    lastDate: new Date().toDateString()
  };

  const today = new Date().toDateString();

  if (data.lastDate !== today) {
    data.count += 1;
    data.lastDate = today;
    localStorage.setItem("streak", JSON.stringify(data));
  }

  streakEl.textContent = data.count;
}

function resetStreak() {
  localStorage.removeItem("streak");
  document.getElementById("streakDays").textContent = "0";
}

document.addEventListener("DOMContentLoaded", () => {
  updateStreakDays();
  
});
document.getElementById("resetStreakBtn")?.addEventListener("click", resetStreak);

setupTimer("selfProductivity", "selfProgressBar", "selfTimeLabel", "selfProductivityTime");
setupTimer("workout", "workoutProgressBar", "workoutTimeLabel", "workoutTime");
setupTimer("selfStudy", "studyProgressBar", "studyTimeLabel", "studyTime");
// piechart

function renderPieChart() {
  const study = parseInt(localStorage.getItem("studyTime")) || 0;
  const workout = parseInt(localStorage.getItem("workoutTime")) || 0;
  const productivity = parseInt(localStorage.getItem("selfProductivityTime")) || 0;

  const total = study + workout + productivity || 1;

  new Chart(document.getElementById("timePieChart"), {
    type: "doughnut",
    data: {
      labels: ["Study", "Workout", "Productivity"],
      datasets: [{
        data: [study, workout, productivity],
        backgroundColor: ["#3498db", "#f39c12", "#2ecc71"]
      }]
    }
  });
}
// weeklybar

let startTime = Date.now();
window.addEventListener("beforeunload", () => {
  const endTime = Date.now();
  const timeSpentSeconds = Math.floor((endTime - startTime) / 1000);

  const today = new Date();
  const dayIndex = today.getDay(); 

  const weeklyTime = JSON.parse(localStorage.getItem("weeklyTime")) || [0, 0, 0, 0, 0, 0, 0];
  weeklyTime[dayIndex] += timeSpentSeconds;

  localStorage.setItem("weeklyTime", JSON.stringify(weeklyTime));
});

function resetWeeklyDataIfNewWeek() {
  const lastReset = localStorage.getItem("lastResetDay");
  const currentDay = new Date().getDay(); 

  if (currentDay === 0 && lastReset !== "0") {
    localStorage.setItem("weeklyTime", JSON.stringify([0, 0, 0, 0, 0, 0, 0]));
    localStorage.setItem("lastResetDay", "0");
  } else if (currentDay !== 0) {
    localStorage.setItem("lastResetDay", currentDay.toString());
  }
}
resetWeeklyDataIfNewWeek();

function renderBarChart() {
  const ctx = document.getElementById("weeklyBarChart").getContext("2d");
  const weeklyTime = JSON.parse(localStorage.getItem("weeklyTime")) || [0, 0, 0, 0, 0, 0, 0];
  const maxTime = 3 * 60 * 60; 

  const hours = weeklyTime.map(seconds => (seconds / 3600).toFixed(2));
  const labels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Hours Spent',
        data: hours,
        backgroundColor: '#00FF00',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          max: 3
        }
      }
    }
  });
}

renderBarChart();
