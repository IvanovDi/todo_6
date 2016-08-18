import $ from 'jquery';
import Handlebars from 'handlebars';
import createID from '../lib/createid';

import Task from './task';


class TaskList {
    constructor(title, ui) {
        this.id = createID();
        this.title = title || 'Task List';
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
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
        const taskItem = {
            id: task.id,
            title: task.title,
            isDone: task.isDone
        };
        this.tasks.push(taskItem);
        const lists = JSON.parse(localStorage.getItem('lists'));

        lists.forEach(list => {
            console.log(list);
            if (list.id == this.id) {
                console.log('^');
                list.tasks.push(task);
            }
        });

        localStorage.setItem('lists', JSON.stringify(lists));

        task.element = $(task.element({task}));
        $(`[data-list-id=${this.id}]`).find(this.ui.taskList).append(task.element);
    }
}


export default TaskList;