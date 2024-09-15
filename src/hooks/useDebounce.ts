import {useEffect, useState} from "react";

export function useDebounce<T>(
  value: T,
  cb: (val: T) => void
)
{
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() =>
  {
    const handler = setTimeout(() =>
    {
      if(debouncedValue !== value)
      {
        cb(debouncedValue);
      }
    }, 500);

    return () =>
    {
      clearTimeout(handler);
    };

  }, [debouncedValue, value, cb]);

  return {
    debouncedValue,
    setDebouncedValue
  };
}
