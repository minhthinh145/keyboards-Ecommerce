﻿using KeyBoard.Services.ExternalServices.Interface;
using MimeKit;
using MailKit.Net.Smtp;
using MailKit.Security;

namespace KeyBoard.Services.ExternalServices.Implementation
{
    public class SendEmailService : ISendEmailService
    {
        private readonly IConfiguration _configuration;
        public SendEmailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public async Task SendOtpEmailAsync(string toEmail, string otpCode)
        {
            var message = new MimeKit.MimeMessage();
            message.From.Add(new MimeKit.MailboxAddress("Website bán bàn phím TShop", _configuration["EmailSettings:From"]));
            message.To.Add(MailboxAddress.Parse(toEmail));
            message.Subject = "Xác thực OTP - Website bán bàn phím";
            message.Body = new TextPart("plain")
            {
                Text = $"Mã OTP của bạn là: {otpCode}. Vui lòng không chia sẻ mã này với bất kỳ ai. Mã sẽ hết hạn sau vài phút."
            };
            using var client = new SmtpClient();
            await client.ConnectAsync(
                _configuration["EmailSettings:SmtpServer"],
                int.Parse(_configuration["EmailSettings:Port"]),
                true 
            );

            await client.AuthenticateAsync(
                 _configuration["EmailSettings:Username"],
                 _configuration["EmailSettings:Password"]
             );
            await client.SendAsync(message);
            await client.DisconnectAsync(true);
        }
    }
}
