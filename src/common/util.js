import { Avatoar_Generator } from '../common/global'

export const randomGenerator = ()=> {
    let rowdomAvatoarObj = {};
    for(let i in Avatoar_Generator) {
        let arr = Avatoar_Generator[i]
        const randomIndex = Math.floor(Math.random() * arr.length)
        rowdomAvatoarObj[i] =arr[randomIndex]
    } 
    return rowdomAvatoarObj;
}