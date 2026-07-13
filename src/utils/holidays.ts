export type Holiday = {
  day: number;
  name: string;
};

function getCurrentYear(): number {
  return new Date().getFullYear();
}

async function getNationalHolidays(month: number): Promise<Holiday[]> {
  const year = getCurrentYear();
  const res = await fetch(
    `https://date.nager.at/api/v3/PublicHolidays/${year}/BE`
  );
  if (!res.ok) {
    throw new Error('Failed to fetch holidays');
  }
  const data = await res.json();
  return data
    .filter((h: { date: string }) => {
      const d = new Date(h.date);
      return d.getMonth() + 1 === month;
    })
    .map((h: { date: string; localName: string }) => ({
      day: new Date(h.date).getDate(),
      name: h.localName,
    }));
}

export {
  getNationalHolidays
}