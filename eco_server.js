const {listen} = Deno
let hello = new TextEncoder().encode('hello')
async function main() {
    let s = listen({
        hostname: 'localhost',
        port: 8000,
        transport: 'tcp'
    })
    let scoket = await s.accept()
    console.log(scoket)
    console.log('listen') 
    scoket.write(hello)
}
main()