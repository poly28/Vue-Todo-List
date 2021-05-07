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
			let todos = this.todos;
			for (let i = 0; i < todos.length; i++) {
				todos[i].isDone = true;
			}
		},
		selectedClear: function () {
			let todos = this.todos;
			for (let i = 0; i < todos.length; i++) {
				todos[i].isDone = false;
			}
		},
		SelectedDelete: function () {
			let todos = this.todos;
		},
	},
});
