using NUnit.Framework;
using OtpReact.Services;
using System;
using System.Threading.Tasks;

namespace OtpReact.Tests
{
    public class OneTimePasswordServiceTests
    {
        public OneTimePasswordService otpService;
        public Guid userId;
        [SetUp]
        public void Setup()
        {
            otpService = new OneTimePasswordService("testingFile.txt");
            userId= Guid.NewGuid();
        }

        [Test]
        public async Task ItGeneratesANewOTP()
        {
            var dateTime = DateTime.UtcNow;
            var newPassword = await otpService.GenerateNewOneTimePassword(userId, dateTime);
            Assert.IsNotNull(newPassword.Password);
        }

        [Test]
        public async Task GeneratedOTPIsAssignedToTheUser()
        {
            var dateTime = DateTime.UtcNow;
            var newPassword = await otpService.GenerateNewOneTimePassword(userId, dateTime);
            Assert.AreEqual(newPassword.UserId, userId);
        }

        [Test]
        public async Task TheGeneratedOTPIsNotExpired()
        {
            var dateTime = DateTime.UtcNow;
            var newPassword = await otpService.GenerateNewOneTimePassword(userId, dateTime);
           Assert.GreaterOrEqual(newPassword.ExpirationDateTime, DateTime.UtcNow);
        }
        [Test]
        public async Task TheGeneratedOTPWillExpireAfter30Seconds()
        {
            var dateTime = DateTime.UtcNow;
            var newPassword = await otpService.GenerateNewOneTimePassword(userId, dateTime);
            var thirtySeconds = new TimeSpan(0, 0, 30);
            Assert.LessOrEqual(newPassword.ExpirationDateTime, dateTime.Add(thirtySeconds));
        }
    }
}