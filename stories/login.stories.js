export default {
  title: 'Components/Flow/Log-In',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Sign-in card: logo, title, email/password fields, Remember Me, Forgot Password link, and action buttons. **Scope note:** only the Sign-In screen is built. The legacy 2021 file's multi-step Register flow is explicitly deferred (tracked in \`DESIGN-SYSTEM-AUDIT.md\`, not silently missing).

**Accessibility:** inherits Text Input's label association and Checkbox's ARIA pattern for "Remember Me." **Recommend:** wrap the whole card in a \`<form>\` with a submit handler on the "Sign In" button (\`type="submit"\`) rather than a bare \`<button>\`, so Enter-to-submit works from either field.`,
      },
    },
  },
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
