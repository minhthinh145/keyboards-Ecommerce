using AutoMapper;
using KeyBoard.Data;
using KeyBoard.DTOs.BillDTOs;
using KeyBoard.Repositories.Interfaces;
using KeyBoard.Services.Interfaces;

namespace KeyBoard.Services.Implementations
{
    public class BillService : IBillService
    {
        private readonly IBillRepository _repo;
        private readonly IMapper _mapper;

        public BillService(IBillRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        public async Task<int> CreateBillFromOrderAsync(Guid orderId)
        {
            var order = await _repo.GetOrderWithDetailsAsync(orderId);
            if (order == null)
            {
                throw new Exception("Order not found");
            }

            var bill = new Bill
            {
                UserId = order.UserId,
                OrderDate = DateTime.UtcNow,
                StatusId = 1,
                Address = "Chưa cập nhật",
                PaymentMethod = "VNPay",
                ShippingMethod = "Giao hàng tiết kiệm",
                ShippingFee = 20000,
                BillDetails = order.OrderDetails.Select(od => new BillDetails
                {
                    ProductName = od.Product.Name,
                    ProductId = od.ProductId,
                    Quantity = od.Quantity,
                    UnitPrice = od.UnitPrice
                }).ToList()
            };

            await _repo.AddBillAsync(bill);
            return bill.BillId;
        }

        public async Task<bool> DeleteBillByIdAsync(int billId)
        {
            await GetBillByIdAsync(billId);
            return await _repo.DeleteBillByIdAsync(billId);
        }

        public async Task<BillDTO> GetBillByIdAsync(int id)
        {
            var bill = await _repo.GetBillByIdAsync(id);
            if (bill == null)
            {
                throw new KeyNotFoundException("Không tìm thấy hóa đơn này.");
            }
            return _mapper.Map<BillDTO>(bill);
        }

        public async Task<List<BillDTO>> GetBillsByUserIdAsync(string userId)
        {
            var bills = await _repo.GetBillsByUserAsync(userId) ?? new List<Bill>();

            if (!bills.Any())
            {
                throw new KeyNotFoundException("Không tìm thấy hóa đơn cho người dùng này.");
            }

            return _mapper.Map<List<BillDTO>>(bills);
        }

        public async Task<bool> UpdatePaymentStatusAsync(int billId, int status, DateTime updatedAt)
        {
            var bill = await GetBillByIdAsync(billId);
            if (bill == null)
            {
                throw new KeyNotFoundException("Không tìm thấy hóa đơn này.");
            }
            return await _repo.UpdatePaymentStatusAsync(billId, status, updatedAt);
        }
    }
}
