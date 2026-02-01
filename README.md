# KeyboardStore - E-commerce Platform

Dự án website thương mại điện tử bán bàn phím cơ, được xây dựng với kiến trúc **full-stack** sử dụng **ASP.NET Core 8** cho backend và **React + Vite** cho frontend.

## Mục lục

- [Tổng quan](#tổng-quan)
- [Công nghệ sử dụng](#công-nghệ-sử-dụng)
- [Tính năng](#tính-năng)
- [Cấu trúc dự án](#cấu-trúc-dự-án)
- [Cài đặt và Chạy](#cài-đặt-và-chạy)
- [API Documentation](#api-documentation)
- [Tác giả](#tác-giả)

## Tổng quan

**KeyboardStore** là một nền tảng thương mại điện tử chuyên bán bàn phím cơ và phụ kiện liên quan. Hệ thống cung cấp đầy đủ các chức năng từ quản lý sản phẩm, giỏ hàng, đặt hàng đến thanh toán trực tuyến.

## Công nghệ sử dụng

### Backend
| Công nghệ | Phiên bản | Mô tả |
|-----------|-----------|-------|
| .NET | 8.0 | Framework chính |
| ASP.NET Core Web API | 8.0 | RESTful API |
| Entity Framework Core | 9.0 | ORM |
| SQL Server | - | Cơ sở dữ liệu |
| ASP.NET Identity | 8.0 | Xác thực & Phân quyền |
| JWT Bearer | 8.0 | Token-based Authentication |
| AutoMapper | 12.0 | Object Mapping |
| Swagger/OpenAPI | 8.1 | API Documentation |
| Firebase Admin | 3.2 | Cloud Storage |
| VNPay | - | Cổng thanh toán |
| MailKit | 4.12 | Gửi email |
| Twilio/Vonage | - | Gửi SMS OTP |

### Frontend
| Công nghệ | Phiên bản | Mô tả |
|-----------|-----------|-------|
| React | 19.0 | UI Library |
| Vite | 6.2 | Build Tool |
| TypeScript | 5.8 | Type Safety |
| Redux Toolkit | 2.8 | State Management |
| React Router | 7.5 | Routing |
| Tailwind CSS | 4.1 | Styling |
| Axios | 1.8 | HTTP Client |
| React Hook Form | 7.55 | Form Handling |
| Framer Motion | 12.9 | Animations |
| Chart.js | 4.5 | Data Visualization |

## Tính năng

### Người dùng
- Đăng ký / Đăng nhập (JWT Authentication)
- Xác thực OTP qua Email/SMS
- Quản lý thông tin cá nhân
- Đổi mật khẩu
- Quên mật khẩu

### Mua sắm
- Xem danh sách sản phẩm
- Lọc sản phẩm theo danh mục
- Xem chi tiết sản phẩm
- Thêm/Xóa/Cập nhật giỏ hàng
- Đặt hàng

### Thanh toán
- Tích hợp VNPay
- Quản lý đơn hàng
- Lịch sử mua hàng

### Quản trị (Admin)
- Quản lý sản phẩm (CRUD)
- Quản lý danh mục
- Quản lý đơn hàng
- Upload hình ảnh (Firebase Storage)

## Cấu trúc dự án

```
Ecommerce/
├── backend/
│   └── KeyBoard/
│       ├── Controllers/          # API Controllers
│       ├── Data/                 # DbContext & Entities
│       ├── DTOs/                 # Data Transfer Objects
│       ├── Helpers/              # Utilities & Mappers
│       ├── Migrations/           # EF Core Migrations
│       ├── Repositories/         # Repository Pattern
│       ├── Services/             # Business Logic
│       ├── Program.cs            # Entry Point
│       └── appsettings.json      # Configuration
│
└── frontend/
    ├── public/                   # Static Assets
    └── src/
        ├── api/                  # API Services
        ├── assets/               # Images, Icons
        ├── components/           # Reusable Components
        ├── contexts/             # React Contexts
        ├── hooks/                # Custom Hooks
        ├── pages/                # Page Components
        ├── redux/                # Redux Store & Slices
        ├── App.jsx               # Root Component
        └── main.jsx              # Entry Point
```

## Cài đặt và Chạy

### Yêu cầu hệ thống
- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js](https://nodejs.org/) (v18+)
- [SQL Server](https://www.microsoft.com/sql-server) hoặc SQL Server Express
- [Git](https://git-scm.com/)

### Backend

1. **Clone repository**
   ```bash
   git clone https://github.com/minhthinh145/keyboards-Ecommerce.git
   cd keyboards-Ecommerce/backend/KeyBoard
   ```

2. **Cấu hình database**
   
   Cập nhật connection string trong `appsettings.json`:
   ```json
   {
     "ConnectionStrings": {
       "DefaultConnection": "Server=localhost;Database=KeyboardStore;Trusted_Connection=True;TrustServerCertificate=True;"
     }
   }
   ```

3. **Chạy migrations**
   ```bash
   dotnet ef database update
   ```

4. **Khởi động server**
   ```bash
   dotnet run
   ```
   
   Server sẽ chạy tại: `https://localhost:5066`

### Frontend

1. **Di chuyển đến thư mục frontend**
   ```bash
   cd frontend
   ```

2. **Cài đặt dependencies**
   ```bash
   npm install
   ```

3. **Chạy development server**
   ```bash
   npm run dev
   ```
   
   App sẽ chạy tại: `http://localhost:5173`

### Build Production

```bash
# Backend
cd backend/KeyBoard
dotnet publish -c Release

# Frontend
cd frontend
npm run build
```

## API Documentation

Sau khi khởi động backend, truy cập Swagger UI tại:

```
https://localhost:5066/swagger
```

### Các API chính

| Endpoint | Mô tả |
|----------|-------|
| `POST /api/Auth/Login` | Đăng nhập |
| `POST /api/Auth/Register` | Đăng ký |
| `GET /api/Product` | Lấy danh sách sản phẩm |
| `GET /api/Categorys` | Lấy danh mục |
| `POST /api/Cart` | Thêm vào giỏ hàng |
| `GET /api/Orders` | Lấy danh sách đơn hàng |
| `POST /api/VNPay/create-payment` | Tạo thanh toán VNPay |

## Biến môi trường

Tạo file `.env` hoặc cấu hình trong `appsettings.json`:

| Biến | Mô tả |
|------|-------|
| `JWT:Secret` | Secret key cho JWT |
| `JWT:ValidIssuer` | JWT Issuer |
| `JWT:ValidAudience` | JWT Audience |
| `VNPay:TmnCode` | Mã merchant VNPay |
| `VNPay:HashSecret` | Secret key VNPay |
| `Firebase:ProjectId` | Firebase Project ID |
| `EmailSettings:*` | Cấu hình SMTP |

## Tác giả

- **Minh Thịnh** - [GitHub](https://github.com/minhthinh145)

## License

Dự án này được phát triển cho mục đích học tập và nghiên cứu.
