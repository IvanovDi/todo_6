import TaskBoard from './components/task-board'


const taskBoard = new TaskBoard('Task Board', {
    template: '#taskBoard_src',
    element: '#taskBoard_dist',
    clearBoard: '.clearBoard',

    taskLists: '#taskLists',
    createForm: '#listCreator',

    taskListTemplate: '#taskListItem_src',
    taskListElement: '#taskListItem_dist',

    taskList: '.taskList',

    taskTemplate: '#task_src'
});
