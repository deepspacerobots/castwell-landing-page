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

	const error = hash.get('error');
	const errorDescription = hash.get('error_description');
	const type = hash.get('type');
	const access_token = hash.get('access_token');
	const refresh_token = hash.get('refresh_token');
	const token_type = hash.get('token_type');
	const expires_at = hash.get('expires_at');
	const expires_in = hash.get('expires_in');

	// Deeplink URL to open the Castwell app with the necessary parameters
	const appUrl = `castwellapp://forgot-password?access_token=${access_token}&type=${type}&refresh_token=${refresh_token}&token_type=${token_type}&expires_at=${expires_at}&expires_in=${expires_in}`;

	if (error || errorDescription || type !== 'recovery') {
		setError('', errorDescription?.replaceAll('+', ' '));
	} else {
		if (!access_token) {
			setError();
		} else {
			title.textContent = 'Opening Castwell…';
			message.textContent =
				'Please make sure the Castwell app is installed on this phone. We’ll open it automatically to continue resetting your password.';

			// Redirect to the app
			window.location.href = appUrl;
		}
	}
}
