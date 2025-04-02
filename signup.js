import { CONFIG } from './config.js';

class SignupManager {
  constructor() {
    this.form = document.getElementById('signupForm');
    this.setup();
  }

  setup() {
    this.form?.addEventListener('submit', this.handleSignup.bind(this));
    this.setupPasswordToggle();
    this.setupGoogleSignup();
  }

  setupPasswordToggle() {
    // Thiết lập hiển thị mật khẩu
    const passwordInput = document.getElementById('password');
    const passwordToggleBtn = document.createElement('i');
    passwordToggleBtn.className = 'fas fa-eye password-toggle';
    passwordInput?.parentElement?.appendChild(passwordToggleBtn);
 
    passwordToggleBtn.onclick = () => {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            passwordToggleBtn.className = 'fas fa-eye-slash password-toggle';
        } else {
            passwordInput.type = 'password';
            passwordToggleBtn.className = 'fas fa-eye password-toggle';
        }
    };
 
    // Thiết lập hiển thị xác nhận mật khẩu
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const confirmPasswordToggleBtn = document.createElement('i');
    confirmPasswordToggleBtn.className = 'fas fa-eye password-toggle';
    confirmPasswordInput?.parentElement?.appendChild(confirmPasswordToggleBtn);
 
    confirmPasswordToggleBtn.onclick = () => {
        if (confirmPasswordInput.type === 'password') {
            confirmPasswordInput.type = 'text';
            confirmPasswordToggleBtn.className = 'fas fa-eye-slash password-toggle';
        } else {
            confirmPasswordInput.type = 'password';
            confirmPasswordToggleBtn.className = 'fas fa-eye password-toggle';
        }
    };
  }

  setupGoogleSignup() {
    const googleBtn = document.getElementById('googleSignUpBtn');
    googleBtn?.addEventListener('click', async () => {
      try {
        await this.loadGoogleSDK();
        google.accounts.id.initialize({
          client_id: CONFIG.AUTH.GOOGLE_CLIENT_ID,
          callback: this.handleGoogleSignup.bind(this)
        });
        google.accounts.id.prompt();
      } catch (err) {
        alert('Lỗi đăng ký với Google');
      }
    });
  }

  async handleSignup(e) {
    e.preventDefault();
    
    const data = {
      username: this.form.username.value,
      email: this.form.email.value,
      password: this.form.password.value,
      confirmPassword: this.form.confirmPassword.value
    };

    if (!this.validateForm(data)) return;

    try {
      window.location.href = 'login.html';
    } catch (err) {
      alert('Đăng ký thất bại!');
    }
  }

  validateForm(data) {
    if (!data.username || !data.email || !data.password || !data.confirmPassword) {
      alert('Vui lòng điền đầy đủ thông tin');
      return false;
    }

    if (data.password !== data.confirmPassword) {
      alert('Mật khẩu xác nhận không khớp');
      return false;
    }

    if (data.password.length < 6) {
      alert('Mật khẩu phải có ít nhất 6 ký tự');
      return false;
    }

    return true;
  }

  async handleGoogleSignup(response) {
    try {
      console.log('Google signup:', response.credential);
      window.location.href = 'login.html';
    } catch (err) {
      alert('Đăng ký Google thất bại');
    }
  }

  loadGoogleSDK() {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }
}

new SignupManager();
