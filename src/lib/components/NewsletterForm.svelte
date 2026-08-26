<script lang="ts">
  import { z } from "zod";
  import { DISTRICT } from "$lib/data/content";
  import { supabase } from "$lib/integrations/supabase/client";

  let { compact = false }: { compact?: boolean } = $props();

  const schema = z.object({
    name: z.string().trim().max(100).optional(),
    email: z.string().trim().email("Please enter a valid email address").max(255),
    country: z.string().max(60).optional(),
  });

  let status: "idle" | "loading" | "done" | "error" = $state("idle");
  let errorMsg: string | null = $state(null);

  async function onSubmit(e: Event) {
    e.preventDefault();
    errorMsg = null;
    const form = e.currentTarget as HTMLFormElement;
    const fd = new FormData(form);
    const parsed = schema.safeParse({
      name: (fd.get("name") as string) || undefined,
      email: fd.get("email"),
      country: (fd.get("country") as string) || undefined,
    });
    if (!parsed.success) {
      errorMsg = parsed.error.issues[0]?.message ?? "Invalid input";
      return;
    }
    status = "loading";
    const { error: err } = await supabase.from("newsletter_subscribers").insert({
      email: parsed.data.email,
      name: parsed.data.name ?? null,
      country: parsed.data.country ?? null,
    });
    if (err) {
      status = "error";
      errorMsg =
        err.code === "23505" ? "This email is already subscribed." : "Something went wrong — please try again.";
      return;
    }
    status = "done";
  }
</script>

{#if status === "done"}
  <p class="rounded-sm border-2 border-rotary-gold bg-card p-4 font-semibold text-foreground">
    You're subscribed! Watch your inbox for district End Polio Now updates.
  </p>
{:else}
  <form onsubmit={onSubmit} class={compact ? "flex flex-col gap-3 sm:flex-row" : "grid gap-3"}>
    {#if !compact}
      <input
        name="name"
        placeholder="Your name (optional)"
        maxlength="100"
        class="rounded-sm border border-input bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
      />
    {/if}
    <input
      name="email"
      type="email"
      required
      placeholder="Email address"
      maxlength="255"
      class="flex-1 rounded-sm border border-input bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
    />
    {#if !compact}
      <select
        name="country"
        class="rounded-sm border border-input bg-card px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
      >
        <option value="">Country (optional)</option>
        {#each DISTRICT.countries as c (c)}
          <option value={c}>{c}</option>
        {/each}
      </select>
    {/if}
    <button
      type="submit"
      disabled={status === "loading"}
      class="rounded-sm bg-rotary-red px-6 py-3 text-sm font-bold uppercase tracking-wide text-primary-foreground transition-colors hover:bg-rotary-red-dark disabled:opacity-60"
    >
      {status === "loading" ? "Subscribing…" : "Subscribe"}
    </button>
    {#if errorMsg}
      <p class="text-sm font-semibold text-destructive">{errorMsg}</p>
    {/if}
  </form>
{/if}
