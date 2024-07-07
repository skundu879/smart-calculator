export function dynamicMathCalculation(params: any[], formula: string) {
  const functionBody = `return ${formula};`;
  return new Function(...params, functionBody);
}
