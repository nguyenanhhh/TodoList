"use client";

import React, { useState, useEffect } from "react";
import { getTasks, updateTask, deleteTask } from "../services/localStorageService";
import { Task } from "../../type/task";
import { MdDeleteForever } from "react-icons/md";

// props interface cho component ListToDo
interface ListToDoProps {
    refreshTrigger?: number; // pprop để trigger refresh list task
}

// component hiển task list
const ListToDo: React.FC<ListToDoProps> = ({ refreshTrigger }) => {
    // state để lưu danh sách tasks
    const [tasks, setTasks] = useState<Task[]>([]);

    // state trạng thái loading
    const [loading, setLoading] = useState<boolean>(true);

    // state lưu ID của task edit
    const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

    // state lưu nội dung đang edit
    const [editedTitle, setEditedTitle] = useState<string>("");

    // hàm lấy task list từ localStorage
    const fetchTasks = () => {
        setLoading(true);
        try {
            const tasksData = getTasks();
            setTasks(tasksData);
        } catch (error) {
            console.error("error:", error);
        } finally {
            setLoading(false);
        }
    };

    // Effect để fetch tasks khi component mount hoặc refreshTrigger thay đổi
    useEffect(() => {
        fetchTasks();
    }, [refreshTrigger]);

    // hàm toggle status của task
    const handleToggleComplete = (task: Task) => {
        try {
            const updatedTask = updateTask(task.id, {
                completed: !task.completed,
            });

            if (updatedTask) {
                // updated state local
                setTasks((prevTasks) =>
                    prevTasks.map((t) => (t.id === task.id ? updatedTask : t))
                );
            }
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    // hàm để xóa task
    const handleDeleteTask = (taskId: string) => {
        if (!confirm("Are you sure you want to delete this task?")) return;

        try {
            const success = deleteTask(taskId);

            if (success) {
                // Xóa task khỏi state local
                setTasks((prevTasks) => prevTasks.filter((t) => t.id !== taskId));
            }
        } catch (error) {
            console.error("Error when delete task:", error);
        }
    };

    // hàm edit task
    const handleStartEdit = (task: Task) => {
        setEditingTaskId(task.id);
        setEditedTitle(task.title);
    };

    // hàm lưu thay đổi
    const handleSaveEdit = (taskId: string) => {
        // Kiểm tra tiêu đề không được để trống
        if (!editedTitle.trim()) {
            alert("Task title cannot be empty");
            return;
        }

        try {
            const updatedTask = updateTask(taskId, {
                title: editedTitle.trim()
            });

            if (updatedTask) {
                // Cập nhật state local
                setTasks((prevTasks) =>
                    prevTasks.map((t) => (t.id === taskId ? updatedTask : t))
                );
                // Reset edit state
                setEditingTaskId(null);
                setEditedTitle("");
            }
        } catch (error) {
            console.error("error updating task:", error);
        }
    };

    // hàm hủy edit
    const handleCancelEdit = () => {
        setEditingTaskId(null);
        setEditedTitle("");
    };

    // hàm tự động lưu
    const handleBlur = (taskId: string) => {
        if (editedTitle.trim() && editedTitle.trim() !== tasks.find(t => t.id === taskId)?.title) {
            handleSaveEdit(taskId);
        } else {
            handleCancelEdit();
        }
    };

    // đếm task in process
    const inProgressTasksCount = tasks.filter(task => !task.completed).length;

    // hiện
    if (loading) {
        return (
            <div className="max-w-4xl mx-auto px-4">
                <div className="bg-white rounded-lg shadow-sm border">
                    <div className="border-b px-6 py-4">
                        <h2 className="text-lg font-semibold text-gray-800">List Tasks</h2>
                    </div>
                    <div className="px-3 sm:px-6 py-8 sm:py-12 text-center">
                        <div className="animate-spin rounded-full h-6 sm:h-8 w-6 sm:w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                        <p className="text-sm sm:text-base text-gray-500">Loading...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-2 sm:px-4">
            <div className="bg-white rounded-lg shadow-sm border">
                {/* Header của danh sách */}
                <div className="border-b px-3 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
                    <h2 className="text-base sm:text-lg font-semibold text-gray-800">List Tasks</h2>
                    <span className="text-xs sm:text-sm text-gray-600 bg-blue-100 px-2 sm:px-3 py-1 rounded-full">
                        In Progress: {inProgressTasksCount} tasks
                    </span>
                </div>

                {/* tasks list */}
                {tasks.length > 0 ? (
                    <div className="divide-y">
                        {tasks.map((task) => (
                            <div
                                key={task.id}
                                className="flex items-center px-3 sm:px-6 py-3 sm:py-4 hover:bg-gray-50 transition-colors"
                            >
                                {/* checkbox để toggle status hoàn thành */}
                                <input
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => handleToggleComplete(task)}
                                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 mr-4 cursor-pointer"
                                />

                                {/* nội dung task  */}
                                <div className="flex-1 min-w-0">
                                    {editingTaskId === task.id ? (
                                        // mode edit
                                        <input
                                            type="text"
                                            value={editedTitle}
                                            onChange={(e) => setEditedTitle(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    handleSaveEdit(task.id);
                                                } else if (e.key === "Escape") {
                                                    handleCancelEdit();
                                                }
                                            }}
                                            onBlur={() => handleBlur(task.id)}
                                            className="w-full px-2 sm:px-3 py-2 border rounded-lg focus:border-blue-500 focus:outline-none bg-white text-gray-800 text-sm sm:text-base font-medium"
                                            autoFocus
                                        />
                                    ) : (
                                        // mode bình thường
                                        <div
                                            className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded transition-colors"
                                            onClick={() => handleStartEdit(task)}
                                        >
                                            <p
                                                className={`font-medium text-sm sm:text-base truncate ${
                                                    task.completed
                                                        ? "text-gray-500 line-through"
                                                        : "text-gray-800"
                                                }`}
                                            >
                                                {task.title}
                                            </p>
                                            <p className="text-xs sm:text-sm text-gray-500">
                                                {task.completed ? "Completed" : "In progress"}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* nút action */}
                                <div className="flex gap-1 sm:gap-2 flex-shrink-0">
                                    <button
                                        onClick={() => handleDeleteTask(task.id)}
                                        className="p-1.5 sm:p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                        <MdDeleteForever size={18} className="sm:w-5 sm:h-5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    // hiện khi không có task
                    <div className="flex flex-col items-center justify-center px-3 sm:px-6 py-8 sm:py-12 text-gray-500">
                        <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">📝</div>
                        <p className="text-base sm:text-lg mb-2">No tasks yet!</p>
                        <p className="text-xs sm:text-sm">Add the first task ^^.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ListToDo;
