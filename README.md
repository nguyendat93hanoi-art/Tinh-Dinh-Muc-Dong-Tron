# Tính dây đồng tròn — bản mẫu GitHub Pages

## Có gì trong trang này?
- Tính tiết diện đồng của sợi tròn theo đường kính `S = πd²/4`.
- Tính tổng tiết diện của nhiều sợi đồng cùng đường kính.
- Ước tính dòng theo mật độ dòng do người dùng nhập `I = J × S`.
- Tính ngược tiết diện/đường kính sơ bộ từ dòng yêu cầu và J.
- Giao diện tương thích điện thoại, không cần cài thư viện hoặc máy chủ.

## Đưa lên GitHub Pages
1. Giải nén thư mục này.
2. Tạo một repository mới trên GitHub, ví dụ `tinh-day-dong`.
3. Upload `index.html`, `style.css`, `script.js` (có thể upload cả `README.md`) lên thư mục gốc của repository.
4. Mở **Settings → Pages**.
5. Trong phần **Build and deployment**, chọn **Deploy from a branch**, chọn nhánh `main` và thư mục `/(root)`, rồi bấm **Save**.
6. Sau khi GitHub Pages xuất bản, địa chỉ thường có dạng `https://TEN-GITHUB.github.io/tinh-day-dong/`.

## Lưu ý kỹ thuật
Mật độ dòng J không có một giá trị chung an toàn cho mọi loại dây/cách lắp đặt. Kết quả dòng trong trang chỉ là phép tính theo J do người dùng nhập, không thay thế bảng khả năng mang dòng theo tiêu chuẩn phù hợp (chẳng hạn TCVN 7447-5-52 / IEC 60364-5-52 đối với hệ thống đi dây hạ áp). Trước khi dùng để chọn dây thực tế, cần kiểm tra loại cách điện, phương pháp lắp đặt, nhiệt độ, nhóm cáp, sụt áp, bảo vệ quá dòng và điều kiện tải.
