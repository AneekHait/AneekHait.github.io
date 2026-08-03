const year = document.getElementById("year");

if (year) {
    year.textContent = new Date().getFullYear();
}

const themeStorageKey = "aneek-theme";
const themeToggle = document.getElementById("themeToggle");
const themeMeta = document.querySelector("meta[name='theme-color']");
const themeColors = {
    light: "#f3f0e8",
    dark: "#171715"
};

const setTheme = (theme, shouldStore = true) => {
    const normalizedTheme = theme === "dark" ? "dark" : "light";
    const isDark = normalizedTheme === "dark";
    const nextTheme = isDark ? "light" : "dark";

    document.documentElement.dataset.theme = normalizedTheme;
    document.documentElement.style.colorScheme = normalizedTheme;
    themeMeta?.setAttribute("content", themeColors[normalizedTheme]);

    if (themeToggle) {
        themeToggle.setAttribute("aria-label", `Switch to ${nextTheme} theme`);
        themeToggle.setAttribute("title", `Switch to ${nextTheme} theme`);
        themeToggle.setAttribute("aria-pressed", String(isDark));
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

themeToggle?.addEventListener("click", () => {
    const currentTheme = document.documentElement.dataset.theme;
    setTheme(currentTheme === "dark" ? "light" : "dark");
});

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealTargets = document.querySelectorAll("[data-reveal]");

if (!reducedMotion && "IntersectionObserver" in window) {
    document.documentElement.classList.add("reveal-ready");

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealTargets.forEach((target) => revealObserver.observe(target));
} else {
    revealTargets.forEach((target) => target.classList.add("is-visible"));
}

const counters = document.querySelectorAll(".count");

const animateCount = (element) => {
    const target = Number(element.dataset.count || 0);
    const suffix = element.dataset.suffix || "";
    const duration = 1100;
    const startTime = performance.now();

    const update = (currentTime) => {
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        element.textContent = `${Math.round(easedProgress * target)}${suffix}`;

        if (progress < 1) {
            window.requestAnimationFrame(update);
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
    }, { threshold: 0.7 });

    counters.forEach((counter) => {
        counter.textContent = `0${counter.dataset.suffix || ""}`;
        countObserver.observe(counter);
    });
}

const navLinks = document.querySelectorAll(".site-nav a[href^='#']");
const navTargets = Array.from(navLinks)
    .map((link) => {
        const id = link.getAttribute("href")?.slice(1);
        const section = id ? document.getElementById(id) : null;
        return section ? { link, section } : null;
    })
    .filter(Boolean);

if (navTargets.length && "IntersectionObserver" in window) {
    const setActive = (activeLink) => {
        navLinks.forEach((link) => {
            const isActive = link === activeLink;
            link.classList.toggle("is-active", isActive);

            if (isActive) {
                link.setAttribute("aria-current", "page");
            } else {
                link.removeAttribute("aria-current");
            }
        });
    };

    const navObserver = new IntersectionObserver((entries) => {
        entries
            .filter((entry) => entry.isIntersecting)
            .sort((first, second) => second.intersectionRatio - first.intersectionRatio)
            .forEach((entry) => {
                const match = navTargets.find(({ section }) => section === entry.target);
                if (match) {
                    setActive(match.link);
                }
            });
    }, { rootMargin: "-35% 0px -55% 0px", threshold: 0 });

    navTargets.forEach(({ section }) => navObserver.observe(section));
}

const scrollTopButton = document.getElementById("scrollTop");
const updatePageProgress = () => {
    const scrollableDistance = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollableDistance > 0 ? window.scrollY / scrollableDistance : 0;
    document.documentElement.style.setProperty("--page-progress", String(Math.min(Math.max(progress, 0), 1)));
};

if (scrollTopButton) {
    const updateScrollTop = () => {
        scrollTopButton.classList.toggle("is-visible", window.scrollY > 640);
        updatePageProgress();
    };

    window.addEventListener("scroll", updateScrollTop, { passive: true });
    updateScrollTop();

    scrollTopButton.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: reducedMotion ? "auto" : "smooth"
        });
    });
} else {
    window.addEventListener("scroll", updatePageProgress, { passive: true });
    updatePageProgress();
}