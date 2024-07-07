export function dynamicMathCalculation(params, formula) {
  const functionBody = `return ${formula};`;
  return new Function(...params, functionBody);
}
