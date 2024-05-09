// getting data from lacal storage

let existingTask = localStorage.getItem('task');
if (existingTask) {
    existingTask = JSON.parse(existingTask);
}
else {
    existingTask = {}
}

let renderTasks = () => {


    /* let keys = Object.keys(existingTask);
    console.log("key :" , keys); */

    for (let key in existingTask) {

        existingTask[key].forEach((eachTask, index) => {
            // create elements here
            // create a simple div of class "task"
            let tasks = document.createElement("div");
            tasks.innerText = eachTask;
            // tasks.className = "task";
            tasks.setAttribute("class", "task");
            tasks.draggable = "true";

            // append simple div to the extraContainer just before the innerForm

            // catch extraContainer
            let extraContainerDiv = document.getElementById(key);
            let extraContainerLastChild = extraContainerDiv.lastElementChild;
            extraContainerDiv.insertBefore(tasks, extraContainerLastChild);
        });

    }

}
renderTasks();




const createExtraContainerFunction = (inputValueOfMainForm) => {

    // create a div (extraContainer)
    let extraContainer = document.createElement("div");
    // add a class (extraContainer)
    extraContainer.className = 'extraContainer';
    extraContainer.setAttribute("id" , inputValueOfMainForm); // write this line only when you want to render it
    // create a title for extraContainer (h3)
    const title = document.createElement("h3");
    title.textContent = inputValueOfMainForm; // comming input value dynamically
    extraContainer.appendChild(title);
    // create an inner form element
    const innerForm = document.createElement("form");
    innerForm.className = "innerForm";
    // create an input in the form element
    const innerFormInput = document.createElement("input");
    innerFormInput.type = "text";
    innerFormInput.placeholder = "Write task name";
    // create an input of type submit in the form element
    const innerFormSubmit = document.createElement("input");
    innerFormSubmit.type = "submit";
    innerFormSubmit.hidden = "true";
    // append the above two input elements to the innerForm
    innerForm.appendChild(innerFormInput);
    innerForm.appendChild(innerFormSubmit);
    // now append the innerForm to the extraContainer
    extraContainer.appendChild(innerForm);
    

    // append extraContainer to the body
    const body = document.body;
    let lastChildOfBody = document.body.lastElementChild;
    body.insertBefore(extraContainer, lastChildOfBody);

    createColumnContainer.reset();

    // Event listener for creating simple divs inside extraContainer
    innerForm.addEventListener("submit", (event) => {
        event.preventDefault();
        // extract the value of the input from inner form to perform further opertaion 
        const inputValueOfinnerForm = innerFormInput.value;

        // create a simple div of class "task"
        let tasks = document.createElement("div");
        tasks.innerText = inputValueOfinnerForm;
        // tasks.className = "task";
        tasks.setAttribute("class", "task");
        tasks.draggable = "true";

        // append simple div to the extraContainer just before the innerForm

        // catch extraContainer , as we have already
        let extraContainerLastChild = extraContainer.lastElementChild;
        extraContainer.insertBefore(tasks, extraContainerLastChild);
        event.target.reset();

        //drag and drop functionality starts here

        /* let targetedElment = null;
        let handleDragStart = (event) => {
            targetedElment = event.target;
            console.log("targeted element :", targetedElment);
        }



        let draggableElements = document.querySelectorAll(".task");
        draggableElements.forEach((dragElm) => {
            dragElm.addEventListener('dragstart', handleDragStart);
        }); */

        //drag and drop functionality ends here

        // set data in local storage

        let objectkey = inputValueOfMainForm;
        if (!existingTask[objectkey]) {
            existingTask[objectkey] = []; // creating a key that will contains some values later
        }
        existingTask[objectkey].push(inputValueOfinnerForm);

        localStorage.setItem('task', JSON.stringify(existingTask));

    });


}

const createColumnContainer = document.getElementById("createColumn");
createColumnContainer.addEventListener('submit', (event) => {
    event.preventDefault();

    const inputValueOfMainForm = document.querySelector("#inputText").value;
    createExtraContainerFunction(inputValueOfMainForm); // function call 
});





