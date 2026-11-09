<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { lang, t, initI18n, setLang } from '../lib/i18n';
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();

	onMount(() => {
		initI18n();
	});

	const dir = $derived($lang === 'ar' ? 'rtl' : 'ltr');
</script>

<svelte:head>
	<title>{$t.meta.title}</title>
	<meta name="description" content={$t.meta.description} />
	<meta property="og:title" content={$t.meta.title} />
	<meta property="og:description" content={$t.meta.description} />
	<meta property="og:type" content="website" />
	<meta property="og:locale" content={$lang === 'ar' ? 'ar' : 'en'} />
	<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
</svelte:head>

<a class="skip-link" href="#content">{$t.ui.skipToContent}</a>

<div class="page" {dir}>
	<header class="site-header">
		<div class="brand">
			<h1><bdi>{$t.profile.name}</bdi> <span style="color:var(--muted)">/</span> <bdi>{$t.profile.handle}</bdi></h1>
			<p class="role"><bdi>{$t.profile.role}</bdi></p>
		</div>
		<div class="lang-toggle" role="group" aria-label={$t.ui.toggleLang}>
			<button type="button" aria-pressed={$lang === 'en'} onclick={() => setLang('en')}>EN</button>
			<span class="lang-sep" aria-hidden="true">|</span>
			<button type="button" aria-pressed={$lang === 'ar'} onclick={() => setLang('ar')}>عربي</button>
		</div>
	</header>

	<main id="content" tabindex="-1">
		{@render children()}
	</main>

	<footer class="modeline" aria-label="status">
		<span><span class="nf" aria-hidden="true">&#xf1ab;</span> <bdi>{$lang.toUpperCase()}</bdi> <span aria-hidden="true">|</span> <bdi>{dir.toUpperCase()}</bdi></span>
		<span><bdi>abu_jandal</bdi> <span aria-hidden="true">—</span> <bdi>Melange</bdi></span>
	</footer>
</div>
