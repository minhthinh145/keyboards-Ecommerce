using KeyBoard.DTOs.HoaDonsDTOs;
using KeyBoard.Helpers;
using KeyBoard.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace KeyBoard.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BillController : ControllerBase
    {
        private readonly IBillService _billService;

        public BillController(IBillService billService)
        {
            _billService = billService;
        }

        [Authorize(Roles = $"{ApplicationRole.Customer},{ApplicationRole.Admin}")]
        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetBillsByUserId(string userId)
        {
            try
            {
                var bills = await _billService.GetBillsByUserIdAsync(userId);
                return Ok(bills);
            }
            catch (Exception ex)
            {
                return BadRequest($"Lỗi khi lấy danh sách hóa đơn: {ex.Message}");
            }
        }

        [Authorize(Roles = $"{ApplicationRole.Customer},{ApplicationRole.Admin}")]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetBillById(int id)
        {
            try
            {
                var bill = await _billService.GetBillByIdAsync(id);
                return Ok(bill);
            }
            catch (KeyNotFoundException)
            {
                return NotFound($"Không tìm thấy hóa đơn với ID {id}.");
            }
        }

        [Authorize(Roles = ApplicationRole.Customer)]
        [HttpPost("create-from-order/{orderId}")]
        public async Task<IActionResult> CreateBillFromOrder(Guid orderId)
        {
            try
            {
                var billId = await _billService.CreateBillFromOrderAsync(orderId);
                return Ok(new { BillId = billId, Message = "Tạo hóa đơn thành công." });
            }
            catch (Exception ex)
            {
                return BadRequest($"Lỗi khi tạo hóa đơn: {ex.Message}");
            }
        }

        [Authorize(Roles = ApplicationRole.Admin)]
        [HttpPut("{billId}/status")]
        public async Task<IActionResult> UpdatePaymentStatus(int billId, [FromBody] int status)
        {
            var updated = await _billService.UpdatePaymentStatusAsync(billId, status, DateTime.UtcNow);
            if (!updated)
                return NotFound($"Không tìm thấy hóa đơn với ID {billId}.");

            return Ok("Cập nhật trạng thái thành công.");
        }

        [Authorize(Roles = ApplicationRole.Admin)]
        [HttpDelete("{billId}")]
        public async Task<IActionResult> DeleteBill(int billId)
        {
            var deleted = await _billService.DeleteBillByIdAsync(billId);
            if (!deleted)
                return NotFound($"Không tìm thấy hóa đơn với ID {billId}.");

            return Ok("Xóa hóa đơn thành công.");
        }
    }
}
