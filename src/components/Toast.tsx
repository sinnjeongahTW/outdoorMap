import useToast from '@globals/useToast';
import useResize from '@hooks/useResize';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import IconClose from '@assets/images/close.svg?react';

const TOAST_WIDTH = 350;
const CLOSE_TIME = 1.5; // 3초
const ToastItem = ({
	id,
	message,
	isStatic,
	closeTime,
	status,
}: {
	id: string;
	message: string;
	isStatic: boolean;
	closeTime: number;
	status: string;
}) => {
	const { width: windowWidth } = useResize();
	const left = windowWidth / 2 - TOAST_WIDTH / 2;

	const handleClose = () => {
		useToast.getState().removeToast(id);
	};

	useEffect(() => {
		let timer: ReturnType<typeof setTimeout> | null = null;
		if (!isStatic) {
			timer = setTimeout(() => {
				useToast.getState().removeToast(id);
			}, closeTime * 1000);
		}

		return () => {
			if (timer) clearTimeout(timer);
		};
	}, [isStatic, id, closeTime]);

	return (
		<div key={id} className={status} style={{ width: `${TOAST_WIDTH}px`, left: `${left}px` }}>
			{message}
			{isStatic && (
				<button className='tct-btn-transparent' onClick={handleClose}>
					<IconClose width={20} height={20} stroke='#fff' />
				</button>
			)}
		</div>
	);
};

export default function Toast() {
	const toasts = useToast((state) => state.toasts);
	return createPortal(
		<div className='absolute top-5 z-[60] flex flex-col gap-2 w-full items-center justify-center'>
			{toasts
				.filter((item) => {
					return item.message && item.message.length > 0;
				})
				.map((item) => (
					<ToastItem
						key={item.id}
						id={item.id}
						message={item.message}
						isStatic={item.isStatic || false}
						closeTime={item.closeTime || CLOSE_TIME}
						status={`tct-toast-${item.type}`}
					/>
				))}
		</div>,
		document.body,
	);
}
