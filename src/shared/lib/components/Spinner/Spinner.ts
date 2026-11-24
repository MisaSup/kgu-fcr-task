import type { Component } from '../types.js';

type SpinnerProps = {
  label?: string;
};

const Spinner: Component<SpinnerProps> = ({ label = 'Loading…' }) => {
  return `
        <div class="spinner" role="status">
          <span class="spinner__circle" aria-hidden="true"></span>
          <span class="spinner__label">${label}</span>
        </div>
    `;
};

export default Spinner;
