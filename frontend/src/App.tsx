import React, { useState } from 'react';
import { Heart, Sparkles, AlertCircle } from 'lucide-react';

interface CalculationResponse {
  result?: number;
  error?: string;
}

export function App() {
  const [display, setDisplay] = useState<string>('0');
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const API_URL = 'http://localhost:8080/api/v1/calculate';

  const clearAll = () => {
    setDisplay('0');
    setFirstOperand(null);
    setOperation(null);
    setWaitingForSecondOperand(false);
    setErrorMessage(null);
  };

  const handleDigit = (digit: string) => {
    setErrorMessage(null);
    if (waitingForSecondOperand) {
      setDisplay(digit);
      setWaitingForSecondOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const handleDecimal = () => {
    setErrorMessage(null);
    if (waitingForSecondOperand) {
      setDisplay('0.');
      setWaitingForSecondOperand(false);
      return;
    }
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const executeCalculation = async (op: string, a: number, b?: number) => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ operation: op, a, b }),
      });

      const data: CalculationResponse = await response.json();

      if (!response.ok || data.error) {
        setErrorMessage(data.error || 'Error al realizar el cálculo');
        setIsLoading(false);
        return null;
      }

      setIsLoading(false);
      return data.result ?? null;
    } catch (err) {
      setErrorMessage('No se pudo conectar con el servidor backend');
      setIsLoading(false);
      return null;
    }
  };

  const handleBinaryOperation = async (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operation) {
      const result = await executeCalculation(operation, firstOperand, inputValue);
      if (result !== null) {
        setDisplay(String(result));
        setFirstOperand(result);
      }
    }

    setWaitingForSecondOperand(true);
    setOperation(nextOperation);
  };

  const handleUnaryOperation = async (unaryOp: string) => {
    const inputValue = parseFloat(display);
    const result = await executeCalculation(unaryOp, inputValue);
    if (result !== null) {
      setDisplay(String(result));
      setFirstOperand(null);
      setOperation(null);
      setWaitingForSecondOperand(true);
    }
  };

  const handleEquals = async () => {
    const inputValue = parseFloat(display);
    if (operation && firstOperand !== null) {
      const result = await executeCalculation(operation, firstOperand, inputValue);
      if (result !== null) {
        setDisplay(String(result));
        setFirstOperand(null);
        setOperation(null);
        setWaitingForSecondOperand(true);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F5EBE1] flex items-center justify-center p-4">
      <div className="bg-[#FAF6F0] rounded-[40px] p-6 w-full max-w-sm shadow-[15px_15px_30px_#d1c7bc,-15px_-15px_30px_#ffffff] relative border-4 border-white/60">

        {/* Orejas decorativas de gatito */}
        <div className="absolute -top-5 left-8 w-10 h-10 bg-[#FAF6F0] border-t-4 border-l-4 border-white/60 rounded-tl-2xl transform -rotate-12"></div>
        <div className="absolute -top-5 right-8 w-10 h-10 bg-[#FAF6F0] border-t-4 border-r-4 border-white/60 rounded-tr-2xl transform rotate-12"></div>

        {/* Encabezado cute */}
        <div className="flex items-center justify-between mb-4 px-2">
          <div className="flex items-center space-x-1 text-[#FFA0B4]">
            <Heart className="w-5 h-5 fill-current" />
            <span className="font-bold text-sm tracking-wider uppercase text-[#8E7D73]">Sezzle Calc</span>
          </div>
          <Sparkles className="w-5 h-5 text-[#FFA0B4]" />
        </div>

        {/* Pantalla de visualización */}
        <div className="bg-[#EADBC8]/40 rounded-2xl p-4 mb-4 text-right shadow-[inset_3px_3px_6px_#d1c7bc,inset_-3px_-3px_6px_#ffffff] min-h-[90px] flex flex-col justify-between overflow-hidden">
          <div className="text-xs text-[#8E7D73] h-4">
            {firstOperand !== null && `${firstOperand} ${operation || ''}`}
          </div>
          <div className="text-3xl font-mono font-bold text-[#5C4B51] truncate">
            {isLoading ? '...' : display}
          </div>
        </div>

        {/* Alerta de Error */}
        {errorMessage && (
          <div className="mb-4 p-2 bg-red-100 text-red-600 rounded-xl text-xs flex items-center space-x-2 animate-bounce">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Teclado de botones */}
        <div className="grid grid-cols-4 gap-3">
          {/* Fila 1 */}
          <button onClick={clearAll} className="btn-neu text-red-400 font-bold">AC</button>
          <button onClick={() => handleUnaryOperation('sqrt')} className="btn-neu text-[#8E7D73]">√</button>
          <button onClick={() => handleUnaryOperation('percentage')} className="btn-neu text-[#8E7D73]">%</button>
          <button onClick={() => handleBinaryOperation('divide')} className="btn-neu-pink">÷</button>

          {/* Fila 2 */}
          <button onClick={() => handleBinaryOperation('power')} className="btn-neu text-[#8E7D73]">x^y</button>
          <button onClick={() => handleDigit('7')} className="btn-neu">7</button>
          <button onClick={() => handleDigit('8')} className="btn-neu">8</button>
          <button onClick={() => handleDigit('9')} className="btn-neu">9</button>

          {/* Fila 3 */}
          <button onClick={() => handleBinaryOperation('multiply')} className="btn-neu-pink">×</button>
          <button onClick={() => handleDigit('4')} className="btn-neu">4</button>
          <button onClick={() => handleDigit('5')} className="btn-neu">5</button>
          <button onClick={() => handleDigit('6')} className="btn-neu">6</button>

          {/* Fila 4 */}
          <button onClick={() => handleBinaryOperation('subtract')} className="btn-neu-pink">-</button>
          <button onClick={() => handleDigit('1')} className="btn-neu">1</button>
          <button onClick={() => handleDigit('2')} className="btn-neu">2</button>
          <button onClick={() => handleDigit('3')} className="btn-neu">3</button>

          {/* Fila 5 */}
          <button onClick={() => handleBinaryOperation('add')} className="btn-neu-pink">+</button>
          <button onClick={() => handleDigit('0')} className="btn-neu flex items-center justify-center">
            <span className="mr-1">0</span>
            <span className="text-xs">🐾</span>
          </button>
          <button onClick={() => handleDigit('00')} className="btn-neu">00</button>
          <button onClick={handleDecimal} className="btn-neu">.</button>

          {/* Botón Igual (Ocupa ancho completo abajo) */}
          <button onClick={handleEquals} className="col-span-4 btn-neu-pink bg-[#FFA0B4] text-white font-bold py-3 text-xl">
            =
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;