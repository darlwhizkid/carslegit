
describe('Registration Flow', () => {
    test('should handle signup form submission', () => {
        // Test data
        const testUser = {
            email: 'test@example.com',
            password: 'TestPassword123',
            confirmPassword: 'TestPassword123',
            fullName: 'Test User',
            phone: '1234567890',
            state: 'Lagos',
            referral: 'FRIEND'
        };

        // Fill form and submit
        document.getElementById('email').value = testUser.email;
        document.getElementById('newPassword').value = testUser.password;
        document.getElementById('confirmPassword').value = testUser.confirmPassword;
        document.getElementById('fullName').value = testUser.fullName;
        document.getElementById('phone').value = testUser.phone;
        document.getElementById('state').value = testUser.state;
        document.getElementById('referral').value = testUser.referral;

        handleSignup(new Event('submit'));
    });
});
