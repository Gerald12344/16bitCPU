import { BitWidth } from "..";

// This is just for optimization of emulator
let cache: {
    [key: number]: { opcode: number, operand: number }
} = {}

export function OpcodeSeparator(opcode: number): { opcode: number, operand: number } {
    // Check cache
    if (cache[opcode]) {
        return cache[opcode]
    }

    // turn input to string for string methods 
    let inputString = `${(opcode ?? 0).toString(2)}`;



    // Change to array to split in half
    let inputArray = inputString.split("")
    inputArray = [...new Array(BitWidth - inputArray.length).fill("0"), ...inputArray]

    // Work out halfway point
    const half = Math.ceil(inputArray.length / 2);

    // Get opcode and operand
    const first = inputArray.splice(0, half)

    const second = inputArray.splice(-half)


    // Generate opcode and operand
    let opOut = {
        opcode: parseInt(first.join(""), 2),
        operand: parseInt(second.join(""), 2)
    }

    // Cache
    cache[opcode] = opOut

    // Return
    return opOut
}