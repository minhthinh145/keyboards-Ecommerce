using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace KeyBoard.Migrations
{
    /// <inheritdoc />
    public partial class changenameOfBillHoaDon : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ChiTietHoaDon");

            migrationBuilder.DropTable(
                name: "HoaDon");

            migrationBuilder.CreateTable(
                name: "Bills",
                columns: table => new
                {
                    BillId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(type: "nvarchar(450)", maxLength: 450, nullable: false),
                    OrderDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    ProcessedDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    DeliveredDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    FullName = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Address = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    PhoneNumber = table.Column<string>(type: "nvarchar(15)", maxLength: 15, nullable: true),
                    PaymentMethod = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    ShippingMethod = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    ShippingFee = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    StatusId = table.Column<int>(type: "int", nullable: false),
                    Notes = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Bills__2725A6C0938A0714", x => x.BillId);
                    table.ForeignKey(
                        name: "FK__Bills__StatusId__2BFE89A6",
                        column: x => x.StatusId,
                        principalTable: "TrangThai",
                        principalColumn: "MaTrangThai");
                    table.ForeignKey(
                        name: "FK__Bills__UserId__2B0A656D",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "BillDetails",
                columns: table => new
                {
                    BillDetailId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BillId = table.Column<int>(type: "int", nullable: false),
                    ProductId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UnitPrice = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    Discount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    ProductName = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__BillDetails__27258E543E3B4AAD", x => x.BillDetailId);
                    table.ForeignKey(
                        name: "FK__BillDetails__BillId__43D61337",
                        column: x => x.BillId,
                        principalTable: "Bills",
                        principalColumn: "BillId");
                    table.ForeignKey(
                        name: "FK__BillDetails__ProductId__44CA3770",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_BillDetails_BillId",
                table: "BillDetails",
                column: "BillId");

            migrationBuilder.CreateIndex(
                name: "IX_BillDetails_ProductId",
                table: "BillDetails",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_Bills_StatusId",
                table: "Bills",
                column: "StatusId");

            migrationBuilder.CreateIndex(
                name: "IX_Bills_UserId",
                table: "Bills",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BillDetails");

            migrationBuilder.DropTable(
                name: "Bills");

            migrationBuilder.CreateTable(
                name: "HoaDon",
                columns: table => new
                {
                    MaHd = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MaTrangThai = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<string>(type: "nvarchar(450)", maxLength: 450, nullable: false),
                    CachThanhToan = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    CachVanChuyen = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    DiaChi = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    GhiChu = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    HoTen = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    NgayCan = table.Column<DateTime>(type: "datetime", nullable: true),
                    NgayDat = table.Column<DateTime>(type: "datetime", nullable: false),
                    NgayGiao = table.Column<DateTime>(type: "datetime", nullable: true),
                    PhiVanChuyen = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    SoDienThoai = table.Column<string>(type: "nvarchar(15)", maxLength: 15, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__HoaDon__2725A6C0938A0714", x => x.MaHd);
                    table.ForeignKey(
                        name: "FK__HoaDon__MaTrangT__2BFE89A6",
                        column: x => x.MaTrangThai,
                        principalTable: "TrangThai",
                        principalColumn: "MaTrangThai");
                    table.ForeignKey(
                        name: "FK__HoaDon__UserId__2B0A656D",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "ChiTietHoaDon",
                columns: table => new
                {
                    MaCt = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MaHd = table.Column<int>(type: "int", nullable: false),
                    MaHh = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    DonGia = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    GiamGia = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    SoLuong = table.Column<int>(type: "int", nullable: false),
                    TenHh = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__ChiTietH__27258E543E3B4AAD", x => x.MaCt);
                    table.ForeignKey(
                        name: "FK__ChiTietHoa__MaHd__43D61337",
                        column: x => x.MaHd,
                        principalTable: "HoaDon",
                        principalColumn: "MaHd");
                    table.ForeignKey(
                        name: "FK__ChiTietHoa__MaHh__44CA3770",
                        column: x => x.MaHh,
                        principalTable: "Products",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_ChiTietHoaDon_MaHd",
                table: "ChiTietHoaDon",
                column: "MaHd");

            migrationBuilder.CreateIndex(
                name: "IX_ChiTietHoaDon_MaHh",
                table: "ChiTietHoaDon",
                column: "MaHh");

            migrationBuilder.CreateIndex(
                name: "IX_HoaDon_MaTrangThai",
                table: "HoaDon",
                column: "MaTrangThai");

            migrationBuilder.CreateIndex(
                name: "IX_HoaDon_UserId",
                table: "HoaDon",
                column: "UserId");
        }
    }
}
