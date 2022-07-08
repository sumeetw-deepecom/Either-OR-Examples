const Right = x =>
({
  map: f => Right(f(x)),
  fold: (f, g) => g(x),
})

const Left = x =>
({
  map: f => Left(x),
  fold: (f, g) => f(x),
})

fromNullable = (x) => {
    return x != null ? Right(x) : Left(x);
}

const findColor = (name) => {
    return fromNullable({red: '#ff4444', blue: '#3b5998', yellow: '#fff68f'}[name]);
}

const result1 = findColor('blue')
                .map(c => c.slice(1))
                .map(c => c.toUpperCase(c))
                .fold(e => "no color", c => c)

const result2 = findColor('green')
                .map(c => c.slice(1))
                .map(c => c.toUpperCase(c))
                .fold(e => "no color", c => c)


test('Blue = 3B5998', () => {
    expect(result1).toBe("3B5998");
});

test('Green = No Color', () => {
    expect(result2).toBe("no color");
});