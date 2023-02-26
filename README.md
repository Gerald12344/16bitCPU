# 16bitCPU

| Commands      | Description |
| ----------- | ----------- |
| HLT      | HALT, stop program       |
| NOP   | No Operation, just carry on        |
| JMP   | JUMP, Go to set line        |
| OUT   | OUTPUT, Out register to console        |
| FLG   | FLAG, set ADD, SUB, MUL, DIV, MOD, COMP, AND Flags        |
| GIN   | General Purpose In, set the General Register from other register        |
| GOT   | General Purpose Out, set the register from General Register    |
| BRZ   | BRANCH, if ACC is 0        |
| BRN   | BRANCH, if ACC is negative        |
| STA   | STORE, Stores RIR in RAM and RAR         |
| LDA   | LOAD, Get the value at RAR from RAM and loads into RDR        |


| Registers      | Description |
| ----------- | ----------- |
| MAR      | MEMORY ADDRESS REGISTER |
| MDR      | MEMORY DATA REGISTER |
| PC      | PROGRAM COUNTER |
| A      | REGISTER A |
| B      | REGISTER B |
| ACC      | ACCUMULATOR (Ccomputes A and B) |
| GEN      | GENERAL PURPOSE REGISTER |
| OUT      | OUTPUT REGISTER |
| RIR      | RAM INPUT REGISTER |
| ROR      | RAM OUTPUT REGISTER |
| RAR      | RAM ADDRESS REGISTER |
| GPX      | GPU X POSITION REGISTER |
| GPY      | GPU Y POSITION REGISTER |
| GPC      | GPU COLOUR REGISTER |
