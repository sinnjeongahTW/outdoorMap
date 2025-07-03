import { create } from 'zustand';

interface ConfigStore {
	LANG: string;
	IS_LOCALTIME_ENABLED: boolean;
	MAP_TILES_URL: string;
	getConfigJson: () => void;
}

const CUSTOM_KEYS = ['LANG', 'IS_LOCALTIME_ENABLED', 'MAP_TILES_URL'];
const CONFIG_JSON_FILE_NAME = import.meta.env.VITE_CONFIG_JSON;
const useConfig = create<ConfigStore>((set) => ({
	LANG: '',
	IS_LOCALTIME_ENABLED: true,
	MAP_TILES_URL: import.meta.env.VITE_MAP_TILES_URL,
	getConfigJson: async () => {
		const response = await fetch(`/${CONFIG_JSON_FILE_NAME}`);
		if (response.status === 200) {
			const data = await response.json();
			const customValues = {};
			if (data.env) {
				const customKeys = Object.keys(data.env).filter((key) => CUSTOM_KEYS.includes(key));

				customKeys.forEach((key) => {
					let keyValue = data.env[key].value;
					if (key.endsWith('_URL')) {
						keyValue = (keyValue as string).endsWith('/')
							? keyValue.slice(0, keyValue.length - 1)
							: keyValue;
					}

					Object.assign(customValues, { [key]: keyValue });
				});
			}

			if (import.meta.env.MODE === 'development') {
				Object.assign(customValues, {
					MAP_TILES_URL: import.meta.env.VITE_MAP_TILES_URLL,
				});
			}
			if (Object.keys(customValues).length > 0) {
				set(customValues);
			}
		} else {
			console.log(`${CONFIG_JSON_FILE_NAME} file error`);
		}
	},
}));

export default useConfig;
