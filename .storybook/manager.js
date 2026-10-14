// Redirect old story URLs (bookmarks, browser history) to their renamed ids.
// Runs before the manager router reads the URL.
const RENAMED = {
  'components-navigation-header-footer-leftnav': {
    to: 'components-navigation-header-footer',
    stories: { header: 'all-user-types' },
  },
};

try {
  const url = new URL(window.location.href);
  const path = url.searchParams.get('path');
  const m = path && path.match(/^\/(story|docs)\/([^/]+?)--([^/]+)$/);
  if (m && RENAMED[m[2]]) {
    const { to, stories = {} } = RENAMED[m[2]];
    url.searchParams.set('path', `/${m[1]}/${to}--${stories[m[3]] || m[3]}`);
    window.history.replaceState(null, '', url.toString());
  }
} catch { /* never block the manager */ }
