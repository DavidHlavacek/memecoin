import { motion } from 'framer-motion';
import { useEffect, useReducer, useRef } from 'react';

type State = {
  text: string;
  cursorVisible: boolean;
  phase: 'initial' | 'typing1' | 'waiting1' | 'deleting1' | 'typing2' | 'waiting2' | 'deleting2' | 'pausing';
};

type Action = 
  | { type: 'TYPE'; char: string }
  | { type: 'DELETE' }
  | { type: 'TOGGLE_CURSOR' }
  | { type: 'SET_PHASE'; phase: State['phase'] }
  | { type: 'SHOW_CURSOR' };

const initialState: State = {
  text: '',
  cursorVisible: true,
  phase: 'initial'
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'TYPE':
      return { ...state, text: state.text + action.char };
    case 'DELETE':
      return { ...state, text: state.text.slice(0, -1) };
    case 'TOGGLE_CURSOR':
      return { ...state, cursorVisible: !state.cursorVisible };
    case 'SET_PHASE':
      return { ...state, phase: action.phase };
    case 'SHOW_CURSOR':
      return { ...state, cursorVisible: true };
    default:
      return state;
  }
}

export default function TypingTitle() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const frameRef = useRef<number>();
  const initialText = "SHITCO";
  const finalText = "MEMECOINS";

  // Helper function to get random typing speed
  const getRandomTypingSpeed = (baseSpeed: number) => {
    // Humans typically type with variances between 50ms and 200ms
    return baseSpeed + (Math.random() * 150 - 50);
  };

  // Helper function to get natural pause for specific characters
  const getCharacterDelay = (char: string) => {
    // Add slight pauses after punctuation and spaces
    if ([',', '.', '!', '?', ' '].includes(char)) return 150;
    return 0;
  };

  useEffect(() => {
    let lastTime = performance.now();
    let cursorInterval: NodeJS.Timeout;
    
    const baseSpeed = {
      type: 80,  // Slightly faster base speed
      delete: 60,
      waitShort: 400,
      waitLong: 3000,
      waitHaha: 200,
      initialWait: 1500  // Initial wait time before typing starts
    };

    cursorInterval = setInterval(() => {
      dispatch({ type: 'TOGGLE_CURSOR' });
    }, 530);

    const animate = async (currentTime: number) => {
      const deltaTime = currentTime - lastTime;

      switch (state.phase) {
        case 'initial':
          if (deltaTime > baseSpeed.initialWait) {
            dispatch({ type: 'SET_PHASE', phase: 'typing1' });
            dispatch({ type: 'SHOW_CURSOR' });
            lastTime = currentTime;
          }
          break;

        case 'typing1':
          if (deltaTime > getRandomTypingSpeed(baseSpeed.type)) {
            if (state.text.length < initialText.length) {
              const nextChar = initialText[state.text.length];
              dispatch({ type: 'TYPE', char: nextChar });
              // Add character-specific delay to next iteration
              lastTime = currentTime + getCharacterDelay(nextChar);
            } else {
              dispatch({ type: 'SET_PHASE', phase: 'waiting1' });
              lastTime = currentTime;
            }
          }
          break;

        case 'typing2':
          if (deltaTime > getRandomTypingSpeed(baseSpeed.type)) {
            if (state.text.length < finalText.length) {
              const nextChar = finalText[state.text.length];
              dispatch({ type: 'TYPE', char: nextChar });
              lastTime = currentTime + getCharacterDelay(nextChar);
            } else {
              dispatch({ type: 'SET_PHASE', phase: 'waiting2' });
              lastTime = currentTime;
            }
          }
          break;

        // For deletion, we want more consistent timing
        case 'deleting1':
        case 'deleting2':
          if (deltaTime > baseSpeed.delete + (Math.random() * 30)) {
            if (state.text.length > 0) {
              dispatch({ type: 'DELETE' });
            } else {
              dispatch({ type: 'SET_PHASE', phase: state.phase === 'deleting1' ? 'pausing' : 'typing1' });
            }
            lastTime = currentTime;
          }
          break;

        // ...rest of the existing cases with unchanged timing...
        default:
          if (deltaTime > baseSpeed[state.phase === 'waiting1' ? 'waitHaha' : 
                          state.phase === 'waiting2' ? 'waitLong' : 'waitShort']) {
            const nextPhase = {
              'waiting1': 'deleting1',
              'waiting2': 'deleting2',
              'pausing': 'typing2'
            }[state.phase] as State['phase'];
            if (nextPhase) {
              dispatch({ type: 'SET_PHASE', phase: nextPhase });
              dispatch({ type: 'SHOW_CURSOR' });
            }
            lastTime = currentTime;
          }
          break;
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      clearInterval(cursorInterval);
    };
  }, [state.phase, state.text.length]);

  return (
    <motion.h1 
      className="text-6xl md:text-8xl font-bold animate-glow"
      initial={{ y: 50 }}
      animate={{ y: 0 }}
    >
      <span className="font-mono">
        {state.text}
        <span 
          className="inline-block w-[4px] h-[60px] md:h-[80px] bg-neon-green ml-2"
          style={{ 
            opacity: state.cursorVisible ? 1 : 0,
            transition: 'opacity 0.1s ease-in-out',
            transform: 'translateY(8%)' // Adjust this value to fine-tune the vertical alignment
          }}
        />
      </span>
    </motion.h1>
  );
}
