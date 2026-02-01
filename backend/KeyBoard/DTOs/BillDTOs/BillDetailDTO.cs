namespace KeyBoard.DTOs.BillDTOs
{
    public class BillDetailDTO
    {
        public int BillDetailId { get; set; }
        public int BillId { get; set; }
        public Guid ProductId { get; set; }
        public string ProductName { get; set; } = null!;
        public decimal UnitPrice { get; set; }
        public int Quantity { get; set; }
        public decimal Discount { get; set; }
    }
}
