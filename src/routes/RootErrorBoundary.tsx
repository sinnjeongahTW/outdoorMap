import lang from '@utils/lang';
import { useRouteError } from 'react-router';

function RootErrorBoundary() {
	const error = useRouteError();
	console.log(error);

	return (
		<div className='flex flex-col justify-center items-center h-screen'>
			<h1 className='text-5xl font-bold text-slate-300'>{lang('error.wrong.access')}</h1>
			<button
				className='mt-10 bg-slate-400 w-40'
				onClick={() => {
					window.location.replace('/');
				}}>
				{lang('btn.home')}
			</button>
		</div>
	);
}

export default RootErrorBoundary;
