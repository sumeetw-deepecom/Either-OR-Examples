const Right = x => 
({
    map: (f) => Right(f(x)),
    fold: (f, g) => g(x)
})

const Left = x => 
({
    map: (f) => Left(x),
    fold: (f, g) => f(x)
})

const result1 = Right(2).map(x => x + 1).map(x => x/2).fold(x => "error", x => x);
const result2 = Left(2).map(x => x + 1).map(x => x/2).fold(x => "error", x => x);

test('Right Operation on 2 equals 1.5', () => {
    expect(result1).toBe(1.5);
});

test('Left Operation on 2 equals 2', () => {
    expect(result2).toBe("error");
});