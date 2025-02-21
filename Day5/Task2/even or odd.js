const args = process.argv.slice(2);

if (args.length !== 1) {
    console.error("Please provide exactly two numbers as arguments.");
    process.exit(1); 
}

const num=Number(args[0])

if (isNaN(num)) {
    console.error("The arguments must be valid numbers.");
    process.exit(1);
}

if(num%2==0){
    console.log("Even");
    
}else{
    console.log("Odd");
    
}
