new Vue({
	el: '#app',
	data: {
		newTask: '',
		todos: [],
	},
	methods: {
		addTask: function () {
			let newTask = {
				title: this.newTask,
				isDone: false,
			};
			this.todos.push(newTask);
			this.newTask = '';
		},
		rmTask: function (index) {
			this.todos.splice(index, 1);
		},
		allSelect: function () {
			for (let i = 0; i < this.todos.length; i++) {
				this.todos[i].isDone = true;
			}
		},
		allClear: function () {
			for (let i = 0; i < this.todos.length; i++) {
				this.todos[i].isDone = false;
			}
		},
		allDelete: function () {
			if (confirm('All delete OK?')) {
				this.todos = [];
			}
		},
		selectedDelete: function () {
			let noFinish = [];
			for (let i = 0; i < this.todos.length; i++) {
				if (!this.todos[i].isDone) {
					noFinish.push(todos[i]);
				}
			}
			this.todos = noFinish;
		},
	},
});
