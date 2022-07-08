//dummy setup
const fs = {
    readFileSync: name => {
    if(name === 'config.json') {
        return JSON.stringify({port: 8888})
    } else {
        throw('missing file!')
    }
    }
}


const Right = x =>
({
    chain: f => f(x),
    map: f => Right(f(x)),
    fold: (f, g) => g(x),
    inspect: () => `Right(${x})`
})

const Left = x =>
({
    chain: f => Left(x),
    map: f => Left(x),
    fold: (f, g) => f(x),
    inspect: () => `Left(${x})`
})

    
const tryCatch = f => {
    try {
    return Right(f())
    } catch (e) {
    return Left(e)
    }
}

const getPort = () =>
    tryCatch(() => fs.readFileSync('config.json'))
    .chain(c => tryCatch(() => JSON.parse(c)))
    .fold(e => 3000, c => c.port)

const result = getPort()



test('Port should be 8888', () => {
    expect(result).toBe(8888);
});