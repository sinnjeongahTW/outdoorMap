import useLanguage from '@globals/useLanguage';

export default function lang(paramskey: string, params?: Record<string, string>) {
	const { getLangString } = useLanguage.getState();
	return getLangString(paramskey, params);
}
