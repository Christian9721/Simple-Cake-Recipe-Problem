import '@testing-library/jest-dom';
import { describe, expect, test } from '@jest/globals';
import { scaleRecipe, parse } from '../index.js';
import { recipe1, recipe2, resultRecipe1, resultRecipe2 } from '../__mocks__/data.js';

describe('sum module', () => {
  test('Recipe #1', () => {
    const result1 = scaleRecipe(4,20, recipe1).map(parse);
    expect(result1).toEqual(resultRecipe1);
  });
  test('Recipe #2', () => {
    const result2 = scaleRecipe(5,8, recipe2).map(parse);
    expect(result2).toEqual(resultRecipe2);
  });
});
