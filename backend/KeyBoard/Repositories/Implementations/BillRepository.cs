using KeyBoard.Data;
using KeyBoard.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace KeyBoard.Repositories.Implementations
{
    public class BillRepository : IBillRepository
    {
        private readonly ApplicationDbContext _context;

        public BillRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Bill?> GetBillByIdAsync(int billId)
        {
            return await _context.Bills
                .Include(b => b.BillDetails)
                .Include(b => b.Status)
                .FirstOrDefaultAsync(b => b.BillId == billId);
        }

        public async Task<IEnumerable<Bill>> GetBillsByUserAsync(string userId)
        {
            return await _context.Bills
                .Where(b => b.UserId == userId)
                .Include(b => b.BillDetails)
                .Include(b => b.Status)
                .OrderByDescending(b => b.OrderDate)
                .ToListAsync();
        }

        public async Task<bool> UpdatePaymentStatusAsync(int billId, int status, DateTime deliveredDate)
        {
            var existingBill = await _context.Bills.FindAsync(billId);
            if (existingBill == null) return false;

            existingBill.StatusId = status;
            existingBill.DeliveredDate = deliveredDate;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteBillByIdAsync(int billId)
        {
            var existingBill = await _context.Bills
                .Include(b => b.BillDetails)
                .FirstOrDefaultAsync(b => b.BillId == billId);

            if (existingBill == null)
                return false;

            // Xóa tất cả các chi tiết hóa đơn trước
            _context.BillDetails.RemoveRange(existingBill.BillDetails);

            // Xóa hóa đơn
            _context.Bills.Remove(existingBill);

            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<Order?> GetOrderWithDetailsAsync(Guid orderId)
        {
            return await _context.Orders
                .Include(o => o.OrderDetails)
                    .ThenInclude(od => od.Product)
                .Include(o => o.User)
                .FirstOrDefaultAsync(o => o.Id == orderId);
        }

        public async Task<int> AddBillAsync(Bill bill)
        {
            _context.Bills.Add(bill);
            await _context.SaveChangesAsync();
            return bill.BillId;
        }
    }
}
