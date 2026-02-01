using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace KeyBoard.Data;

public partial class ApplicationDbContext : IdentityDbContext<ApplicationUser>
{
    public ApplicationDbContext()
    {
    }

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<RefreshToken> RefreshTokens { get; set; }
    public virtual DbSet<Cart> Carts { get; set; }
    public virtual DbSet<Category> Categories { get; set; }
    public virtual DbSet<BillDetails> BillDetails { get; set; }
    public virtual DbSet<Bill> Bills { get; set; }
    public virtual DbSet<Order> Orders { get; set; }
    public virtual DbSet<OrderDetail> OrderDetails { get; set; }
    public virtual DbSet<Product> Products { get; set; }
    public virtual DbSet<TrangThai> TrangThais { get; set; }
    public DbSet<UserOTP> UserOtps { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Cart>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Cart__3214EC072DE3F400");

            entity.ToTable("Cart");

            entity.HasIndex(e => e.ProductId, "IX_Cart_ProductId");

            entity.HasIndex(e => e.UserId, "IX_Cart_UserId");

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");

            entity.HasOne(d => d.Product).WithMany(p => p.Carts)
                .HasForeignKey(d => d.ProductId)
                .HasConstraintName("FK__Cart__ProductId__6B24EA82");

            entity.HasOne(d => d.User).WithMany(p => p.Carts)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK_Order_User");
        });

        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Categori__3214EC073C1B0005");

            entity.HasIndex(e => e.Name, "UQ__Categori__737584F655AD9643").IsUnique();

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Description).HasMaxLength(255);
            entity.Property(e => e.Name).HasMaxLength(100);
        });

        modelBuilder.Entity<BillDetails>(entity =>
        {
                    entity.HasKey(e => e.BillDetailId).HasName("PK__BillDetails__27258E543E3B4AAD");

            entity.ToTable("BillDetails");

            entity.Property(e => e.BillDetailId).HasColumnName("BillDetailId");
            entity.Property(e => e.BillId).HasColumnName("BillId");
            entity.Property(e => e.ProductId).HasColumnName("ProductId");
            entity.Property(e => e.UnitPrice).HasColumnType("decimal(18, 2)").HasColumnName("UnitPrice");
            entity.Property(e => e.Quantity).HasColumnName("Quantity");
            entity.Property(e => e.Discount).HasColumnType("decimal(18, 2)").HasColumnName("Discount");
            entity.Property(e => e.ProductName).HasMaxLength(255).HasColumnName("ProductName");

            entity.HasOne(d => d.Bill).WithMany(p => p.BillDetails)
                .HasForeignKey(d => d.BillId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__BillDetails__BillId__43D61337");

            entity.HasOne(d => d.Product).WithMany(p => p.BillDetails)
                .HasForeignKey(d => d.ProductId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__BillDetails__ProductId__44CA3770");
        });

        modelBuilder.Entity<Bill>(entity =>
        {
            entity.HasKey(e => e.BillId).HasName("PK__Bills__2725A6C0938A0714");

            entity.ToTable("Bills");

            entity.Property(e => e.BillId).HasColumnName("BillId");
            entity.Property(e => e.UserId).HasMaxLength(450).HasColumnName("UserId");
            entity.Property(e => e.OrderDate).HasColumnType("datetime").HasColumnName("OrderDate");
            entity.Property(e => e.ProcessedDate).HasColumnType("datetime").HasColumnName("ProcessedDate");
            entity.Property(e => e.DeliveredDate).HasColumnType("datetime").HasColumnName("DeliveredDate");
            entity.Property(e => e.FullName).HasMaxLength(255).HasColumnName("FullName");
            entity.Property(e => e.Address).HasMaxLength(500).HasColumnName("Address");
            entity.Property(e => e.PhoneNumber).HasMaxLength(15).HasColumnName("PhoneNumber");
            entity.Property(e => e.PaymentMethod).HasMaxLength(50).HasColumnName("PaymentMethod");
            entity.Property(e => e.ShippingMethod).HasMaxLength(50).HasColumnName("ShippingMethod");
            entity.Property(e => e.ShippingFee).HasColumnType("decimal(18, 2)").HasColumnName("ShippingFee");
            entity.Property(e => e.StatusId).HasColumnName("StatusId");
            entity.Property(e => e.Notes).HasMaxLength(500).HasColumnName("Notes");

            entity.HasOne(d => d.Status).WithMany(p => p.Bills)
                .HasForeignKey(d => d.StatusId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Bills__StatusId__2BFE89A6");

            entity.HasOne(d => d.User).WithMany(p => p.Bills)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Bills__UserId__2B0A656D");
        });

        modelBuilder.Entity<Order>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Orders__3214EC07A568D15F");

            entity.HasIndex(e => e.UserId, "IX_Orders_UserId");

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.OrderStatus)
                .HasMaxLength(20)
                .HasDefaultValue("Pending");
            entity.Property(e => e.TotalAmount).HasColumnType("decimal(18, 2)");

            entity.HasOne(d => d.User).WithMany(p => p.Orders)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__Orders__UserId__5EBF139D");
        });

        modelBuilder.Entity<OrderDetail>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__OrderDet__3214EC07123285BC");

            entity.HasIndex(e => e.OrderId, "IX_OrderDetails_OrderId");

            entity.HasIndex(e => e.ProductId, "IX_OrderDetails_ProductId");

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.UnitPrice).HasColumnType("decimal(18, 2)");

            entity.HasOne(d => d.Order).WithMany(p => p.OrderDetails)
                .HasForeignKey(d => d.OrderId)
                .HasConstraintName("FK__OrderDeta__Order__6383C8BA");

            entity.HasOne(d => d.Product).WithMany(p => p.OrderDetails)
                .HasForeignKey(d => d.ProductId)
                .HasConstraintName("FK__OrderDeta__Produ__6477ECF3");
        });

        modelBuilder.Entity<Product>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Products__3214EC076E0BFD36");

            entity.HasIndex(e => e.CategoryId, "IX_Products_CategoryId");

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.ImageUrl).HasMaxLength(255);
            entity.Property(e => e.Name).HasMaxLength(255);
            entity.Property(e => e.Price).HasColumnType("decimal(18, 2)");

            entity.HasOne(d => d.Category).WithMany(p => p.Products)
                .HasForeignKey(d => d.CategoryId)
                .HasConstraintName("FK__Products__Catego__5812160E");
        });

        modelBuilder.Entity<TrangThai>(entity =>
        {
            entity.HasKey(e => e.MaTrangThai).HasName("PK__TrangTha__AADE4138F996BCB4");

            entity.ToTable("TrangThai");

            entity.Property(e => e.MaTrangThai).ValueGeneratedNever();
            entity.Property(e => e.MoTa).HasMaxLength(500);
            entity.Property(e => e.TenTrangThai).HasMaxLength(255);
        });

        modelBuilder.Entity<RefreshToken>(entity =>
        {
            entity.HasIndex(e => e.Token).IsUnique();
            entity.HasOne(e => e.User)
                  .WithMany()
                  .HasForeignKey(e => e.UserId);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
