import "./Spinner.css";
import type { Component } from "../../lib/components/types";

const Spinner: Component = () => {
  return `
    <span class="spinner" role="status" aria-label="Загрузка">
      <span class="spinner__circle"></span>
    </span>
  `;
};

export default Spinner;
