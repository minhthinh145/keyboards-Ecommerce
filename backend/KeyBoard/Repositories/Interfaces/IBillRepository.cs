using KeyBoard.Data;

namespace KeyBoard.Repositories.Interfaces
{
    public interface IBillRepository
    {
        // Lấy hóa đơn theo ID
        Task<Bill?> GetBillByIdAsync(int billId);

        // Lấy danh sách hóa đơn của một User
        Task<IEnumerable<Bill>> GetBillsByUserAsync(string userId);

        // Cập nhật trạng thái thanh toán
        Task<bool> UpdatePaymentStatusAsync(int billId, int status, DateTime deliveredDate);

        // Xóa hóa đơn theo ID hóa đơn
        Task<bool> DeleteBillByIdAsync(int billId);

        // Lấy đơn hàng từ database theo orderId (để Service xử lý logic)
        Task<Order?> GetOrderWithDetailsAsync(Guid orderId);

        // Thêm hóa đơn vào database
        Task<int> AddBillAsync(Bill bill);
    }
}