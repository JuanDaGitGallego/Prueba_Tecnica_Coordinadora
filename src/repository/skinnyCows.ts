import { IresponseRepositoryService, IValidCowsNumber, IDataCow,IDataCowsProduct, ITotalByDay, ICompareDays, IBestDayCow } from "../interface/skinnyCows";

export const getProduct = async (N: string): Promise<IresponseRepositoryService> => {
  try {
    console.log("Envio N " + N)
    const validCows = await validateCowNumber(N);
    if(validCows.Valid){
        const matrixCows = await getMatrixCows(validCows.N);
        const formatedData = await formatDataCows(matrixCows);

        const dataCowsResume:IDataCowsProduct = { Cows: formatedData
                                                ,TotalProduct: await getTotalProductByDay(matrixCows) }
        dataCowsResume.CompareProducts = await getBestDay(dataCowsResume.TotalProduct);
        dataCowsResume.BestDayCow = await getBestCowDays(matrixCows);                       
        return {code: 200, message: "Matriz de vacas por dias", data: dataCowsResume}
    }
    else{
        return {code: 400, message: "Numero de vacas no valido", data: validCows}
    }
    
  } catch (err: any) {
    console.log("Err repo findExample", err);
    return {
      code: 400,
      message: "Error en la ejecucion",
    };
  }
};

export const validateCowNumber = async (N: string): Promise<IValidCowsNumber> => {
    const cowNumber = parseInt(N,10);
    if (isNaN(cowNumber) || cowNumber < 3 || cowNumber > 50){
        return { N: cowNumber, Valid: false};
    }else{
        return { N: cowNumber, Valid: true};
    }
  };

export const getMatrixCows = async (N: number): Promise<number[][]> => {
    const matrix = [];
    for (let i = 0; i < N; i++) {
        const row = [];
        for (let j = 0; j < 7; j++) {
        // Generar un valor aleatorio entre 0.0 y 11.9 con un decimal
        const randomValue = (Math.random() * 11.9).toFixed(1);
        row.push(parseFloat(randomValue));
        }
        matrix.push(row);
    }
    return matrix;

};

export const formatDataCows = async (matrix: number[][]): Promise<Array<IDataCow>> => {
    const data = new Array<IDataCow>();
    for (let index = 0; index < matrix.length; index++) {
        
        data.push({N: index + 1,Day1: matrix[index][0],Day2: matrix[index][1],Day3: matrix[index][2],Day4: matrix[index][3],Day5: matrix[index][4],Day6: matrix[index][5],Day7: matrix[index][6]});
    }
    console.log(data);
    return data;
};

export const getTotalProductByDay = async (matrix: number[][]): Promise<ITotalByDay> => {
    let total: ITotalByDay = {Day1: 0,Day2: 0,Day3: 0,Day4: 0,Day5: 0,Day6: 0,Day7: 0};
    for (let index = 0; index < matrix.length; index++) {
        total.Day1 = total.Day1 + matrix[index][0];
        total.Day2 = total.Day2 + matrix[index][1];
        total.Day3 = total.Day3 + matrix[index][2];
        total.Day4 = total.Day4 + matrix[index][3];
        total.Day5 = total.Day5 + matrix[index][4];
        total.Day6 = total.Day6 + matrix[index][5];
        total.Day7 = total.Day7 + matrix[index][6];
    }
    return total;
};

export const getBestCow = async (cows: number[][], day: number): Promise<string> => {
    var aux = 0;
    var cow = "Vaca 1";
    for (let index = 0; index < cows.length; index++) {
        if(aux < cows[day][index]){
            console.log(aux + " < " + cows[day][index])
            aux = cows[day][index]
            cow = "Vaca " + (index + 1);
        }
    }
    return cow;
};

export const getBestCowDays = async (matrix: number[][]): Promise<IBestDayCow> => {
    let total: IBestDayCow = {Day1: await getBestCow(matrix,0)
                        ,Day2: await getBestCow(matrix,1)
                        ,Day3: await getBestCow(matrix,2)
                        ,Day4: await getBestCow(matrix,3)
                        ,Day5: await getBestCow(matrix,4)
                        ,Day6: await getBestCow(matrix,5)
                        ,Day7: await getBestCow(matrix,6)
                    };
    return total;
    
};

export const getBestDay = async (matrix: ITotalByDay): Promise<ICompareDays> => {
    let compareDays: ICompareDays = {BestDay: "Lunes", BestValue: matrix.Day1, WorstDay:"Lunes", WorstValue:matrix.Day1};

    if(compareDays.BestValue < matrix.Day2){
        compareDays.BestDay = "Martes";
        compareDays.BestValue = matrix.Day2;
    }
    if(compareDays.WorstValue > matrix.Day2){
        compareDays.WorstDay = "Martes";
        compareDays.WorstValue = matrix.Day2;
    }

    if(compareDays.BestValue < matrix.Day3){
        compareDays.BestDay = "Miercoles";
        compareDays.BestValue = matrix.Day3;
    }
    if(compareDays.WorstValue > matrix.Day3){
        compareDays.WorstDay = "Miercoles";
        compareDays.WorstValue = matrix.Day3;
    }

    if(compareDays.BestValue < matrix.Day4){
        compareDays.BestDay = "Jueves";
        compareDays.BestValue = matrix.Day4;
    }
    if(compareDays.WorstValue > matrix.Day4){
        compareDays.WorstDay = "Jueves";
        compareDays.WorstValue = matrix.Day4;
    }

    if(compareDays.BestValue < matrix.Day5){
        compareDays.BestDay = "Viernes";
        compareDays.BestValue = matrix.Day5;
    }
    if(compareDays.WorstValue > matrix.Day5){
        compareDays.WorstDay = "Viernes";
        compareDays.WorstValue = matrix.Day5;
    }

    if(compareDays.BestValue < matrix.Day6){
        compareDays.BestDay = "Sabado";
        compareDays.BestValue = matrix.Day6;
    }
    if(compareDays.WorstValue > matrix.Day6){
        compareDays.WorstDay = "Sabado";
        compareDays.WorstValue = matrix.Day6;
    }

    if(compareDays.BestValue < matrix.Day7){
        compareDays.BestDay = "Domingo";
        compareDays.BestValue = matrix.Day7;
    }
    if(compareDays.WorstValue > matrix.Day7){
        compareDays.WorstDay = "Domingo";
        compareDays.WorstValue = matrix.Day7;
    }
    return compareDays;
};
