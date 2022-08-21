class Opportunity {
    id: number | null = null;
    name: string;
    date: Date; 

    constructor(name: string, date: Date) {
        this.name = name;
        this.date = date;
    }
}

export { Opportunity }