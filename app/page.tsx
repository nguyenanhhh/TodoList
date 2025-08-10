"use client"

import { useState } from "react";
import AddTask from "./components/AddTask";
import ListToDo from "./components/ListToDo";

export default function Home() {
    // state để trigger refresh task
    const [refreshTrigger, setRefreshTrigger] = useState<number>(0);

    // hàm callback khi task mới được add
    const handleTaskAdded = () => {
        // tăng counter để trigger refresh list task
        setRefreshTrigger(prev => prev + 1);
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* Header section */}
            <div className="flex flex-col items-center justify-center my-4 sm:my-8 gap-4 sm:gap-6 px-4">
                {/* title */}
                <h1 className="text-2xl sm:text-4xl text-blue-900 font-bold rounded-lg px-4 sm:px-8 py-3 sm:py-4 hover:bg-blue-900 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl text-center">
                    TO DO LIST
                </h1>

                {/* Component thêm task  */}
                <AddTask onTaskAdded={handleTaskAdded} />
            </div>

            {/* Component hiển thị task */}
            <ListToDo refreshTrigger={refreshTrigger} />
        </main>
    );
}
