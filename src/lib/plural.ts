/** A counted noun in both of the forms German needs. Both live in `src/content/site.ts`. */
export type CountedNoun = { readonly one: string; readonly other: string };

/** `count(1, labels.frame)` → "1 Foto"; `count(6, labels.frame)` → "6 Fotos". */
export function count(n: number, noun: CountedNoun): string {
	return `${n} ${n === 1 ? noun.one : noun.other}`;
}
