import FallbackLoading from '@components/FallbackLoading';
import Toast from '@components/Toast';
import { Suspense } from 'react';
import { Outlet } from 'react-router';

export default function AuthLayout() {
	return (
		<main className='flex flex-col w-full relative'>
			<Toast />
			<div className='relative w-full'>
				<Suspense fallback={<FallbackLoading />}>
					<Outlet />
				</Suspense>
			</div>
		</main>
	);
}
