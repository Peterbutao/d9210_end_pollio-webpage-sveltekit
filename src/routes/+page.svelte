<script lang="ts">
  import { onMount } from "svelte";
  import Chart from "chart.js/auto";
  import VaccineDrop from "$lib/components/VaccineDrop.svelte";
  import Map from "$lib/components/map.svelte";
  import {
    CAMPAIGN_STATS,
    CASES_BY_YEAR,
    CLUBS,
    COVERAGE_BY_YEAR,
    DISTRICT,
    NEWS,
    PROJECTS,
    formatNumber,
    formatUsd,
  } from "$lib/data/content";

  const volunteersImages = [
    { src: "/VOL.jpg", alt: "Rotary volunteers in red vests carrying vaccine carriers along a dusty road at sunset" },
    { src: "/D9210.jpg", alt: "Health workers vaccinating children at an outdoor immunization day" },
    { src: "/VAC.jpg", alt: "Polio vaccination outreach in the field" },
  ];
  let volunteersIndex = $state(0);
  let volunteersPaused = $state(false);
  let volunteersTimer = $state<ReturnType<typeof setTimeout>>();

  const heroImages = ["/hero-caro(1).jpg", "/hero-caro(2).jpg", "/hero-caro(3).jpg"];
  const AUTOPLAY_MS = 3000;
  let heroIndex = $state(0);
  let heroPaused = $state(false);
  let autoplayTimer = $state<ReturnType<typeof setTimeout>>();

  function nextHeroImage() {
    heroIndex = (heroIndex + 1) % heroImages.length;
  }

  function prevHeroImage() {
    heroIndex = (heroIndex - 1 + heroImages.length) % heroImages.length;
  }

  function startAutoplay() {
    clearTimeout(autoplayTimer);
    autoplayTimer = setTimeout(() => {
      if (!heroPaused) nextHeroImage();
      startAutoplay();
    }, AUTOPLAY_MS);
  }

  function pauseAutoplay() {
    heroPaused = true;
    clearTimeout(autoplayTimer);
  }

  function resumeAutoplay() {
    heroPaused = false;
    startAutoplay();
  }

  function nextVolunteers() {
    volunteersIndex = (volunteersIndex + 1) % volunteersImages.length;
  }

  function startVolunteersAutoplay() {
    clearTimeout(volunteersTimer);
    volunteersTimer = setTimeout(() => {
      if (!volunteersPaused) nextVolunteers();
      startVolunteersAutoplay();
    }, AUTOPLAY_MS);
  }

  function pauseVolunteers() {
    volunteersPaused = true;
    clearTimeout(volunteersTimer);
  }

  function resumeVolunteers() {
    volunteersPaused = false;
    startVolunteersAutoplay();
  }

  const HERO_STATS = [
    { label: "Children vaccinated", value: formatNumber(CAMPAIGN_STATS.childrenVaccinated) },
    { label: "Polio cases prevented", value: formatNumber(CAMPAIGN_STATS.casesPrevented) },
    { label: "Raised for PolioPlus", value: formatUsd(CAMPAIGN_STATS.fundsRaisedUsd) },
    { label: "Countries covered", value: String(CAMPAIGN_STATS.countriesCovered) },
  ];

  let latestNews = $derived(NEWS.slice(0, 3));

  function formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  let countryFilter = $state("all");
  let typeFilter = $state("all");

  const filteredClubs = $derived(
    CLUBS.filter(
      (club) =>
        (countryFilter === "all" || club.country === countryFilter) &&
        (typeFilter === "all" || club.type === typeFilter),
    ),
  );

  function resetFilters() {
    countryFilter = "all";
    typeFilter = "all";
  }

  let heroLogoEl = $state<HTMLImageElement>();
  let heroLogoBottomEl = $state<HTMLImageElement>();

  let coverageCanvas = $state<HTMLCanvasElement>();
  let fundingCanvas = $state<HTMLCanvasElement>();
  let casesCanvas = $state<HTMLCanvasElement>();

  const latestCoverage = COVERAGE_BY_YEAR[COVERAGE_BY_YEAR.length - 1]!;
  const casesPerYear = CASES_BY_YEAR.map((row) => row.Malawi + row.Mozambique + row.Zambia + row.Zimbabwe);

  onMount(() => {
    const charts: Chart[] = [];
    const gridColor = "rgba(0, 0, 0, 0.05)";
    Chart.defaults.font.size = window.matchMedia("(max-width: 640px)").matches ? 10 : 12;

    if (coverageCanvas) {
      // flags for each bar — w80 png from flagcdn (mw,mz,zm,zw) — drawn on top of bars + emoji in labels
      const flagCodes = ["mw", "zm", "zw", "mz"] as const;
      const flagSrcs = flagCodes.map((c) => `https://flagcdn.com/w80/${c}.png`);
      const flagImages = flagSrcs.map((src) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = src;
        return img;
      });

      const flagBarPlugin = {
        id: "flagBars",
        afterDatasetsDraw(chart: Chart) {
          const ctx = chart.ctx as CanvasRenderingContext2D;
          const meta = chart.getDatasetMeta(0);
          // roundRect fallback for older canvas
          const roundRect = (x: number, y: number, w: number, h: number, r: number) => {
            if ((ctx as any).roundRect) {
              (ctx as any).roundRect(x, y, w, h, r);
            } else {
              ctx.moveTo(x + r, y);
              ctx.arcTo(x + w, y, x + w, y + h, r);
              ctx.arcTo(x + w, y + h, x, y + h, r);
              ctx.arcTo(x, y + h, x, y, r);
              ctx.arcTo(x, y, x + w, y, r);
              ctx.closePath();
            }
          };
          meta.data.forEach((bar: any, i: number) => {
            const img = flagImages[i];
            if (!img || !img.complete || !img.naturalWidth) return;
            const { x, y, base, width } = bar.getProps(["x", "y", "base", "width"], true) as {
              x: number;
              y: number;
              base: number;
              width: number;
            };
            const barH = base - y;
            if (barH < 24) return;
            const isMobile = (chart.width ?? 400) < 420;
            // flag badge size scales with bar width
            const flagW = Math.max(22, Math.min(width * 0.72, isMobile ? 30 : 44));
            const flagH = flagW * 0.66; // flag aspect ~3:2
            const flagX = x - flagW / 2;
            // sit ~6px below top inset so borderRadius still visible, centered vertically if bar very short
            const flagY = y + Math.min(8, barH * 0.12);
            // drop shadow under flag for readability on colored bars
            ctx.save();
            ctx.shadowColor = "rgba(0,0,0,0.22)";
            ctx.shadowBlur = 4;
            ctx.shadowOffsetY = 1;
            ctx.beginPath();
            roundRect(flagX, flagY, flagW, flagH, 4);
            ctx.fillStyle = "white";
            ctx.fill();
            ctx.restore();

            ctx.save();
            ctx.beginPath();
            roundRect(flagX, flagY, flagW, flagH, 4);
            ctx.clip();
            // cover-style draw: keep aspect, center crop
            const imgRatio = img.naturalWidth / img.naturalHeight;
            const boxRatio = flagW / flagH;
            let dw = flagW,
              dh = flagH,
              dx = flagX,
              dy = flagY;
            if (imgRatio > boxRatio) {
              dh = flagH;
              dw = dh * imgRatio;
              dx = flagX - (dw - flagW) / 2;
            } else {
              dw = flagW;
              dh = dw / imgRatio;
              dy = flagY - (dh - flagH) / 2;
            }
            ctx.drawImage(img, dx, dy, dw, dh);
            ctx.restore();

            ctx.save();
            ctx.strokeStyle = "rgba(255,255,255,0.95)";
            ctx.lineWidth = 1.4;
            ctx.beginPath();
            roundRect(flagX, flagY, flagW, flagH, 4);
            ctx.stroke();
            ctx.restore();
          });
        },
      };

      const coverageChart = new Chart(coverageCanvas, {
        type: "bar",
        data: {
          // emoji flags as fallback/text — plugin draws crisp raster flags on bars too
          labels: ["\uD83C\uDDF2\uD83C\uDDFC Malawi", "\uD83C\uDDFF\uD83C\uDDF2 Zambia", "\uD83C\uDDFF\uD83C\uDDFC Zimbabwe", "\uD83C\uDDF2\uD83C\uDDFF N. Mozambique"],
          datasets: [
            {
              label: "Vaccination coverage (%)",
              data: [
                latestCoverage.Malawi,
                latestCoverage.Zambia,
                latestCoverage.Zimbabwe,
                latestCoverage.Mozambique,
              ],
              backgroundColor: ["#EE1C25", "#F7A81B", "#EE1C25", "#F7A81B"],
              borderSkipped: false,
              borderRadius: 8,
              barPercentage: 0.68,
              categoryPercentage: 0.78,
            },
          ],
        },
        // @ts-ignore plugin inline
        plugins: [flagBarPlugin as any],
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                title: (items: any) => {
                  const raw = ["Malawi", "Zambia", "Zimbabwe", "N. Mozambique"] as const;
                  const idx = items[0]?.dataIndex ?? 0;
                  const flags = ["\uD83C\uDDF2\uD83C\uDDFC", "\uD83C\uDDFF\uD83C\uDDF2", "\uD83C\uDDFF\uD83C\uDDFC", "\uD83C\uDDF2\uD83C\uDDFF"] as const;
                  return `${flags[idx]} ${raw[idx]}`;
                },
              },
            },
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: { maxRotation: 0, autoSkip: false, padding: 6 },
            },
            y: { beginAtZero: true, max: 100, grid: { color: gridColor } },
          },
        },
      });
      // refresh once flags load (cached usually instant)
      let loaded = 0;
      flagImages.forEach((img) => {
        if (img.complete) loaded++;
        else
          img.addEventListener("load", () => {
            loaded++;
            if (loaded === flagImages.length) coverageChart.update();
            else coverageChart.draw();
          });
        img.addEventListener("error", () => {
          // fallback to emoji only if CDN fails
          coverageChart.update();
        });
      });
      if (loaded === flagImages.length) coverageChart.update();
      charts.push(coverageChart);
    }

    if (fundingCanvas) {
      const fundingPct = Math.round((CAMPAIGN_STATS.fundsRaisedUsd / CAMPAIGN_STATS.fundsTargetUsd) * 100);
      const fundingAmountStr = formatUsd(CAMPAIGN_STATS.fundsRaisedUsd);
      const fundingTargetStr = formatUsd(CAMPAIGN_STATS.fundsTargetUsd);
      const fundingCenterPlugin: any = {
        id: "fundingCenter",
        afterDraw(chart: Chart) {
          const ctx = chart.ctx as CanvasRenderingContext2D;
          const area = (chart as any).chartArea as { left: number; right: number; top: number; bottom: number; width: number } | undefined;
          if (!area) return;
          const cx = (area.left + area.right) / 2;
          const cy = (area.top + area.bottom) / 2;
          // offset slightly up to account for bottom legend taking space visually
          const cyAdj = cy - 6;
          const isSmall = area.width < 300;
          ctx.save();
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          // Amount — large, bold
          ctx.font = `800 ${isSmall ? "18px" : "22px"} Barlow, "Source Sans 3", sans-serif`;
          ctx.fillStyle = "#1F2937";
          ctx.fillText(fundingAmountStr, cx, cyAdj - (isSmall ? 10 : 14));
          // Percent raised — gold accent
          ctx.font = `700 ${isSmall ? "11px" : "13px"} Barlow, "Source Sans 3", sans-serif`;
          ctx.fillStyle = "#D9971E";
          ctx.fillText(`${fundingPct}% raised`, cx, cyAdj + (isSmall ? 7 : 8));
          // Target — muted
          ctx.font = `${isSmall ? "10px" : "11px"} Barlow, "Source Sans 3", sans-serif`;
          ctx.fillStyle = "#6B7280";
          ctx.fillText(`of ${fundingTargetStr} target`, cx, cyAdj + (isSmall ? 19 : 22));
          ctx.restore();
        },
      };
      charts.push(
        new Chart(fundingCanvas, {
          type: "doughnut",
          data: {
            labels: ["Raised", "Remaining"],
            datasets: [
              {
                data: [CAMPAIGN_STATS.fundsRaisedUsd, CAMPAIGN_STATS.fundsTargetUsd - CAMPAIGN_STATS.fundsRaisedUsd],
                backgroundColor: ["#F7A81B", "#E5E7EB"],
                borderWidth: 0,
              },
            ],
          },
          // @ts-ignore inline plugin
          plugins: [fundingCenterPlugin],
          options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: "68%",
            plugins: {
              legend: { position: "bottom", labels: { padding: 20, usePointStyle: true } },
            },
          },
        }),
      );
    }

    if (casesCanvas) {
      charts.push(
        new Chart(casesCanvas, {
          type: "line",
          data: {
            labels: CASES_BY_YEAR.map((row) => row.year),
            datasets: [
              {
                label: "Wild polio cases detected",
                data: [...casesPerYear],
                borderColor: "#EE1C25",
                backgroundColor: "rgba(238, 28, 37, 0.1)",
                fill: true,
                tension: 0.4,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
              y: { beginAtZero: true, grid: { color: gridColor } },
            },
          },
        }),
      );
    }

    startAutoplay();
    startVolunteersAutoplay();

    // Spin hero watermarks on scroll instead of constant animation
    let ticking = false;
    function updateSpin() {
      const r = window.scrollY * 0.2;
      if (heroLogoEl) heroLogoEl.style.transform = `rotate(${r}deg)`;
      if (heroLogoBottomEl) heroLogoBottomEl.style.transform = `rotate(${-r}deg)`;
      ticking = false;
    }
    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateSpin);
      }
    }
    // init position
    updateSpin();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      charts.forEach((chart) => chart.destroy());
      clearTimeout(autoplayTimer);
      clearTimeout(volunteersTimer);
      window.removeEventListener("scroll", onScroll);
    };
  });
</script>

<svelte:head>
  <title>End Polio Now â€” Rotary District 9210</title>
</svelte:head>

<div>
  <section class="relative overflow-hidden bg-rotary-red text-primary-foreground">
    <div class="halftone halftone-white pointer-events-none absolute inset-0" aria-hidden="true"></div>
    <!-- Logo watermarks - fixed corners, half-clipped, spin on scroll, always visible -->
    <div class="pointer-events-none fixed top-0 right-0 z-10 translate-x-1/2 -translate-y-1/2" aria-hidden="true">
      <img
        bind:this={heroLogoEl}
        src="/logo.png"
        alt=""
        width="500"
        height="500"
        class="h-[min(145vw,500px)] w-[min(145vw,500px)] select-none object-contain opacity-30 will-change-transform"
        style="transform: rotate(0deg)"
      />
    </div>
    <div class="pointer-events-none fixed bottom-0 left-0 z-10 -translate-x-1/2 translate-y-1/2" aria-hidden="true">
      <img
        bind:this={heroLogoBottomEl}
        src="/logo.png"
        alt=""
        width="500"
        height="500"
        class="h-[min(145vw,500px)] w-[min(145vw,500px)] select-none object-contain opacity-30 will-change-transform"
        style="transform: rotate(0deg)"
      />
    </div>
    <div class="relative z-10 mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
      <div>
        <div class="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Rotary District 9210 logo"
            class="hero-logo h-20 w-20 object-contain sm:h-40 sm:w-40"
            width="96"
            height="96"
          />
          <p class="text-sm font-bold uppercase tracking-[0.25em] text-rotary-gold">
            {DISTRICT.name}
          </p>
        </div>
        <h1 class="mt-6 font-display text-7xl leading-[0.9] tracking-wide sm:text-8xl lg:text-9xl">
          <span class="block text-rotary-gold">END</span>
          <span class="block">POLIO</span>
          <span class="block text-rotary-gold">NOW</span>
        </h1>
        <p class="mt-6 max-w-md text-lg font-semibold">
          Two drops can change a life. Rotarians and Rotaractors across Malawi, Zambia, Zimbabwe and northern Mozambique
          are finishing the fight against polio.
        </p>
        <div class="mt-8 flex flex-wrap gap-3">
          <a
            href="/get-involved"
            class="inline-flex items-center gap-2 rounded-sm bg-rotary-gold px-6 py-3 font-display text-xl tracking-wide text-charcoal transition-colors hover:bg-rotary-gold-dark hover:text-primary-foreground"
          >
            Join the fight
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg
            >
          </a>
          <a
            href="/statistics"
            class="inline-flex items-center gap-2 rounded-sm border-2 border-primary-foreground px-6 py-3 font-display text-xl tracking-wide transition-colors hover:bg-primary-foreground hover:text-rotary-red"
          >
            See the numbers
          </a>
        </div>
      </div>
      <div class="relative">
        <div
          class="ring-pulse group relative aspect-square overflow-hidden rounded-full border-8 border-rotary-gold"
          role="group"
          aria-roledescription="carousel"
          onmouseenter={pauseAutoplay}
          onmouseleave={resumeAutoplay}
        >
          {#each heroImages as src, i (src)}
            <img
              {src}
              alt="Rotary District 9210 polio eradication campaign photo {(i + 1).toString()}"
              width="1600"
              height="1600"
              loading={i === 0 ? "eager" : "lazy"}
              class="absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 {i === heroIndex
                ? 'opacity-100'
                : 'opacity-0'}"
            />
          {/each}

          <button
            type="button"
            onclick={() => {
              prevHeroImage();
              startAutoplay();
            }}
            aria-label="Previous image"
            class="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-charcoal/50 text-primary-foreground opacity-0 transition-opacity focus-visible:opacity-100 group-hover:opacity-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"><path d="m15 18-6-6 6-6" /></svg
            >
          </button>
          <button
            type="button"
            onclick={() => {
              nextHeroImage();
              startAutoplay();
            }}
            aria-label="Next image"
            class="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-charcoal/50 text-primary-foreground opacity-0 transition-opacity focus-visible:opacity-100 group-hover:opacity-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"><path d="m9 18 6-6-6-6" /></svg
            >
          </button>

          <div class="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
            {#each heroImages as src, i (src)}
              <button
                type="button"
                onclick={() => {
                  heroIndex = i;
                  startAutoplay();
                }}
                aria-label="Go to image {(i + 1).toString()}"
                aria-current={i === heroIndex}
                class="h-2.5 rounded-full transition-all {i === heroIndex
                  ? 'w-6 bg-rotary-gold'
                  : 'w-2.5 bg-primary-foreground/70 hover:bg-primary-foreground'}"
              ></button>
            {/each}
          </div>
        </div>
        <VaccineDrop class="absolute -bottom-5 -left-5 h-16 rotate-[-12deg] text-rotary-gold drop-shadow-lg" />
      </div>
    </div>
  </section>

  <section
    aria-label="Campaign statistics"
    class="relative overflow-hidden border-b-4 border-rotary-red text-charcoal-foreground"
  >
    <img src="/VAC.jpg" alt="" aria-hidden="true" class="absolute inset-0 h-full w-full object-cover" />
    <div class="absolute inset-0 bg-charcoal/85" aria-hidden="true"></div>
    <div class="relative mx-auto grid max-w-7xl grid-cols-2 gap-px lg:grid-cols-4">
      {#each HERO_STATS as s (s.label)}
        <div class="px-6 py-8 text-center">
          <p class="font-display text-4xl tracking-wide text-rotary-gold sm:text-5xl">{s.value}</p>
          <p class="mt-2 text-xs font-bold uppercase tracking-[0.2em] text-charcoal-foreground/70">
            {s.label}
          </p>
        </div>
      {/each}
    </div>
  </section>

  <section class="bg-primary">
    <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
      <div class="grid items-center gap-10 lg:grid-cols-2">
        <div
          class="group relative aspect-[3/2] overflow-hidden rounded-sm shadow-xl"
          role="group"
          aria-roledescription="carousel"
          aria-label="About District 9210"
          onmouseenter={pauseVolunteers}
          onmouseleave={resumeVolunteers}
        >
          {#each volunteersImages as img, i (img.src)}
            <img
              src={img.src}
              alt={img.alt}
              width="1200"
              height="800"
              loading={i === 0 ? "eager" : "lazy"}
              class="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 {i === volunteersIndex
                ? 'opacity-100'
                : 'opacity-0'}"
            />
          {/each}
          <div class="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
            {#each volunteersImages as _, i (i)}
              <button
                type="button"
                onclick={() => {
                  volunteersIndex = i;
                  startVolunteersAutoplay();
                }}
                aria-label="Go to image {(i + 1).toString()}"
                aria-current={i === volunteersIndex}
                class="h-2 rounded-full transition-all {i === volunteersIndex
                  ? 'w-5 bg-rotary-gold'
                  : 'w-2 bg-white/70 hover:bg-white'}"
              ></button>
            {/each}
          </div>
        </div>
        <div>
          <p class="text-sm font-bold uppercase tracking-[0.25em] text-white">Since 1997</p>
          <h2 class="mt-2 font-display text-5xl tracking-wide text-white sm:text-6xl">
            One district. Four countries. Zero polio.
          </h2>
          <p class="mt-4 text-lg text-white">
            Formed in 1997 from the former District 9250, District 9210 unites Rotary and Rotaract clubs across Malawi,
            Zambia, Zimbabwe and northern Mozambique behind one goal: a polio-free Africa.
          </p>
          <a
            href="/about"
            class="mt-6 inline-flex items-center gap-2 font-bold uppercase tracking-wide text-rotary-red hover:underline"
          >
            About the district
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg
            >
          </a>
        </div>
      </div>
      <!-- Map + desktop-only side image with caption -->
      <div class="mt-10 grid gap-8 lg:mt-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div class="mx-auto w-full max-w-[520px] lg:mx-0">
          <Map />
        </div>
        <!-- Visible on desktop only (lg+) — occupies right of map, reduced height to fit cursive caption -->
        <figure class="hidden flex-col gap-3 lg:flex">
          <div class="overflow-hidden rounded-sm shadow-xl">
            <img
              src="/zambia.jpg"
              alt="Rotary volunteers administering polio vaccine to children during an immunization campaign"
              width="800"
              height="600"
              loading="lazy"
              class="h-[340px] w-full object-cover lg:h-[380px]"
            />
          </div>
          <figcaption class="text-lg leading-relaxed font-medium tracking-wide text-white lg:text-xl [font-family:'Dancing_Script',cursive]">
            Every child reached, every drop counts — District 9210 volunteers on the frontline of eradication.
          </figcaption>
        </figure>
      </div>
    </div>
  </section>

  <section class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
    <div class="flex items-end justify-between gap-4">
      <div>
        <p class="text-sm font-bold uppercase tracking-[0.25em] text-rotary-red">Latest</p>
        <h2 class="mt-2 font-display text-5xl tracking-wide sm:text-6xl">From the District</h2>
      </div>
      <a
        href="/news"
        class="hidden items-center gap-2 font-bold uppercase tracking-wide text-rotary-red hover:underline sm:inline-flex"
      >
        All news
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg
        >
      </a>
    </div>
    <div class="mt-10 grid gap-6 md:grid-cols-3">
      {#each latestNews as item (item.slug)}
        <article
          class="group flex flex-col rounded-sm border-t-4 border-rotary-gold bg-card p-6 shadow-md transition-shadow hover:shadow-xl"
        >
          <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
            <span class="rounded-sm bg-rotary-red px-2 py-1 text-primary-foreground">{item.country}</span>
            <span class="text-muted-foreground">{formatDate(item.date)}</span>
          </div>
          <h3 class="mt-4 font-display text-2xl leading-tight tracking-wide text-foreground">
            {item.title}
          </h3>
          <p class="mt-3 flex-1 text-sm text-muted-foreground">{item.excerpt}</p>
          <a
            href="/news"
            class="mt-4 inline-flex items-center gap-1 text-sm font-bold uppercase tracking-wide text-rotary-red group-hover:underline"
          >
            Read more
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg
            >
          </a>
        </article>
      {/each}
    </div>
  </section>
  
  <section class="bg-primary mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24" id="projects">
    <div>
      <p class="text-sm font-bold uppercase tracking-[0.25em] text-white">Our Work</p>
      <h2 class="mt-2 font-display text-5xl tracking-wide sm:text-6xl text-white">Projects &amp; Campaigns</h2>
      <p class="mt-3 max-w-xl text-lg text-white">
        Immunization drives, community outreach, and cross-border cooperation
      </p>
    </div>

    <ol class="relative ml-2 mt-10 space-y-12 border-l-4 border-rotary-gold pl-8">
      {#each PROJECTS as project (project.title)}
        <li class="relative">
          <span
            class="absolute -left-[42px] top-1 h-4 w-4 rounded-full border-4 border-background bg-rotary-gold shadow-[0_0_0_4px_var(--color-rotary-red)]"
            aria-hidden="true"
          ></span>
          <p class="font-display text-xl tracking-wide text-accent">
            {project.year} &middot; {project.tag}
          </p>
          <h3 class="mt-1 font-display text-3xl tracking-wide text-white">{project.title}</h3>
          <p class="mt-1 text-sm font-semibold uppercase tracking-wider  text-accent">
            {project.country}
          </p>
          <p class="mt-2 max-w-2xl text-white">{project.summary}</p>
        </li>
      {/each}
    </ol>
  </section>

  <section aria-label="Eradication progress" class="bg-white" id="statistics">
    <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
      <div>
        <p class="text-sm font-bold uppercase tracking-[0.25em] text-rotary-red">Impact Dashboard</p>
        <h2 class="mt-2 font-display text-5xl tracking-wide sm:text-6xl">Eradication Progress</h2>
        <p class="mt-3 max-w-xl text-lg text-muted-foreground">
          Real-time tracking of our district's contribution to global polio eradication
        </p>
      </div>

      <div class="mt-10 grid gap-4 min-[480px]:gap-6 lg:grid-cols-2">
        <div class="min-w-0 rounded-sm bg-card p-3 shadow-md min-[480px]:p-6">
          <h3 class="font-display text-xl tracking-wide sm:text-2xl">Vaccination Coverage by Country</h3>
          <div class="relative mt-4 h-56 min-[480px]:h-72">
            <canvas bind:this={coverageCanvas} aria-label="Bar chart of vaccination coverage by country"></canvas>
          </div>
        </div>
        <div class="min-w-0 rounded-sm bg-card p-3 shadow-md min-[480px]:p-6">
          <h3 class="font-display text-xl tracking-wide sm:text-2xl">Funding Progress</h3>
          <div class="relative mt-4 h-56 min-[480px]:h-72">
            <canvas bind:this={fundingCanvas} aria-label="Doughnut chart of PolioPlus funding progress"></canvas>
          </div>
        </div>
        <div class="min-w-0 rounded-sm bg-card p-3 shadow-md min-[480px]:p-6 lg:col-span-2">
          <h3 class="font-display text-xl tracking-wide sm:text-2xl">Wild Polio Cases Detected Over Time</h3>
          <div class="relative mt-4 h-56 min-[480px]:h-72">
            <canvas bind:this={casesCanvas} aria-label="Line chart of wild polio cases detected per year"></canvas>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="bg-primary" id="involved">
    <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
      <div>
        <p class="text-sm font-bold uppercase tracking-[0.25em] text-white">Take Action</p>
        <h2 class="mt-2 font-display text-5xl text-white tracking-wide sm:text-6xl">Get Involved</h2>
        <p class="mt-3 max-w-xl text-lg text-white">
          Every contribution brings us closer to a polio-free world
        </p>
      </div>

      <div class="mt-10 grid gap-6 md:grid-cols-3">
        <div
          class="flex flex-col overflow-hidden rounded-sm border-t-4 border-rotary-red bg-card shadow-md transition-transform hover:-translate-y-1"
        >
          <div class="relative h-48 shrink-0">
            <img src="/VAC.jpg" alt="" width="600" height="400" loading="lazy" class="h-full w-full object-cover" />
            <div
              class="absolute -bottom-8 left-1/2 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full border-4 border-white bg-cream text-rotary-red shadow-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                ><path d="M11 17h2v6H11z" /><path
                  d="M14 9c1.5 0 2.5-1 2.5-2.5S15.5 4 14 4h-4c-1.5 0-2.5 1-2.5 2.5S8.5 9 10 9Z"
                /><path d="M18 11a7 7 0 0 1-14 0" /></svg
              >
            </div>
          </div>
          <div class="flex flex-1 flex-col items-center p-8 pt-12 text-center">
            <h3 class="font-display text-3xl tracking-wide">Donate to PolioPlus</h3>
            <p class="mt-2 flex-1 text-muted-foreground">
              Your financial support directly funds vaccination campaigns, surveillance systems, and community
              mobilization efforts.
            </p>
            <a
              href="/get-involved"
              class="mt-6 inline-flex rounded-sm bg-rotary-red px-6 py-3 font-display text-xl tracking-wide text-primary-foreground transition-colors hover:bg-rotary-red-dark"
            >
              Donate Now
            </a>
          </div>
        </div>

        <div
          class="flex flex-col overflow-hidden rounded-sm border-t-4 border-rotary-gold bg-card shadow-md transition-transform hover:-translate-y-1"
        >
          <div class="relative h-48 shrink-0">
            <img src="/VOL.jpg" alt="" width="600" height="400" loading="lazy" class="h-full w-full object-cover" />
            <div
              class="absolute -bottom-8 left-1/2 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full border-4 border-white bg-cream text-rotary-red shadow-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                ><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path
                  d="M22 21v-2a4 4 0 0 0-3-3.87"
                /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg
              >
            </div>
          </div>
          <div class="flex flex-1 flex-col items-center p-8 pt-12 text-center">
            <h3 class="font-display text-3xl tracking-wide">Join Immunization Days</h3>
            <p class="mt-2 flex-1 text-muted-foreground">
              Volunteer for National Immunization Days (NIDs) and help administer vaccines to children in your community.
            </p>
            <a
              href="/get-involved"
              class="mt-6 inline-flex rounded-sm bg-rotary-gold px-6 py-3 font-display text-xl tracking-wide text-charcoal transition-colors hover:bg-rotary-gold-dark hover:text-primary-foreground"
            >
              Volunteer
            </a>
          </div>
        </div>

        <div
          class="flex flex-col overflow-hidden rounded-sm border-t-4 border-rotary-red bg-card shadow-md transition-transform hover:-translate-y-1"
        >
          <div class="relative h-48 shrink-0">
            <img
              src="/D9210.jpg"
              alt=""
              width="600"
              height="400"
              loading="lazy"
              class="h-full w-full object-cover"
            />
            <div
              class="absolute -bottom-8 left-1/2 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full border-4 border-white bg-cream text-rotary-red shadow-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"><path d="m3 11 18-5v12L3 14v-3z" /><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" /></svg
              >
            </div>
          </div>
          <div class="flex flex-1 flex-col items-center p-8 pt-12 text-center">
            <h3 class="font-display text-3xl tracking-wide">Start a Campaign</h3>
            <p class="mt-2 flex-1 text-muted-foreground">
              Launch a local fundraising or awareness campaign in your club to amplify our eradication efforts.
            </p>
          <a
            href="/get-involved"
            class="mt-6 inline-flex rounded-sm bg-rotary-red px-6 py-3 font-display text-xl tracking-wide text-primary-foreground transition-colors hover:bg-rotary-red-dark"
          >
            Learn How
          </a>
        </div>
      </div>
    </div>
    </div>
  </section>

  <section class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24" id="clubs">
    <div>
      <p class="text-sm font-bold uppercase tracking-[0.25em] text-rotary-red">Our Network</p>
      <h2 class="mt-2 font-display text-5xl tracking-wide sm:text-6xl">Clubs Directory</h2>
      <p class="mt-3 max-w-xl text-lg text-muted-foreground">
        Connect with Rotary and Rotaract clubs across District 9210
      </p>
    </div>

    <div class="mt-10 flex flex-wrap items-end gap-4 rounded-sm border-t-4 border-rotary-gold bg-card p-6 shadow-md">
      <div class="flex flex-col gap-1">
        <label for="countryFilter" class="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Country
        </label>
        <select
          id="countryFilter"
          bind:value={countryFilter}
          class="min-w-48 rounded-sm border-2 border-border px-3 py-2"
        >
          <option value="all">All Countries</option>
          {#each DISTRICT.countries as country (country)}
            <option value={country}>{country}</option>
          {/each}
        </select>
      </div>
      <div class="flex flex-col gap-1">
        <label for="typeFilter" class="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Club Type
        </label>
        <select id="typeFilter" bind:value={typeFilter} class="min-w-48 rounded-sm border-2 border-border px-3 py-2">
          <option value="all">All Types</option>
          <option value="Rotary">Rotary Club</option>
          <option value="Rotaract">Rotaract Club</option>
        </select>
      </div>
      <button
        onclick={resetFilters}
        class="ml-auto inline-flex items-center gap-2 rounded-sm bg-rotary-red px-5 py-2.5 font-display text-lg tracking-wide text-primary-foreground transition-colors hover:bg-rotary-red-dark"
      >
        Reset
      </button>
    </div>

    <div class="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {#each filteredClubs as club (club.name)}
        <article
          class="group rounded-sm border-t-4 border-transparent bg-card p-6 shadow-md transition-shadow hover:border-rotary-gold hover:shadow-xl"
        >
          <div class="flex items-start justify-between gap-2">
            <h3 class="font-display text-2xl leading-tight tracking-wide text-foreground">{club.name}</h3>
            <span
              class="shrink-0 rounded-sm px-2 py-1 text-xs font-bold uppercase tracking-wider {club.type === 'Rotaract'
                ? 'bg-rotary-red text-primary-foreground'
                : 'bg-rotary-gold text-charcoal'}"
            >
              {club.type}
            </span>
          </div>
          <p class="mt-2 text-sm text-muted-foreground">{club.city}, {club.country}</p>
          <p class="mt-3 text-xs font-bold uppercase tracking-wider text-rotary-red">
            Meets {club.meetingDay}s
          </p>
        </article>
      {:else}
        <p class="col-span-full text-muted-foreground">No clubs match the selected filters.</p>
      {/each}
    </div>
  </section>
</div>

<style>
  /* Faint gold ring pulsing outward from the hero carousel border */
  @keyframes ring-pulse {
    0% {
      box-shadow:
        0 0 0 0 rgb(247, 166, 27),
        var(--tw-shadow, 0 25px 50px -12px rgb(0 0 0 / 0.25));
    }
    70% {
      box-shadow:
        0 0 0 56px rgba(247, 166, 27, 0),
        var(--tw-shadow, 0 25px 50px -12px rgb(0 0 0 / 0.25));
    }
    100% {
      box-shadow:
        0 0 0 0 rgba(247, 166, 27, 0.021),
        var(--tw-shadow, 0 25px 50px -12px rgb(0 0 0 / 0.25));
    }
  }

  .ring-pulse {
    animation: ring-pulse 2.5s ease-out infinite;
  }

  :global(.halftone-white) {
    background-image: radial-gradient(
      color-mix(in oklab, white 52%, transparent) 1.2px,
      transparent 1.2px
    ) !important;
    opacity: 0.55;
  }

  @media (prefers-reduced-motion: reduce) {
    .ring-pulse,
    .hero-logo {
      animation: none;
    }
  }
</style>
