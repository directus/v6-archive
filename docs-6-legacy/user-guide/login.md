# Login

If you attempt to access Directus without being authenticated, you will be directed to the login page. Once successfully logged in, if you were initially following a link to a certain page you will be redirected there – otherwise you'll be taken to the last page you visited within Directus.

> **Version and Commit Hash:** The Directus version is displayed at the bottom of the login screen. Hovering over this will reveal the exact git commit hash of your version.

### Forgot Password
Directus salts and securely encrypts your password, so not even admins can see your actual password in plain-text. Therefore no one can tell you what your password is – if forgotten, it must be reset. To reset your password, navigate to the login page, fill in your email address, and click the "?" icon within the password input. You will then receive an email with a link to reset your password that expires after a short period of time.

### Logging Out
It's a good habit to log out of Directus when not actively using it – especially on public computers/devices. The logout button is located in the user menu, accessible when hovering over your avatar/name in the bottom-left corner of the screen. Administrators of your system may choose to set an Auto Logout Duration for idle users – by default this is set to 1 hour.

> **Security Note:** Leaving your computer awake and unattended while your Directus user is logged-in could result in a security breach.