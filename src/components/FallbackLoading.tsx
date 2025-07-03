import { createPortal } from 'react-dom';
import IconLoading from '@assets/images/loading.svg?react';

export default function FallbackLoading() {
	return createPortal(
		<>
			<div className={`z-30 bg-white w-full h-lvh fixed top-0`} role='dialog' />
			<div className='w-full absolute z-40 h-lvh flex justify-center items-center top-0'>
				<button className='rounded-3xl p-5 shadow-box'>
					<IconLoading className='w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-[#000]' />
				</button>
			</div>
		</>,
		document.body,
	);
}
