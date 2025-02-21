const args = process.argv.slice(2);

if (args.length !== 1 || isNaN(args[0])) {
    console.log("Usage: node script.js <number>");
    process.exit(1);
}

const num = parseInt(args[0], 10);

for (let i = 1; i <= 10; i++) {
    console.log(`${num} x ${i} = ${num * i}`);
}


