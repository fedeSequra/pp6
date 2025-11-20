# PP6 Rule Generator

A simple web application to generate "Simba PP6 Rules" based on user configuration. The application allows two calculation modes: by installments and by percentages.

## Features

- **Two Calculation Modes:**
  - **Instalments:** Calculates the rules based on a monthly fee for different ranges.
  - **Percentages:** Calculates the rules based on a percentage per number of installments.
- **Quick Paste:** Allows pasting data directly from an Excel spreadsheet to fill the monthly fee table.
- **Dynamic Generation:** The data table and Simba rules are updated automatically as data is entered.
- **Copy to Clipboard:** A button to easily copy the generated rules.
- **Modern Interface:** A clean, modern, and responsive user interface.

- **Filter non-zero values:** A checkbox under the `PP6 Rules` panel allows you to show only the instalments/percentages that have a non-zero value. This affects both "Instalments" and "Percentages %" modes.
- **Cleaner inputs:** Number inputs (fees and percentages) no longer show browser spinner arrows for increment/decrement.

## How to Use

1.  **Open the application:** Simply open the `index.html` file in your preferred web browser.
2.  **Select Mode:** Choose between "Instalments" or "Percentages %" mode.
3.  **Enter Data:**
    - **Instalments Mode:**
        1.  Adjust the **Limit** if necessary.
        2.  Paste the data from the "Monthly Fee" column into the text area of step 2.
        3.  Press **"Load table"** to fill the "Data Table".
        4.  Adjust the values in the table if necessary.
    - **Percentages % Mode:**
        1.  Select the type: "National" or "International".
        2.  Enter the percentages for each number of installments in the table.
4.  **Get Results:** The Simba rules are automatically generated in the panel on the right.
5.  **Copy Results:** Use the **"Copy to Clipboard"** button to copy the generated rules.

## Filter Non-zero Values (new)

- The checkbox labeled **"Mostrar solo cuotas con valor"** is located directly under the **PP6 Rules** title in the results panel (right column).
- When checked:
  - In **Percentages %** mode: only the installments that have a percentage value different from 0 are included in the generated rules. Each included installment still outputs the two standard lines (the `0.0` and `0.1` entries), but installments with percentage 0 are omitted entirely.
  - In **Instalments** mode: only the instalment numbers (2..24) that have at least one monthly fee value (from the left table) different from 0 are included. Instalments without any non-zero fee are skipped.

## Notes

- Number inputs have had their native spinner controls hidden for a cleaner UX. You can still type values or use keyboard arrows.
- The generated output uses semicolon-delimited lines in the format:

```
instalment_count;from;fixed;percentage;on_payments_servicing_fee_percentage;license_servicing_fee_percentage
```

Example (when filtering non-zero values):

```
3;0.0;0.0;0.00;0.0;0.0
3;0.1;0.0;3.45;0.0;0
6;0.0;0.0;0.00;0.0;0.0
6;0.1;0.0;6.40;0.0;0
12;0.0;0.0;0.00;0.0;0.0
12;0.1;0.0;9.50;0.0;0
18;0.0;0.0;0.00;0.0;0.0
18;0.1;0.0;11.00;0.0;0
24;0.0;0.0;0.00;0.0;0.0
24;0.1;0.0;11.00;0.0;0
```

## Development / Commit

- The UI changes (checkbox placement, styles) and the filtering logic were implemented in `index.html`, `style.css` and `script.js`.
- A commit with these changes has been pushed to the `main` branch.

## Technologies Used

- **HTML5**
- **CSS3** (with CSS variables for easy customization)
- **JavaScript** (Vanilla JS, no frameworks)