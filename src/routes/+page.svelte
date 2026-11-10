<script lang="ts">
    import { t } from "../lib/i18n";

    function iconChar(key: string): string {
        switch (key) {
            case "github":
                return "\uf09b";
            case "youtube":
                return "\uf16a";
            case "codeberg":
                return "\uf330";
            case "matrix":
                return "\udb81\ude28"; /* generic chat; label carries meaning */
            case "mail":
                return "\uf0e0";
            case "link":
                return "\uf0c1";
            default:
                return "\uf0c1";
        }
    }

    function skillIcon(skill: string): string {
        const s = skill.toLowerCase();
        if (s.includes("svelte")) return "\ue697";
        if (s.includes("tailwind")) return "\udb84\udfff";
        if (s.includes("bash")) return "\ue760";
        if (s.includes("fish")) return "\uee41";
        if (s.includes("linux")) return "\uf17c";
        if (s.includes("git")) return "\ue702";
        if (s.includes("emacs")) return "\ue632";
        if (s.includes("nixos")) return "\uf313";
        if (s.includes("python")) return "\ue73c";
        if (s.includes("zig")) return "\ue6a9";
        if (s.includes("c_lang")) return "\ue771";
        if (s.includes("sql")) return "\ue706";
        if (s.includes("laravel")) return "\ue73f";
        if (s.includes("tmux")) return "\uebc8";
        if (s.includes("niri")) return "\uf2d0";
        if (s.includes("noctalia")) return "\uf186";
        if (s.includes("foot")) return "\uf489";
        if (s.includes("keyboard")) return "\uf11c";
        if (s.includes("pi-agent")) return "\ue22c";
        return "\uf121";
    }
    function skillColor(skill: string): string {
        const s = skill.toLowerCase();
        if (s.includes("zig")) return "var(--yellow)";
        if (s.includes("git")) return "var(--red)";
        if (s.includes("emacs")) return "var(--magenta)";
        if (s.includes("svelte")) return "var(--orange)";
        if (s.includes("tailwind")) return "var(--cyan)";
        if (s.includes("bash")) return "var(--green)";
        if (s.includes("fish")) return "var(--green)";
        if (s.includes("linux")) return "var(--yellow)";
        if (s.includes("nixos")) return "var(--blue)";
        if (s.includes("python")) return "var(--blue)";
        if (s.includes("c_lang") || s === "c") return "var(--blue)";
        if (s.includes("sql")) return "var(--cyan)";
        if (s.includes("laravel")) return "var(--red)";
        if (s.includes("tmux")) return "var(--green)";
        if (s.includes("niri")) return "var(--orange)";
        if (s.includes("noctalia")) return "var(--magenta)";
        if (s.includes("foot")) return "var(--green)";
        if (s.includes("keyboard")) return "var(--orange)";
        if (s.includes("pi-agent") || s.includes("pi agent")) return "var(--magenta)";
        return "var(--fg)";
    }
</script>

<section aria-labelledby="about-heading">
    <h2 id="about-heading">{$t.ui.about}</h2>
    <p class="bio">{$t.profile.bio}</p>
</section>

<section aria-labelledby="skills-heading">
    <h2 id="skills-heading">{$t.ui.skills}</h2>
    <ul class="plain skills-list">
        {#each $t.skills as skill}
            <li class="skill" style="--skill-color: {skillColor(skill)}">
                <span class="nf" aria-hidden="true">{skillIcon(skill)}</span>
                <bdi>{skill}</bdi>
            </li>
        {/each}
    </ul>
</section>

<section aria-labelledby="env-heading">
    <h2 id="env-heading">{$t.ui.env}</h2>
    <ul class="plain skills-list">
        {#each $t.env as item}
            <li class="skill" style="--skill-color: {skillColor(item)}">
                <span class="nf" aria-hidden="true">{skillIcon(item)}</span>
                <bdi>{item}</bdi>
            </li>
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
                            <a href={project.url} rel="noopener noreferrer"
                                ><bdi>{project.name}</bdi></a
                            >
                        {:else}
                            <bdi>{project.name}</bdi>
                        {/if}
                    </h3>
                    {#if project.codeberg}
                        <a class="alt-link" href={project.codeberg} rel="noopener noreferrer" aria-label="Codeberg: {project.name}"><span class="nf" aria-hidden="true">{iconChar("codeberg")}</span> <span>Codeberg</span></a>
                    {/if}
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
                <a
                    href={link.url}
                    rel={link.url.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined}
                >
                    <span class="nf" aria-hidden="true"
                        >{iconChar(link.icon)}</span
                    >
                    <span class="label">{link.label}:</span>
                    <span class="text"><bdi>{link.text}</bdi></span>
                </a>
            </li>
        {/each}
    </ul>
</section>
