import Papa from 'papaparse';

const csvParser = (file: string): Promise<unknown[]> => {
    return new Promise((resolve, reject) => {
        Papa.parse(file, {
            header: true,
            dynamicTyping: true,
            complete: (results) => {
                resolve(results.data);
            },
            error: (error: Error) => reject(error),
        });
    });
};

export default csvParser;