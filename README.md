# Playwright Lab

A small React app plus the Playwright tests that drive it. Use it to see a browser test click, type, and check the page.

Playwright is not a React tool. It talks to a real browser. The page can be React, Vue, Angular, Svelte, Next.js, plain HTML, or a server-rendered app from Django, Rails, PHP, or anything else that produces a website. The test does not import your components.

You write the tests in JavaScript or TypeScript here. The same product also has Python, Java, and .NET libraries. Mobile apps and desktop apps are a different kind of automation; Playwright’s job is the browser (including mobile-sized browser windows).

## Run the tests

```bash
npm install
npx playwright install chromium
npm run test:e2e
```

`npm run test:e2e` starts the Vite dev server, runs every file in `tests/`, and writes a report. Open that report with:

```bash
npm run test:e2e:report
```

Watch the browser window:

```bash
npm run test:e2e:headed
```

Pick one test and step through it:

```bash
npm run test:e2e:ui
```

The app by itself, with no tests:

```bash
npm run dev
```

Then open http://127.0.0.1:5173.

## What each file is teaching

| Test file | What you should notice |
| --- | --- |
| `tests/home.spec.ts` | Open a page, read a heading, follow a link, call `/api/tip`, then replace that response with `page.route`. |
| `tests/counter.spec.ts` | Click buttons, assert text, and see that the next test still starts at zero. |
| `tests/tasks.spec.ts` | Find a field by its label, fill it, and check a checkbox by the task name. |
| `tests/contact.spec.ts` | Submit an empty form, then a valid one. `expect` retries until the confirmation shows up. |

`playwright.config.ts` is the piece that starts `npm run dev` for you. You do not launch the browser in the test files. The `page` argument is a fresh tab in a fresh profile.

When a test fails, the HTML report links a trace. Open it and you can move through each click, the DOM at that moment, and the network calls.
