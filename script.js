let inputElement = document.getElementById('doInput');
let outputElement = document.getElementById('doOutput');
let underProcessElement = document.getElementById('underProcess');
let completedTasksElement = document.getElementById('completedTasks');
let addButton = document.getElementById('addButton');

// Add event listener to the button
addButton.addEventListener('click', function () {
    let inputValue = inputElement.value;

    if (inputValue.trim() !== '') {
        // Create a new list item with a task and buttons
        let listItem = document.createElement('li');
        listItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        listItem.textContent = inputValue;

        // Create Under Process button
        let underProcessButton = document.createElement('button');
        underProcessButton.textContent = 'Under Process';
        underProcessButton.classList.add('btn', 'btn-warning', 'btn-sm', 'ms-2');

        // Create Complete button (
        let completeButton = document.createElement('button');
        completeButton.textContent = 'Complete';
        completeButton.classList.add('btn', 'btn-success', 'btn-sm', 'ms-2');
        completeButton.disabled = true;

        // Create Delete button
        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm', 'ms-2');

        // Create a button group
        let buttonGroup = document.createElement('div');
        buttonGroup.appendChild(underProcessButton);
        buttonGroup.appendChild(completeButton);
        buttonGroup.appendChild(deleteButton);

        listItem.appendChild(buttonGroup);

        outputElement.appendChild(listItem);

        inputElement.value = ''; // Clear the input field after adding the task

        underProcessButton.addEventListener('click', function () {
            if (underProcessButton.textContent === 'Under Process') {
                underProcessElement.appendChild(listItem);
                underProcessButton.textContent = 'Undo Task'; // Change button label to Undo Task
                completeButton.disabled = false;
                deleteButton.disabled = true;
            } else {
                // Undo the task and move it back to the To-Do list
                outputElement.appendChild(listItem);
                underProcessButton.textContent = 'Under Process'; // Change button label back to Under Process
                completeButton.disabled = true;
                deleteButton.disabled = false;
            }
        });

        // Add event listener for the Complete button
        completeButton.addEventListener('click', function () {
            listItem.style.textDecoration = 'line-through';
            completedTasksElement.appendChild(listItem);
            completeButton.remove();
            underProcessButton.remove();

            // Create the "Redo Task" button
            let redoButton = document.createElement('button');
            redoButton.textContent = 'Redo Task';
            redoButton.classList.add('btn', 'btn-primary', 'btn-sm', 'ms-2');
            buttonGroup.appendChild(redoButton);

            // Enable delete after completion
            deleteButton.disabled = false;

            // Add event listener for the "Redo Task" button
            redoButton.addEventListener('click', function () {
                listItem.style.textDecoration = 'none';
                outputElement.appendChild(listItem);

                buttonGroup.insertBefore(underProcessButton, redoButton); // Add Under Process button back
                buttonGroup.insertBefore(completeButton, redoButton); // Add Complete button back
                underProcessButton.textContent = 'Under Process';

                // Re-enable button
                underProcessButton.disabled = false;
                completeButton.disabled = true;
                redoButton.remove();
            });


            let isCompletedSection = listItem.closest('ul') === completedTasksElement;
            if (isCompletedSection) {
                buttonGroup.insertBefore(redoButton, deleteButton);
            }
        });

        // Add event listener for the "Delete" button
        deleteButton.addEventListener('click', function () {
            listItem.remove();
        });
    } else {
        alert('Please enter a task');
    }
});
