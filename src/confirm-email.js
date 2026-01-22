const title = document.getElementById('title');
const message = document.getElementById('message');

const hash = new URLSearchParams(window.location.hash.substring(1));

const error = hash.get('error');
const errorDescription = hash.get('error_description');
const type = hash.get('type');

if (error) {
	title.textContent = 'Something went wrong';
	message.textContent =
		errorDescription?.replaceAll('+', ' ') ||
		'The link is invalid or has expired.';
} else {
	title.textContent = 'Email verified successfully';
	message.textContent =
		'Your email address has been successfully verified. You can now close this window and continue using Castweel without any issues.';
}
