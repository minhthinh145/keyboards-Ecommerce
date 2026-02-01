    using System;
using System.Collections.Generic;

namespace KeyBoard.Data;

public partial class Bill
{
    public int BillId { get; set; }

    public string UserId { get; set; } = null!;

    public DateTime OrderDate { get; set; }

    public DateTime? ProcessedDate { get; set; }

    public DateTime? DeliveredDate { get; set; }

    public string? FullName { get; set; }

    public string Address { get; set; } = null!;

    public string? PhoneNumber { get; set; }

    public string PaymentMethod { get; set; } = null!;

    public string ShippingMethod { get; set; } = null!;

    public decimal ShippingFee { get; set; }

    public int StatusId { get; set; }

    public string? Notes { get; set; }

    public virtual ICollection<BillDetails> BillDetails { get; set; } = new List<BillDetails>();

    public virtual TrangThai Status { get; set; } = null!;

    public virtual ApplicationUser User { get; set; } = null!;
}
