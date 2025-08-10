// Interface định nghĩa cấu trúc của một Task (công việc)
export interface Task {
    id: string;           // ID duy nhất của task
    title: string;        // Tiêu đề/tên của task
    completed: boolean;   // Trạng thái hoàn thành (true = đã xong, false = chưa xong)
    createdAt?: string;   // Thời gian tạo task (tùy chọn)
}

// Interface để tạo task mới (không cần ID vì sẽ được tạo tự động)
export interface CreateTaskRequest {
    title: string;
    completed?: boolean;  // Mặc định là false khi tạo mới
}

// Interface để cập nhật task (tất cả đều tùy chọn)
export interface UpdateTaskRequest {
    title?: string;
    completed?: boolean;
}
