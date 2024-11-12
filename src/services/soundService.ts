class SoundService {
  private sounds: { [key: string]: HTMLAudioElement } = {};

  constructor() {
    this.preloadSounds({
      move: '/sounds/move.mp3',
      attack: '/sounds/attack.mp3',
      skill: '/sounds/skill.mp3',
      victory: '/sounds/victory.mp3',
      select: '/sounds/select.mp3',
      damage: '/sounds/damage.mp3',
    });
  }

  private preloadSounds(soundPaths: { [key: string]: string }) {
    Object.entries(soundPaths).forEach(([key, path]) => {
      const audio = new Audio(path);
      audio.preload = 'auto';
      this.sounds[key] = audio;
    });
  }

  play(soundName: string) {
    const sound = this.sounds[soundName];
    if (sound) {
      sound.currentTime = 0;
      sound.play().catch(error => console.log('Audio playback failed:', error));
    }
  }
}

export const soundService = new SoundService(); 