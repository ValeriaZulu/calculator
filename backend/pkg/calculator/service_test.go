package calculator

import (
	"testing"
)

func TestCalculatorOperations(t *testing.T) {
	svc := NewCalculatorService()

	t.Run("Addition", func(t *testing.T) {
		got := svc.Add(5, 3)
		want := 8.0
		if got != want {
			t.Errorf("Add(5, 3) = %f; want %f", got, want)
		}
	})

	t.Run("Subtraction", func(t *testing.T) {
		got := svc.Subtract(10, 4)
		want := 6.0
		if got != want {
			t.Errorf("Subtract(10, 4) = %f; want %f", got, want)
		}
	})

	t.Run("Multiplication", func(t *testing.T) {
		got := svc.Multiply(4, 2.5)
		want := 10.0
		if got != want {
			t.Errorf("Multiply(4, 2.5) = %f; want %f", got, want)
		}
	})

	t.Run("Division Success", func(t *testing.T) {
		got, err := svc.Divide(10, 2)
		if err != nil {
			t.Fatalf("unexpected error: %v", err)
		}
		want := 5.0
		if got != want {
			t.Errorf("Divide(10, 2) = %f; want %f", got, want)
		}
	})

	t.Run("Division by Zero", func(t *testing.T) {
		_, err := svc.Divide(10, 0)
		if err != ErrDivisionByZero {
			t.Errorf("expected ErrDivisionByZero, got %v", err)
		}
	})

	t.Run("Square Root Success", func(t *testing.T) {
		got, err := svc.Sqrt(16)
		if err != nil {
			t.Fatalf("unexpected error: %v", err)
		}
		want := 4.0
		if got != want {
			t.Errorf("Sqrt(16) = %f; want %f", got, want)
		}
	})

	t.Run("Square Root Negative", func(t *testing.T) {
		_, err := svc.Sqrt(-9)
		if err != ErrNegativeSqrt {
			t.Errorf("expected ErrNegativeSqrt, got %v", err)
		}
	})
}
