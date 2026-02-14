/**
 * nightdriver Theme - Main JavaScript
 * Interaction modules:
 * - Shared UI helpers
 * - Homepage drift/notes interactions
 * - Utility bar behavior
 * - Theme mode system
 * - Mobile navigation drawer
 */

/* -------------------------------------------------------------------------- */
/* Shared UI behavior                                                         */
/* -------------------------------------------------------------------------- */
(function () {
  'use strict';

  // Update footer copyright year if present
  (function () {
    var yearEl = document.querySelector('.nightdriver-copyright-year');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  })();

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href') || '';
      const id = href.startsWith('#') ? href.slice(1) : '';
      const target = id ? document.getElementById(id) : null;

      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Header scroll behavior (adds shadow on scroll)
  const header = document.querySelector('.nightdriver-site-header');

  window.addEventListener('scroll', function () {
    if (!header) return;

    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
      header.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
    } else {
      header.style.boxShadow = 'none';
    }
  }, { passive: true });

  // Reading progress bar for posts (uses nightdriver-progress-bar markup from post.hbs)
  (function () {
    const bar = document.getElementById('nightdriver-progress-bar');
    if (!bar) return;

    const doc = document.documentElement;

    const onScroll = () => {
      const scrollTop = doc.scrollTop || document.body.scrollTop;
      const scrollHeight = doc.scrollHeight - doc.clientHeight;
      const p = scrollHeight > 0 ? (scrollTop / scrollHeight) : 0;
      const clamped = Math.max(0, Math.min(1, p));
      bar.style.transform = 'scaleX(' + clamped + ')';
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  })();

  // Add copy button to code blocks
  document.querySelectorAll('pre code').forEach(function (codeBlock) {
    const button = document.createElement('button');
    button.className = 'nightdriver-copy-code-button';
    button.textContent = 'Copy';
    button.type = 'button';

    const pre = codeBlock.parentElement;
    pre.style.position = 'relative';
    pre.appendChild(button);

    button.addEventListener('click', function () {
      if (!navigator.clipboard || !navigator.clipboard.writeText) {
        button.textContent = 'Unavailable';
        setTimeout(function () {
          button.textContent = 'Copy';
        }, 1400);
        return;
      }

      navigator.clipboard.writeText(codeBlock.textContent).then(function () {
        button.textContent = 'Copied!';
        setTimeout(function () {
          button.textContent = 'Copy';
        }, 2000);
      }).catch(function () {
        button.textContent = 'Failed';
        setTimeout(function () {
          button.textContent = 'Copy';
        }, 1400);
      });
    });

  });

  // Drift Zone author rotator
  (function () {
    var rotators = document.querySelectorAll('.nightdriver-bento-author-rotator[data-rotate="true"]');
    if (!rotators.length) return;

    rotators.forEach(function (container) {
      var cards = Array.prototype.slice.call(container.querySelectorAll('.nightdriver-bento-card--author'));
      if (cards.length <= 1) return;

      var interval = parseInt(container.getAttribute('data-rotate-interval') || '10000', 10);
      var rotateOnClick = container.getAttribute('data-rotate-on-click') === 'true';
      var index = 0;
      var timer = null;

      function setActive(next) {
        cards.forEach(function (card, cardIndex) {
          var isActive = cardIndex === next;
          card.classList.toggle('is-active', isActive);
          card.setAttribute('aria-hidden', isActive ? 'false' : 'true');
          card.querySelectorAll('a, button, input, textarea, select').forEach(function (el) {
            if (isActive) {
              el.removeAttribute('tabindex');
            } else {
              el.setAttribute('tabindex', '-1');
            }
          });
        });

      }

      function schedule() {
        if (timer) {
          clearInterval(timer);
        }
        timer = setInterval(function () {
          index = (index + 1) % cards.length;
          setActive(index);
        }, interval);
      }

      container.classList.add('is-rotating');
      setActive(index);

      schedule();

      if (rotateOnClick) {
        container.addEventListener('click', function (event) {
          if (event.target && event.target.closest('a')) return;
          index = (index + 1) % cards.length;
          setActive(index);
          schedule();
        });
      }
    });
  })();

  // Drift Zone tag rotator
  (function () {
    var rotators = document.querySelectorAll('.nightdriver-bento-tag-cloud[data-rotate="true"]');
    if (!rotators.length) return;

    rotators.forEach(function (container) {
      var tags = Array.prototype.slice.call(container.querySelectorAll('.nightdriver-bento-tag'));
      if (tags.length <= 1) return;

      var interval = parseInt(container.getAttribute('data-rotate-interval') || '2600', 10);
      var count = parseInt(container.getAttribute('data-rotate-count') || '3', 10);
      var index = 0;

      function setActive(start) {
        tags.forEach(function (tag) {
          tag.classList.remove('is-active', 'is-active-2', 'is-active-3');
        });

        for (var i = 0; i < count; i++) {
          var tag = tags[(start + i) % tags.length];
          if (!tag) continue;
          if (i === 0) tag.classList.add('is-active');
          if (i === 1) tag.classList.add('is-active-2');
          if (i === 2) tag.classList.add('is-active-3');
        }
      }

      setActive(index);

      setInterval(function () {
        index = (index + 1) % tags.length;
        setActive(index);
      }, interval);
    });
  })();

  // Drift Zone share actions
  (function () {
    var actions = document.querySelectorAll('[data-share-action]');
    if (!actions.length) return;

    function setTempLabel(el, text) {
      var original = el.textContent;
      el.textContent = text;
      setTimeout(function () {
        el.textContent = original;
      }, 1400);
    }

    function copyCurrentUrl(el) {
      if (!navigator.clipboard || !navigator.clipboard.writeText) {
        setTempLabel(el, 'Unavailable');
        return;
      }

      navigator.clipboard.writeText(window.location.href).then(function () {
        setTempLabel(el, 'Copied');
      }).catch(function () {
        setTempLabel(el, 'Failed');
      });
    }

    actions.forEach(function (el) {
      el.addEventListener('click', function (event) {
        event.preventDefault();

        var action = el.getAttribute('data-share-action');
        if (action === 'copy') {
          copyCurrentUrl(el);
          return;
        }

        if (action === 'native') {
          if (navigator.share) {
            navigator.share({
              title: document.title,
              url: window.location.href
            }).catch(function () {});
            return;
          }

          copyCurrentUrl(el);
        }
      });
    });
  })();

  // Layby YouTube embeds: replace iframe with clean poster card + play button
  (function () {
    var laybyContentBlocks = document.querySelectorAll('.nightdriver-layby-content');
    if (!laybyContentBlocks.length) return;

    function getYoutubeId(rawUrl) {
      if (!rawUrl) return null;

      var parsed;
      try {
        parsed = new URL(rawUrl, window.location.origin);
      } catch (error) {
        return null;
      }

      var host = parsed.hostname.replace(/^www\./, '');
      if (host === 'youtu.be') {
        return (parsed.pathname || '').replace(/^\/+/, '').split(/[/?#&]/)[0] || null;
      }

      if (host === 'youtube.com' || host === 'youtube-nocookie.com' || host.endsWith('.youtube.com')) {
        var embedMatch = parsed.pathname.match(/\/embed\/([^/?#&]+)/);
        if (embedMatch && embedMatch[1]) return embedMatch[1];
        var v = parsed.searchParams.get('v');
        if (v) return v;
      }

      return null;
    }

    laybyContentBlocks.forEach(function (contentBlock) {
      var embedIframe = contentBlock.querySelector('.kg-embed-card iframe[src]');
      if (!embedIframe) return;

      var videoId = getYoutubeId(embedIframe.getAttribute('src'));
      if (!videoId) return;
      var parentCard = contentBlock.closest('.nightdriver-layby-card');
      var cardTitleEl = parentCard ? parentCard.querySelector('.nightdriver-layby-title a, .nightdriver-layby-title') : null;
      var cardTitle = cardTitleEl ? (cardTitleEl.textContent || '').trim() : 'Watch on YouTube';

      var posterLink = document.createElement('a');
      posterLink.className = 'nightdriver-layby-video-poster';
      posterLink.href = 'https://www.youtube.com/watch?v=' + encodeURIComponent(videoId);
      posterLink.target = '_blank';
      posterLink.rel = 'noopener noreferrer';
      posterLink.setAttribute('aria-label', 'Play "' + cardTitle + '" on YouTube');

      var thumb = document.createElement('img');
      thumb.className = 'nightdriver-layby-video-poster-img';
      thumb.alt = cardTitle;
      thumb.loading = 'lazy';
      thumb.decoding = 'async';

      var thumbSources = [
        'https://img.youtube.com/vi/' + encodeURIComponent(videoId) + '/maxresdefault.jpg',
        'https://img.youtube.com/vi/' + encodeURIComponent(videoId) + '/hqdefault.jpg',
        'https://img.youtube.com/vi/' + encodeURIComponent(videoId) + '/mqdefault.jpg'
      ];
      var thumbIndex = 0;
      thumb.src = thumbSources[thumbIndex];
      thumb.addEventListener('error', function () {
        thumbIndex += 1;
        if (thumbIndex < thumbSources.length) {
          thumb.src = thumbSources[thumbIndex];
        } else {
          thumb.remove();
        }
      });
      posterLink.appendChild(thumb);

      var titleBadge = document.createElement('span');
      titleBadge.className = 'nightdriver-layby-video-poster-title';
      titleBadge.textContent = cardTitle;
      posterLink.appendChild(titleBadge);

      var playBadge = document.createElement('span');
      playBadge.className = 'nightdriver-layby-video-poster-play';
      playBadge.setAttribute('aria-hidden', 'true');
      posterLink.appendChild(playBadge);

      contentBlock.textContent = '';
      contentBlock.appendChild(posterLink);
      contentBlock.classList.add('nightdriver-layby-content--poster');
    });
  })();

  // Single-post embeds: first video is lead media, remaining are compact inline
  (function () {
    var postContent = document.querySelector('.nightdriver-post-full--single .nightdriver-post-full-content');
    if (!postContent) return;

    var nodes = Array.prototype.slice.call(postContent.querySelectorAll('.kg-embed-card, iframe'));
    if (!nodes.length) return;

    var embedItems = [];
    nodes.forEach(function (node) {
      if (node.tagName === 'IFRAME') {
        if (node.closest('.kg-embed-card')) return;
        embedItems.push(node);
        return;
      }

      if (node.classList && node.classList.contains('kg-embed-card')) {
        embedItems.push(node);
      }
    });

    if (!embedItems.length) return;

    embedItems.forEach(function (embedEl, index) {
      embedEl.classList.add(index === 0 ? 'nightdriver-post-video--lead' : 'nightdriver-post-video--inline');
    });
  })();

})();

/* -------------------------------------------------------------------------- */
/* Utility bar hide/pin controls                                              */
/* -------------------------------------------------------------------------- */
(function () {
  var utility = document.querySelector('.nightdriver-header-utility');
  if (!utility) return;

  var lastY = window.scrollY;
  var threshold = 12;
  var longPressTimer = null;
  var suppressClick = false;
  var longPressMs = 450;

  function clearLongPressTimer() {
    if (!longPressTimer) return;
    clearTimeout(longPressTimer);
    longPressTimer = null;
  }

  function setUtilityHidden(hidden) {
    utility.classList.toggle('nightdriver-is-hidden', hidden);
    var toggle = utility.querySelector('[data-utility-toggle]');
    if (toggle) {
      toggle.setAttribute('aria-expanded', hidden ? 'false' : 'true');
    }
  }

  function setPinned(pinned) {
    utility.dataset.pinned = pinned ? 'true' : 'false';
    var toggle = utility.querySelector('[data-utility-toggle]');
    if (toggle) {
      toggle.setAttribute('aria-pressed', pinned ? 'true' : 'false');
    }
  }

  function toggleHiddenFromClick() {
    var hidden = utility.classList.contains('nightdriver-is-hidden');
    setUtilityHidden(!hidden);
  }

  var handle = utility.querySelector('[data-utility-toggle]');
  if (handle) {
    handle.addEventListener('click', function () {
      if (suppressClick) {
        suppressClick = false;
        return;
      }
      toggleHiddenFromClick();
    });

    handle.addEventListener('pointerdown', function () {
      clearLongPressTimer();
      longPressTimer = setTimeout(function () {
        longPressTimer = null;
        suppressClick = true;
        var pinned = utility.dataset.pinned === 'true';
        setPinned(!pinned);
      }, longPressMs);
    });

    handle.addEventListener('pointerup', function () {
      if (longPressTimer) {
        clearLongPressTimer();
        suppressClick = true;
        toggleHiddenFromClick();
      }
    });

    handle.addEventListener('pointerleave', function () {
      clearLongPressTimer();
    });

    handle.addEventListener('pointercancel', function () {
      clearLongPressTimer();
    });

    handle.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handle.click();
      }
    });
  }

  window.addEventListener('scroll', function () {
    if (utility.dataset.pinned === 'true') {
      lastY = window.scrollY;
      return;
    }

    var y = window.scrollY;

    if (y > lastY + threshold) {
      setUtilityHidden(true);
    } else if (y < lastY - threshold || y < 40) {
      setUtilityHidden(false);
    }

    lastY = y;
  }, { passive: true });
})();

/* -------------------------------------------------------------------------- */
/* Mode label text mapping from @custom.mode_labels                           */
/* -------------------------------------------------------------------------- */
(function () {
  var wrap = document.querySelector('[data-mode-labels]');
  if (!wrap) return;

  var raw = (wrap.getAttribute('data-mode-labels') || '').trim();
  if (!raw) return;

  // Supports either | or newline separation
  var parts = raw.includes('|')
    ? raw.split('|')
    : raw.split(/\r?\n/);

  // Clean parts
  parts = parts.map(function (s) { return (s || '').trim(); }).filter(Boolean);

  // Expect 3 labels: day, mid, night
  if (parts.length < 3) return;

  var map = {
    daymode: parts[0],
    custommode: parts[1],
    nightmode: parts[2]
  };

  // Rail labels
  if (!wrap.classList.contains('nightdriver-mode-rail')) return;

  var day = wrap.querySelector('.nightdriver-mode-rail__end[data-mode="day"] span');
  var night = wrap.querySelector('.nightdriver-mode-rail__end[data-mode="night"] span');
  var mid = wrap.querySelector('.nightdriver-mode-rail__midlabel span');
  if (day) day.textContent = map.daymode || day.textContent;
  if (night) night.textContent = map.nightmode || night.textContent;
  if (mid) mid.textContent = map.custommode || mid.textContent;
})();

/* -------------------------------------------------------------------------- */
/* Theme mode switching (day/custom/night)                                    */
/* -------------------------------------------------------------------------- */
/* ========================================
   THEME SWITCHING SYSTEM
   Complete functionality for Day/Custom/Night modes
   ======================================== */
(function () {
  'use strict';

  var STORAGE_KEY = 'nightdriver_theme';

  // Get current theme from localStorage or default to daymode
  function getCurrentTheme() {
    try {
      return localStorage.getItem(STORAGE_KEY) || 'daymode';
    } catch (e) {
      return 'daymode';
    }
  }

  // Apply theme to HTML element
  function applyTheme(theme) {
    var html = document.documentElement;
    
    // Remove all theme classes
    html.classList.remove('nightdriver-theme-mode-daymode');
    html.classList.remove('nightdriver-theme-mode-custommode');
    html.classList.remove('nightdriver-theme-mode-nightmode');
    
    // Add new theme class
    html.classList.add('nightdriver-theme-mode-' + theme);
    
    // Save to localStorage
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {
      // localStorage might be disabled
    }
    
    // Update button states
    updateButtons(theme);
  }

  // Update active state on theme buttons
  function updateButtons(activeTheme) {
    // Mode rail state
    var rail = document.querySelector('[data-mode-rail]');
    if (rail) {
      var mapToMode = {
        daymode: 'day',
        custommode: 'custom',
        nightmode: 'night'
      };
      var mode = mapToMode[activeTheme] || 'custom';

      rail.dataset.active = mode;
      var pos = (mode === 'day') ? '0%' : (mode === 'night') ? '100%' : '50%';
      rail.style.setProperty('--nightdriver-rail-x', pos);

      rail.querySelectorAll('.nightdriver-mode-rail__dot').forEach(function (dot) {
        dot.setAttribute('aria-checked', dot.getAttribute('data-mode') === mode ? 'true' : 'false');
      });

      rail.querySelectorAll('.nightdriver-mode-rail__end, .nightdriver-mode-rail__midlabel').forEach(function (btn) {
        btn.setAttribute('aria-pressed', btn.getAttribute('data-mode') === mode ? 'true' : 'false');
      });
    }
  }

  // Initialize - set active states on page load
  var currentTheme = getCurrentTheme();
  updateButtons(currentTheme);

  // Mode rail handlers
  (function () {
    var rail = document.querySelector('[data-mode-rail]');
    if (!rail) return;

    var mapToTheme = {
      day: 'daymode',
      custom: 'custommode',
      night: 'nightmode'
    };

    rail.addEventListener('click', function (e) {
      var target = e.target.closest('[data-mode]');
      if (!target) return;
      var mode = target.getAttribute('data-mode');
      var theme = mapToTheme[mode] || 'custommode';
      applyTheme(theme);
    });

    rail.addEventListener('keydown', function (e) {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      var order = ['day', 'custom', 'night'];
      var current = (rail.dataset.active || 'custom');
      var idx = order.indexOf(current);
      idx += (e.key === 'ArrowRight') ? 1 : -1;
      idx = Math.max(0, Math.min(order.length - 1, idx));
      var nextTheme = mapToTheme[order[idx]] || 'custommode';
      applyTheme(nextTheme);
      e.preventDefault();
    });
  })();
})();

/* -------------------------------------------------------------------------- */
/* Mobile nav drawer                                                          */
/* -------------------------------------------------------------------------- */
(() => {
  const toggle = document.querySelector("[data-nav-toggle]");
  const drawer = document.getElementById("nightdriver-nav-drawer");

  if (!toggle || !drawer) return;

  const closeEls = drawer.querySelectorAll("[data-nav-close]");
  const panel = drawer.querySelector(".nightdriver-nav-drawer-panel");

  const openMenu = () => {
    drawer.hidden = false;
    document.documentElement.classList.add("nightdriver-nav-open");
    toggle.setAttribute("aria-expanded", "true");

    // Focus first link for keyboard users
    const firstLink = drawer.querySelector("a");
    if (firstLink) firstLink.focus();

    document.addEventListener("keydown", onKeyDown);
  };

  const closeMenu = () => {
    document.documentElement.classList.remove("nightdriver-nav-open");
    toggle.setAttribute("aria-expanded", "false");

    drawer.hidden = true;
    toggle.focus();

    document.removeEventListener("keydown", onKeyDown);
  };

  const onKeyDown = (e) => {
    if (e.key === "Escape") closeMenu();
  };

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    if (isOpen) closeMenu();
    else openMenu();
  });

  closeEls.forEach((el) => el.addEventListener("click", closeMenu));

  // Optional: close if a nav link is clicked
  drawer.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (a) closeMenu();
  });

  // Prevent clicks inside panel from triggering backdrop behaviors
  if (panel) {
    panel.addEventListener("click", (e) => e.stopPropagation());
  }
})();
