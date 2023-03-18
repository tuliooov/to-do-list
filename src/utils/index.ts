export function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }

export const getOpacity = (tasksLength: number) => {
    if(tasksLength >= 10){
        return 1
    } else if(tasksLength >= 8){
        return 0.8
    } else if(tasksLength >= 6){
        return 0.6
    } else if(tasksLength >= 4){
        return 0.4
    } else if(tasksLength >= 2){
        return 0.2
    }
    return 0.05
}