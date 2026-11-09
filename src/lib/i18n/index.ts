import { writable, derived } from 'svelte/store';
import en from './en.json';
import ar from './ar.json';

export type Lang = 'en' | 'ar';
export type Dict = typeof en;

const dicts: Record<Lang, Dict> = { en, ar: ar as unknown as Dict };

function detectInitial(): Lang {
	if (typeof localStorage !== 'undefined') {
		const saved = localStorage.getItem('lang');
		if (saved === 'en' || saved === 'ar') return saved;
	}
	if (typeof navigator !== 'undefined') {
		const nav = navigator.language?.toLowerCase() || '';
		if (nav.startsWith('ar')) return 'ar';
	}
	return 'ar';
}

function applyDocument(lang: Lang) {
	if (typeof document === 'undefined') return;
	const dir = lang === 'ar' ? 'rtl' : 'ltr';
	document.documentElement.lang = lang;
	document.documentElement.dir = dir;
}

export const lang = writable<Lang>('ar');
export const t = derived(lang, ($lang) => dicts[$lang]);

export function initI18n() {
	const initial = detectInitial();
	lang.set(initial);
	applyDocument(initial);
	lang.subscribe((value) => {
		applyDocument(value);
		try {
			localStorage.setItem('lang', value);
		} catch {}
	});
}

export function toggleLang() {
	lang.update((l) => (l === 'en' ? 'ar' : 'en'));
}

export function setLang(l: Lang) {
	lang.set(l);
}
