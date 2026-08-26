<script lang="ts">
  let { class: className = "" }: { class?: string } = $props();
</script>

<svg viewBox="0 0 48 64" class={className} role="img" aria-label="Vaccine drop icon">
  <path d="M24 2C24 2 4 30 4 44a20 20 0 0 0 40 0C44 30 24 2 24 2Z" fill="currentColor" />
  <circle cx="17" cy="44" r="5" style="fill: var(--drop-shine, rgba(255,255,255,0.45))" />
</svg>
