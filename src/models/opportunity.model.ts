class Opportunity {
    id: number | null = null;
    name: string;
    center: string;
    date: Date; 

    constructor(name: string, center: string, date: Date) {
        this.name = name;
        this.center = center; 
        this.date = date;
    }
}

export { Opportunity }