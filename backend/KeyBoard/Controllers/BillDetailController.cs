using AutoMapper;
using KeyBoard.DTOs.BillDTOs;
using KeyBoard.Helpers;
using KeyBoard.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace KeyBoard.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BillDetailController : ControllerBase
    {
        private readonly IBillDetailService _service;

        public BillDetailController(IBillDetailService service)
        {
            _service = service;
        }

        // Lấy danh sách BillDetail theo ID hóa đơn
        [Authorize(Roles = $"{ApplicationRole.Customer},{ApplicationRole.Admin}")]
        [HttpGet("ByBill/{billId}")]
        public async Task<IActionResult> GetBillDetailsByBillId(int billId)
        {
            try
            {
                var billDetails = await _service.GetBillDetailsByBillIdAsync(billId);
                return Ok(billDetails);
            }
            catch (KeyNotFoundException)
            {
                return NotFound($"Không tìm thấy chi tiết hóa đơn nào cho hóa đơn ID {billId}.");
            }
        }

        // Lấy thông tin 1 BillDetail theo ID chi tiết hóa đơn
        [Authorize(Roles = $"{ApplicationRole.Customer},{ApplicationRole.Admin}")]
        [HttpGet("{billDetailId}")]
        public async Task<IActionResult> GetBillDetailById(int billDetailId)
        {
            try
            {
                var billDetail = await _service.GetBillDetailByIdAsync(billDetailId);
                return Ok(billDetail);
            }
            catch (KeyNotFoundException)
            {
                return NotFound($"Không tìm thấy chi tiết hóa đơn với ID {billDetailId}.");
            }
        }

        // Cập nhật số lượng & đơn giá của một chi tiết hóa đơn
        [Authorize(Roles = ApplicationRole.Admin)]
        [HttpPut("{billDetailId}")]
        public async Task<IActionResult> UpdateBillDetail(int billDetailId, [FromBody] BillDetailDTO dto)
        {
            if (dto == null) return BadRequest("Dữ liệu không hợp lệ.");

            try
            {
                var updated = await _service.UpdateBillDetailAsync(billDetailId, dto.Quantity, dto.UnitPrice);
                if (!updated)
                    return BadRequest("Không có thay đổi nào được thực hiện.");

                return Ok("Cập nhật chi tiết hóa đơn thành công.");
            }
            catch (KeyNotFoundException)
            {
                return NotFound($"Không tìm thấy chi tiết hóa đơn với ID {billDetailId}.");
            }
        }

        // Xóa một chi tiết hóa đơn
        [Authorize(Roles = ApplicationRole.Admin)]
        [HttpDelete("{billDetailId}")]
        public async Task<IActionResult> DeleteBillDetail(int billDetailId)
        {
            var deleted = await _service.DeleteBillDetailAsync(billDetailId);
            if (!deleted)
                return NotFound($"Không tìm thấy chi tiết hóa đơn với ID {billDetailId}.");

            return Ok("Xóa chi tiết hóa đơn thành công.");
        }
    }
}
