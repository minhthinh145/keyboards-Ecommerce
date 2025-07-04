using KeyBoard.DTOs.BillsDTOs;

namespace KeyBoard.Services.Interfaces
{
    public interface IBillDetailService
    {
        /// <summary>
        /// Lấy danh sách chi tiết hóa đơn theo ID hóa đơn
        /// </summary>
        /// <param name="billId">ID hóa đơn cần lấy chi tiết</param>
        /// <returns>Danh sách các chi tiết hóa đơn</returns>
        Task<List<BillDetailDTO>> GetBillDetailsByBillIdAsync(int billId);

        /// <summary>
        /// Cập nhật số lượng sản phẩm trong một chi tiết hóa đơn
        /// </summary>
        /// <param name="id">ID chi tiết hóa đơn cần cập nhật</param>
        /// <param name="newQuantity">Số lượng mới</param>
        /// <param name="newPrice">Đơn giá mới</param>
        /// <returns>Trả về `true` nếu cập nhật thành công, `false` nếu thất bại</returns>
        Task<bool> UpdateBillDetailAsync(int id, int? newQuantity, decimal? newPrice);

        /// <summary>
        /// Xóa một chi tiết hóa đơn theo ID nếu hóa đơn chưa thanh toán
        /// </summary>
        /// <param name="id">ID chi tiết hóa đơn cần xóa</param>
        /// <returns>Trả về `true` nếu xóa thành công, `false` nếu thất bại</returns>
        Task<bool> DeleteBillDetailAsync(int id);

        /// <summary>
        /// Lấy chi tiết hóa đơn theo ID chi tiết hóa đơn
        /// </summary>
        /// <param name="billDetailId">ID chi tiết hóa đơn cần lấy</param>
        /// <returns>Chi tiết hóa đơn</returns>
        Task<BillDetailDTO> GetBillDetailByIdAsync(int billDetailId);
    }
}
