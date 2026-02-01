using System;
using System.Collections.Generic;

namespace KeyBoard.Data;

public partial class BillDetails
{
    public int BillDetailId { get; set; }

    public int BillId { get; set; }

    public Guid ProductId { get; set; }

    public decimal UnitPrice { get; set; }

    public int Quantity { get; set; }

    public decimal Discount { get; set; }

    public string ProductName { get; set; } = null!;

    public virtual Bill Bill { get; set; } = null!;

    public virtual Product Product { get; set; } = null!;
}
