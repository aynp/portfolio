---
title: Textbox
description: Simple full page textbox with path-based persistent pages using localStorage.
date: "Mar 28 2026"
demoURL: "https://text.aynp.dev/"
repoURL: "https://github.com/aynp/textbox"
---

## Repository - [aynp/textbox](https://github.com/aynp/textbox)

Simple full page textbox to write stuff down. Any path you visit acts as its own independent, persistent textbox — content is saved to localStorage automatically and restored when you revisit the same path.

For example:
- [text.aynp.dev/notes](https://text.aynp.dev/notes) - a textbox for general notes
- [text.aynp.dev/work/todo](https://text.aynp.dev/work/todo) - a textbox for work todos
- [text.aynp.dev/journal](https://text.aynp.dev/journal) - a textbox for journaling

### How it works

- Visiting any path serves a persistent textbox via a `404.html` catch-all on GitHub Pages.
- The page uses `window.location.pathname` to scope localStorage, so each path has its own saved content.
- Changes are debounced and flushed on page close to prevent data loss.
