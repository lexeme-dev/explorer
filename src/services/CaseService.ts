import Opinion from "../interfaces/Opinion";
import { CASES_SEARCH_ROUTE, CASES_SIMILAR_ROUTE } from "./ServiceConstants";
import BaseService from "./BaseService";

class CaseService extends BaseService {
    searchCases(query: string, max_cases: number): Promise<Opinion[]> {
        return this.axios
            .get(CASES_SEARCH_ROUTE, { params: { query, max_cases } })
            .then((r) => r.data as Opinion[]);
    }

    getSimilarCases(
        opinions: Opinion[],
        max_cases: number
    ): Promise<Opinion[]> {
        const opinion_ids = opinions.map((op) => op.resource_id);
        return this.axios
            .get(CASES_SIMILAR_ROUTE, {
                params: { cases: opinion_ids, max_cases },
            })
            .then((r) => r.data as Opinion[]);
    }
}

export default CaseService;
