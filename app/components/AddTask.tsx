"use client"
import React, { useState } from "react"
import { FaPlus } from "react-icons/fa";
import { addTask } from "../services/localStorageService";
import { useRouter } from "next/navigation";
// Props interface cho component AddTask
interface AddTaskProps {
    onTaskAdded?: () => void;
}
// Component của Add new task
const AddTask: React.FC<AddTaskProps> = ({ onTaskAdded }) => {
    // State để lưu tiêu đề task
    const [taskTitle, setTaskTitle] = useState("");
    // State để kiểm soát trạng thái đang submit (loading)
    const [isSubmitting, setIsSubmitting] = useState(false);
    // Router để refresh page sau khi thêm task
    const router = useRouter();

    // Hàm xử lý khi submit form
    const handleSubmit = () => {
        // Kiểm tra tiêu đề task không được để trống
        if (!taskTitle.trim()) {
            alert("Please enter a task title");
            return;
        }

        setIsSubmitting(true);

        try {
            // Gọi localStorage service để thêm task mới
            const newTask = addTask(taskTitle.trim());

            if (newTask) {
                // Reset form nếu thành công
                setTaskTitle("");
                onTaskAdded?.(); // Gọi callback để refresh danh sách
                router.refresh(); // Refresh page
            } else {
                alert("Failed to add task. Please try again.");
            }
        } catch (error) {
            console.error("error adding task:", error);
            alert("Error, please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="flex items-center focus-within:border-blue-500 transition-colors duration-200 bg-white rounded-lg shadow-sm p-2">
                {/* Ô nhập văn bản */}
                <input
                    type="text"
                    placeholder="Add new task"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") handleSubmit();
                    }}
                    disabled={isSubmitting}
                    className="flex-1 px-4 py-3 text-gray-800 placeholder-gray-500 bg-transparent outline-none text-base sm:text-lg"
                />

                {/* Nút dấu cộng */}
                <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="ml-3 p-2 text-gray-700 hover:text-gray-900 transition-colors duration-200 disabled:text-gray-400 disabled:cursor-not-allowed"
                    aria-label="Add task"
                >
                    <FaPlus size={20} />
                </button>
            </div>
        </div>
    )
}

export default AddTask;
