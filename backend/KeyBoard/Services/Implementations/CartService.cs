using AutoMapper;
using KeyBoard.Data;
using KeyBoard.DTOs;
using KeyBoard.Helpers;
using KeyBoard.Repositories.Interfaces;
using KeyBoard.Services.Interfaces;

namespace KeyBoard.Services.Implementations
{
    public class CartService : ICartService
    {
        private readonly ICartRepository _repo;
        private readonly IMapper _mapper;

        public CartService(ICartRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }
        public async Task<ServiceResult> AddToCartAsync(string userId, AddToCartDTO cartDTO)
        {
            if (string.IsNullOrEmpty(userId))
            {
                return ServiceResult.Failure("Lỗi user 404");
            }
            if (cartDTO.Quantity <= 0)
            {
                return ServiceResult.Failure("Số lượng sản phẩm phải lớn hơn 0");
            }
            var existingCart = await _repo.GetCartItemAsync(userId, cartDTO.ProductId);
            if(existingCart != null)
            {
                existingCart.Quantity = cartDTO.Quantity;
                await _repo.UpdateCartAsync(existingCart);
            }
            else
            {
                //add a new item
                var newCart = _mapper.Map<Cart>(cartDTO);
                newCart.Id = Guid.NewGuid();
                newCart.UserId = userId;
                newCart.Quantity = cartDTO.Quantity;
                await _repo.AddToCartAsync(newCart);
            }
            var userCart = await GetCartItemsAsync(userId);
            return ServiceResult.Success("Thêm sản phẩm vào giỏ hàng thành công", data: userCart);
        }

        public async Task<bool> ClearCartAsync(string userId)
        {
            var listCart = await _repo.GetCartItemsAsync(userId);
            if (listCart == null || !listCart.Any())
            {
                return false;
            }
            await _repo.ClearCartAsync(userId);
            return true;
        }

        public async Task<CartDTO> GetCartItemsAsync(string userId)
        {
            var listCart = await _repo.GetCartItemsAsync(userId);
            if (listCart == null || !listCart.Any())
            {
                return new CartDTO();
            }

            var items = _mapper.Map<List<CartItemDTO>>(listCart);
            var totalPrice = items.Sum(item => item.Price * item.Quantity);

            var CartDTO = new CartDTO
            {
                Items = items,
                TotalPrice = totalPrice,
            };
            return CartDTO;
        }

        public async Task<ServiceResult> RemoveFromCartAsync(string userId, Guid productId)
        {
            var existingCart = await _repo.GetCartItemAsync(userId, productId);
            if (existingCart == null)
            {
                return ServiceResult.Failure("Không tìm thấy hàng để xóa");
            }
            await _repo.RemoveFromCartAsync(existingCart);
            var userCart = await GetCartItemsAsync(userId);
            return ServiceResult.Success("Xóa khỏi giỏ hàng thành công" , data: userCart);
        }



    }
}
