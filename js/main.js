//=======================
// Todo
//=======================
// todo(必須機能)
// ■ ステータス(未着手、進行中、完了 など)

// todo(欲しい機能)
// ■ TODOのタイトル・期限・ステータス変更

// todo(カスタマイズ)
//! □ ソート(ID、期限、ステータスで並べ替え)
// ■ フィルター(ID、期限、ステータスで絞り込み)
// ■ コメント機能？→タスクの詳細を記載可能にした
// □ TODOリストを1箇所(どのパーツでもOK)コンポーネント化してみる

// todo(実装したいこと)
// □ 完了状態にしたらタスクの一番下に移動する
// □ ステータス変更でスタイル変更
// □ 要素追加（内容、作成日、更新日など）
// ■ TODOの編集機能
// □入力フォームのバリデーション
// 　期限として過去の日付を設定できないようにする

//=======================
// メイン処理
//=======================
// 時間設定用のコンポーネント
const VueCtkDateTimePicker = window['vue-ctk-date-time-picker'];
Vue.component('vue-ctk-date-time-picker', VueCtkDateTimePicker);

new Vue({
	el: '#app',
	data: {
		// タスクリストの格納配列
		todos: [],

		//ステータスによる絞り込み用配列
		checkedStatus: {
			Waiting: false,
			Doing: false,
			Complete: false,
		},

		// タスク追加用データ
		newTask: '',
		newDetail: '-',
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
		// タスク追加処理
		addTask() {
			// 入力フォームのバリデーション
			// タスク名の未入力検知
			if (this.newTask === '') {
				alert('タスク名が入力されていません。');
				return;
			}

			// タスク追加オブジェクト
			let newTask = {
				id: this.todos.length + 1,
				task: this.newTask,
				comment: this.newDetail,
				limit: this.newLimit,
				status: 'Waiting',
			};
			// タスクの追加処理
			this.todos.push(newTask);

			// タスク追加用変数の初期化
			this.newTask = '';
			this.newDetail = '-';
			this.newLimit = '';
		},

		// タスク個別削除機能：タスク横の×を押して該当タスクを削除します
		rmTask(index) {
			this.todos.splice(index, 1);
		},

		// 全削除機能：All Deleteボタンを押してタスクを全削除します
		allDelete() {
			if (confirm('All delete OK?')) {
				this.todos = [];
			}
		},
	},
	computed: {
		//----------------------------------
		// タスクリストレンダリング用フィルター
		//----------------------------------
		filteredList() {
			// フィルタリング実施後のリスト
			let newList = [];

			//------------------------------
			// Filter全解除
			if (
				!this.checkedStatus.Waiting &&
				!this.checkedStatus.Doing &&
				!this.checkedStatus.Complete
			) {
				// フィルタリング無しでタスクリストをリターン
				return this.todos;
			}
			//------------------------------
			// Filter全選択
			if (
				this.checkedStatus.Waiting &&
				this.checkedStatus.Doing &&
				this.checkedStatus.Complete
			) {
				// フィルタリング無しでタスクリストをリターン
				return this.todos;
			}
			//------------------------------

			// タスクリストフィルタリング処理
			for (i = 0; i < this.todos.length; i++) {
				let isShow = true;

				// ステータス：Waiting
				if (this.checkedStatus.Waiting) {
					// ステータスがWaitingのタスクをnewListに登録
					if (this.todos[i].status === 'Waiting') {
						newList.push(this.todos[i]);
					}
				}
				// ステータス：Doing
				if (this.checkedStatus.Doing) {
					// ステータスがDoingのタスクをnewListに登録
					if (this.todos[i].status === 'Doing') {
						newList.push(this.todos[i]);
					}
				}
				// ステータス：Complete
				if (this.checkedStatus.Complete) {
					// ステータスがCompleteのタスクをnewListに登録
					if (this.todos[i].status === 'Complete') {
						newList.push(this.todos[i]);
					}
				}
			}

			// フィルタリングしたリストを返却する
			return newList;
		},
	},
	watch: {
		// タスク削除時のIDの整合性を保つ
		todos() {
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
