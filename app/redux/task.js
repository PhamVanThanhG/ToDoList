import { createSlice } from '@reduxjs/toolkit'

class ToDoTask {
    constructor(id, dueDate, name, description, priority, done) {
        this.id = id;
        this.dueDate = dueDate;
        this.name = name;
        this.description = description;
        this.priority = priority;
        this.done = done;
    }
}
let task1 = new ToDoTask(1, new Date("06/25/2022"), "Clean my room", "No description", 3, false);
let task2 = new ToDoTask(2, new Date("06/25/2022"), "Finish todolist app", "No description", 1, true);
let task3 = new ToDoTask(3, new Date("06/29/2022"), "Clean my room", "No description", 3, false);
const toDoList = [
    task1, task2, task3
];
// const values = [
//     {
//         date: new Date("06/24/2022"),
//         tasks: [
//             {
//                 id: 1,
//                 priority: 3,
//                 task: "Clean my room",
//                 description: "It's difficulty",
//                 done: false
//             },
//             {
//                 id: 2,
//                 priority: 1,
//                 task: "Take a shower",
//                 description: "No des",
//                 done: true
//             }
//         ]
//     },
//     {
//         date: new Date("07/25/2022"),
//         tasks: [
//             {
//                 id: 1,
//                 priority: 1,
//                 task: "To do list app",
//                 description: "No des",
//                 done: false
//             }
//         ]
//     }
// ];

export const taskSlice = createSlice({
    name: 'task',
    initialState: {
        value: toDoList
    },
    reducers: {
        setDone: (state, action) => {
            //const d = new Date("06/24/2022");
            // for (let index = 0; index < state.value.length; index++) {
            //     const element = state.value[index];
            //     const date = new Date(element.date);
            //     if (date.getFullYear() === d.getFullYear() && date.getMonth() === d.getMonth() && date.getDate() === d.getDate()) {
            //         element.tasks[0].done = !element.tasks[0].done;
            //     }
            // }
            for (let index = 0; index < state.value.length; index++) {
                const element = state.value[index];
                if (element.id == action.payload) {
                    var done = element.done;
                    element.done = !done;
                    break;
                }
            }
        },
        sortByPriority: (state, action) => {
            state.value.sort(function (a, b) { return a.priority - b.priority })
        },
        addNewTask: (state, action) => {
            state.value.push(action.payload);
            state.value.sort(function (a, b) { return a.priority - b.priority })
        },
        deleteTask: (state, action) => {
            for (let index = 0; index < state.value.length; index++) {
                const element = state.value[index];
                if (element.id == action.payload) {
                    state.value.splice(index, 1);
                    break;
                }
            }
            //state.value.pop();
            //state.value.splice(0,state.value.length);
        },
        editTask: (state, action) =>{
            item = action.payload;
            for (let index = 0; index < state.value.length; index++) {
                const element = state.value[index];
                if (element.id == item.id) {
                    element.name = item.name;
                    element.description = item.description;
                    element.priority = item.priority;
                    element.dueDate = item.dueDate;
                    break;
                }
            }
        }
        // increment: state => {
        //   // Redux Toolkit allows us to write "mutating" logic in reducers. It
        //   // doesn't actually mutate the state because it uses the Immer library,
        //   // which detects changes to a "draft state" and produces a brand new
        //   // immutable state based off those changes
        //   state.value += 1
        // },
        // decrement: state => {
        //   state.value -= 1
        // },
        // incrementByAmount: (state, action) => {
        //   state.value += action.payload
        // }
    }
})

// Action creators are generated for each case reducer function
export const { setDone, sortByPriority, addNewTask, deleteTask, editTask } = taskSlice.actions
export const selectTask = state => state.task.value;

export default taskSlice.reducer