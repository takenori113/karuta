// src/types/use-sound.d.ts
declare module "use-sound" {
  interface UseSoundOptions {
    volume?: number;
    playbackRate?: number;
    loop?: boolean;
    soundEnabled?: boolean;
  }

  export default function useSound(
    src: string | string[],
    options?: UseSoundOptions
  ): [() => void, any];
}
