using AutoMapper;
using KeyBoard.DTOs.BillDTOs;
using KeyBoard.DTOs.VNPayDTOs;
using KeyBoard.Helpers;
using KeyBoard.Repositories.Interfaces;
using System.Threading.Tasks;
using static KeyBoard.Helpers.VNPayHelper;

namespace KeyBoard.Services.VNPayServices
{
    public class VNPayServices : IVNPayService
    {
        private readonly IConfiguration _config;
        private readonly IBillRepository _hoadon;
        private readonly IMapper _mapper;

        public VNPayServices(IConfiguration config, IBillRepository hoadon, IMapper mapper)
        {
            _config = config;
            _hoadon = hoadon;
            _mapper = mapper;
        }

        /// <summary>
        /// Tạo URL thanh toán VNPay
        /// </summary>  
        public async Task<string> CreatePaymentUrl(int maHD, HttpContext context)
        {
            var hoadon = await _hoadon.GetBillByIdAsync(maHD);
            if (hoadon == null) throw new Exception("Hóa đơn không tồn tại");

            var hoadonDTO = _mapper.Map<BillDTO>(hoadon);
            decimal tongTien = hoadonDTO.BillDetails.Sum(ct => ct.Quantity * ct.UnitPrice);

            // ✅ VNPay yêu cầu số tiền nhân với 100 và là số nguyên
            long vnpAmount = (long)(tongTien * 100);

            // ✅ Tạo thời gian và mã giao dịch
            var now = DateTime.Now;
            var expireTime = now.AddMinutes(15); // Hết hạn sau 15 phút
            var txnRef = now.ToString("yyyyMMddHHmmss") + maHD.ToString("D6"); // Mã giao dịch duy nhất

            var pay = new VNPayHelper();

            // ✅ Thêm tất cả tham số bắt buộc theo đúng format VNPay
            pay.AddRequestData("vnp_Version", _config["VNPay:Version"]);
            pay.AddRequestData("vnp_Command", _config["VNPay:Command"]);
            pay.AddRequestData("vnp_TmnCode", _config["VNPay:TmnCode"]);
            pay.AddRequestData("vnp_Amount", vnpAmount.ToString()); // ✅ Đã nhân 100
            pay.AddRequestData("vnp_CurrCode", _config["VNPay:CurrCode"]);
            pay.AddRequestData("vnp_TxnRef", txnRef); // ✅ Mã giao dịch duy nhất
            pay.AddRequestData("vnp_OrderInfo", $"Thanh toan hoa don #{maHD}");
            pay.AddRequestData("vnp_OrderType", "other");
            pay.AddRequestData("vnp_Locale", _config["VNPay:Locale"]);
            pay.AddRequestData("vnp_ReturnUrl", _config["VNPay:ReturnUrl"]);
            pay.AddRequestData("vnp_IpAddr", Utils.GetIpAddress(context));
            pay.AddRequestData("vnp_CreateDate", now.ToString("yyyyMMddHHmmss")); // ✅ Thời gian tạo
            pay.AddRequestData("vnp_ExpireDate", expireTime.ToString("yyyyMMddHHmmss")); // ✅ Thời gian hết hạn

            var paymentUrl = pay.CreatePaymentUrl(_config["VNPay:BaseUrl"], _config["VNPay:HashSecret"]);
            return paymentUrl;
        }

        /// <summary>
        /// Xử lý phản hồi từ VNPay
        /// </summary>
        public VNPayResponseDTO ProcessPaymentResponse(IQueryCollection query)
        {
            var vnpay = new VNPayHelper();

            // ✅ Lấy vnp_SecureHash trước khi add vào response data (giống code mẫu VNPay)
            var vnp_SecureHash = query["vnp_SecureHash"].FirstOrDefault();

            foreach (var (key, value) in query)
            {
                //get all querystring data (giống code mẫu VNPay)
                if (!string.IsNullOrEmpty(key) && key.StartsWith("vnp_"))
                {
                    vnpay.AddResponseData(key, value.ToString());
                }
            }

            var vnp_TxnRef = vnpay.GetResponseData("vnp_TxnRef");
            var vnp_TransactionNo = vnpay.GetResponseData("vnp_TransactionNo");
            var vnp_ResponseCode = vnpay.GetResponseData("vnp_ResponseCode");
            var vnp_TransactionStatus = vnpay.GetResponseData("vnp_TransactionStatus"); // ✅ Thêm TransactionStatus
            var vnp_OrderInfo = vnpay.GetResponseData("vnp_OrderInfo");
            var vnp_Amount = vnpay.GetResponseData("vnp_Amount");

            // ✅ Trích xuất billId từ vnp_TxnRef (6 ký tự cuối)
            var billId = vnp_TxnRef.Length >= 6 ? vnp_TxnRef.Substring(vnp_TxnRef.Length - 6) : vnp_TxnRef;

            // ✅ Kiểm tra chữ ký (giống code mẫu VNPay)
            bool checkSignature = vnpay.ValidateSignature(vnp_SecureHash ?? "", _config["VNPay:HashSecret"] ?? "");

            if (checkSignature)
            {
                // ✅ Kiểm tra cả ResponseCode và TransactionStatus (giống code mẫu VNPay)
                if (vnp_ResponseCode == "00" && vnp_TransactionStatus == "00")
                {
                    //Thanh toan thanh cong
                    return new VNPayResponseDTO
                    {
                        Success = true,
                        PaymentMethod = "VnPay",
                        OrderDescription = vnp_OrderInfo ?? "Thanh toán thành công",
                        PaymentId = billId,
                        TransactionId = vnp_TransactionNo ?? "",
                        Token = vnp_SecureHash ?? "",
                        VnPayResponseCode = vnp_ResponseCode ?? "00"
                    };
                }
                else
                {
                    //Thanh toan khong thanh cong
                    return new VNPayResponseDTO
                    {
                        Success = false,
                        PaymentMethod = "VnPay",
                        OrderDescription = $"Có lỗi xảy ra trong quá trình xử lý. Mã lỗi: {vnp_ResponseCode}",
                        PaymentId = billId,
                        TransactionId = vnp_TransactionNo ?? "",
                        Token = vnp_SecureHash ?? "",
                        VnPayResponseCode = vnp_ResponseCode ?? "99"
                    };
                }
            }
            else
            {
                // Invalid signature
                return new VNPayResponseDTO
                {
                    Success = false,
                    PaymentMethod = "VnPay",
                    OrderDescription = "Có lỗi xảy ra trong quá trình xử lý - Chữ ký không hợp lệ",
                    PaymentId = billId,
                    TransactionId = vnp_TransactionNo ?? "",
                    Token = vnp_SecureHash ?? "",
                    VnPayResponseCode = "97" // Chữ ký không hợp lệ
                };
            }
        }
    }
}