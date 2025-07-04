using KeyBoard.DTOs;
using KeyBoard.Helpers;

namespace KeyBoard.Services.Interfaces
{
    public interface ICartService
    {
        /// <summary>
        /// Lấy danh sách sản phẩm trong giỏ hàng của người dùng.
        /// </summary>
        /// <param name="userId">ID của người dùng.</param>
        /// <returns>Danh sách sản phẩm trong giỏ hàng.</returns>
        Task<CartDTO> GetCartItemsAsync(string userId);

        /// <summary>
        /// Thêm sản phẩm vào giỏ hàng hoặc cập nhật nếu đã có
        /// </summary>
        /// <param name="cartDTO">Thông tin sản phẩm cần thêm.</param>
        /// <returns <returns>
        Task<ServiceResult> AddToCartAsync(string userId,AddToCartDTO cartDTO);

    

        Task<ServiceResult> RemoveFromCartAsync(string userId, Guid productId);

        /// <summary>
        /// Xóa toàn bộ sản phẩm trong giỏ hàng của người dùng.
        /// </summary>
        /// <param name="userId">ID của người dùng.</param>
        /// <returns>Trả về true nếu xóa thành công.</returns>
        Task<bool> ClearCartAsync(string userId);
    }
}
