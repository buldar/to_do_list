import axios from 'axios';

export const api = {

    loadTasks(todolistId) {
        return axios.get(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks`,
            {
                withCredentials: true,
                headers: {'API-KEY': 'de8c7563-dd18-4912-9001-90e13a939eac'}
            })
    },
    addTask(newText, todolistId) {
        return axios.post(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks`,
            {title: newText},
            {
                withCredentials: true,
                headers: {'API-KEY': 'de8c7563-dd18-4912-9001-90e13a939eac'}
            })
    },
    changeTask(task, obj, todolistid) {
        return axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistid}/tasks/${task.id}`,
            {
                ...task,
                ...obj
            },
            {
                withCredentials: true,
                headers: {'API-KEY': 'de8c7563-dd18-4912-9001-90e13a939eac'}
            })
    },
    deltask(todolistId, taskId) {
        return axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks/${taskId}`,
            {
                withCredentials: true,
                headers: {'API-KEY': 'de8c7563-dd18-4912-9001-90e13a939eac'}
            })
    },
    delTodolist(todolistId) {
        return axios.delete("https://social-network.samuraijs.com/api/1.0/todo-lists/" + todolistId,
            {
                withCredentials: true,
                headers: {'API-KEY': 'de8c7563-dd18-4912-9001-90e13a939eac'}
            })
    },
    addTodolist(item) {
        return axios.post("https://social-network.samuraijs.com/api/1.0/todo-lists",
            {title: item},
            {
                withCredentials: true,
                headers: {'API-KEY': 'de8c7563-dd18-4912-9001-90e13a939eac'}
            })
    },
    loadTodolists() {
        return axios.get("https://social-network.samuraijs.com/api/1.0/todo-lists",
            {withCredentials: true})
    },

}