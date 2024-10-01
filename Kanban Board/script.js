const height = window.innerHeight + 'px';

document.querySelector('.kanbanboard').style.height = height;

const addTaskButton = document.querySelector('.btn-addtask');
const addTaskModal  = document.querySelector('.task_modal');
const mainContainer = document.querySelector('.task-lists');
const prioritySelect = document.querySelector('.priority-select');
const prioritySelectNav = document.querySelector('.priority-nav');
const statusSelectNav = document.querySelector('.status-nav');
const statusSelect = document.querySelector('.status-select');
const formSelect = document.querySelector('form');

let ogTickets = [];

let deleteMode = false;

const localTickets = JSON.parse(localStorage.getItem('ogTickets'));
if(localTickets){
    ogTickets=localTickets;
}
console.log(ogTickets);



// toggle methods
    let booleanTask = 'false';
addTaskModal.style.display = 'none';
  
addTaskButton.addEventListener('click', function(event) {
    if(booleanTask) {
        addTaskModal.style.display = 'flex';
    } else {
        addTaskModal.style.display = 'none';
    }
    booleanTask = !booleanTask;

});

// create tickets
function createTicket(ticketTitle, ticketDescription, ticketPriority, ticketStatus, shortid) {
    if (ticketTitle) {
        let ticketCont = document.createElement('div');
        ticketCont.setAttribute('class', 'col-lg-3 task-column active');
        ticketCont.setAttribute('data-priority',`${ticketPriority}` );
        ticketCont.setAttribute('data-status',`${ticketStatus}` );
        ticketCont.setAttribute('data-ticket-id',`${shortid}` );
        ticketCont.innerHTML= `<div class="task-box ${ticketPriority}">
        <div class="task-options"><i class="fa-solid edit-button fa-lock"></i><i class="fa-solid delete-button fa-trash"></i></div>
                                    <h4 class="task-boxtitle">${ticketTitle}</h4>
                                    <h6>${shortid}</h6>
                                    <p class="task-boxdesc">${ticketDescription}</p>
                                    <div class="task-tags">
                                        <p>Tags</p>
                                        <button type="button" class="ticket-priority ${ticketPriority}">${ticketPriority}</button>
                                        <button type="button" class="ticket-status ${ticketStatus}">${ticketStatus}</button>
                                    </div>
                    
                                </div>`;
        
        mainContainer.appendChild(ticketCont);

        handleEdit(shortid,ticketCont);
        handlePriority(shortid,ticketCont);
        handleStatus(shortid,ticketCont);
        handleDelete(shortid,ticketCont);
        
    }
}

function handleEdit(ticketId , ticketElem) {
    console.log(ticketId , ticketElem);
    
    const lockClass = "fa-lock";
  const unlockClass = "fa-lock-open";
    const editButton = ticketElem.querySelector(".task-options i.edit-button");
    const boxTitle = ticketElem.querySelector(".task-boxtitle");
    const dataTicket = ticketElem.getAttribute("data-ticket-id");
    const boxDescription = ticketElem.querySelector(".task-boxdesc");
    const boxPriority = ticketElem.querySelector(".ticket-priority").value;
    const boxStatus = ticketElem.querySelector(".ticket-status").value;


    editButton.addEventListener('click',function(event) {
        if(editButton.classList.contains(lockClass)){
            editButton.classList.remove(lockClass);
            editButton.classList.add(unlockClass);
            boxTitle.setAttribute('contenteditable', 'true');
            boxDescription.setAttribute('contenteditable', 'true');
            
        } else {
            editButton.classList.remove(unlockClass);
            editButton.classList.add(lockClass);
            boxTitle.setAttribute('contenteditable', 'false');
            boxDescription.setAttribute('contenteditable', 'false');

            let idx = ogTickets.findIndex((ticket) => {
                // console.log(ticket.shortid);
                // console.log(ticketId);
                // console.log(ticketElem.getAttribute("data-ticket-id"));
                
                
              return ticket.shortid === ticketId;
            //   return ticketId === ticketElem.getAttribute("data-ticket-id");
            });

    //   console.log(idx);
      
            ogTickets[idx].title = boxTitle.textContent;
            ogTickets[idx].description = boxDescription.textContent;
            ogTickets[idx].priority = boxPriority.textContent;
            ogTickets[idx].status = boxStatus.textContent;
            // updateLocalStorage();
            // console.log(ogTickets);
            updateLocalStorage();
            
        }
    })
}

function handleDelete(ticketId, ticketElem) {
    const deleteButton = ticketElem.querySelector(".task-options i.delete-button");

    deleteButton.addEventListener("click", () => {
        deleteMode = true;

        if (deleteMode) {   
          ticketElem.remove();
          updateLocalStorage();
        } else {
          console.log("Ignore");
        }
      });
}

// let ticket = document.querySelector(".ticket-cont");
let priorities = ["critical", "high", "medium", "low"];



function handlePriority(ticketId , ticket) {
    let priorityBtn = ticket.querySelector(".ticket-priority"); // Assuming the priority button has this class

    priorityBtn.addEventListener("click", function () {
        // Find the current priority class
        let currentPriority = priorities.find(priority => priorityBtn.classList.contains(priority));

        // Determine the next priority
        let currentIndex = priorities.indexOf(currentPriority);
        let nextIndex = (currentIndex + 1) % priorities.length;
        let nextPriority = priorities[nextIndex];

        // Remove the current priority class and add the next priority class
        priorityBtn.classList.remove(currentPriority);
        priorityBtn.classList.add(nextPriority);

        // Update the button text (if you want to show the priority name)
        priorityBtn.textContent = nextPriority.charAt(0).toUpperCase() + nextPriority.slice(1);

        let idx = ogTickets.findIndex((ticket) => {
            
            return ticket.shortid === ticketId;
          });
      
          ogTickets[idx].priority = nextPriority;
          updateLocalStorage();
    });
    
}


// let ticket = document.querySelector(".ticket-cont");
let statusList = ["todo", "prograss", "hold", "completed"];



function handleStatus(ticketId , ticket) {
    let statusBtn = ticket.querySelector(".ticket-status"); // Assuming the priority button has this class

    statusBtn.addEventListener("click", function () {
        // Find the current priority class
        let currentStatus = statusList.find(status => statusBtn.classList.contains(status));

        // Determine the next priority
        let currentIndex = statusList.indexOf(currentStatus);
        let nextIndex = (currentIndex + 1) % statusList.length;
        let nextStatus = statusList[nextIndex];

        // Remove the current priority class and add the next priority class
        statusBtn.classList.remove(currentStatus);
        statusBtn.classList.add(nextStatus);

        // Update the button text (if you want to show the priority name)
        statusBtn.textContent = nextStatus.charAt(0).toUpperCase() + nextStatus.slice(1);

        let idx = ogTickets.findIndex((ticket) => {
            
            return ticket.shortid === ticketId;
          });
      
          ogTickets[idx].status = nextStatus;
          updateLocalStorage();
    });
    
}



formSelect.addEventListener('submit', function(e) {
    e.preventDefault();    
 const titleCont = document.querySelector(".task_title").value;
 const descriptionCont = document.querySelector("#task_description").value;
 const priorityCont = document.querySelector(".priority-select").value;
 const statusCont = document.querySelector('.status-select').value;
 const shortID = shortid();
 
 console.log(titleCont, descriptionCont, priorityCont, statusCont,shortID);
 createTicket(titleCont, descriptionCont, priorityCont, statusCont,shortID);

 ogTickets.push({
    title: titleCont,
    description: descriptionCont,
    priority: priorityCont,
    status: statusCont,
    shortid: shortID,
  });
  updateLocalStorage();
 formSelect.reset();
 addTaskModal.style.display = 'none';
 console.log(ogTickets);

});


prioritySelectNav.addEventListener('change', function(event) {
    filterTasks();
});

statusSelectNav.addEventListener('change', function(event) {
    filterTasks();
});

function filterTasks() {
    const priorityselectedValue = prioritySelectNav.value;
    const statusselectedValue = statusSelectNav.value;
    
    const allTaskColumns = document.querySelectorAll('.task-column');

    allTaskColumns.forEach(function(taskBox) {
        const taskPriority = taskBox.getAttribute('data-priority');
        const taskStatus = taskBox.getAttribute('data-status');

        if ((priorityselectedValue === 'all' || priorityselectedValue === taskPriority) &&
            (statusselectedValue === 'all' || statusselectedValue === taskStatus)) {
            taskBox.classList.add('active');
        } else {
            taskBox.classList.remove('active');
        }
    });
}



function updateLocalStorage() {
    localStorage.setItem("ogTickets",JSON.stringify(ogTickets));
}

// localStorage.setItem("key","value");
// localStorage.setItem("obj",JSON.stringify(["name:","jency"]));