import { produce } from 'immer';
import { create } from 'zustand';
interface ToastParam {
	message: string;
	type: 'success' | 'error' | 'info';
	isStatic?: boolean;
	closeTime?: number; // 초 단위 입력
}
interface Toast extends ToastParam {
	id: string;
}
interface ToastStore {
	toasts: Toast[];
	addToast: (param: ToastParam) => void;
	removeToast: (id: string) => void;
}
const useToast = create<ToastStore>((set) => ({
	toasts: [],
	addToast: (param: ToastParam) => {
		const id = crypto.randomUUID();

		set(
			produce((draft) => {
				draft.toasts.push({ ...param, id });
			}),
		);
	},
	removeToast: (id: string) => {
		set(
			produce((draft) => {
				const idx = draft.toasts.findIndex((toast: Toast) => toast.id === id);

				if (idx > -1) {
					draft.toasts.splice(idx, 1);
				}
			}),
		);
	},
}));

export default useToast;
