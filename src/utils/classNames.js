import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines clsx and tailwind-merge to handle class name merging
 * @param {...any} inputs - Class name inputs to be merged
 * @returns {string} Merged and deduplicated class names
 */
export function cn(...inputs) {
  // First, process all inputs with clsx to handle conditional classes
  const processed = clsx(inputs);
  
  // Then use tailwind-merge to handle Tailwind class conflicts
  return twMerge(processed);
}

export default cn;
