<script lang="ts">
	import { t } from '../lib/i18n';

	function iconChar(key: string): string {
		switch (key) {
			case 'github': return '\uf09b';
			case 'youtube': return '\uf167';
			case 'matrix': return '\uf0e8'; /* generic chat; label carries meaning */
			case 'mail': return '\uf0e0';
			case 'link': return '\uf0c1';
			default: return '\uf0c1';
		}
	}

	function skillIcon(skill: string): string {
		const s = skill.toLowerCase();
		if (s.includes('svelte')) return '\ue697';
		if (s.includes('tailwind')) return '\ue6c0';
		if (s.includes('bash')) return '\ue795';
		if (s.includes('linux')) return '\uf17c';
		if (s.includes('git')) return '\ue702';
		if (s.includes('emacs')) return '\ue632';
		if (s.includes('nixos')) return '\uf313';
		if (s.includes('python')) return '\ue73c';
		if (s.includes('sql')) return '\ue706';
		if (s.includes('laravel')) return '\ue73f';
		if (s.includes('tmux')) return '\uebc8';
		if (s.includes('niri')) return '\uf2d0';
		if (s.includes('keyboard')) return '\uf11c';
		return '\uf121';
	}
</script>

<section aria-labelledby="about-heading">
	<h2 id="about-heading">{$t.ui.about}</h2>
	<p>{$t.profile.bio}</p>
</section>

<section aria-labelledby="skills-heading">
	<h2 id="skills-heading">{$t.ui.skills}</h2>
	<ul class="plain skills-list">
		{#each $t.skills as skill}
			<li class="skill"><span class="nf" aria-hidden="true">{skillIcon(skill)}</span> <bdi>{skill}</bdi></li>
		{/each}
	</ul>
</section>

<section aria-labelledby="projects-heading">
	<h2 id="projects-heading">{$t.ui.projects}</h2>
	<div class="projects">
		{#each $t.projects as project}
			<article class="project">
				<div class="project-head">
					<h3>
						{#if project.url}
							<a href={project.url} rel="noopener noreferrer"><bdi>{project.name}</bdi></a>
						{:else}
							<bdi>{project.name}</bdi>
						{/if}
					</h3>
					{#if project.wip}
						<span class="wip">{$t.ui.wip}</span>
					{/if}
				</div>
				<p>{project.desc}</p>
				<ul class="tech" aria-label="tech">
					{#each project.tech as item}
						<li><bdi>{item}</bdi></li>
					{/each}
				</ul>
			</article>
		{/each}
	</div>
</section>

<section aria-labelledby="links-heading">
	<h2 id="links-heading">{$t.ui.links}</h2>
	<ul class="plain links-list">
		{#each $t.links as link}
			<li>
				<a href={link.url} rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}>
					<span class="nf" aria-hidden="true">{iconChar(link.icon)}</span>
					<span class="label">{link.label}:</span>
					<span class="text"><bdi>{link.text}</bdi></span>
				</a>
			</li>
		{/each}
	</ul>
</section>
