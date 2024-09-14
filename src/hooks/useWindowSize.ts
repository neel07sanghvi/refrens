import {useEffect} from "react";
import {useState} from "react";

interface WindowSize
{
  width: number;
  height: number;
}

export const useWindowSize = () =>
{
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: window.innerWidth,
    height: window.innerHeight
  });
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() =>
  {
    const handleResize = () =>
    {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);

  }, []);

  useEffect(() =>
  {
    if(windowSize.width < 768)
    {
      setIsMobile(true);
    }
    else
    {
      setIsMobile(false);
    }

  }, [windowSize]);

  return {
    isMobile
  };
};
