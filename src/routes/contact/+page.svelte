<script lang="ts">
  import { z } from "zod";
  import NewsletterForm from "$lib/components/NewsletterForm.svelte";
  import { DISTRICT } from "$lib/data/content";

  const contactSchema = z.object({
    name: z.string().trim().min(1, "Name is required").max(100),
    email: z.string().trim().email("Please enter a valid email address").max(255),
    subject: z.string().trim().min(1, "Subject is required").max(150),
    message: z.string().trim().min(10, "Message must be at least 10 characters").max(2000),
  });

  let status: "idle" | "done" = $state("idle");
  let errorMsg: string | null = $state(null);

  function onSubmit(e: Event) {
    e.preventDefault();
    errorMsg = null;
    const form = e.currentTarget as HTMLFormElement;
    const fd = new FormData(form);
    const parsed = contactSchema.safeParse({
      name: fd.get("name"),
      email: fd.get("email"),
      subject: fd.get("subject"),
      message: fd.get("message"),
    });
    if (!parsed.success) {
      errorMsg = parsed.error.issues[0]?.message ?? "Invalid input";
      return;
    }
    const mailto = `mailto:polioplus@rotary9210.org?subject=${encodeURIComponent(
      `[Website] ${parsed.data.subject}`,
    )}&body=${encodeURIComponent(`${parsed.data.message}\n\n— ${parsed.data.name} (${parsed.data.email})`)}`;
    location.href = mailto;
    status = "done";
  }
</script>

<svelte:head>
  <title>Contact & Newsletter — District 9210 End Polio Now</title>
</svelte:head>

<div>
  <section class="bg-rotary-red text-primary-foreground">
    <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
      <p class="text-sm font-bold uppercase tracking-[0.25em] text-rotary-gold">Reach Out</p>
      <h1 class="mt-2 font-display text-6xl tracking-wide sm:text-7xl">Contact Us</h1>
    </div>
  </section>

  <section class="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2">
    <div>
      <h2 class="font-display text-4xl tracking-wide text-foreground">Send a message</h2>
      <p class="mt-3 text-muted-foreground">
        Questions about PolioPlus, immunization days or starting a campaign? The district PolioPlus committee will get
        back to you.
      </p>
      {#if status === "done"}
        <p class="mt-6 rounded-sm border-2 border-rotary-gold bg-card p-4 font-semibold text-foreground">
          Your email app should have opened with the message ready to send. Thank you!
        </p>
      {:else}
        <form onsubmit={onSubmit} class="mt-6 grid gap-4">
          <input
            name="name"
            required
            placeholder="Your name"
            maxlength="100"
            class="rounded-sm border border-input bg-card px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <input
            name="email"
            type="email"
            required
            placeholder="Email address"
            maxlength="255"
            class="rounded-sm border border-input bg-card px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <input
            name="subject"
            required
            placeholder="Subject"
            maxlength="150"
            class="rounded-sm border border-input bg-card px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <textarea
            name="message"
            required
            placeholder="Your message"
            rows="5"
            maxlength="2000"
            class="rounded-sm border border-input bg-card px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          ></textarea>
          {#if errorMsg}<p class="text-sm font-semibold text-destructive">{errorMsg}</p>{/if}
          <button
            type="submit"
            class="rounded-sm bg-rotary-red px-6 py-3 font-display text-xl tracking-wide text-primary-foreground transition-colors hover:bg-rotary-red-dark"
          >
            Send message
          </button>
        </form>
      {/if}

      <div class="mt-10 space-y-3 text-sm text-muted-foreground">
        <p class="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="h-4 w-4 text-rotary-red"
            ><rect width="20" height="16" x="2" y="4" rx="2" /><path
              d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"
            /></svg
          >
          polioplus@rotary9210.org
        </p>
        <p class="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="h-4 w-4 text-rotary-red"
            ><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg
          >
          {DISTRICT.countries.join(" · ")}
        </p>
      </div>
    </div>

    <div class="rounded-sm bg-cream p-8">
      <h2 class="font-display text-4xl tracking-wide text-foreground">District Newsletter</h2>
      <p class="mt-3 text-muted-foreground">
        Monthly End Polio Now updates: campaign results, upcoming immunization days, stories from the field and
        PolioPlus Society news. No spam &mdash; unsubscribe anytime.
      </p>
      <div class="mt-6">
        <NewsletterForm />
      </div>
    </div>
  </section>
</div>
