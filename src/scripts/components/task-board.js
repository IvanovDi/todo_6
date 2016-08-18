import $ from 'jquery';
import Handlebars from 'handlebars';
import createID from '../lib/createid';

import TaskList from './task-list'


class TaskBoard {
    constructor(title, ui) {
        this.id = createID();
        this.ui = ui;
        this.title = title || 'Task Board';
        this.lists = [{title: 'name'}, {title: 'name1'}, {title: 'name2'}];

        this.init();
    }
    init() {
        const self = this;

        const template = Handlebars.compile($(this.ui.template).html());
        $(this.ui.element).html(template({board: this}));

        this.renderTaskLists();


            $(this.ui.createForm).submit(function (e) {
                e.preventDefault();
            const title = $(this.elements.input).val();
            self.addList(new TaskList(title, {
                template: self.ui.taskListTemplate,
                element: self.ui.taskListElement,
                taskTemplate: self.ui.taskTemplate,
                taskList: self.ui.taskList,
                createForm: '.taskCreator'
            }));
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

            taskList.element = $(taskList.element({list: taskList}));
            $(this.ui.taskLists).append(taskList.element);

            taskList.bindEvents();
            taskList.renderTasks();
        });
    }

    addList(list) {
        this.lists.push(list);

        list.element = $(list.element({list}));
        $(this.ui.taskLists).append(list.element);

        list.bindEvents();
    }

}


export default TaskBoard;