import dorAvatar from "../images/Dor-Avatar.jpeg";
import sinaiAvatar from "../images/Sinai-Avatar.jpeg";

// The two speakers, shared by the intro badges and the thank-you slide.
// focus/zoom frame each photo inside a round avatar.
// No photo? Leave avatar empty and the badge shows initials.
// pixel: true keeps pixel-art avatars crisp when scaled.
export interface Speaker {
  name: string;
  initials: string;
  role: string;
  tags: string[];
  avatar?: string;
  focus?: string;
  zoom?: string;
  tone: "blue" | "purple";
  pixel?: boolean;
  linkedin?: string;
}

export const speakers: Speaker[] = [
  {
    name: "Daniel Sinai",
    initials: "DS",
    role: "R&D Director, Port",
    tags: ["Agent infrastructure", "Software factories"],
    avatar: sinaiAvatar,
    focus: "50% 10%",
    zoom: "155%",
    tone: "blue",
    linkedin: "https://www.linkedin.com/in/danielsinai",
  },
  {
    name: "Dor Meiri",
    initials: "DM",
    role: "R&D Team Lead, Port",
    tags: ["Internal factory", "Agent context"],
    avatar: dorAvatar, // pixel art from dormeiri.com
    focus: "50% 0%",
    zoom: "125%",
    pixel: true,
    tone: "purple",
    linkedin: "https://www.linkedin.com/in/dor-meiri",
  },
];

/** Background style that frames a speaker's photo inside a round avatar. */
export const avatarStyle = (s: Speaker) =>
  s.avatar
    ? {
        backgroundImage: `url(${s.avatar})`,
        backgroundPosition: s.focus,
        backgroundSize: s.zoom,
        imageRendering: s.pixel ? ("pixelated" as const) : undefined,
        backgroundColor: s.pixel ? "#d4d4d4" : undefined,
      }
    : {};
