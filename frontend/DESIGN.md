# Design System: Editorial Artisanship

## 1. Overview & Creative North Star
**The Creative North Star: "The Digital Loom"**

This design system is not a mere storefront; it is a digital tapestry. We are moving away from the "grid-of-cards" monotony of standard e-commerce to create a high-end, editorial experience that mirrors the intricate process of Indian weaving and block printing. 

The system utilizes **Organic Asymmetry** and **Tonal Depth** to break the "template" look. By overlapping high-fidelity product imagery with serif typography and subtle, shifting surfaces, we create a sense of tactile luxury. The goal is to make the user feel as though they are paging through a limited-edition fashion lookbook rather than scrolling through a database.

---

## 2. Colors & Surface Philosophy
The palette draws from the vibrant heritage of India—Saffron, Indigo, and Marigold—but applies them with modern restraint to maintain a premium feel.

### The "No-Line" Rule
**Explicit Instruction:** 1px solid borders are strictly prohibited for sectioning. Structural boundaries must be defined solely through background color shifts. For example, a `surface-container-low` section should sit directly against a `surface` background. This creates a seamless, "stitched" appearance rather than a boxed-in one.

### Surface Hierarchy & Nesting
Treat the UI as physical layers of fine khadi or silk. 
- **Base:** Use `surface` (#fef8f5) for the primary canvas.
- **Nesting:** Place `surface-container-lowest` cards on `surface-container-low` sections to create a soft, natural lift.
- **Glass & Gradient:** For floating navigation or festive callouts, use Glassmorphism (semi-transparent `surface` colors with a 12px-20px backdrop-blur). 
- **Signature Glow:** Apply a subtle radial gradient from `primary` (#8f4e00) to `primary_container` (#ff9933) on hero CTAs to give them a "soul" and depth that flat hex codes cannot achieve.

---

## 3. Typography
We use a high-contrast pairing to balance heritage and modernity.

- **Display & Headlines (Noto Serif):** This is our "Editorial Voice." Large scales (`display-lg` at 3.5rem) should be used with tight letter-spacing to feel like a fashion magazine masthead. Use it for product names and artisanal stories.
- **Body & Titles (Manrope):** This is our "Functional Voice." It provides a clean, geometric counterpoint to the serif. `title-md` is the workhorse for UI elements and navigation.
- **Typographic Expression:** Headlines should occasionally overlap image containers or be placed with intentional asymmetry (e.g., left-aligned text next to a right-aligned image) to break the vertical axis of the page.

---

## 4. Elevation & Depth
Depth in this system is achieved through **Tonal Layering** rather than traditional drop shadows.

- **The Layering Principle:** Instead of a shadow, place a `surface-container-highest` element behind a `surface-container` element. The difference in tonal value creates a sophisticated "stacked paper" effect.
- **Ambient Shadows:** If a floating element (like a Quick-Buy modal) requires a shadow, it must be an "Indigo-Tinted Shadow." Use the `on_secondary` color at 6% opacity with a blur of 30px and a Y-offset of 10px. Never use pure black or grey shadows.
- **The "Ghost Border" Fallback:** If a boundary is required for accessibility in input fields, use the `outline_variant` (#dbc2b0) at **20% opacity**.
- **Signature Patterns:** Subtle paisley or block-print textures should be applied as a mask on `surface_variant` layers at 3-5% opacity. These should feel like watermarks on handmade paper, visible only upon close inspection.

---

## 5. Components

### Buttons
- **Primary:** A gradient-filled container (`primary` to `primary_container`) with `on_primary` text. Use `xl` (0.75rem) roundedness for a soft, premium touch.
- **Secondary:** No fill. Use a `title-sm` weight in `secondary` (#4b53bc) with a "Ghost Border."
- **Tertiary/Editorial:** A simple underline using the `tertiary` (#795900) color, placed 4px below the text.

### Cards & Product Listings
- **Rule:** Forbid the use of divider lines.
- **Structure:** Use vertical white space from the 32px/48px scale to separate content. Images should use the `lg` (0.5rem) corner radius. The product name (Noto Serif) should be significantly larger than the price (Manrope) to emphasize the "Art" over the "Transaction."

### Chips
- **Selection:** Use `tertiary_container` (#e2a900) for active states. The shape should be `full` (9999px) to contrast against the architectural lines of the rest of the UI.

### Input Fields
- **Styling:** Use a "Bottom-Line Only" approach or a very soft `surface_container_high` fill. When focused, the label should transform into the `secondary` indigo color to provide a sharp, clear signal of intent.

### Additional Component: The "Artisan Story" Carousel
A bespoke component where a large `display-sm` headline sits half-on and half-off a high-resolution image of a craftsperson's hands. This breaks the grid and forces the user to pause and appreciate the "handmade" nature of the brand.

---

## 6. Do's and Don'ts

### Do
- **Do** use generous whitespace. High-end brands "breathe."
- **Do** mix serif and sans-serif within the same section to create hierarchy.
- **Do** use the Indigo (`secondary`) for "Trust" elements like secure checkout or "Verified Artisan" badges.
- **Do** allow images to vary in aspect ratio (e.g., 4:5 for portraits, 1:1 for details) to create an organic, staggered layout.

### Don't
- **Don't** use 100% opaque black (#000000) for text. Always use `on_surface` (#1d1b1a).
- **Don't** use "Card" containers with heavy borders; let the background color transitions do the work.
- **Don't** use stock iconography. Icons should be thin-stroke (1.5px) and customized to feel like hand-drawn ink illustrations.
- **Don't** over-saturate the Saffron. Use it as a "Spice"—a highlight for CTAs and alerts—rather than a primary background color.