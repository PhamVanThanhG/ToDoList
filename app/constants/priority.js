class PriorityValue{
    constructor(value, description){
        this.value = value;
        this.description = description;
    }
}
let priority1 = new PriorityValue(1, "Completion deadline");
let priority2 = new PriorityValue(2, "Work for the future");
let priority3 = new PriorityValue(3, "Work is not important");
export const priorityDefault = [priority1, priority2, priority3];
export const priorityDescriptionValues = ["Completion deadline", "Work for the future", "Work is not important"];