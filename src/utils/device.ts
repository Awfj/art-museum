export const getImageWidth = (): number => {
	const width = window.innerWidth;

	if (width >= 480) {
		return 843;
	} else {
		return 400;
	}
};
