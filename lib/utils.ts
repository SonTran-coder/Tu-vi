import { clsx, type ClassValue } from "clsx";
import { Readable } from "stream";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateYearsRange(start: number, end: number, range: number) {
  const totalRange = Array.from({ length: end - start + 1 }, (_, index) =>
    (start + index).toString(),
  );
  const chunkSize = 10;

  return Array.from({ length: range }, (_, index) =>
    totalRange.slice(index * chunkSize, (index + 1) * chunkSize),
  );
}

export const findYearRange = (
  value: string,
  range: { key: string; value: string; subValue: string[] }[],
  prevValue?: string,
) => {
  return (
    range.find((item) => item.subValue.includes(value))?.value ??
    prevValue ??
    ""
  );
};

export const generateArray = (start: number, end: number): number[] => {
  if (start > end) return [];
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

export async function decodeReadableStream(stream: ReadableStream<Uint8Array>): Promise<Record<string, string>> {
  const reader = stream.getReader();
  let rawData = '';

  while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      rawData += new TextDecoder().decode(value); // Decode the chunks to a string
  }

  const params = new URLSearchParams(rawData);
  return Object.fromEntries(params.entries()) as Record<string, string>;
}
