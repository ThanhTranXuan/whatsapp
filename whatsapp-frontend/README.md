<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# WhatsApp Clone - Giao diện người dùng (Frontend)

Dự án này là một bản sao (clone) giao diện người dùng của ứng dụng WhatsApp Web, được xây dựng bằng React và TypeScript. Mục tiêu của dự án là thực hành và thể hiện các kỹ năng phát triển frontend hiện đại, tạo ra một giao diện người dùng quen thuộc và đầy đủ chức năng.

## ✨ Tính năng chính

*   **Giao diện Chat:** Gửi và nhận tin nhắn trong thời gian thực (hiện tại đang giả lập).
*   **Danh sách hội thoại:** Xem danh sách các cuộc trò chuyện gần đây.
*   **Trạng thái (Status):** Giao diện để xem và đăng trạng thái.
*   **Cộng đồng (Communities):** Giao diện để tạo và quản lý cộng đồng.
*   **Kênh (Channels):** Giao diện khám phá các kênh.
*   **Xác thực người dùng:** Luồng đăng nhập (giả lập).
*   **Thiết kế đáp ứng (Responsive Design):** Giao diện được tối ưu hóa cho màn hình desktop.

## 🚀 Công nghệ sử dụng

*   **Framework:** React.js
*   **Ngôn ngữ:** TypeScript
*   **Styling:** Tailwind CSS
*   **Quản lý trạng thái:** React Context API
*   **HTTP Client:** Fetch API (trong `services/apiClient.ts`)
*   **Real-time:** Giả lập WebSocket (trong `services/mockSocketService.ts`)

## 📂 Cấu trúc dự án

```
/src
|-- components/      # Các thành phần UI có thể tái sử dụng
|-- context/         # Quản lý trạng thái toàn cục (vd: ChatContext)
|-- services/        # Logic gọi API và các dịch vụ (apiClient, chatService)
|-- constants/       # Dữ liệu giả lập (mock data)
|-- types/           # Định nghĩa các kiểu dữ liệu TypeScript
|-- App.tsx          # Component gốc
`-- main.tsx         # Điểm bắt đầu của ứng dụng
```

## ⚙️ Hướng dẫn cài đặt và chạy dự án

### 1. Yêu cầu
*   Node.js (phiên bản 18.x trở lên)
*   `npm` hoặc `yarn`

### 2. Cài đặt
```bash
# Clone repository về máy
git clone <your-repository-url>

# Di chuyển vào thư mục dự án
cd whatsapp-frontend

# Cài đặt các dependencies
npm install
```

### 3. Chạy dự án
Dự án có thể chạy ở hai chế độ: **Chế độ Giả lập (Mock)** và **Chế độ Thật (Real)**.

#### Chế độ Giả lập (Mặc định)
Chế độ này không cần kết nối đến backend. Dữ liệu sẽ được giả lập để bạn có thể trải nghiệm giao diện.

```bash
npm run dev
```

#### Chế độ Thật (Kết nối Backend Spring Boot)
Chế độ này sẽ kết nối đến backend Spring Boot của bạn.

1.  **Cấu hình Backend URL:** Mở file `services/apiClient.ts` và thay đổi `BASE_URL` thành địa chỉ backend của bạn.
    ```typescript
    const BASE_URL = 'http://localhost:8080/api/v1'; // Thay đổi nếu cần
    ```
2.  **Tắt chế độ Mock:**
    *   Trong file `services/apiClient.ts`, comment hoặc xóa khối "Chế độ MOCK".
    *   Trong file `services/chatService.ts`, thay đổi cờ `USE_MOCK` thành `false`.
3.  **Chạy ứng dụng:**
    ```bash
    npm run dev
    ```
