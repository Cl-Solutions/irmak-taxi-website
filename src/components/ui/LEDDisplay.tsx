import { useState, useEffect } from 'react';

interface LEDDisplayProps {
  text?: string;
  speed?: number;
  dotColor?: string;
  dotSize?: number;
  direction?: 'left' | 'right';
  pauseOnHover?: boolean;
  showBorder?: boolean;
  borderColor?: string;
  fade?: boolean;
  visibleWidth?: number;
}

// Full dot-matrix font map (uppercase A–Z, 0–9, space, punctuation)
const char: Record<string, string> = {
  A: '....###...' + '...##.##..' + '..##...##.' + '.##.....##' + '.#########' + '.##.....##' + '.##.....##',
  B: '.########.' + '.##.....##' + '.##.....##' + '.########.' + '.##.....##' + '.##.....##' + '.########.',
  C: '..######..' + '.##....##.' + '.##.......' + '.##.......' + '.##.......' + '.##....##.' + '..######..',
  D: '.########.' + '.##.....##' + '.##.....##' + '.##.....##' + '.##.....##' + '.##.....##' + '.########.',
  E: '.########' + '.##......' + '.##......' + '.######..' + '.##......' + '.##......' + '.########',
  F: '.########' + '.##......' + '.##......' + '.######..' + '.##......' + '.##......' + '.##......',
  G: '..######..' + '.##....##.' + '.##.......' + '.##...####' + '.##....##.' + '.##....##.' + '..######..',
  H: '.##.....##' + '.##.....##' + '.##.....##' + '.#########' + '.##.....##' + '.##.....##' + '.##.....##',
  I: '.####' + '..##.' + '..##.' + '..##.' + '..##.' + '..##.' + '.####',
  J: '.......##' + '.......##' + '.......##' + '.......##' + '.##....##' + '.##....##' + '..######.',
  K: '.##....##' + '.##...##.' + '.##..##..' + '.#####...' + '.##..##..' + '.##...##.' + '.##....##',
  L: '.##......' + '.##......' + '.##......' + '.##......' + '.##......' + '.##......' + '.########',
  M: '.##.....##' + '.###...###' + '.####.####' + '.##.###.##' + '.##.....##' + '.##.....##' + '.##.....##',
  N: '.##....##' + '.###...##' + '.####..##' + '.##.##.##' + '.##..####' + '.##...###' + '.##....##',
  O: '..#######.' + '.##.....##' + '.##.....##' + '.##.....##' + '.##.....##' + '.##.....##' + '..#######.',
  P: '.########.' + '.##.....##' + '.##.....##' + '.########.' + '.##.......' + '.##.......' + '.##.......',
  Q: '..#######.' + '.##.....##' + '.##.....##' + '.##.....##' + '.##..##.##' + '.##....##.' + '..#####.##',
  R: '.########.' + '.##.....##' + '.##.....##' + '.########.' + '.##...##..' + '.##....##.' + '.##.....##',
  S: '..######.' + '.##....##' + '.##......' + '..######.' + '.......##' + '.##....##' + '..######.',
  T: '.########' + '....##...' + '....##...' + '....##...' + '....##...' + '....##...' + '....##...',
  U: '.##.....##' + '.##.....##' + '.##.....##' + '.##.....##' + '.##.....##' + '.##.....##' + '..#######.',
  V: '.##.....##' + '.##.....##' + '.##.....##' + '.##.....##' + '..##...##.' + '...##.##..' + '....###...',
  W: '.##......##' + '.##..##..##' + '.##..##..##' + '.##..##..##' + '.##..##..##' + '.##..##..##' + '..###..###.',
  X: '.##.....##' + '..##...##.' + '...##.##..' + '....###...' + '...##.##..' + '..##...##.' + '.##.....##',
  Y: '.##....##' + '..##..##.' + '...####..' + '....##...' + '....##...' + '....##...' + '....##...',
  Z: '.########' + '......##.' + '.....##..' + '....##...' + '...##....' + '..##.....' + '.########',
  '!': '.####' + '.####' + '.####' + '..##.' + '.....' + '.####' + '.####',
  // Digits
  '0': '..#####..' + '.##...##.' + '.##..###.' + '.##.####.' + '.###..##.' + '.##...##.' + '..#####..',
  '1': '...##....' + '..###....' + '...##....' + '...##....' + '...##....' + '...##....' + '.#######.',
  '2': '..#####..' + '.##...##.' + '......##.' + '.....##..' + '....##...' + '...##....' + '.########',
  '3': '..#####..' + '.##...##.' + '......##.' + '....####.' + '......##.' + '.##...##.' + '..#####..',
  '4': '.##...##.' + '.##...##.' + '.##...##.' + '.#######.' + '......##.' + '......##.' + '......##.',
  '5': '.########' + '.##......' + '.##......' + '.#######.' + '.......##' + '.##...##.' + '..#####..',
  '6': '..#####..' + '.##...##.' + '.##......' + '.#######.' + '.##...##.' + '.##...##.' + '..#####..',
  '7': '.########' + '......##.' + '.....##..' + '....##...' + '...##....' + '...##....' + '...##....',
  '8': '..#####..' + '.##...##.' + '.##...##.' + '..#####..' + '.##...##.' + '.##...##.' + '..#####..',
  '9': '..#####..' + '.##...##.' + '.##...##.' + '..######.' + '......##.' + '.##...##.' + '..#####..',
};

const cw: Record<string, number> = {
  A: 10, B: 10, C: 10, D: 10, E: 9, F: 9, G: 10, H: 10, I: 5, J: 9, K: 9, L: 9, M: 10, N: 9, O: 10, P: 10,
  Q: 10, R: 10, S: 9, T: 9, U: 10, V: 10, W: 11, X: 10, Y: 9, Z: 9, '!': 5,
  '0': 9, '1': 9, '2': 9, '3': 9, '4': 9, '5': 9, '6': 9, '7': 9, '8': 9, '9': 9,
};

const normalizeChar = (c: string) => (/[a-z]/.test(c) ? c.toUpperCase() : c);

export default function LEDDisplay({
  text = 'TAXI',
  speed = 80,
  dotColor = '#e9c704',
  dotSize = 8,
  direction = 'left',
  pauseOnHover = false,
  showBorder = false,
  borderColor = '#e9c704',
  fade = true,
  visibleWidth = 120,
}: LEDDisplayProps) {
  const [scroll, setScroll] = useState<boolean[][]>([]);
  const [pos, setPos] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const spc = 4; // space width
    const newScroll: boolean[][] = Array(7)
      .fill(null)
      .map(() => Array(50).fill(false));

    for (let i = 0; i < text.length; i++) {
      const t = normalizeChar(text.charAt(i));
      if (t === ' ') {
        for (let v = 0; v < spc; v++)
          for (let j = 0; j < 7; j++) newScroll[j].push(false);
        continue;
      }
      const w = cw[t] || 9;
      const charData = char[t] || '';
      for (let j = 0; j < 7; j++) {
        for (let v = 0; v < w; v++) {
          newScroll[j].push(charData.charAt(j * w + v) === '#');
        }
      }
      // 2px gap between chars
      for (let j = 0; j < 7; j++) {
        newScroll[j].push(false);
        newScroll[j].push(false);
      }
    }

    setScroll(newScroll);
    setPos(0);
  }, [text]);

  useEffect(() => {
    if (scroll.length === 0 || paused) return;
    const l = scroll[0]?.length || 1;
    const interval = setInterval(() => {
      setPos((prev) =>
        direction === 'left' ? (prev + 1) % l : (prev - 1 + l) % l
      );
    }, speed);
    return () => clearInterval(interval);
  }, [scroll, speed, direction, paused]);

  if (scroll.length === 0) return null;
  const l = scroll[0].length;

  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{ border: showBorder ? `1px solid ${borderColor}30` : 'none' }}
      onMouseEnter={() => pauseOnHover && setPaused(true)}
      onMouseLeave={() => pauseOnHover && setPaused(false)}
    >
      {scroll.map((row, y) => (
        <div key={y} className="flex" style={{ gap: '1px' }}>
          {Array(visibleWidth)
            .fill(null)
            .map((_, x) => {
              const index =
                direction === 'left'
                  ? (pos + x) % l
                  : (pos - x + l) % l;
              const isActive = row[index];
              const edgeFade =
                fade && (x < 4 || x > visibleWidth - 5) ? 0.25 : 1;
              return (
                <div
                  key={x}
                  style={{
                    width: `${dotSize}px`,
                    height: `${dotSize}px`,
                    backgroundColor: isActive ? dotColor : 'transparent',
                    border: `1px solid ${dotColor}18`,
                    borderRadius: '2px',
                    opacity: isActive ? edgeFade : edgeFade * 0.5,
                    boxShadow: isActive ? `0 0 ${dotSize * 0.8}px ${dotColor}80` : 'none',
                    transition: 'background-color 0.05s ease',
                  }}
                />
              );
            })}
        </div>
      ))}
    </div>
  );
}
