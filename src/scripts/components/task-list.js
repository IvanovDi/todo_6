import $ from 'jquery';
import Handlebars from 'handlebars';
import createID from '../lib/createid';

import Task from './task';


class TaskList {
    constructor(title, ui) {
        this.id = createID();
        this.title = title || 'Task List';
        this.tasks = [{title: 'task'}, {title:'task1'}, {title:'task2'}];
        this.ui = ui;

        this.init();
    }

    init() {
        this.element = Handlebars.compile($(this.ui.template).html());
    }
    bindEvents() {
        const self = this;
        //ищет все элементы в шаблоне с классом createForm и вешает на них событие
        $(this.element).find(this.ui.createForm).submit(function (e) {
            e.preventDefault();

            const title = $(this.elements.input).val();

            self.addTask(new Task(title, {
                template: self.ui.taskTemplate,
                taskList: self.ui.taskList
            }));

            $(this.elements.input).val('');
        });
    }
    renderTasks() {
        this.tasks.forEach(task => {
            let taskItem = new Task(task.title, {
                template: this.ui.taskTemplate
            });

            taskItem.element = $(taskItem.element({task: taskItem}));
            $(`[data-list-id=${this.id}]`).find(this.ui.taskList).append(taskItem.element);
        });
    }

    addTask(task) {
        this.tasks.push(task);

        task.element = $(task.element({task}));
        $(`[data-list-id=${this.id}]`).find(this.ui.taskList).append(task.element);
    }
}


export default TaskList;