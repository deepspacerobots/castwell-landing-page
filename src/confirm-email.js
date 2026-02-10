const title = document.getElementById("title");
const message = document.getElementById("message");

const hash = new URLSearchParams(window.location.hash.substring(1));

const error = hash.get("error");
const errorDescription = hash.get("error_description");
const type = hash.get("type");
const access_token = hash.get("access_token");
const expires_at = hash.get("expires_at");

const isMobile = /Android|iPhone/i.test(navigator.userAgent);

const setError = () => {
  title.textContent = "Something went wrong";
  message.textContent =
    errorDescription?.replaceAll("+", " ") ||
    "The link is invalid or has expired.";
};

const appUrl = `castwellapp://validate-email`;

if (error || type !== "email_change") {
  setError();
} else {
  // const now = new Date();
  if (!access_token) {
    setError();
  } else {
    title.textContent = 'Email verified successfully';
		message.textContent =
			'Your email address has been successfully verified. You can now close this window and continue using CastWell without any issues.' +
			(isMobile ? ' The app will open in a moment.' : '');
		window.location.href = appUrl;
  }
}
