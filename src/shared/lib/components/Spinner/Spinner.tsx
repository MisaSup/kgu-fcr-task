import type { FC } from 'react';

type SpinnerProps = {
    label?: string;
};

const Spinner: FC<SpinnerProps> = ({ label = 'Loading…' }) => {
    return (
        <div className="spinner" role="status">
            <span className="spinner__circle" aria-hidden="true"></span>
            <span className="spinner__label">{label}</span>
        </div>
    );
};

export default Spinner;
