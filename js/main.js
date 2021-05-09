const VueCtkDateTimePicker = window['vue-ctk-date-time-picker'];
Vue.component('vue-ctk-date-time-picker', VueCtkDateTimePicker);

// todo(必須機能)
// ・ステータス(未着手、進行中、完了 など)

// todo(欲しい機能)
// ・TODOのタイトル・期限・ステータス変更

// todo(カスタマイズ)
// ・ソート(ID、期限、ステータスで並べ替え)
// ・フィルター(ID、期限、ステータスで絞り込み)
// ・コメント機能
// ・TODOリストを1箇所(どのパーツでもOK)コンポーネント化してみる

// todo(実装したいこと)
// ・完了状態にしたらタスクの一番下に移動する
// ・ステータス変更でスタイル変更
// ・要素追加（内容、作成日、更新日など）
// ・TODOの編集機能

new Vue({
	el: '#app',
	data: {
		newTitle: '',
		newLimit: '',
		newComment: '',
		todos: [],
	},
	methods: {
		addTask: function () {
			// 入力フォームのバリデーション
			// タスク名、期限の未入力検知
			if (this.newTitle === '' || this.newLimit === '') {
				alert('タスク名または期限が入力されていません。');
				return;
			}
			// todo
			// 入力フォームのバリデーション
			// 期限として過去の日付を設定できないようにする

			let newTask = {
				id: this.todos.length + 1,
				title: this.newTitle,
				limit: this.newLimit,
				comment: this.newComment,
				isDone: false,
			};

			this.todos.push(newTask);
			this.newTitle = '';
			this.newComment = '';
			this.newLimit = '';
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
					noFinish.push(this.todos[i]);
				}
			}
			console.log(noFinish);
			this.todos = noFinish;
		},
	},
	watch: {
		todos: function () {
			for (let i = 0; i < this.todos.length; i++) {
				this.todos[i].id = i + 1;
			}
		},
	},
});
