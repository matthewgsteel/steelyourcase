# CMS Visual Editor Plan

## Decision Summary

The current Astro site is technically salvageable, but the present editing model is not a good long-term fit for a non-technical owner. Most public copy, labels, navigation, service-page sections, and images are still wired directly in code, especially in `src/lib/site.ts`, the Astro page files in `src/pages`, and assets in `public/images`.

If the goal is a GoDaddy-like browser editing experience while preserving Astro, GitHub, and Cloudflare Pages, the best first path is **CloudCannon**.

That recommendation is not "install and done." It means:

1. Keep the current Astro site and Cloudflare Pages Functions.
2. Refactor the editable page content into structured content files and component data.
3. Add a real visual editor layer on top of that content model.
4. Stop after a narrow pilot before resuming heavy polish.

## Current Repo Reality

These parts are already useful and worth preserving:

- Astro page and component structure in `src/pages` and `src/components`
- Cloudflare Pages Function intake path in `functions/api/contact.ts`
- Turnstile server-side validation path
- Proton SMTP probe-gated transport path in `src/lib/mail` and the related docs
- Existing public assets in `public/images`
- Existing internal operating docs and launch notes

These parts are the main blocker to easy visual editing:

- Large amounts of page copy and labels are hard-coded in `src/lib/site.ts`
- Homepage and service page sections are code-defined instead of editor-defined
- Images are file-based, but not yet mapped into an editor-friendly content model
- The current setup is built for developer edits first, not editor ownership first

## Quick Verdict Matrix

| Option | GoDaddy-Like Fit | Visual Browser Editing | Keep Astro | Keep GitHub Repo | Keep Cloudflare Pages | Keep Contact + Turnstile + Proton Path | Salvage Level |
| --- | --- | --- | --- | --- | --- | --- | --- |
| CloudCannon | High | Yes | Yes | Yes | Yes | Yes | High, with refactor |
| TinaCMS | Medium | Yes | Yes | Yes | Yes | Yes | Medium |
| Builder.io | Medium | Yes | Yes | Yes | Partial | Partial | Medium |
| Decap CMS | Low to Medium | Partial | Yes | Yes | Yes | Yes | Medium |
| Webflow / builder-first rebuild | Very High | Yes | Partial | Partial | No | No clean carryover | Low to Partial |
| Stay code-only | Very Low | No | Yes | Yes | Yes | Yes | High, but wrong fit |

`Keep Cloudflare Pages` is an informed compatibility judgment based on official Astro and Cloudflare Git-based deployment docs plus each CMS product's Git workflow. Where that is an inference rather than an explicit vendor statement, it is called out below.

## Recommendation

### Recommended Platform: CloudCannon

Why CloudCannon is the best first candidate for this repo:

- It is the closest match to "I want to see the page, click into it, edit it, preview it, and publish it" without throwing away Astro.
- Astro officially documents CloudCannon as a visual editor path for `.astro`, Markdown, JSON, and related content.
- CloudCannon's editor is built around Git-backed sites, which fits the current GitHub plus Cloudflare Pages direction.
- It is much more aligned with the current repo shape than a Webflow rebuild would be.
- It lets us preserve the existing contact form, Turnstile checks, and Proton SMTP stop-gate instead of redesigning those from scratch.

Recommended next step:

- Do a **narrow CloudCannon pilot** on the homepage, contact page, about page, and one service page.
- Do **not** resume broad design polish until that pilot proves the editing experience is usable for you personally.

## Option-by-Option Evaluation

### 1. CloudCannon

**How close is it to GoDaddy Website Builder?**

- Close, but not identical.
- It is much closer than a code-only CMS because it gives an interactive page preview and inline editing.
- It is not a pure drag-and-drop website builder in the same way GoDaddy or Webflow is.

**Can I visually edit pages in the browser?**

- Yes.
- CloudCannon's Visual Editor is designed for interactive page preview and inline editing.

**Can I swap images without code?**

- Yes, after images are exposed as editable fields or image regions.

**Can I edit homepage sections without code?**

- Yes, if those sections are moved out of hard-coded Astro data and into editor-managed content structures.

**Can I preview before publishing?**

- Yes.
- CloudCannon supports preview-driven editing and staging/publish branch workflows.

**Does it work with Astro?**

- Yes.
- Astro has an official CloudCannon guide.

**Does it work with GitHub/private repo?**

- Yes.
- CloudCannon connects directly to Git repositories and syncs both ways.

**Does it work with Cloudflare Pages?**

- Yes, with an important note.
- CloudCannon can remain the editor while GitHub stays the source of truth and Cloudflare Pages continues building from that repo.
- This is a workflow compatibility conclusion, not a claim that CloudCannon is managing Cloudflare directly.

**Does it preserve current contact form / Turnstile / Proton SMTP path?**

- Yes.
- Those can stay in the Astro and Cloudflare Pages Functions layer.

**What would need to change in this repo?**

- Move hard-coded page content from `src/lib/site.ts` into structured content files.
- Define editable content models for homepage sections, page hero blocks, nav labels, CTA copy, and image references.
- Add CloudCannon configuration, collections, schemas, and editable regions for the main Astro components.
- Keep `functions/api/contact.ts`, Turnstile validation, and mail transport code intact.

**How much of the current work is salvageable?**

- High.
- Most code, assets, forms, server logic, and page structure are salvageable.
- The main rework is content modeling, not a rebuild.

**Main risks**

- The editing experience will only be as good as the initial modeling work.
- If sections remain too hard-coded, the editor will feel half-finished.
- Some layout-level changes will still be developer changes.

**Recommended next step**

- Pilot CloudCannon on 4 pages and judge the real editing feel before any more site polish.

### 2. TinaCMS

**How close is it to GoDaddy Website Builder?**

- Medium.
- Stronger than a plain form-based CMS, but still more developer-shaped than CloudCannon or Webflow.

**Can I visually edit pages in the browser?**

- Yes.
- Tina now documents first-class visual editing for Astro without needing React in the page tree.

**Can I swap images without code?**

- Yes, if images are modeled as Tina-managed fields.

**Can I edit homepage sections without code?**

- Yes, if those sections are moved into Tina collections or structured objects.

**Can I preview before publishing?**

- Yes.
- Tina supports visual editing and production deployment flows, but the exact review setup depends on TinaCloud or a self-hosted backend.

**Does it work with Astro?**

- Yes.

**Does it work with GitHub/private repo?**

- Yes.
- Tina supports GitHub-backed storage and private-repo setups.

**Does it work with Cloudflare Pages?**

- Likely yes.
- Astro plus Tina can still deploy wherever Astro deploys.
- However, Tina adds more backend and auth moving parts than CloudCannon, so the overall setup is heavier.

**Does it preserve current contact form / Turnstile / Proton SMTP path?**

- Yes.
- Those can remain in the existing Pages Functions lane.

**What would need to change in this repo?**

- Add Tina initialization and schema files.
- Move editable site content into Tina collections or JSON/Markdown-backed content files.
- Update page data loading to use Tina-managed content sources.
- Add Tina deployment and auth/backend setup.

**How much of the current work is salvageable?**

- Medium.
- The site structure and server functions survive, but the content layer would need a real conversion.

**Main risks**

- More moving pieces than CloudCannon.
- The setup is still developer-owned at the content-model layer.
- It may feel less "website builder" and more "structured CMS with visual editing."

**Recommended next step**

- Keep Tina as the second-choice fallback if CloudCannon's editing setup feels too constrained or too expensive.

### 3. Builder.io

**How close is it to GoDaddy Website Builder?**

- Medium.
- It is visually stronger than Tina or Decap, but it pushes the site toward Builder-managed content and registered components.

**Can I visually edit pages in the browser?**

- Yes.

**Can I swap images without code?**

- Yes.

**Can I edit homepage sections without code?**

- Yes, once those sections are represented as Builder content and components.

**Can I preview before publishing?**

- Yes.

**Does it work with Astro?**

- Yes.
- Astro has an official Builder recipe.

**Does it work with GitHub/private repo?**

- Yes, Builder has Git-connected project flows.

**Does it work with Cloudflare Pages?**

- Partially.
- The Astro site can still deploy to Cloudflare Pages, but Builder introduces a stronger parallel content system than CloudCannon or Decap.
- In practice, this is more of an architectural shift than a light editor layer.

**Does it preserve current contact form / Turnstile / Proton SMTP path?**

- Partially.
- Those server-side paths can remain, but editable pages would need careful boundaries so Builder-managed content does not take over critical intake logic.

**What would need to change in this repo?**

- Add Builder SDK integration.
- Register editable components and section models.
- Move major page sections into Builder-managed content entries.
- Define how Builder content coexists with the existing Astro routing and Cloudflare functions.

**How much of the current work is salvageable?**

- Medium.
- Design ideas, assets, routes, and functions are reusable, but the content architecture would shift meaningfully.

**Main risks**

- More vendor-shaped architecture.
- More component registration work up front.
- Greater chance of drift between the repo's native Astro structure and the visual editor's content model.

**Recommended next step**

- Keep Builder as a possible option only if drag-and-drop section control becomes more important than preserving the repo's current shape.

### 4. Decap CMS

**How close is it to GoDaddy Website Builder?**

- Low to medium.
- It is a usable editor, but it is not truly GoDaddy-like.

**Can I visually edit pages in the browser?**

- Partially.
- It has a web editor and preview, but not the same direct on-page editing feel as CloudCannon or Webflow.

**Can I swap images without code?**

- Yes.
- Decap supports media uploads and image field editing.

**Can I edit homepage sections without code?**

- Yes, if the homepage is converted into a Decap-managed files collection or structured content file.

**Can I preview before publishing?**

- Yes.
- It has live preview and can use deploy preview links when the deployment platform exposes preview statuses.

**Does it work with Astro?**

- Yes.

**Does it work with GitHub/private repo?**

- Yes.

**Does it work with Cloudflare Pages?**

- Likely yes for normal Git-based deployment.
- Preview-link quality may need extra verification depending on how Cloudflare Pages reports deploy status back to GitHub.

**Does it preserve current contact form / Turnstile / Proton SMTP path?**

- Yes.

**What would need to change in this repo?**

- Add the `/admin` route and Decap config.
- Define content files and collections for homepage, nav, service pages, and media.
- Move hard-coded content into those editor-backed files.
- Potentially add custom preview work if the default preview feels too detached from the real page.

**How much of the current work is salvageable?**

- Medium.
- Code and server functions survive, but the editor experience would still be fairly structured and form-like.

**Main risks**

- May still feel too technical.
- Preview experience is weaker than the user's stated preference.
- Better for Git-native content editing than for "click the page and just change it."

**Recommended next step**

- Keep Decap only as a low-cost fallback if CloudCannon and Tina are rejected.

### 5. Webflow or Another Builder-First Rebuild

**How close is it to GoDaddy Website Builder?**

- Very high.
- This is the closest category to the editing experience you described.

**Can I visually edit pages in the browser?**

- Yes.

**Can I swap images without code?**

- Yes.

**Can I edit homepage sections without code?**

- Yes.

**Can I preview before publishing?**

- Yes.

**Does it work with Astro?**

- Partially.
- Webflow Cloud now supports Astro, but that does not mean the current Astro repo instantly becomes a native Webflow editing experience.

**Does it work with GitHub/private repo?**

- Partially.
- There are Git- and app-based paths in Webflow Cloud, but the center of gravity shifts toward Webflow's platform.

**Does it work with Cloudflare Pages?**

- No, not as the primary intended path.
- A true Webflow-first move would pull the hosting and editing model away from Cloudflare Pages.

**Does it preserve current contact form / Turnstile / Proton SMTP path?**

- No clean carryover.
- Those flows would need re-architecture, embedding, or partial separation.

**What would need to change in this repo?**

- Likely a real rebuild or major migration.
- Content and layout would be reauthored in Webflow.
- Any advanced server-side intake flow would need separate handling.

**How much of the current work is salvageable?**

- Low to partial.
- Copy, image assets, page map, and some design direction are reusable.
- The actual Astro implementation would not be the center of the solution anymore.

**Main risks**

- Highest migration cost.
- Highest chance of losing the current Cloudflare Pages and function setup.
- Highest chance of redoing already-built work.

**Recommended next step**

- Choose this only if preserving Astro is no longer a priority and the top requirement becomes "true visual editing above all else."

### 6. Staying Code-Only

**How close is it to GoDaddy Website Builder?**

- Very low.

**Can I visually edit pages in the browser?**

- No.

**Can I swap images without code?**

- No practical non-technical path.

**Can I edit homepage sections without code?**

- No practical non-technical path.

**Can I preview before publishing?**

- Yes, but only through developer workflows.

**Does it work with Astro?**

- Yes.

**Does it work with GitHub/private repo?**

- Yes.

**Does it work with Cloudflare Pages?**

- Yes.

**Does it preserve current contact form / Turnstile / Proton SMTP path?**

- Yes.

**What would need to change in this repo?**

- Nothing major.

**How much of the current work is salvageable?**

- High.

**Main risks**

- It fails the actual owner-editing requirement.
- It keeps the user dependent on developer assistance for ordinary site maintenance.

**Recommended next step**

- Reject this path for long-term ownership reasons.

## Bottom Line

### Best Fit

**CloudCannon** is the best first path because it gives the strongest visual editing layer while keeping the current Astro plus GitHub plus Cloudflare Pages architecture intact.

### Can the Current Astro Site Be Adapted?

- **Yes, partially.**
- The codebase is salvageable.
- The main required change is not a rebuild of the site logic; it is a refactor of the content layer so the editor has something real to edit.

### Is a Full Rebuild Actually Required?

- **No** for the CloudCannon path.
- **Likely yes** for a true Webflow-style builder-first path.

### Recommended Next Step

Do a narrow **CloudCannon migration pilot** for the homepage, about page, contact page, and one service page, and stop there until the editing experience is proven acceptable to the site owner.

## Official Reference Links

- Astro CloudCannon guide: https://docs.astro.build/en/guides/cms/cloudcannon/
- CloudCannon Visual Editor: https://cloudcannon.com/documentation/user-articles/what-is-the-visual-editor/
- CloudCannon GitHub syncing: https://cloudcannon.com/documentation/developer-articles/connecting-a-github-repository-as-your-source/
- CloudCannon image editing: https://cloudcannon.com/documentation/developer-guides/set-up-visual-editing/visually-edit-images/
- Astro TinaCMS guide: https://tina.io/docs/frameworks/astro
- Tina GitHub provider: https://tina.io/docs/reference/self-hosted/git-provider/github
- Astro Builder.io guide: https://docs.astro.build/en/guides/cms/builderio/
- Builder Git-connected projects: https://www.builder.io/c/docs/projects-git-providers
- Astro Decap guide: https://docs.astro.build/en/guides/cms/decap-cms/
- Decap intro: https://decapcms.org/docs/intro/
- Decap deploy preview links: https://decapcms.org/docs/deploy-preview-links/
- Webflow content editing: https://university.webflow.com/videos/edit-content-in-webflow
- Webflow Cloud: https://developers.webflow.com/webflow-cloud/intro
- Cloudflare Pages Git integration: https://developers.cloudflare.com/pages/get-started/git-integration/
- Cloudflare Pages Astro guide: https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/
