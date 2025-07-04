using AutoMapper;
using KeyBoard.Data;
using KeyBoard.DTOs;
using KeyBoard.DTOs.BillsDTOs;
using KeyBoard.Repositories.Interfaces;
using KeyBoard.Services.Interfaces;

namespace KeyBoard.Services.Implementations
{
    public class BillDetailService : IBillDetailService
    {
        private readonly IBillDetailRepository _repo;
        private readonly IMapper _mapper;

        public BillDetailService(IBillDetailRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;   
        }

        public async Task<bool> DeleteBillDetailAsync(int id)
        {
            var billDetail = await _repo.GetByBillDetailIdAsync(id);
            if (billDetail == null)
            {
                return false; // Không tìm thấy, trả về false
            }

            await _repo.DeleteBillDetailAsync(id);
            return true;
        }

        public async Task<BillDetailDTO> GetBillDetailByIdAsync(int billDetailId)
        {
            var billDetail = await _repo.GetByBillDetailIdAsync(billDetailId);
            if (billDetail == null)
            {
                throw new KeyNotFoundException("Không tìm thấy chi tiết hóa đơn.");
            }
            return _mapper.Map<BillDetailDTO>(billDetail);
        }

        public async Task<List<BillDetailDTO>> GetBillDetailsByBillIdAsync(int billId)
        {
            var billDetails = await _repo.GetByBillIdAsync(billId);
            if (billDetails == null || !billDetails.Any())
            {
                throw new KeyNotFoundException("Không tìm thấy chi tiết hóa đơn.");
            }
            return _mapper.Map<List<BillDetailDTO>>(billDetails);
        }

        public async Task<bool> UpdateBillDetailAsync(int id, int? newQuantity, decimal? newPrice)
        {
            // Lấy chi tiết hóa đơn theo ID
            var billDetail = await GetBillDetailByIdAsync(id);
            if (billDetail == null)
            {
                throw new KeyNotFoundException("Không tìm thấy chi tiết hóa đơn.");
            }

            // Chỉ cập nhật nếu giá trị hợp lệ và khác giá trị cũ
            int newQuantityValue = newQuantity.HasValue && newQuantity.Value > 0 ? newQuantity.Value : billDetail.Quantity;
            decimal newPriceValue = newPrice.HasValue && newPrice.Value > 0 ? newPrice.Value : billDetail.UnitPrice;

            // Nếu không có gì thay đổi, không cần update
            if (newQuantityValue == billDetail.Quantity && newPriceValue == billDetail.UnitPrice)
                return false;

            // Gửi dữ liệu xuống repository để cập nhật
            await _repo.UpdateBillDetailAsync(id, newQuantityValue, newPriceValue);
            return true;
        }
    }
}
