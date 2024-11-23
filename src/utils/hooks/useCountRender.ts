import {useRef} from 'react';
export const useCountRender = (component: string) => {
  const renders = useRef(0);
  console.log(`renders ${component}: `, renders.current++);
};
