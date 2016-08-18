import $ from 'jquery';
import Handlebars from 'handlebars';
import createID from '../lib/createid';

import TaskList from './task-list'


class TaskBoard {
    constructor(title, ui) {
        this.id = createID();
        this.ui = ui;
        this.title = title || 'Task Board';
        this.lists = JSON.parse(localStorage.getItem('lists')) || [];

        this.init();
    }
    init() {
        const self = this;

        const template = Handlebars.compile($(this.ui.template).html());
        $(this.ui.element).html(template({board: this}));

        this.renderTaskLists();

        $(this.ui.clearBoard).click(() => this.clean());

        $(this.ui.createForm).submit(function (e) {
            e.preventDefault();

            const title = $(this.elements.input).val();

            const taskList = new TaskList(title, {
                template: self.ui.taskListTemplate,
                element: self.ui.taskListElement,
                taskTemplate: self.ui.taskTemplate,
                taskList: self.ui.taskList,
                createForm: '.taskCreator'
            });

            self.addList(taskList);

            $(this.elements.input).val('');
        });
    }

    renderTaskLists() {
        this.lists.forEach(list => {
            let taskList = new TaskList(list.title, {
                template: this.ui.taskListTemplate,
                taskTemplate: this.ui.taskTemplate,
                taskList: this.ui.taskList,
                createForm: '.taskCreator'
            });
            taskList.tasks = list.tasks;
            taskList.id = list.id;
            taskList.element = $(taskList.element({list: taskList}));

            $(this.ui.taskLists).append(taskList.element);

            taskList.bindEvents();
            taskList.renderTasks();
        });
    }

    addList(list) {
        this.lists.push(list);
        localStorage.setItem('lists', JSON.stringify(this.lists));

        list.element = $(list.element({list}));
        $(this.ui.taskLists).append(list.element);

        list.bindEvents();
    }

    clean() {
        localStorage.clear();
        location.reload();
    }

}


export default TaskBoard;