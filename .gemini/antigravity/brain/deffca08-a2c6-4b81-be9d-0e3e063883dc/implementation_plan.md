# Implement WebGL Mouse Image Distortion

The objective is to revert the static hover images in the Branches section ("Các Phân Hiệu") to their original minimalist design and instead implement a dynamic WebGL effect. When the user hovers over a branch, an image corresponding to that branch will appear and follow the mouse cursor with a fluid distortion shader effect, inspired by Olivier Larose's `mouse-image-distortion` demo.

## User Review Required

> [!WARNING]  
> This feature introduces Three.js and Framer Motion into the project, which will increase the bundle size. Since the project strongly relies on GSAP, mixing Framer Motion and GSAP is perfectly fine but please confirm if you are okay with adding these dependencies:
> - `@react-three/fiber`
> - `@react-three/drei`
> - `framer-motion`
> - `framer-motion-3d`

## Proposed Changes

We will copy the necessary components from the reference repository, convert them to TypeScript, and modify the `BranchesSection.tsx` to handle the interactive hover state.

---

### External Dependencies

#### [NEW] `npm install @react-three/fiber @react-three/drei framer-motion framer-motion-3d`
Will be executed to install the required dependencies for the WebGL scene and 3D animations.

---

### Component Level Changes

#### [MODIFY] [BranchesSection.tsx](file:///c:/Users/legen/Desktop/APAG%20Landing%20Page/src/components/organisms/BranchesSection.tsx)
- **Revert Layout**: Remove the `<Image>` background components and gradients added in the previous step. Reset text colors to their original states.
- **State Management**: Add a `useState` hook (`activeBranch`) to track which branch index is currently being hovered.
- **Event Listeners**: Attach `onMouseOver` and `onMouseLeave` handlers to the branch cards to update `activeBranch`.
- **Render Scene**: Render the new `DistortionScene` fixed over the section layout (with `pointer-events-none`) so the images track the mouse over the web content.

#### [NEW] [components/utilities/mouse-image/Scene.tsx](file:///c:/Users/legen/Desktop/APAG%20Landing%20Page/src/components/utilities/mouse-image/Scene.tsx)
Creates a wrapper component for the `@react-three/fiber` `<Canvas>`. This Canvas will exist globally fixed or absolutely across the `BranchesSection` and will render the `Model` based on `activeBranch`.

#### [NEW] [components/utilities/mouse-image/Model.tsx](file:///c:/Users/legen/Desktop/APAG%20Landing%20Page/src/components/utilities/mouse-image/Model.tsx)
Ported from `Model.jsx`. Uses `useFrame` to track mouse movements using `framer-motion-3d` constraints, applies a custom shader to a plane based on the mouse delta, and crossfades the branch images (Dak Lak, Da Nang, TPHCM) when `activeBranch` changes.

#### [NEW] [components/utilities/mouse-image/Shader.ts](file:///c:/Users/legen/Desktop/APAG%20Landing%20Page/src/components/utilities/mouse-image/Shader.ts)
Ported from `Shader.js`. Contains the raw string definitions for `vertexShader` and `fragmentShader`.

#### [NEW] [components/utilities/mouse-image/hooks.ts](file:///c:/Users/legen/Desktop/APAG%20Landing%20Page/src/components/utilities/mouse-image/hooks.ts)
A combined utility file to port `useMouse.js` and `useDimension.js` to pure React hooks with TypeScript support.

## Open Questions

> [!IMPORTANT]  
> APAG Landing Page heavily uses `GSAP` for all animations. Olivier's codebase uses `framer-motion` purely for the spring-based easing of the `x` and `y` cursor coordinates inside WebGL. Are you okay with mixing `framer-motion` just for this component, or do you require me to re-engineer his system to strictly use `GSAP` to save bundle size? (Using Framer Motion is highly recommended here to keep the 1:1 feel of his source code without potential bugs).

## Verification Plan

### Automated Tests
- Run `npm run lint` and `npm run build` to ensure the new TypeScript typings for `@react-three/fiber` compile perfectly.
- Start the server and verify no Next.js errors occur loading WebGL components.

### Manual Verification
- Hover over "TP. Hồ Chí Minh", "Đà Nẵng", and "Đắk Lắk".
- A distorted image matching the branch should smoothly fade in and follow the mouse pointer, stretching based on mouse velocity exactly like the referenced blog article.
