import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router';

export default function useURL() {
	const { pathname, state } = useLocation();
	const [queryParams] = useSearchParams();
	const navigate = useNavigate();
	const [queryString, setQueryString] = useState<{ key: string; val: string }[]>([]);

	const getParam = useCallback((query: string) => queryParams.get(query), [queryParams]);
	const getParamString = useCallback(
		(exceptKeys: string[]) =>
			Array.from(queryParams.keys())
				.filter((key: string) => !exceptKeys.includes(key))
				.map((key: string) => `${key}=${queryParams.get(key)}`)
				.join('&'),
		[queryParams],
	);
	const goURL = useCallback(
		<T>(url: string, options?: { replace?: boolean; state?: T }) =>
			options ? navigate(url, options) : navigate(url),
		[navigate],
	);
	const goBack = useCallback(() => navigate(-1), [navigate]);

	useEffect(() => {
		setQueryString(
			!queryParams
				? []
				: (Array.from(queryParams.keys() ?? {}).map((key: string) => ({
						key,
						val: queryParams.get(key),
					})) as { key: string; val: string }[]),
		);
	}, [queryParams]);

	return {
		pathname,
		state,
		getParam,
		getParamString,
		goURL,
		goBack,
		queryString,
	};
}
