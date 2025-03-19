import { CONFIG } from './config.js';

class LoginForm {
  constructor() {
    this.form = document.getElementById('loginForm');
    this.setup();
  }

  setup() {
    this.form?.addEventListener('submit', this.handleLogin.bind(this));

    const googleBtn = document.getElementById('googleLoginBtn');
    googleBtn?.addEventListener('click', this.handleGoogleLogin.bind(this));

    const passInput = document.getElementById('password');
    const toggleBtn = document.createElement('i');
    toggleBtn.className = 'fas fa-eye password-toggle';
    passInput?.parentElement?.appendChild(toggleBtn);

    toggleBtn.onclick = () => {
      if (passInput.type === 'password') {
        passInput.type = 'text';
        toggleBtn.className = 'fas fa-eye-slash password-toggle';
      } else {
        passInput.type = 'password';
        toggleBtn.className = 'fas fa-eye password-toggle';
      }
    };
  }

  async handleLogin(e) {
    e.preventDefault();
    const username = this.form.username.value;
    const password = this.form.password.value;

    if (!username || !password) {
      alert('Vui lòng nhập đầy đủ thông tin!');
      return;
    }

    try {
      console.log('Đăng nhập với:', {username, password});
      window.location.href = 'main.html';
    } catch (err) {
      alert('Có lỗi khi đăng nhập!');
      console.error(err);
    }
  }

  async handleGoogleLogin() {
    try {
      await this.loadGoogleSDK();

      google.accounts.id.initialize({
        client_id: CONFIG.AUTH.GOOGLE_CLIENT_ID,
        callback: this.handleGoogleCallback.bind(this)
      });

      google.accounts.id.prompt();

    } catch (err) {
      alert('Lỗi đăng nhập Google!');
      console.error(err);
    }
  }

  async loadGoogleSDK() {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  async handleGoogleCallback(response) {
    try {
      console.log('Google token:', response.credential);
      window.location.href = 'main.html';
    } catch (err) {
      alert('Lỗi xác thực Google!');
      console.error(err);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new LoginForm();
});