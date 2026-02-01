using KeyBoard.Data;

namespace KeyBoard.DTOs.BillDTOs
{
    public class BillDTO
    {
        public int BillId { get; set; }
        public string UserId { get; set; } = null!;
        public DateTime OrderDate { get; set; }
        public DateTime? ProcessedDate { get; set; }
        public DateTime? DeliveredDate { get; set; }
        public string? FullName { get; set; }
        public string Address { get; set; } = null!;
        public Decimal TotalAmount { get; set; }
        public string? PhoneNumber { get; set; }
        public string PaymentMethod { get; set; } = null!;
        public string ShippingMethod { get; set; } = null!;
        public decimal ShippingFee { get; set; }
        public string Status { get; set; } = null!;
        public string? Notes { get; set; }
        public List<BillDetailDTO> BillDetails { get; set; } = new();
    }
}
