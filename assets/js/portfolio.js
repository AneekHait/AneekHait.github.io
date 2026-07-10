document.getElementById("year").textContent = new Date().getFullYear();

const themeStorageKey = "aneek-theme";
const themeToggle = document.getElementById("themeToggle");
const themeToggleText = themeToggle?.querySelector("[data-theme-toggle-text]");
const themeMeta = document.querySelector("meta[name='theme-color']");
const themeColors = {
    light: "#f5ede0",
    dark: "#1a1410"
};

const setTheme = (theme, shouldStore = true) => {
    const normalizedTheme = theme === "dark" ? "dark" : "light";
    const isDark = normalizedTheme === "dark";

    document.documentElement.dataset.theme = normalizedTheme;
    document.documentElement.style.colorScheme = normalizedTheme;

    if (themeMeta) {
        themeMeta.setAttribute("content", themeColors[normalizedTheme]);
    }

    if (themeToggle) {
        const nextTheme = isDark ? "light" : "dark";
        themeToggle.setAttribute("aria-label", `Switch to ${nextTheme} theme`);
        themeToggle.setAttribute("title", `Switch to ${nextTheme} theme`);
        themeToggle.setAttribute("aria-pressed", String(isDark));
    }

    if (themeToggleText) {
        themeToggleText.textContent = isDark ? "Light" : "Dark";
    }

    if (shouldStore) {
        try {
            localStorage.setItem(themeStorageKey, normalizedTheme);
        } catch (error) {
            return;
        }
    }
};

setTheme(document.documentElement.dataset.theme, false);

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        const currentTheme = document.documentElement.dataset.theme;
        setTheme(currentTheme === "dark" ? "light" : "dark");
    });
}

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealTargets = document.querySelectorAll("[data-reveal]");
const heroCopy = document.querySelector(".hero-copy");
const taglineTrack = document.querySelector("[data-tagline-track]");
const taglinePhrase = document.querySelector("[data-tagline-phrase]");

let taglineAnimationStarted = false;

const setFinalTagline = () => {
    if (!taglineTrack || !taglinePhrase) {
        return;
    }

    const finalPhrase = taglineTrack.dataset.finalPhrase || taglinePhrase.textContent;
    taglinePhrase.textContent = finalPhrase;
    taglinePhrase.classList.add("is-visible");
    taglinePhrase.classList.remove("is-exiting");
};

const runTaglineAnimation = () => {
    if (
        reducedMotion ||
        taglineAnimationStarted ||
        !taglineTrack ||
        !taglinePhrase
    ) {
        setFinalTagline();
        return;
    }

    taglineAnimationStarted = true;

    let phrases;

    try {
        phrases = JSON.parse(taglineTrack.dataset.phrases || "[]");
    } catch (error) {
        phrases = [];
    }

    if (!phrases.length) {
        setFinalTagline();
        return;
    }

    const introDelay = 180;
    const visibleDuration = 780;
    const transitionDuration = 480;

    taglinePhrase.classList.remove("is-visible", "is-exiting");

    window.setTimeout(() => {
        let index = 0;

        const showPhrase = () => {
            taglinePhrase.textContent = phrases[index];
            taglinePhrase.classList.remove("is-exiting");

            window.requestAnimationFrame(() => {
                taglinePhrase.classList.add("is-visible");
            });

            if (index === phrases.length - 1) {
                return;
            }

            window.setTimeout(() => {
                taglinePhrase.classList.remove("is-visible");
                taglinePhrase.classList.add("is-exiting");

                window.setTimeout(() => {
                    index += 1;
                    showPhrase();
                }, transitionDuration);
            }, visibleDuration);
        };

        showPhrase();
    }, introDelay);
};

if (!reducedMotion && "IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");

                if (entry.target === heroCopy) {
                    runTaglineAnimation();
                }

                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.18 });

    revealTargets.forEach((target) => revealObserver.observe(target));
} else {
    revealTargets.forEach((target) => target.classList.add("is-visible"));
    setFinalTagline();
}

const counters = document.querySelectorAll(".count");

const animateCount = (element) => {
    const target = Number(element.dataset.count || 0);
    const suffix = element.dataset.suffix || "";
    const duration = 1400;
    const startTime = performance.now();

    const update = (currentTime) => {
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const value = Math.floor(progress * target);
        element.textContent = value + suffix;

        if (progress < 1) {
            window.requestAnimationFrame(update);
        } else {
            element.textContent = target + suffix;
        }
    };

    window.requestAnimationFrame(update);
};

if (!reducedMotion && "IntersectionObserver" in window) {
    const countObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                animateCount(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.8 });

    counters.forEach((counter) => countObserver.observe(counter));
} else {
    counters.forEach((counter) => {
        counter.textContent = (counter.dataset.count || "0") + (counter.dataset.suffix || "");
    });
}

const navLinks = document.querySelectorAll(".nav-links a[href^='#']");
const navTargets = Array.from(navLinks)
    .map((link) => {
        const id = link.getAttribute("href").slice(1);
        const section = id ? document.getElementById(id) : null;
        return section ? { link, section } : null;
    })
    .filter(Boolean);

if (navTargets.length && "IntersectionObserver" in window) {
    const setActive = (link) => {
        navLinks.forEach((other) => {
            const isActive = other === link;
            other.classList.toggle("is-active", isActive);
            if (isActive) {
                other.setAttribute("aria-current", "page");
            } else {
                other.removeAttribute("aria-current");
            }
        });
    };

    const navObserver = new IntersectionObserver((entries) => {
        entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
            .forEach((entry) => {
                const match = navTargets.find((t) => t.section === entry.target);
                if (match) setActive(match.link);
            });
    }, { rootMargin: "-40% 0px -50% 0px", threshold: 0 });

    navTargets.forEach(({ section }) => navObserver.observe(section));
}

const scrollTopBtn = document.getElementById("scrollTop");
if (scrollTopBtn) {
    const toggleScrollTop = () => {
        scrollTopBtn.classList.toggle("is-visible", window.scrollY > 600);
    };
    window.addEventListener("scroll", toggleScrollTop, { passive: true });
    toggleScrollTop();
    scrollTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: reducedMotion ? "auto" : "smooth"
        });
    });
}
