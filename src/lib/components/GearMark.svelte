<script lang="ts">
  let { class: className = "" }: { class?: string } = $props();
</script>

<svg viewBox="0 0 100 100" class={className} role="img" aria-label="Rotary gear wheel mark">
  <g fill="currentColor">
    {#each Array.from({ length: 24 }, (_, i) => (i * 360) / 24) as a (a)}
      <rect x="46.6" y="0.5" width="6.8" height="12" rx="1.5" transform="rotate({a} 50 50)" />
    {/each}
    <circle cx="50" cy="50" r="42" />
  </g>
  <circle cx="50" cy="50" r="34" style="fill: var(--gear-hole, transparent)" />
  <g fill="currentColor">
    {#each Array.from({ length: 6 }, (_, i) => (i * 360) / 6) as a (a)}
      <rect x="46.5" y="16" width="7" height="34" transform="rotate({a + 30} 50 50)" />
    {/each}
    <circle cx="50" cy="50" r="11" />
  </g>
  <circle cx="50" cy="50" r="5.5" style="fill: var(--gear-hole, transparent)" />
  <rect x="48" y="41.5" width="4" height="6" style="fill: var(--gear-hole, transparent)" />
</svg>
