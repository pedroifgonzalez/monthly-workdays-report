# WorkMonth

Monthly workdays report tool — calculates workable days, accounts for holidays, vacations, sick days, absences, and expenses, then emails the totals.

Built with React + TypeScript + Vite.

## Features

- **Workdays calculation**: counts weekday days up to a configurable max day
- **Holiday data**: fetches Belgian national holidays via the Nager.Date API
- **Deductions**: toggleable checkboxes + number inputs for vacations, sick days, absence days
- **Expenses**: optional expense rows with amount (EUR) and description
- **Email report**: generates a plain-text body via `mailto:` link with all totals
- **Dark mode**: follows system `prefers-color-scheme`
- **Settings**: configurable max day and recipient email

## Usage

```bash
npm install
npm run dev      # dev server with HMR
npm run build    # type-check + production build → dist/
npm run test     # run tests
npm run preview  # preview production build
```
