const title = document.getElementById('title');
const message = document.getElementById('message');

const setError = (titleTxt, messageTxt) => {
	title.textContent = titleTxt || 'Something went wrong';
	message.textContent = messageTxt || 'The link is invalid or has expired.';
};

const isMobile = /Android|iPhone/i.test(navigator.userAgent);

if (!isMobile) {
	setError(
		'Open in CastWell App',
		'For security reasons, password resets can only be completed from the Castwell app. Please open this email on your phone where the Castwell app is installed to continue.',
	);
} else {
	const hash = new URLSearchParams(window.location.hash.substring(1));
	const appUrl = 'castwellapp://reset-password' + hash;

	const error = hash.get('error');
	const errorDescription = hash.get('error_description');
	const type = hash.get('type');
	const access_token = hash.get('access_token');

	if (error || errorDescription || type !== 'recovery') {
		setError('', errorDescription?.replaceAll('+', ' '));
	} else {
		if (!access_token) {
			setError();
		} else {
			title.textContent = 'Opening Castwell…';
			message.textContent =
				'Please make sure the Castwell app is installed on this phone. We’ll open it automatically to continue resetting your password.';

			window.location.href = appUrl;
		}
	}
}
