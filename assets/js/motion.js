// =============================================================================
// MOTION — reusable motion design system for ISO Academy
// -----------------------------------------------------------------------------
// One engine, applied declaratively through data-attributes, so animation is
// a shared language across every page rather than per-page bespoke code.
//
//   data-reveal="up|fade|left|right|scale|blur"   element animates in on scroll
//   data-reveal-delay="120"                        ms delay (manual)
//   data-reveal-group                              auto-staggers its [data-reveal] children
//   data-reveal-stagger="80"                       per-child stagger step (ms)
//   data-parallax="0.2"                            translateY by scroll * factor
//   data-count="11000"                             count-up when it enters view
//   data-flow                                      animates a process-map as a living system
//   data-tilt                                      subtle pointer tilt (cards)
//   data-magnetic                                  subtle magnetic pull (buttons)
//
// Every behaviour is gated behind prefers-reduced-motion. Call Motion.scan(root)
// after injecting new DOM (the SPA swaps innerHTML on navigation).
// =============================================================================

const Motion = (function () {
    const reduceMotion = window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ---- Easing curves shared with CSS (kept in sync with :root tokens) -----
    const Ease = {
        out: 'cubic-bezier(0.16, 1, 0.3, 1)',
        inOut: 'cubic-bezier(0.65, 0, 0.35, 1)',
        outBack: 'cubic-bezier(0.34, 1.3, 0.64, 1)'
    };

    // =========================================================================
    // 1. SCROLL REVEAL — the backbone. Elements rise/fade/blur into place as
    //    they enter the viewport. Groups auto-stagger their children so a row
    //    of cards arrives as a wave, not all at once.
    // =========================================================================
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                showReveal(entry.target);
            } else if (entry.target.dataset.revealOnce === 'false') {
                entry.target.classList.remove('is-revealed');
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    // Tracks reveal elements that haven't played yet, so the scroll loop can
    // drive them as a fallback when IntersectionObserver is unreliable (some
    // embedded/preview iframes never fire it for already-visible nodes).
    let revealPending = [];

    function showReveal(el) {
        el.classList.add('is-revealed');
        if (el.dataset.revealOnce !== 'false') {
            revealObserver.unobserve(el);
            revealPending = revealPending.filter(x => x !== el);
        }
    }

    function checkRevealInView(el) {
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight || document.documentElement.clientHeight;
        return r.top < vh * 0.92 && r.bottom > 0;
    }

    function scanReveals(root) {
        // Assign stagger delays inside groups before observing.
        root.querySelectorAll('[data-reveal-group]').forEach(group => {
            const step = parseInt(group.dataset.revealStagger, 10) || 90;
            const base = parseInt(group.dataset.revealDelay, 10) || 0;
            const kids = group.querySelectorAll(':scope > [data-reveal], :scope [data-reveal-child]');
            kids.forEach((kid, i) => {
                if (!kid.dataset.revealDelay) {
                    kid.style.setProperty('--reveal-delay', (base + i * step) + 'ms');
                }
            });
        });

        root.querySelectorAll('[data-reveal]').forEach(el => {
            if (el.dataset.revealBound) return;
            el.dataset.revealBound = '1';
            if (el.dataset.revealDelay) {
                el.style.setProperty('--reveal-delay', el.dataset.revealDelay + 'ms');
            }
            if (reduceMotion) {
                el.classList.add('is-revealed');
                return;
            }
            revealObserver.observe(el);
            revealPending.push(el);
            // Reveal immediately if already on screen (covers above-the-fold
            // content and dead-IO environments).
            if (checkRevealInView(el)) showReveal(el);
        });
    }

    // =========================================================================
    // 2. COUNT-UP — numbers ease toward their target when scrolled into view.
    // =========================================================================
    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            countObserver.unobserve(entry.target);
            runCount(entry.target);
        });
    }, { threshold: 0.4 });

    function runCount(el) {
        const target = parseFloat(el.dataset.count) || 0;
        if (reduceMotion) { el.textContent = target.toLocaleString(); return; }
        const duration = parseInt(el.dataset.countDuration, 10) || 2200;
        const start = performance.now();
        function tick(now) {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 4);
            el.textContent = Math.round(target * eased).toLocaleString();
            if (p < 1) requestAnimationFrame(tick);
            else el.textContent = target.toLocaleString();
        }
        requestAnimationFrame(tick);
    }

    let countPending = [];
    function scanCounts(root) {
        root.querySelectorAll('[data-count]').forEach(el => {
            if (el.dataset.countBound) return;
            el.dataset.countBound = '1';
            countObserver.observe(el);
            countPending.push(el);
            if (inViewport(el, 0.5)) { countObserver.unobserve(el); countPending = countPending.filter(x => x !== el); runCount(el); }
        });
    }

    // =========================================================================
    // 3. LIVING PROCESS MAPS — a flow diagram animates as money actually
    //    moving: actors appear first, then the connecting line draws, then a
    //    pulse of value travels stop to stop. Communicates the sequence, not
    //    just the topology.
    // =========================================================================
    const flowObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            flowObserver.unobserve(entry.target);
            playFlow(entry.target);
        });
    }, { threshold: 0.45 });

    function playFlow(flow) {
        const steps = flow.querySelectorAll('.process-map-step');
        const arrows = flow.querySelectorAll('.process-map-arrow');
        if (reduceMotion) {
            steps.forEach(s => s.classList.add('flow-in'));
            arrows.forEach(a => a.classList.add('flow-in'));
            return;
        }
        // Actors appear in sequence.
        steps.forEach((s, i) => {
            setTimeout(() => s.classList.add('flow-in'), i * 240);
        });
        // Connections draw between them, slightly behind each actor.
        arrows.forEach((a, i) => {
            setTimeout(() => a.classList.add('flow-in'), 140 + i * 240);
        });
        // Once everything is in, send a value pulse down the chain, on a loop.
        const total = steps.length * 240 + 300;
        setTimeout(() => startFlowPulse(flow, steps), total);
    }

    function startFlowPulse(flow, steps) {
        if (reduceMotion || !steps.length) return;
        let i = 0;
        function pulse() {
            steps.forEach(s => s.classList.remove('flow-active'));
            const cur = steps[i % steps.length];
            if (cur) cur.classList.add('flow-active');
            i++;
            flow._flowTimer = setTimeout(pulse, 620);
        }
        pulse();
    }

    let flowPending = [];
    function scanFlows(root) {
        root.querySelectorAll('[data-flow]').forEach(el => {
            if (el.dataset.flowBound) return;
            el.dataset.flowBound = '1';
            flowObserver.observe(el);
            flowPending.push(el);
            if (inViewport(el, 0.45)) { flowObserver.unobserve(el); flowPending = flowPending.filter(x => x !== el); playFlow(el); }
        });
    }

    // Shared viewport test used by the scroll-loop fallbacks.
    function inViewport(el, ratio) {
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight || document.documentElement.clientHeight;
        if (r.height === 0) return false;
        const visible = Math.min(r.bottom, vh) - Math.max(r.top, 0);
        return visible > 0 && (visible / Math.min(r.height, vh)) >= (ratio || 0.3);
    }

    // =========================================================================
    // 4. PARALLAX + SCROLL PROGRESS — one rAF-throttled scroll loop drives all
    //    scroll-linked motion: a global progress var (for the ambient
    //    background gradient to slowly evolve), and per-element translate.
    // =========================================================================
    let parallaxEls = [];
    let ticking = false;

    function scanParallax(root) {
        root.querySelectorAll('[data-parallax]').forEach(el => {
            if (!parallaxEls.includes(el)) parallaxEls.push(el);
        });
    }

    function onScroll() {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
            const y = window.scrollY;
            const docH = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docH > 0 ? Math.min(y / docH, 1) : 0;
            document.documentElement.style.setProperty('--scroll-progress', progress.toFixed(4));

            // Fallback reveal driver — reveals anything scrolled into view even
            // if IntersectionObserver never fires in this environment.
            if (revealPending.length) {
                for (const el of revealPending.slice()) {
                    if (!el.isConnected) { revealPending = revealPending.filter(x => x !== el); continue; }
                    if (checkRevealInView(el)) showReveal(el);
                }
            }
            if (countPending.length) {
                for (const el of countPending.slice()) {
                    if (!el.isConnected) { countPending = countPending.filter(x => x !== el); continue; }
                    if (inViewport(el, 0.4)) { countObserver.unobserve(el); countPending = countPending.filter(x => x !== el); runCount(el); }
                }
            }
            if (flowPending.length) {
                for (const el of flowPending.slice()) {
                    if (!el.isConnected) { flowPending = flowPending.filter(x => x !== el); continue; }
                    if (inViewport(el, 0.35)) { flowObserver.unobserve(el); flowPending = flowPending.filter(x => x !== el); playFlow(el); }
                }
            }

            if (!reduceMotion) {
                const vh = window.innerHeight;
                for (const el of parallaxEls) {
                    if (!el.isConnected) continue;
                    const rect = el.getBoundingClientRect();
                    if (rect.bottom < -vh || rect.top > vh * 2) continue;
                    const factor = parseFloat(el.dataset.parallax) || 0.15;
                    const centerOffset = (rect.top + rect.height / 2) - vh / 2;
                    el.style.transform = `translate3d(0, ${(-centerOffset * factor).toFixed(1)}px, 0)`;
                }
            }
            ticking = false;
        });
    }

    // =========================================================================
    // 5. POINTER PARALLAX — hero scenes drift gently with the cursor.
    // =========================================================================
    function scanMouseParallax(root) {
        if (reduceMotion) return;
        root.querySelectorAll('[data-mouse-parallax]').forEach(scene => {
            if (scene.dataset.mpBound) return;
            scene.dataset.mpBound = '1';
            const layers = scene.querySelectorAll('[data-mp-depth]');
            scene.addEventListener('pointermove', (e) => {
                const r = scene.getBoundingClientRect();
                const cx = (e.clientX - r.left) / r.width - 0.5;
                const cy = (e.clientY - r.top) / r.height - 0.5;
                layers.forEach(l => {
                    const d = parseFloat(l.dataset.mpDepth) || 10;
                    l.style.transform = `translate3d(${(cx * d).toFixed(1)}px, ${(cy * d).toFixed(1)}px, 0)`;
                });
            });
            scene.addEventListener('pointerleave', () => {
                layers.forEach(l => { l.style.transform = ''; });
            });
        });
    }

    // =========================================================================
    // 6. TILT + MAGNETIC — micro-feedback on cards and buttons.
    // =========================================================================
    function scanTilt(root) {
        if (reduceMotion) return;
        root.querySelectorAll('[data-tilt]').forEach(el => {
            if (el.dataset.tiltBound) return;
            el.dataset.tiltBound = '1';
            el.addEventListener('pointermove', (e) => {
                const r = el.getBoundingClientRect();
                const cx = (e.clientX - r.left) / r.width - 0.5;
                const cy = (e.clientY - r.top) / r.height - 0.5;
                el.style.transform = `perspective(800px) rotateX(${(-cy * 5).toFixed(2)}deg) rotateY(${(cx * 5).toFixed(2)}deg) translateY(-4px)`;
                el.style.setProperty('--mx', `${((cx + 0.5) * 100).toFixed(1)}%`);
                el.style.setProperty('--my', `${((cy + 0.5) * 100).toFixed(1)}%`);
            });
            el.addEventListener('pointerleave', () => { el.style.transform = ''; });
        });
    }

    function scanMagnetic(root) {
        if (reduceMotion) return;
        root.querySelectorAll('[data-magnetic]').forEach(el => {
            if (el.dataset.magBound) return;
            el.dataset.magBound = '1';
            el.addEventListener('pointermove', (e) => {
                const r = el.getBoundingClientRect();
                const x = (e.clientX - r.left - r.width / 2) * 0.25;
                const y = (e.clientY - r.top - r.height / 2) * 0.35;
                el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
            });
            el.addEventListener('pointerleave', () => { el.style.transform = ''; });
        });
    }

    // =========================================================================
    // PUBLIC — scan a freshly-rendered subtree for every behaviour at once.
    // =========================================================================
    function scan(root) {
        root = root || document;
        scanReveals(root);
        scanCounts(root);
        scanFlows(root);
        scanParallax(root);
        scanMouseParallax(root);
        scanTilt(root);
        scanMagnetic(root);
        scheduleSettle();
    }

    function init() {
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll, { passive: true });
        onScroll();
        scan(document);
    }

    // -------------------------------------------------------------------------
    // SAFETY NET — some embedded/offscreen contexts never advance CSS
    // transitions or animations, which would leave opacity:0 entrance elements
    // stuck invisible. This snaps any element that is STILL computed-hidden
    // well after it should have played to its final visible state. On a normal
    // visible page the transition has already completed by the time this runs,
    // so it is a no-op and the animation is preserved.
    // -------------------------------------------------------------------------
    function isStuck(el) {
        return parseFloat(getComputedStyle(el).opacity) < 0.05;
    }
    function snap(el, clearAnim) {
        if (clearAnim) el.style.animation = 'none';
        el.style.transition = 'none';
        el.style.opacity = '1';
        el.style.transform = 'none';
        el.style.filter = 'none';
    }
    function forceSettle() {
        // reveal + snap any in-view pending data-reveal that's stuck
        revealPending.slice().forEach(el => {
            if (!el.isConnected) return;
            if (checkRevealInView(el)) {
                showReveal(el);
                if (isStuck(el)) snap(el, false);
            }
        });
        // catch reveals whose class is set but whose transition never advanced
        document.querySelectorAll('[data-reveal].is-revealed').forEach(el => {
            if (isStuck(el)) snap(el, false);
        });
        // CSS-animation entrances (kinetic headline, stats, hero lines)
        document.querySelectorAll('.kinetic-word, .stats-strip, .hl-line, .page').forEach(el => {
            const r = el.getBoundingClientRect();
            const vh = window.innerHeight || 800;
            if (r.top < vh && r.bottom > -50 && isStuck(el)) snap(el, true);
        });
    }
    function scheduleSettle() {
        clearTimeout(scheduleSettle._t);
        scheduleSettle._t = setTimeout(forceSettle, 1500);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // run after the intro plays, and as a hard fallback
    document.addEventListener('iso:intro-done', () => setTimeout(forceSettle, 500), { once: true });
    setTimeout(forceSettle, 3400);
    window.addEventListener('load', () => setTimeout(forceSettle, 1200));
    // any interaction (or a visibility change) guarantees a settle pass in
    // environments where background timers/animations are throttled
    document.addEventListener('visibilitychange', () => { if (!document.hidden) forceSettle(); });
    window.addEventListener('pointermove', forceSettle, { once: true });
    window.addEventListener('keydown', forceSettle, { once: true });

    return { scan, Ease, reduceMotion, forceSettle, _runCount: runCount };
})();

// Expose globally so the SPA can re-scan freshly-rendered content after each
// innerHTML swap (top-level `const` does not attach to window on its own).
window.Motion = Motion;
