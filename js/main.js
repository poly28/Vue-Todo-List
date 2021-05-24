//=======================
// メイン処理
//=======================
// todo(必須機能)
// ■ ステータス(未着手、進行中、完了 など)

// todo(欲しい機能)
// ■ TODOのタイトル・期限・ステータス変更

// todo(カスタマイズ)
// □ ソート(ID、期限、ステータスで並べ替え)
// □ フィルター(ID、期限、ステータスで絞り込み)
// ■ コメント機能？→タスクの詳細を記載可能にした
// □ TODOリストを1箇所(どのパーツでもOK)コンポーネント化してみる

// todo(実装したいこと)
// □ 完了状態にしたらタスクの一番下に移動する
// □ ステータス変更でスタイル変更
// □ 要素追加（内容、作成日、更新日など）
// □ TODOの編集機能

const VueCtkDateTimePicker = window['vue-ctk-date-time-picker'];
Vue.component('vue-ctk-date-time-picker', VueCtkDateTimePicker);

new Vue({
	el: '#app',
	data: {
		// タスクリストの格納配列
		todos: [],

		// タスク追加用データ
		newTask: '',
		newComment: '-',
		newLimit: '',
		isEdit: false,

		// テーブルの見出しレンダリング用
		tableSet: {
			head: [
				{ title: 'ID', class: 'th-id' },
				{ title: 'Task', class: 'th-task' },
				{ title: 'Detail', class: 'th-detail' },
				{ title: 'Limit', class: 'th-limit' },
				{ title: 'Status', class: 'th-status' },
				{ title: 'Delete', class: 'th-delete' },
				{ title: 'Edit', class: 'th-edit' },
			],
		},
	},
	methods: {
		addTask: function () {
			// 入力フォームのバリデーション
			// タスク名の未入力検知
			if (this.newTask === '') {
				alert('タスク名が入力されていません。');
				return;
			}

			// todo
			// 入力フォームのバリデーション
			// 期限として過去の日付を設定できないようにする

			// タスク追加オブジェクト
			let newTask = {
				id: this.todos.length + 1,
				task: this.newTask,
				comment: this.newComment,
				limit: this.newLimit,
				status: 'Waiting',
				isDone: false,
			};
			this.todos.push(newTask);
			this.newTask = '';
			this.newComment = '-';
			this.newLimit = '';
		},
		rmTask: function (index) {
			this.todos.splice(index, 1);
		},

		allDelete: function () {
			if (confirm('All delete OK?')) {
				this.todos = [];
			}
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

//=======================
// 不採用機能
//=======================
// allSelect: function () {
// 	for (let i = 0; i < this.todos.length; i++) {
// 		this.todos[i].isDone = true;
// 	}
// },
// allClear: function () {
// 	for (let i = 0; i < this.todos.length; i++) {
// 		this.todos[i].isDone = false;
// 	}
// },
// selectedDelete: function () {
// 	let noFinish = [];
// 	for (let i = 0; i < this.todos.length; i++) {
// 		if (!this.todos[i].isDone) {
// 			noFinish.push(this.todos[i]);
// 		}
// 	}
// 	this.todos = noFinish;
// },
