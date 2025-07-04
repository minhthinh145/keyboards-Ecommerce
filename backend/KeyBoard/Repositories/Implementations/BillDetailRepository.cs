using KeyBoard.Data;
using KeyBoard.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace KeyBoard.Repositories.Implementations
{
    public class BillDetailRepository : IBillDetailRepository
    {
        private readonly ApplicationDbContext _context;

        public BillDetailRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task DeleteBillDetailAsync(int billDetailId)
        {
            var billDetail = await _context.BillDetails.FirstOrDefaultAsync(bd => bd.BillDetailId == billDetailId);
            if (billDetail == null) throw new KeyNotFoundException("Chi tiết hóa đơn không tồn tại");

            _context.BillDetails.Remove(billDetail);
            await _context.SaveChangesAsync();
        }

        public async Task<BillDetails> GetByBillDetailIdAsync(int billDetailId)
        {
            return await _context.BillDetails.FirstOrDefaultAsync(bd => bd.BillDetailId == billDetailId);
        }

        public async Task<List<BillDetails>> GetByBillIdAsync(int billId)
        {
            return await _context.BillDetails
                .Where(bd => bd.BillId == billId)
                .ToListAsync();
        }

        public async Task UpdateBillDetailAsync(int billDetailId, int quantity, decimal unitPrice)
        {
            var billDetail = await _context.BillDetails.FirstOrDefaultAsync(bd => bd.BillDetailId == billDetailId);
            if (billDetail == null) throw new KeyNotFoundException("Chi tiết hóa đơn không tồn tại");

            // Chỉ cập nhật nếu giá trị thay đổi
            if (billDetail.Quantity != quantity || billDetail.UnitPrice != unitPrice)
            {
                billDetail.Quantity = quantity;
                billDetail.UnitPrice = unitPrice;
                await _context.SaveChangesAsync();
            }
        }
    }
}
