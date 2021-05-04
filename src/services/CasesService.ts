import axios from "axios";
import Opinion from "../interfaces/Opinion";

class CasesService {
    static async searchCases(query: string, max_cases: number): Promise<Opinion[]> {
        return axios.get(
            "http://localhost:5000/cases/search",
            {params: {query, max_cases}})
            .then((r) => r.data as Opinion[])
    }
}

export default CasesService