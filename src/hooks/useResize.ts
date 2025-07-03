import { useEffect, useState } from 'react';

export default function useResize() {
	const [width, setWidth] = useState(window.innerWidth);
	const [height, setHeight] = useState(window.innerHeight);

	useEffect(() => {
		const handleResize = () => {
			const { width, height } = document.body.getBoundingClientRect();
			setWidth(width);
			setHeight(height);
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return {
		width,
		height,
	};
}
