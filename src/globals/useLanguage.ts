import { create } from 'zustand';
import langJson from '@constants/lang.json';

const defaultLangJson: Record<string, string> = langJson;

interface LanguageStore {
	lang: Record<string, string>;
	getLangJsonFile: (fileName: string) => void;
	getLangString: (key: string, params?: Record<string, string>) => string;
}

const useLanguage = create<LanguageStore>((set, get) => ({
	lang: defaultLangJson,
	getLangJsonFile: async (fileName: string) => {
		const response = await fetch(fileName);
		console.log(response);
		try {
			if (response.ok) {
				const contentType = response.headers.get('content-type');
				if (!contentType || !contentType.includes('application/json')) {
					throw new Error('Invalid JSON response');
				}

				const lang = await response.json();

				set({
					lang,
				});
			}
		} catch (e) {
			console.log((e as Error).message);
		}
	},
	getLangString: (key: string, params?: Record<string, string>) => {
		const { lang } = get();

		let str = lang[key] || defaultLangJson[key] || '';

		if (params) {
			Object.entries(params).forEach((item) => {
				const [paramKey, value] = item;
				str = str.replaceAll(`{${paramKey}}`, `${value}`);
			});
		}

		return str;
	},
}));

export default useLanguage;
