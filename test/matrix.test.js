const GLMath = require("../index");

describe("Matrix Functions", () => {
  test('Identy Matrix', () => {
    const expected =
      [1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1]

    const result = GLMath.Matrix.idendity(4);

    expect(result).toEqual(expected);
  });

  describe('Unary Operations', () => {
    const matrixA =
      [2.5, 3.7, 5.0,
        -3.2, 1.5, -11.8,
        6.3, -1.2, 3.5
      ];

    const safe_matrixA =
      [2.5, 3.7, 5.0,
        -3.2, 1.5, -11.8,
        6.3, -1.2, 3.5
      ];

    test('Determinant of A to equal -283.943', () => {
      const result = GLMath.Matrix.determinant(matrixA);

      expect(result).toBeCloseTo(-283.943);
      // Check Side Effects
      expect(matrixA).toEqual(safe_matrixA);
    });

    test('Transpose of A', () => {
      const result = GLMath.Matrix.transpose(matrixA);

      const expected =
        [2.5, -3.2, 6.3,
          3.7, 1.5, -1.2,
          5.0, -11.8, 3.5];

      expect(result).toEqual(expected);
      // Check Side Effects
      expect(matrixA).toEqual(safe_matrixA);
    });

    test('Negative A to equal -A', () => {
      const result = GLMath.Matrix.negative(matrixA);

      const expected =
        [-2.5, -3.7, -5.0,
          3.2, -1.5, 11.8,
        -6.3, 1.2, -3.5
        ];

      expect(result).toEqual(expected);
      // Check Side Effects
      expect(matrixA).toEqual(safe_matrixA);
    });

  });

  describe('Binary Operations', () => {
    const matrixA =
      [2, -5, 3,
        1, 4, -7,
        6, -2, 3
      ];

    const matrixB =
      [-4, -1, 0,
        4, 9, 1,
      -5, -1, -7
      ];

    const V = [0.5, -1, 2];
    const S = 4;

    const safe_matrixA =
      [2, -5, 3,
        1, 4, -7,
        6, -2, 3
      ];

    const safe_matrixB =
      [-4, -1, 0,
        4, 9, 1,
      -5, -1, -7
      ];

    const safe_V = [0.5, -1, 2];

    test('A * S to equal expected', () => {
      const result = GLMath.Matrix.multiplyScalar(matrixA, S);

      const expected =
        [8, -20, 12,
          4, 16, -28,
          24, -8, 12
        ];

      expect(result).toEqual(expected);
      // Check Side Effects
      expect(matrixA).toEqual(safe_matrixA);
    });

    test('A * V to equal  (12, -17.5, 11)', () => {
      const result = GLMath.Matrix.multiplyVector(matrixA, V);

      const expected = [12, -17.5, 11];

      expect(result).toEqual(expected);
      // Check Side Effects
      expect(V).toEqual(safe_V);
      expect(matrixA).toEqual(safe_matrixA);
    });

    test('A + B to equal expected', () => {
      const result = GLMath.Matrix.add(matrixA, matrixB);

      const expected =
        [-2, -6, 3,
          5, 13, -6,
          1, -3, -4
        ];

      expect(result).toEqual(expected);
      // Check Side Effects
      expect(matrixA).toEqual(safe_matrixA);
      expect(matrixB).toEqual(safe_matrixB);
    });

    test('A - B to equal expected', () => {
      const result = GLMath.Matrix.subtract(matrixA, matrixB);

      const expected =
        [6, -4, 3,
          -3, -5, -8,
          11, -1, 10
        ];

      expect(result).toEqual(expected);
      // Check Side Effects
      expect(matrixA).toEqual(safe_matrixA);
      expect(matrixB).toEqual(safe_matrixB);
    });

    test('A * B (component-wise) to equal expected', () => {
      const result = GLMath.Matrix.multiply(matrixA, matrixB);

      const expected =
        [-8, 5, 0,
          4, 36, -7,
        -30, 2, -21
        ];

      expect(result).toEqual(expected);
      // Check Side Effects
      expect(matrixA).toEqual(safe_matrixA);
      expect(matrixB).toEqual(safe_matrixB);
    });
  });

  describe('Transform Operations', () => {
    const matrixA = GLMath.Matrix.idendity(4);

    const V = [1.5, 3.0, 0.75];

    const safe_matrixA = GLMath.Matrix.idendity(4);
    const safe_V = [1.5, 3.0, 0.75];

    test('Scale A by V to equal expected', () => {
      const result = GLMath.Matrix.Transform.scale(matrixA, V);

      const expected =
        [1.5, 0, 0, 0,
          0, 3.0, 0, 0,
          0, 0, 0.75, 0,
          0, 0, 0, 1.0
        ];

      expect(result).toEqual(expected);
      // Check Side Effects
      expect(matrixA).toEqual(safe_matrixA);
      expect(V).toEqual(safe_V);
    });

    test('Translate A by V to equal expected', () => {
      const result = GLMath.Matrix.Transform.translate(matrixA, V);

      const expected =
        [1, 0, 0, 1.5,
          0, 1, 0, 3.0,
          0, 0, 1, 0.75,
          0, 0, 0, 1
        ];

      expect(result).toEqual(expected);
      // Check Side Effects
      expect(matrixA).toEqual(safe_matrixA);
      expect(V).toEqual(safe_V);
    });

    test('Rotate A by V to equal expected', () => {
      const result = GLMath.Matrix.Transform.rotate(matrixA, Math.PI / 4, [1, 1, 0]);

      const expected =
        [0.8535534143447876, 0.1464466154575348, 0.5, 0,
          0.1464466154575348, 0.8535534143447876, -0.5, 0,
          -0.5, 0.5, 0.7071067690849304, 0,
          0, 0, 0, 1
        ];

      expect(result[0]).toBeCloseTo( expected[0] );
      expect(result[1]).toBeCloseTo( expected[1] );
      expect(result[5]).toBeCloseTo( expected[5] );
      expect(result[6]).toBeCloseTo( expected[6] );
      expect(result[8]).toBeCloseTo( expected[8] );
      expect(result[10]).toBeCloseTo( expected[10] );
      expect(result[15]).toBeCloseTo( expected[15] );
      
      // Check Side Effects
      expect(matrixA).toEqual(safe_matrixA);
    });

  });
});