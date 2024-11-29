import {useState, useEffect} from 'react';
import csvParser from '../utils/csvParser.ts';
import {EventModel} from "../types";

const useData = () => {
    const [data, setData] = useState<EventModel[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/events.csv');
                // @ts-ignore
                const reader = response.body.getReader();
                const decoder = new TextDecoder('utf-8');
                let csv = '';

                while (true) {
                    const {done, value} = await reader.read();
                    if (done) {
                        break;
                    }

                    csv += decoder.decode(value, {stream: true});
                }

                const parsedData = await csvParser(csv);

                setData(parsedData as EventModel[]);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return {data, loading};
};

export default useData;