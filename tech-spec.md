# Auto Clip Cuan Engine - Technical Specification

## 1. Tech Stack Overview

| Category | Technology |
|----------|------------|
| Framework | React 18 + TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS 3.4 |
| UI Components | shadcn/ui |
| Animation | Framer Motion |
| Icons | Lucide React |
| Fonts | Google Fonts (Open Sans) |

## 2. Tailwind Configuration

```javascript
// tailwind.config.js extensions
{
  theme: {
    extend: {
      colors: {
        'bg-primary': '#000000',
        'bg-secondary': '#1a1a1a',
        'accent-red': '#da1111',
        'accent-yellow': '#ffd700',
        'accent-green': '#00c853',
        'text-primary': '#ffffff',
        'text-secondary': '#b0b0b0',
        'maroon': '#5d1a1a',
        'dark-green': '#1a3d1a',
      },
      fontFamily: {
        'sans': ['Open Sans', 'sans-serif'],
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 2s infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
}
```

## 3. Component Inventory

### Shadcn/UI Components (Pre-installed)
- Button (customized for CTA)

### Custom Components

| Component | Props | Description |
|-----------|-------|-------------|
| `HeroSection` | - | Main hero with headline, image, CTA |
| `BeforeAfterSection` | - | Before/After comparison cards |
| `ExplanationSection` | - | What is AutoClip explanation |
| `WhyRealSection` | - | Why clipper is real section |
| `TestimonialsSection` | - | User testimonials |
| `FeaturesSection` | - | Features and benefits |
| `PricingSection` | - | Total value breakdown |
| `FinalCTA` | - | Final call to action |
| `CTAButton` | `href: string, children: ReactNode` | Reusable CTA button |
| `ScrollReveal` | `children: ReactNode, delay?: number` | Scroll animation wrapper |

## 4. Animation Implementation Plan

| Interaction | Tech Choice | Implementation |
|-------------|-------------|----------------|
| Page Load Fade | Framer Motion | `initial={{ opacity: 0 }} animate={{ opacity: 1 }}` on main container |
| Section Reveal | Framer Motion | `whileInView` with `viewport={{ once: true }}` |
| Stagger Children | Framer Motion | `staggerChildren: 0.1` in parent variants |
| Button Hover | Tailwind + Framer | `whileHover={{ scale: 1.02 }}` + Tailwind shadow |
| Image Scale | Framer Motion | `whileHover={{ scale: 1.01 }}` |
| Scroll Progress | Framer Motion | `useScroll` hook (optional) |

### Animation Variants

```typescript
// Fade up animation
const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
  }
};

// Stagger container
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

// Button bounce
const buttonVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  }
};
```

## 5. Project File Structure

```
/mnt/okcomputer/output/app/
├── public/
│   ├── image1.jpg
│   ├── image2.jpg
│   ├── image3.jpg
│   ├── image4.jpg
│   ├── image5.jpg
│   └── image6.jpg
├── src/
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── BeforeAfterSection.tsx
│   │   ├── ExplanationSection.tsx
│   │   ├── WhyRealSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   ├── FeaturesSection.tsx
│   │   ├── PricingSection.tsx
│   │   └── FinalCTA.tsx
│   ├── components/
│   │   ├── CTAButton.tsx
│   │   └── ScrollReveal.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── tailwind.config.js
├── vite.config.ts
└── package.json
```

## 6. Package Installation

```bash
# Initialize project
bash /app/.kimi/skills/webapp-building/scripts/init-webapp.sh "Auto Clip Cuan Engine"

# Install animation library
npm install framer-motion

# Google Fonts will be loaded via HTML link
```

## 7. Key Implementation Notes

### Mobile-First Design
- Max-width: 480px container
- All images scale to 100% width
- Touch-friendly button sizes (min 44px height)

### Performance
- Images optimized and served from public folder
- Lazy loading for below-fold images
- `will-change` on animated elements
- GPU-accelerated transforms only

### Accessibility
- Semantic HTML structure
- Alt text for all images
- Focus states on interactive elements
- Sufficient color contrast

### Transaction Link
- CTA buttons link to: `https://aesteticdigital.myr.id/pl/YG-auto-clip-cuan-engine-40991-hypd`
- Opens in new tab (`target="_blank" rel="noopener noreferrer"`)

## 8. Responsive Breakpoints

| Breakpoint | Width | Adjustments |
|------------|-------|-------------|
| Mobile (default) | < 640px | Full width, single column |
| Tablet (sm) | 640px+ | Slight padding increase |
| Desktop (lg) | 1024px+ | Centered container, max-width 480px |

Note: This is a mobile-first landing page design. The desktop view maintains the same narrow layout for optimal reading experience.
