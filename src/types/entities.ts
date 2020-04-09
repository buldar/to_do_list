export type TodolistType = {
    id: string;
    addedDate: string;
    order: number;
    title: string;
}

export type TaskType = {
    description: string;
    title: string;
    completed: boolean;
    status: number;
    priority: number;
    startDate: string;
    deadline: string;
    id: string;
    todoListId: string;
    order: number;
    addedDate: string;
}