# 🏗 TravelScript AI: Product Blueprint

## 🏛 UI Architecture

The application follows a **Modular Sidebar Layout** optimized for both deep-work (Desktop) and on-the-go management (Mobile).

### Core Components
- **Layout Engine:** Handles the persistent navigation, workspace status, and responsive "Safe Areas" for content.
- **Context Management:** `App.tsx` serves as the single source of truth for the `BrandMemory`, ensuring data consistency across the Generator and Settings modules.
- **Service Layer:** `gemini.ts` abstracts the complexity of prompt engineering and model selection.

## 🎨 Design System

### Visual Identity
- **Primary Palette:** 
  - `Midnight Navy (#0A1A2F)` - Stability & Luxury
  - `Travel Blue (#1A73E8)` - Digital Trust & Actions
  - `Sunset Coral (#FF6F61)` - Energy & Human Connection
- **Typography:**
  - **Headings:** *Montserrat* (Bold/Black) for a modern, confident brand feel.
  - **Body:** *Inter* for maximum readability in data-heavy views.
  - **Accents:** *Playfair Display* (Italic) for an editorial, high-fashion travel vibe.

### UX Principles
1. **Zero-Latency Feel:** Using `animate-fadeIn` and `animate-slideUp` for all state transitions to mask AI processing times.
2. **Contextual Awareness:** The "Brand Memory" isn't just a setting; it's a context injected into every system instruction.
3. **Editable Outputs:** AI is a co-pilot. The integrated `textarea` toggle in the generator allows humans to have the final word.

## 🤖 AI Implementation Strategy

### Prompt Engineering
TravelScript uses a "Context-Wrapped Prompting" technique:
- **System Instruction:** Defined in `services/gemini.ts` to enforce professional travel standards.
- **Context Injection:** Seamlessly blends `BrandMemory` variables into user requests.

### Model Selection
- **Text Tasks:** `gemini-3-flash-preview` for high-speed, cost-effective creative writing.
- **Visual Tasks:** `gemini-2.5-flash-image` for state-of-the-art photography generation.
- **Vision Tasks:** `gemini-3-flash-preview` for analyzing uploaded user photos to generate automated captions.

## 🗺 Future Roadmap
- **V2:** Integration of `veo-3.1` for high-quality travel B-roll video generation.
- **V2.1:** Google Maps Grounding to pull real-time restaurant and hotel recommendations directly into post scripts.
- **V2.2:** Multi-agent "Campaign Mode" that generates a week's worth of content across all platforms in one click.
