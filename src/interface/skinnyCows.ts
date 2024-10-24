export interface IDataCowsProduct  {
    TotalProduct: ITotalByDay,
    CompareProducts?: ICompareDays,
    BestDayCow?: IBestDayCow,
    Cows: IDataCow[]
}
export interface IBestDayCow  {
    Day1: string,
    Day2: string,
    Day3: string,
    Day4: string,
    Day5: string,
    Day6: string,
    Day7: string,
}
export interface IresponseRepositoryService {
    code: number,
    message: string,
    data?: any
}

export interface IValidCowsNumber  {
    N: number,
    Valid: boolean
}

export interface ICompareDays  {
    BestDay: string,
    BestValue: number,
    WorstDay: string,
    WorstValue: number
}

export interface IDataCow  {
    N: number,
    Day1: number,
    Day2: number,
    Day3: number,
    Day4: number,
    Day5: number,
    Day6: number,
    Day7: number,
}

export interface ITotalByDay  {
    Day1: number,
    Day2: number,
    Day3: number,
    Day4: number,
    Day5: number,
    Day6: number,
    Day7: number,
}