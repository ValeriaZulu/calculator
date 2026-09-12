package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/ValeriaZulu/calculator-backend/pkg/calculator"
)

type CalculationRequest struct {
	Operation string  `json:"operation"` // add, subtract, multiply, divide, power, sqrt, percentage
	A         float64 `json:"a"`
	B         float64 `json:"b,omitempty"`
}

type CalculationResponse struct {
	Result float64 `json:"result,omitempty"`
	Error  string  `json:"error,omitempty"`
}

func enableCORS(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		next(w, r)
	}
}

func main() {
	svc := calculator.NewCalculatorService()

	http.HandleFunc("/api/v1/calculate", enableCORS(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")

		if r.Method != http.MethodPost {
			w.WriteHeader(http.StatusMethodNotAllowed)
			json.NewEncoder(w).Encode(CalculationResponse{Error: "Method not allowed"})
			return
		}

		var req CalculationRequest
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(CalculationResponse{Error: "Invalid request payload"})
			return
		}

		var result float64
		var err error

		switch req.Operation {
		case "add":
			result = svc.Add(req.A, req.B)
		case "subtract":
			result = svc.Subtract(req.A, req.B)
		case "multiply":
			result = svc.Multiply(req.A, req.B)
		case "divide":
			result, err = svc.Divide(req.A, req.B)
		case "power":
			result = svc.Power(req.A, req.B)
		case "sqrt":
			result, err = svc.Sqrt(req.A)
		case "percentage":
			result = svc.Percentage(req.A)
		default:
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(CalculationResponse{Error: "Unsupported operation"})
			return
		}

		if err != nil {
			w.WriteHeader(http.StatusUnprocessableEntity)
			json.NewEncoder(w).Encode(CalculationResponse{Error: err.Error()})
			return
		}

		json.NewEncoder(w).Encode(CalculationResponse{Result: result})
	}))

	port := ":8080"
	fmt.Printf("Backend server running on http://localhost%s\n", port)
	if err := http.ListenAndServe(port, nil); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
