import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists',
    withCredentials: true,
    headers: {'API-KEY': 'de8c7563-dd18-4912-9001-90e13a939eac'}
})

export const api = {
    loadTasks(todolistId) {
        return instance.get(`/${todolistId}/tasks`,)
    },
    addTask(newText, todolistId) {
        return instance.post(`/${todolistId}/tasks`,
            {title: newText},
        )
    },
    changeTask(task, obj, todolistid) {
        return instance.put(`/${todolistid}/tasks/${task.id}`,
            {
                ...task,
                ...obj
            })
    },
    deltask(todolistId, taskId) {
        return instance.delete(`/${todolistId}/tasks/${taskId}`)
    },
    delTodolist(todolistId) {
        return instance.delete("/" + todolistId)
    },
    addTodolist(item) {
        return instance.post("",
            {title: item})
    },
    loadTodolists() {
        return instance.get("")
    },

}