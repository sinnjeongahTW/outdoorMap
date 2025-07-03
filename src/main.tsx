import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@assets/default.css';
import { enableMapSet } from 'immer';
import { createBrowserRouter, RouterProvider } from 'react-router';
import useConfig from '@globals/useConfig';
import useLanguage from '@globals/useLanguage';
import lang from '@utils/lang';
import routes from './routes';
// import useServerError from '@globals/useServerError';

enableMapSet();

(async () => {
	await useConfig.getState().getConfigJson();
	const { LANG } = useConfig.getState();

	await useLanguage
		.getState()
		.getLangJsonFile(`lang${LANG === 'ko' || LANG === '' ? '' : `.${LANG}`}.json`);

	// await useServerError
	// 	.getState()
	// 	.getErrorJsonFile(`error${LANG === 'ko' || LANG === '' ? '' : `.${LANG}`}.json`);

	const browserRouter = createBrowserRouter(routes);

	createRoot(document.getElementById('root')!).render(
		<StrictMode>
			<RouterProvider router={browserRouter} />
		</StrictMode>,
	);

	if (__BUILD_DATE_VERSION__) {
		console.log(
			`%c##### TWINNY LASTMILE FRONT-END INFO ##### \n\n%c${lang('main.build.date', { date: new Date(__BUILD_DATE_VERSION__).toLocaleString() })}\n`,
			'color:#dcdcdc;font-size:12px;font-weight:bold',
			'color:#004CFF;font-size:12px;font-weight:bold',
		);
	}
})();
