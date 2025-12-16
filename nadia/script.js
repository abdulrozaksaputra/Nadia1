// Mock database untuk demo
const users = [
    { email: 'user@example.com', password: 'password123' },
    { email: 'admin@nadia.com', password: 'admin123' }
];

// Handle form submission
document.querySelector('.login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;
    
    // Validasi input
    if (!email || !password) {
        showAlert('Mohon isi semua field', 'error');
        return;
    }
    
    // Cek email format
    if (!isValidEmail(email)) {
        showAlert('Format email tidak valid', 'error');
        return;
    }
    
    // Simulasi login
    setTimeout(() => {
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            // Simpan data jika "Ingat saya" dicentang
            if (remember) {
                localStorage.setItem('rememberedEmail', email);
            } else {
                localStorage.removeItem('rememberedEmail');
            }
            
            showAlert('Login berhasil! Selamat datang ' + email, 'success');
            
            // Reset form
            document.querySelector('.login-form').reset();
            
            // Redirect setelah 2 detik
            setTimeout(() => {
                alert('Redirecting to dashboard...');
                // window.location.href = 'dashboard.html';
            }, 2000);
        } else {
            showAlert('Email atau password salah', 'error');
        }
    }, 500);
});

// Validasi email
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Tampilkan alert
function showAlert(message, type) {
    // Hapus alert lama
    const existingAlert = document.querySelector('.alert');
    if (existingAlert) {
        existingAlert.remove();
    }
    
    // Buat alert baru
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert ' + type;
    alertDiv.textContent = message;
    
    // Styling alert
    alertDiv.style.padding = '12px';
    alertDiv.style.borderRadius = '8px';
    alertDiv.style.marginBottom = '20px';
    alertDiv.style.fontSize = '14px';
    alertDiv.style.textAlign = 'center';
    
    if (type === 'success') {
        alertDiv.style.backgroundColor = '#d4edda';
        alertDiv.style.color = '#155724';
        alertDiv.style.border = '1px solid #c3e6cb';
    } else {
        alertDiv.style.backgroundColor = '#f8d7da';
        alertDiv.style.color = '#721c24';
        alertDiv.style.border = '1px solid #f5c6cb';
    }
    
    const formGroup = document.querySelector('.form-group');
    formGroup.parentNode.insertBefore(alertDiv, formGroup);
    
    // Hilangkan alert setelah 5 detik (jika bukan error)
    if (type !== 'error') {
        setTimeout(() => {
            alertDiv.remove();
        }, 5000);
    }
}

// Load remembered email saat halaman dibuka
window.addEventListener('load', function() {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
        document.getElementById('email').value = rememberedEmail;
        document.getElementById('remember').checked = true;
    }
});

// Demo accounts info
console.log('=== Demo Accounts ===');
console.log('Email: user@example.com, Password: password123');
console.log('Email: admin@nadia.com, Password: admin123');
