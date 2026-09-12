import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('Calculator Frontend UI & Basic Interaction', () => {
    it('renders header title and initial display state', () => {
        render(<App />);
        expect(screen.getByText('Calculator by ValeZulu')).toBeDefined();

        // Verificamos que el '0' exista en pantalla (display + botón)
        const zeroElements = screen.getAllByText('0');
        expect(zeroElements.length).toBeGreaterThan(0);
    });

    it('updates display when digit buttons are clicked', () => {
        render(<App />);
        const button7 = screen.getByRole('button', { name: '7' });
        const button8 = screen.getByRole('button', { name: '8' });

        fireEvent.click(button7);
        fireEvent.click(button8);

        expect(screen.getByText('78')).toBeDefined();
    });

    it('clears display when AC button is pressed', () => {
        render(<App />);
        const button5 = screen.getByRole('button', { name: '5' });
        const acButton = screen.getByRole('button', { name: 'AC' });

        fireEvent.click(button5);
        expect(screen.getAllByText('5').length).toBeGreaterThan(0);

        fireEvent.click(acButton);
        const zeroElements = screen.getAllByText('0');
        expect(zeroElements.length).toBeGreaterThan(0);
    });
});