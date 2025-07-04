using KeyBoard.Data;

namespace KeyBoard.Repositories.Interfaces
{
    public interface IBillDetailRepository
    {
        Task<List<BillDetails>> GetByBillIdAsync(int billId);
        Task UpdateBillDetailAsync(int billDetailId, int quantity, decimal unitPrice);
        Task DeleteBillDetailAsync(int billDetailId);
        Task<BillDetails> GetByBillDetailIdAsync(int billDetailId);
    }
}