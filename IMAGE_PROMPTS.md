# Image prompts

Generate each image, save it under `public/images/` with the exact file name, and it shows up on its slide with no code change. Until then the slide shows a placeholder with the prompt.

Style should match the [Demystifying software factories](https://github.com/port-labs/sw-factory-persentation/tree/erik-be-playin) deck (see its `public/images/`). If your tool accepts a reference image, give it `assembly-line.png` or `three-factories.png` from that repo.

**Shared style (append to every prompt):**

> Pixar-style 3D render, cute white robots with rounded bodies and glossy black visor faces with glowing blue eyes, warm cinematic industrial lighting with purple and teal accents, shallow depth of field, highly detailed, clean readable signage, 16:9 widescreen, 1920x1080.

---

## 1. Cover: `public/images/cover.png`

Keep the left third fairly dark and calm: the white title sits there.

> A vast factory floor. In the center, a robot engineer stands at a drafting table studying a glowing blueprint of a factory line. On the left side, a workshop with raw parts, tools and half-assembled machines. On the right side, a loading dock where sealed, ready-made modules arrive on pallets. Both sides are equally lit and equally inviting: neither looks like the right answer. The left third of the image stays dim and soft so the title reads clearly.

## 2. Thank you GIF: `public/images/thanks.png`

Small (shown at about 17x11 rem). A short loop of 2 to 4 seconds is plenty. You can also use a still PNG; just keep the `.gif` name or change `src` on the last slide.

> Cute white robots on a factory conveyor belt pass a finished crate down the line; the last robot gives a thumbs up to the camera. Seamless loop.
