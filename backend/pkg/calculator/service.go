package calculator

import (
	"errors"
	"math"
)

var (
	ErrDivisionByZero = errors.New("cannot divide by zero")
	ErrNegativeSqrt   = errors.New("cannot calculate square root of a negative number")
)

type CalculatorService struct{}

func NewCalculatorService() *CalculatorService {
	return &CalculatorService{}
}

func (s *CalculatorService) Add(a, b float64) float64 {
	return a + b
}

func (s *CalculatorService) Subtract(a, b float64) float64 {
	return a - b
}

func (s *CalculatorService) Multiply(a, b float64) float64 {
	return a * b
}

func (s *CalculatorService) Divide(a, b float64) (float64, error) {
	if b == 0 {
		return 0, ErrDivisionByZero
	}
	return a / b, nil
}

func (s *CalculatorService) Power(base, exponent float64) float64 {
	return math.Pow(base, exponent)
}

func (s *CalculatorService) Sqrt(a float64) (float64, error) {
	if a < 0 {
		return 0, ErrNegativeSqrt
	}
	return math.Sqrt(a), nil
}

func (s *CalculatorService) Percentage(a float64) float64 {
	return a / 100.0
}
