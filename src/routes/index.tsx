import { lazy } from 'react';
import { redirect } from 'react-router';
import FallbackLoading from '@components/FallbackLoading';
import AuthLayout from './_layout/AuthLayout';
import RootErrorBoundary from './RootErrorBoundary';

const Main = lazy(() => import('./main/Monitoring'));

const routes = [
	{
		element: <AuthLayout />,
		// loader: wsLoader,
		errorElement: <RootErrorBoundary />,
		/* 
			react version up 이후, SSR이 아님에도 브라우저에서 아래 warning이 발생함.
			- No HydrateFallback element provided to render during initial hydration Error Component Stack 
			특별한 해결 방법을 찾을 수는 없었으나 
			https://github.com/remix-run/react-router/issues/12699#issuecomment-2655713028 링크를 참조해서 
			hydrateFallbackElement key와 값을 지정하니 warning은 사라졌음. 
			react version 문제라기 보다는 vite 사용으로 인한 문제가 아닐까 추측함. 
		*/
		hydrateFallbackElement: <FallbackLoading />,
		children: [
			{
				path: '/',
				loader: () => redirect('/main'),
			},
			{
				path: 'main',
				element: <Main />,
			},
		],
	},
];

export default routes;
