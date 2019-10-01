console.log(Deno.args)

let fileName = Deno.args[1]

async function main() {
    console.table(Deno.resources())
    let f = await Deno.open(fileName)
    console.log(f);
    console.table(Deno.resources())
    Deno.close(4)
    console.table(Deno.resources())
}

main()