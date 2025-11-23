const canvas = document.getElementById('trailCanvas');
const ctx = canvas.getContext('2d');

// Thiết lập kích thước canvas
let W = window.innerWidth;
let H = window.innerHeight;
canvas.width = W;
canvas.height = H;

// 1. CÁC BIẾN CẦN THIẾT
let circleRadius = 10; // Bán kính hình tròn
let circleX = W / 2; // Vị trí X ban đầu (ở giữa)
let circleY = H / 2; // Vị trí Y ban đầu (ở giữa)

// Tốc độ di chuyển
let speedX = 4; 
let speedY = 3; 

let currentColor = 'rgba(0, 255, 255, 1)'; // Màu Xanh Lơ (Cyan)

// 2. HÀM VẼ VÀ CẬP NHẬT CHÍNH
function updateAndDraw() {
    
    // **THỦ THUẬT TẠO VỆT SÁNG KÉO DÀI (TRAIL EFFECT)**
    // Thay vì dùng clearRect(), ta vẽ một hình chữ nhật màu đen HƠI TRONG SUỐT.
    // Màu đen (0, 0, 0) với độ trong suốt 0.1 (rất mờ).
    // Điều này làm cho khung hình cũ mờ dần từ từ, tạo thành vệt sáng.
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; 
    ctx.fillRect(0, 0, W, H);
    
    // 3. CẬP NHẬT VỊ TRÍ (Logic Đơn Giản: Vị trí cũ + Tốc độ)
    circleX = circleX + speedX;
    circleY = circleY + speedY;

    // 4. KIỂM TRA VA CHẠM VÀ ĐẢO CHIỀU (Logic Phản Xạ)
    
    // Va chạm cạnh ngang (Phải/Trái)?
    if (circleX + circleRadius > W || circleX - circleRadius < 0) {
        speedX = speedX * -1; // Đảo chiều tốc độ X
    }

    // Va chạm cạnh dọc (Dưới/Trên)?
    if (circleY + circleRadius > H || circleY - circleRadius < 0) {
        speedY = speedY * -1; // Đảo chiều tốc độ Y
    }
    
    // 5. VẼ HÌNH TRÒN (Phần Tỏa Sáng)
    
    // Hiệu ứng tỏa sáng
    ctx.shadowBlur = 15; // Độ mờ của bóng
    ctx.shadowColor = currentColor; 
    
    // Vẽ hình tròn
    ctx.beginPath();
    ctx.fillStyle = currentColor;
    // Tọa độ X, Tọa độ Y, Bán kính, Bắt đầu, Kết thúc
    ctx.arc(circleX, circleY, circleRadius, 0, Math.PI * 2, false);
    ctx.fill();
    
    // 6. LẶP LẠI
    requestAnimationFrame(updateAndDraw);
}

// Bắt đầu vòng lặp
updateAndDraw();

// Lắng nghe sự kiện thay đổi kích thước cửa sổ
window.addEventListener('resize', () => {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;
});