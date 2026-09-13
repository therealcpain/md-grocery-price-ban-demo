/**
 * MD Grocery Price Ban Clock — paste (1) Maryland shopper? yes/no,
 * (2) context chip: large grocery (≥15,000 sq ft) / third-party food delivery / other merchant,
 * (3) view date → one shareable card:
 * days until Oct 1 ban / ban live / not covered (non-MD / non-food-retailer).
 * Brand: MD Grocery Price Ban Clock only. User-pasted chips; no price scrape.
 * Never invents a named chain’s personalization status or alleges Section 5 violations.
 * Distinct from Personalized Price Disclosure (national FTC proposed disclosure ≠ MD food ban).
 * Not legal advice. AG Consumer Protection Division only — no private right of action on §13–321.
 */
(function () {
  "use strict";

  const CH154_PDF =
    "https://mgaleg.maryland.gov/2026RS/Chapters_noln/CH_154_hb0895e.pdf";
  const MORGAN_LEWIS =
    "https://www.morganlewis.com/pubs/2026/04/maryland-enacts-hb-895-becoming-first-state-to-restrict-personalized-pricing-in-the-food-sector";
  const IAPP =
    "https://iapp.org/news/a/maryland-enacts-a-first-of-its-kind-surveillance-pricing-law-but-there-are-loopholes";
  const AG_CONSUMER =
    "https://www.marylandattorneygeneral.gov/Pages/CPD/default.aspx";

  const BAN_ISO = "2026-10-01";
  const BAN_LABEL = "Oct 1 2026";
  const SQ_FT_FLOOR = 15000;

  const CITE_ONE_LINER =
    "Maryland Chapter 154 (HB 895) Protection From Predatory Pricing Act: food retailers (≥15,000 sq ft selling tax-exempt food) and third-party food delivery providers may not engage in dynamic pricing (personalized price from personal data) to set a higher price for a specific consumer; loyalty / subscription / consented / cost-geography / error-correction exceptions; AG Division 45-day cure before enforcement; no private right of action on §13–321; shall take effect October 1, 2026 (approved Apr 28 2026). Morgan Lewis Apr 29 2026 LawFlash: first state food-sector personalized-pricing restriction. IAPP Apr 2026: enforceable 1 Oct 2026; notes loyalty/subscription loopholes. Distinct from FTC Personalized Price Disclosure (national proposed disclosure triad ≠ MD food ban). Not legal advice. We never invent a named chain’s personalization status or allege Section 5 violations.";

  const DISCLAIMER_SHORT =
    "Not legal advice. Maryland Chapter 154 (HB 895) literacy only — not a price scrape, not a lawsuit funnel. No private right of action on §13–321; AG Consumer Protection Division after a 45-day cure. Loyalty / subscription / consented discounts may still be lawful exceptions — not a blanket price-freeze. Distinct from FTC Personalized Price Disclosure. We never invent a named chain’s personalization status or allege Section 5 violations.";

  const SCOPE_CHIP =
    "Food retailer (≥15,000 sq ft selling tax-exempt food) + third-party food delivery: personalized higher price from personal data generally prohibited";

  const EXCEPTION_STRIP =
    "Loyalty / subscription / consented-discount exceptions exist — not a blanket price-freeze";

  const FOOTER_ENFORCEMENT =
    "Maryland Chapter 154 (HB 895) · AG Consumer Protection Division · no private right of action on §13–321 · 45-day cure before AG enforcement";

  /** Teaching seeds — labeled dates/status. Not live store scrapes. */
  const SEEDS = [
    {
      id: "md-grocery-18d",
      label: "MD grocery · Sep 13 · 18 days",
      sub: "Teaching · large grocery · countdown to Oct 1 ban",
      mdShopper: "yes",
      channel: "grocery",
      viewDate: "2026-09-13",
      noteLabel: "MD grocery · Sep 13 teaching seed",
    },
    {
      id: "ban-live-oct5",
      label: "Ban live · Oct 5",
      sub: "Teaching · MD grocery · post-effective",
      mdShopper: "yes",
      channel: "grocery",
      viewDate: "2026-10-05",
      noteLabel: "Ban-live teaching seed",
    },
    {
      id: "non-md",
      label: "Non-MD · not covered",
      sub: "Teaching · residency out",
      mdShopper: "no",
      channel: "grocery",
      viewDate: "2026-09-13",
      noteLabel: "Non-MD teaching seed",
    },
    {
      id: "other-merchant",
      label: "Other merchant · not covered",
      sub: "Teaching · channel out (non-food-retailer)",
      mdShopper: "yes",
      channel: "other",
      viewDate: "2026-09-13",
      noteLabel: "Other-merchant teaching seed",
    },
    {
      id: "empty-date",
      label: "Empty / missing date",
      sub: "Teaching · honest miss",
      mdShopper: "yes",
      channel: "grocery",
      viewDate: "",
      noteLabel: "Empty-date teaching seed",
    },
    {
      id: "delivery-chip",
      label: "MD delivery · Sep 13 · 18 days",
      sub: "Teaching · third-party food delivery in scope",
      mdShopper: "yes",
      channel: "delivery",
      viewDate: "2026-09-13",
      noteLabel: "Delivery-chip teaching seed",
    },
  ];

  const $ = (id) => document.getElementById(id);

  function parseISODate(s) {
    if (!s || !/^\d{4}-\d{2}-\d{2}$/.test(s)) return null;
    const parts = s.split("-").map(Number);
    const d = new Date(parts[0], parts[1] - 1, parts[2]);
    if (
      d.getFullYear() !== parts[0] ||
      d.getMonth() !== parts[1] - 1 ||
      d.getDate() !== parts[2]
    ) {
      return null;
    }
    return d;
  }

  function fmtDate(d) {
    if (!(d instanceof Date) || isNaN(d.getTime())) return "—";
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  function isoFromDate(d) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return y + "-" + m + "-" + day;
  }

  function todayISO() {
    return isoFromDate(new Date());
  }

  /**
   * Whole calendar days from view date (local) to Oct 1 2026.
   * Sep 13 → 18; Oct 1 → 0 (ban live / effective day); Oct 5 → -4.
   */
  function daysUntilBan(viewDate) {
    const ban = parseISODate(BAN_ISO);
    const a = Date.UTC(
      viewDate.getFullYear(),
      viewDate.getMonth(),
      viewDate.getDate()
    );
    const b = Date.UTC(ban.getFullYear(), ban.getMonth(), ban.getDate());
    return Math.round((b - a) / 86400000);
  }

  function channelMeta(flag) {
    const map = {
      grocery: {
        short: "Large grocery (≥15,000 sq ft)",
        inScope: true,
        line:
          "You marked a large grocery (≥15,000 sq ft selling tax-exempt food). Chapter 154 food-retailer scope applies when Maryland + this channel.",
      },
      delivery: {
        short: "Third-party food delivery",
        inScope: true,
        line:
          "You marked third-party food delivery. Chapter 154 covers third-party food delivery providers when Maryland + this channel.",
      },
      other: {
        short: "Other merchant",
        inScope: false,
        line:
          "You marked other merchant. This card’s MD food-retail ban clock does not cover non-food-retailer channels. We do not invent that the ban applies.",
      },
    };
    return map[flag] || map.other;
  }

  function clockMeta(phase, daysLeft) {
    if (phase === "not_covered_md") {
      return {
        phase: phase,
        pill: "Not covered (non-MD)",
        cls: "danger",
        sub: "Maryland shopper chip = no · Chapter 154 is a Maryland statute",
        ringLabel: "OUT",
        daysLabel: "Not covered (non-MD)",
        headline: "Not covered — not a Maryland shopper",
        flag:
          "NOT COVERED · non-MD · Chapter 154 (HB 895) is Maryland food-retail / delivery personalized-pricing literacy · we do not invent that another state’s law applies",
      };
    }
    if (phase === "not_covered_channel") {
      return {
        phase: phase,
        pill: "Not covered (non-food-retailer)",
        cls: "danger",
        sub: "Other merchant channel · MD food-retail / delivery ban only",
        ringLabel: "OUT",
        daysLabel: "Not covered (channel)",
        headline: "Not covered — non-food-retailer channel",
        flag:
          "NOT COVERED · other merchant · Chapter 154 targets food retailers ≥15,000 sq ft + third-party food delivery · we do not invent coverage for other channels",
      };
    }
    if (phase === "countdown") {
      const n = daysLeft;
      const daysTxt =
        n === 1 ? "1 day until Oct 1 ban" : n + " days until Oct 1 ban";
      return {
        phase: phase,
        pill: daysTxt,
        cls: n <= 7 ? "warn" : "ok",
        sub: "Maryland · food retailer / delivery · ban effective " + BAN_LABEL,
        ringLabel: String(n),
        daysLabel: daysTxt,
        headline: daysTxt,
        flag:
          "COUNTDOWN · " +
          n +
          " calendar day" +
          (n === 1 ? "" : "s") +
          " until Oct 1 2026 · Chapter 154 personalized higher price from personal data generally prohibited for in-scope food retail / delivery · exceptions exist",
      };
    }
    // ban_live (daysLeft <= 0)
    return {
      phase: "ban_live",
      pill: "Ban live",
      cls: "ok",
      sub:
        daysLeft === 0
          ? "Effective TODAY — " + BAN_LABEL
          : "Effective since " + BAN_LABEL,
      ringLabel: "LIVE",
      daysLabel: "Ban live",
      headline:
        daysLeft === 0
          ? "Ban live TODAY — Oct 1 2026"
          : "Ban live — Maryland food personalized-pricing restriction",
      flag:
        "BAN LIVE · Chapter 154 (HB 895) effective " +
        BAN_LABEL +
        " · food retailer ≥15k sq ft + third-party food delivery: personalized higher price from personal data generally prohibited · loyalty / subscription / consented exceptions may still apply · AG-only enforcement",
    };
  }

  function validate(input) {
    if (!parseISODate(input.viewDate)) {
      return "Pick a view date (the day you’re looking) — the ban clock needs it. Empty date = honest miss (we will not invent days left).";
    }
    if (input.mdShopper !== "yes" && input.mdShopper !== "no") {
      return "Say whether you are a Maryland shopper (yes/no). Empty = honest miss.";
    }
    if (
      input.channel !== "grocery" &&
      input.channel !== "delivery" &&
      input.channel !== "other"
    ) {
      return "Pick a context chip: large grocery (≥15,000 sq ft) / third-party food delivery / other merchant. Empty = honest miss.";
    }
    return null;
  }

  function compute(input) {
    const viewDate = parseISODate(input.viewDate);
    const daysLeft = daysUntilBan(viewDate);
    const ch = channelMeta(input.channel);

    let phase = "countdown";
    if (input.mdShopper === "no") {
      phase = "not_covered_md";
    } else if (!ch.inScope) {
      phase = "not_covered_channel";
    } else if (daysLeft <= 0) {
      phase = "ban_live";
    } else {
      phase = "countdown";
    }

    const clock = clockMeta(phase, daysLeft);

    let pct = 0;
    if (phase === "countdown" && daysLeft > 0) {
      // Rough visual span from ~30d pre-ban framing
      pct = Math.max(2, Math.min(100, Math.round((daysLeft / 30) * 100)));
    } else if (phase === "ban_live") {
      pct = 100;
    }

    const decoder =
      phase === "not_covered_md"
        ? "You marked you are not a Maryland shopper. Chapter 154 (HB 895) is a Maryland statute covering food retailers and third-party food delivery in Maryland. This card does not invent that another state’s law applies. Distinct from the national FTC Personalized Price Disclosure proposal."
        : phase === "not_covered_channel"
          ? "You marked other merchant. The MD ban clock covers large grocery (≥15,000 sq ft selling tax-exempt food) and third-party food delivery — not a blanket retail personalization ban. We do not invent channel coverage."
          : phase === "ban_live"
            ? "Chapter 154 is effective. In-scope food retailers and third-party food delivery generally may not set a personalized higher price from personal data. Loyalty / subscription / consented-discount exceptions exist — not a blanket price-freeze. Enforcement is AG Consumer Protection after a 45-day cure; no private right of action on §13–321."
            : "Chapter 154 takes effect " +
              BAN_LABEL +
              ". Until then this card is calendar literacy — not a lawsuit form. In-scope: food retailers ≥15,000 sq ft + third-party food delivery. Exceptions (loyalty / subscription / consented) mean this is not a blanket price-freeze.";

    const action =
      "Calm next step: read Chapter 154 (HB 895) PDF + Morgan Lewis Apr 29 2026 + IAPP Apr 2026. Questions about enforcement → Maryland AG Consumer Protection Division (45-day cure). This card is not legal advice and not a class-action funnel.";

    return {
      mdShopper: input.mdShopper,
      channel: input.channel,
      channelLabel: ch.short,
      channelLine: ch.line,
      viewDate: viewDate,
      viewDateISO: input.viewDate,
      daysLeft: daysLeft,
      phase: phase,
      clock: clock,
      pct: pct,
      scopeChip: SCOPE_CHIP,
      exceptionStrip: EXCEPTION_STRIP,
      footerEnforcement: FOOTER_ENFORCEMENT,
      decoder: decoder,
      action: action,
      noteLabel: (input.noteLabel || "").trim(),
      cite: CITE_ONE_LINER,
      disclaimer: DISCLAIMER_SHORT,
    };
  }

  function readInputs() {
    return {
      mdShopper: $("mdShopper").value || "",
      channel: $("channel").value || "",
      viewDate: ($("viewDate").value || "").trim(),
      noteLabel: ($("noteLabel").value || "").trim(),
    };
  }

  function applyInputs(p) {
    $("mdShopper").value = p.mdShopper || "";
    $("channel").value = p.channel || "";
    $("viewDate").value = p.viewDate || "";
    $("noteLabel").value = p.noteLabel || "";
  }

  function encodeHash(input) {
    try {
      const payload = {
        md: input.mdShopper,
        ch: input.channel,
        v: input.viewDate,
        n: input.noteLabel || "",
      };
      return "#p=" + btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
    } catch (e) {
      return "";
    }
  }

  function decodeHash() {
    const h = location.hash || "";
    const m = h.match(/#p=([A-Za-z0-9+/=]+)/);
    if (!m) return null;
    try {
      const raw = JSON.parse(decodeURIComponent(escape(atob(m[1]))));
      return {
        mdShopper: raw.md || "",
        channel: raw.ch || "",
        viewDate: raw.v || "",
        noteLabel: raw.n || "",
      };
    } catch (e) {
      return null;
    }
  }

  function setStatus(msg, isErr) {
    const el = $("status");
    el.textContent = msg || "";
    el.className = "status" + (isErr ? " err" : "");
  }

  function renderCard() {
    const input = readInputs();
    const err = validate(input);
    if (err) {
      $("cardSection").hidden = true;
      setStatus(err, true);
      return null;
    }
    const c = compute(input);
    $("cardSection").hidden = false;
    setStatus("");

    $("cardMeta").textContent =
      (c.noteLabel ? c.noteLabel + " · " : "") +
      "View " +
      fmtDate(c.viewDate) +
      " · " +
      (c.mdShopper === "yes" ? "MD shopper" : "Non-MD") +
      " · " +
      c.channelLabel;

    $("dlHeadline").textContent = c.clock.headline;
    $("statusPill").textContent = c.clock.pill;
    $("statusPill").className = "verdict-k " + (c.clock.cls || "");
    $("statusSub").textContent = c.clock.sub;
    $("statusBadge").className = "verdict";

    $("viewDateDisp").textContent = fmtDate(c.viewDate);
    $("daysDisp").textContent = c.clock.daysLabel;
    $("deadlineLine").textContent =
      "Ban effective " + BAN_LABEL + " · Chapter 154 (HB 895)";

    $("daysRingDisp").textContent = c.clock.ringLabel;
    $("daysRing").style.setProperty("--pct", String(c.pct));
    $("windowLine").textContent = c.clock.sub;

    $("actionFlag").textContent = c.clock.flag;
    $("actionFlag").className =
      "look-enroll-flag" + (c.clock.cls ? " " + c.clock.cls : "");
    $("scopeChipStrip").textContent = c.scopeChip;
    $("exceptionStrip").textContent = c.exceptionStrip;
    $("enforceStrip").textContent = c.footerEnforcement;

    $("rMd").textContent = c.mdShopper === "yes" ? "Yes — MD" : "No — non-MD";
    $("rChannel").textContent = c.channelLabel;
    $("rStatus").textContent = c.clock.pill;
    $("rView").textContent = fmtDate(c.viewDate);

    $("decoderLine").textContent = c.decoder;
    $("actionLine").textContent = c.action;
    $("citeLine").textContent = c.cite;

    const hash = encodeHash(input);
    if (hash) {
      history.replaceState(null, "", hash);
      $("shareUrl").value = location.href.split("#")[0] + hash;
      $("shareBox").hidden = false;
    }

    return c;
  }

  function clearAll() {
    $("mdShopper").value = "";
    $("channel").value = "";
    $("viewDate").value = "";
    $("noteLabel").value = "";
    $("cardSection").hidden = true;
    $("shareBox").hidden = true;
    setStatus("");
    history.replaceState(null, "", location.pathname + location.search);
  }

  function summaryText(c) {
    return [
      "MD Grocery Price Ban Clock",
      c.clock.pill,
      c.clock.sub,
      "MD shopper: " + (c.mdShopper === "yes" ? "yes" : "no"),
      "Channel: " + c.channelLabel,
      "View date: " + fmtDate(c.viewDate),
      c.scopeChip,
      c.exceptionStrip,
      c.footerEnforcement,
      DISCLAIMER_SHORT,
      "Cite: Chapter 154 HB 895 · Morgan Lewis Apr 29 2026 · IAPP Apr 2026",
    ].join("\n");
  }

  function copySummary() {
    const input = readInputs();
    const err = validate(input);
    if (err) {
      setStatus(err, true);
      return;
    }
    const c = compute(input);
    const text = summaryText(c);
    navigator.clipboard.writeText(text).then(
      function () {
        setStatus("Summary copied.");
      },
      function () {
        setStatus("Clipboard blocked — select share URL instead.", true);
      }
    );
  }

  function shareLink() {
    const input = readInputs();
    const err = validate(input);
    if (err) {
      setStatus(err, true);
      return;
    }
    renderCard();
    const url = $("shareUrl").value;
    if (navigator.share) {
      navigator
        .share({
          title: "MD Grocery Price Ban Clock",
          text: "Maryland grocery personalized-pricing ban clock — Chapter 154 / Oct 1 2026",
          url: url,
        })
        .catch(function () {
          setStatus("Share canceled.");
        });
    } else {
      navigator.clipboard.writeText(url).then(
        function () {
          setStatus("Share link copied.");
        },
        function () {
          setStatus("Copy the share URL from the box.", true);
        }
      );
    }
  }

  function copyShare() {
    const url = $("shareUrl").value;
    navigator.clipboard.writeText(url).then(
      function () {
        setStatus("Share link copied.");
      },
      function () {
        setStatus("Clipboard blocked.", true);
      }
    );
  }

  function wrapText(ctx, text, x, y, maxW, lineH) {
    const words = text.split(/\s+/);
    let line = "";
    for (let i = 0; i < words.length; i++) {
      const test = line ? line + " " + words[i] : words[i];
      if (ctx.measureText(test).width > maxW && line) {
        ctx.fillText(line, x, y);
        y += lineH;
        line = words[i];
      } else {
        line = test;
      }
    }
    if (line) {
      ctx.fillText(line, x, y);
      y += lineH;
    }
    return y;
  }

  function exportPng() {
    const input = readInputs();
    const err = validate(input);
    if (err) {
      setStatus(err, true);
      return;
    }
    const c = compute(input);
    const canvas = $("pngCanvas");
    const ctx = canvas.getContext("2d");
    const W = 900;
    const H = 1200;
    canvas.width = W;
    canvas.height = H;

    // Background
    ctx.fillStyle = "#0b0f14";
    ctx.fillRect(0, 0, W, H);

    // Accent bar
    const grad = ctx.createLinearGradient(0, 0, W, 0);
    grad.addColorStop(0, "#7eb8e8");
    grad.addColorStop(0.5, "#f0b429");
    grad.addColorStop(1, "#3ecf8e");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, 8);

    let y = 56;
    ctx.fillStyle = "#8b9aab";
    ctx.font = "600 16px IBM Plex Sans, system-ui, sans-serif";
    ctx.fillText("MD Grocery Price Ban Clock", 48, y);

    y += 36;
    ctx.fillStyle = "#e8eef4";
    ctx.font = "700 36px IBM Plex Sans, system-ui, sans-serif";
    y = wrapText(ctx, c.clock.headline, 48, y, W - 96, 42);

    y += 16;
    ctx.fillStyle =
      c.clock.cls === "ok"
        ? "#3ecf8e"
        : c.clock.cls === "warn"
          ? "#f0b429"
          : "#f07178";
    ctx.font = "700 48px IBM Plex Mono, ui-monospace, monospace";
    ctx.fillText(c.clock.daysLabel, 48, y);

    y += 40;
    ctx.fillStyle = "#8b9aab";
    ctx.font = "400 18px IBM Plex Sans, system-ui, sans-serif";
    y = wrapText(ctx, c.clock.sub, 48, y, W - 96, 26);

    y += 28;
    ctx.fillStyle = "#7eb8e8";
    ctx.font = "600 16px IBM Plex Sans, system-ui, sans-serif";
    y = wrapText(ctx, c.scopeChip, 48, y, W - 96, 24);

    y += 20;
    ctx.fillStyle = "#f0b429";
    ctx.font = "600 16px IBM Plex Sans, system-ui, sans-serif";
    y = wrapText(ctx, c.exceptionStrip, 48, y, W - 96, 24);

    y += 28;
    ctx.fillStyle = "#e8eef4";
    ctx.font = "400 16px IBM Plex Sans, system-ui, sans-serif";
    y = wrapText(
      ctx,
      "MD shopper: " +
        (c.mdShopper === "yes" ? "yes" : "no") +
        " · Channel: " +
        c.channelLabel +
        " · View: " +
        fmtDate(c.viewDate),
      48,
      y,
      W - 96,
      24
    );

    y += 24;
    ctx.fillStyle = "#8b9aab";
    ctx.font = "400 14px IBM Plex Sans, system-ui, sans-serif";
    y = wrapText(ctx, c.footerEnforcement, 48, y, W - 96, 20);

    y += 20;
    ctx.fillStyle = "#8b9aab";
    ctx.font = "400 13px IBM Plex Sans, system-ui, sans-serif";
    y = wrapText(
      ctx,
      "Cite: Chapter 154 HB 895 PDF · Morgan Lewis Apr 29 2026 · IAPP Apr 2026",
      48,
      y,
      W - 96,
      18
    );

    y += 28;
    ctx.fillStyle = "#f07178";
    ctx.font = "600 14px IBM Plex Sans, system-ui, sans-serif";
    y = wrapText(ctx, DISCLAIMER_SHORT, 48, y, W - 96, 20);

    ctx.fillStyle = "#8b9aab";
    ctx.font = "400 12px IBM Plex Sans, system-ui, sans-serif";
    ctx.fillText(
      "User-pasted chips only · no price scrape · ≠ FTC Personalized Price Disclosure",
      48,
      H - 36
    );

    canvas.toBlob(function (blob) {
      if (!blob) {
        $("status").textContent = "PNG export failed.";
        return;
      }
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download =
        "md-grocery-price-ban-" +
        (c.phase || "status") +
        "-" +
        (input.viewDate || "view") +
        ".png";
      a.click();
      URL.revokeObjectURL(a.href);
      $("status").textContent = "PNG downloaded.";
    });
  }

  function renderChips() {
    const wrap = $("seedChips");
    wrap.innerHTML = "";
    SEEDS.forEach(function (s) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "seed-chip";
      btn.setAttribute("role", "listitem");
      btn.innerHTML =
        s.label +
        '<span class="chip-sub">' +
        s.sub +
        "</span>";
      btn.addEventListener("click", function () {
        applyInputs({
          mdShopper: s.mdShopper,
          channel: s.channel,
          viewDate: s.viewDate,
          noteLabel: s.noteLabel,
        });
        if (!s.viewDate) {
          $("cardSection").hidden = true;
          setStatus(
            "Pick a view date (the day you’re looking) — the ban clock needs it. Empty date = honest miss (we will not invent days left).",
            true
          );
          return;
        }
        renderCard();
      });
      wrap.appendChild(btn);
    });
  }

  function renderSources() {
    const el = $("sourceLinks");
    el.innerHTML =
      "<strong>Sources</strong> · " +
      '<a href="' +
      CH154_PDF +
      '" target="_blank" rel="noopener noreferrer">Chapter 154 (HB 895) PDF</a> · ' +
      '<a href="' +
      MORGAN_LEWIS +
      '" target="_blank" rel="noopener noreferrer">Morgan Lewis Apr 29 2026</a> · ' +
      '<a href="' +
      IAPP +
      '" target="_blank" rel="noopener noreferrer">IAPP Apr 2026</a> · ' +
      '<a href="' +
      AG_CONSUMER +
      '" target="_blank" rel="noopener noreferrer">MD AG Consumer Protection</a>';
  }

  function bind() {
    if (!$("viewDate").value) $("viewDate").value = todayISO();
    renderChips();
    renderSources();

    $("cardBtn").addEventListener("click", renderCard);
    $("clearBtn").addEventListener("click", clearAll);
    $("copySummary").addEventListener("click", copySummary);
    $("shareBtn").addEventListener("click", shareLink);
    $("copyShare").addEventListener("click", copyShare);
    $("pngBtn").addEventListener("click", exportPng);

    window.addEventListener("hashchange", function () {
      const p = decodeHash();
      if (p) {
        applyInputs(p);
        renderCard();
      }
    });

    const fromHash = decodeHash();
    if (fromHash) {
      applyInputs(fromHash);
      renderCard();
    }
  }

  if (typeof document !== "undefined") {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", bind);
    } else {
      bind();
    }
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = {
      SEEDS: SEEDS,
      BAN_ISO: BAN_ISO,
      BAN_LABEL: BAN_LABEL,
      SQ_FT_FLOOR: SQ_FT_FLOOR,
      parseISODate: parseISODate,
      daysUntilBan: daysUntilBan,
      channelMeta: channelMeta,
      clockMeta: clockMeta,
      validate: validate,
      compute: compute,
      fmtDate: fmtDate,
      DISCLAIMER_SHORT: DISCLAIMER_SHORT,
      CITE_ONE_LINER: CITE_ONE_LINER,
      SCOPE_CHIP: SCOPE_CHIP,
      EXCEPTION_STRIP: EXCEPTION_STRIP,
      FOOTER_ENFORCEMENT: FOOTER_ENFORCEMENT,
    };
  }
})();
