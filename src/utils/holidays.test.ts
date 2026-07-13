import { it, expect, vi, beforeAll } from 'vitest';
import { getNationalHolidays } from './holidays';

beforeAll(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date('2026-07-01'));
});

const mockHolidays = [
  { date: '2026-01-01', localName: 'Nieuwjaar' },
  { date: '2026-04-01', localName: 'April Fools' },
  { date: '2026-07-21', localName: 'Nationale Feestdag' },
  { date: '2026-08-15', localName: 'Onze-Lieve-Vrouwhemelvaart' },
  { date: '2026-12-25', localName: 'Kerstmis' },
];

it('returns holidays for the given month', async () => {
  vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
    ok: true,
    json: async () => mockHolidays,
  } as Response);

  const result = await getNationalHolidays(7);

  expect(result).toEqual([
    { day: 21, name: 'Nationale Feestdag' },
  ]);
});

it('returns empty array when no holidays in month', async () => {
  vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
    ok: true,
    json: async () => mockHolidays,
  } as Response);

  const result = await getNationalHolidays(3);

  expect(result).toEqual([]);
});

it('throws on fetch failure', async () => {
  vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
    ok: false,
  } as Response);

  await expect(getNationalHolidays(7)).rejects.toThrow('Failed to fetch holidays');
});
