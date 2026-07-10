export default {
  title: 'Components/Flow/Log-In',
  render: () => `
    <div class="ea-login-card">
      <div class="ea-login-card__logo-row">
        <div class="ea-header__logo">EA</div>
        <span class="ea-header__brand" style="font-size:22px;">Enroll App</span>
      </div>
      <h2 class="ea-login-card__title">Sign In</h2>
      <label class="ea-field">
        <span class="ea-field__label">Email or Username</span>
        <input class="ea-input" placeholder="name@example.com">
      </label>
      <label class="ea-field">
        <span class="ea-field__label">Password</span>
        <input class="ea-input" type="password" placeholder="••••••••">
      </label>
      <div class="ea-login-card__actions">
        <div class="ea-checkbox-row">
          <button class="ea-checkbox" role="checkbox" aria-checked="false"></button>
          <span class="ea-checkbox-label">Remember Me</span>
        </div>
        <a href="#" style="color:var(--ea-color-text-link);">Forgot Password</a>
      </div>
      <div class="ea-login-card__buttons">
        <button class="ea-btn ea-btn--outline">Create Account</button>
        <button class="ea-btn ea-btn--primary">Sign In</button>
      </div>
    </div>`,
};

export const SignIn = {};
