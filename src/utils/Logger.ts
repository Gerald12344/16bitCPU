import { DEBUG } from "..";


export async function Logger(text: string) {
    if (DEBUG) {
        console.log(text);
    }
}