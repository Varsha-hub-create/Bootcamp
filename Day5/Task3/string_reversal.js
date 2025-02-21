const args = process.argv.slice(2);
if (args.length === 0) {
    console.error("Please provide a string to reverse.");
    process.exit(1);
}
const inputString = args.join(" ");
const reversedString = inputString.split('').reverse().join('');
console.log(reversedString);
