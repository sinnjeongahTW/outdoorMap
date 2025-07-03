import { create } from 'zustand';
import langJson from '@constants/error.json';
import lang from '@utils/lang';

const defaultErrorJson: Record<string, string> = langJson;

interface ErrorStore {
	error: Record<string, string>;
	getErrorJsonFile: (fileName: string) => void;
	getErrorString: (key: number) => string;
}

const useServerError = create<ErrorStore>((set, get) => ({
	error: defaultErrorJson,
	getErrorJsonFile: async (fileName: string) => {
		const response = await fetch(fileName);
		// console.log(response);
		try {
			if (response.ok) {
				const contentType = response.headers.get('content-type');
				if (!contentType || !contentType.includes('application/json')) {
					throw new Error('Invalid JSON response');
				}

				const error = await response.json();

				set({
					error,
				});
			}
		} catch (e) {
			console.log((e as Error).message);
		}
	},
	getErrorString: (key: number) => {
		const { error } = get();
		return (
			error[key.toString()] ||
			defaultErrorJson[key.toString()] ||
			lang('server.error.unknown', { code: key.toString() })
		);
	},
}));

export default useServerError;
