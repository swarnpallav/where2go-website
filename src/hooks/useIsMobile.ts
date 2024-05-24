import { useEffect, useState } from "react";

const useIsMobile = (threshold = 786): boolean => {
	const isMobileOnMount =
		typeof window === "undefined" ? true : window.matchMedia(`(max-width: ${threshold}px)`).matches;
	const [isMobile, setIsMobile] = useState(isMobileOnMount);

	useEffect(() => {
		const media = window.matchMedia(`(max-width: ${threshold}px)`);
		if (media.matches !== isMobile) {
			setIsMobile(media.matches);
		}
	}, []);

	return isMobile;
};

export default useIsMobile;
